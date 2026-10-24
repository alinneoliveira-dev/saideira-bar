
import os
import re
import sqlite3
import time
from pathlib import Path

import requests
from dotenv import load_dotenv
from flask import Flask, jsonify, render_template, request

load_dotenv()

app = Flask(__name__)

SPOTIFY_CLIENT_ID = os.getenv("SPOTIFY_CLIENT_ID")
SPOTIFY_CLIENT_SECRET = os.getenv("SPOTIFY_CLIENT_SECRET")

SPOTIFY_TOKEN_URL = "https://accounts.spotify.com/api/token"
SPOTIFY_API_URL = "https://api.spotify.com/v1"

# Cache temporário do token de acesso
_spotify_token = None
_spotify_token_expires_at = 0


def get_db_connection():
    os.makedirs(app.instance_path, exist_ok=True)

    db_path = Path(app.instance_path) / "saideira.db"
    connection = sqlite3.connect(db_path)
    connection.row_factory = sqlite3.Row
    return connection


def init_db():
    with get_db_connection() as connection:
        connection.execute("""
            CREATE TABLE IF NOT EXISTS music_requests (
                id INTEGER PRIMARY KEY AUTOINCREMENT,
                track_uri TEXT NOT NULL,
                created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
                status TEXT NOT NULL DEFAULT 'pending'
            )
        """)


def get_spotify_token():
    global _spotify_token, _spotify_token_expires_at

    if not SPOTIFY_CLIENT_ID or not SPOTIFY_CLIENT_SECRET:
        raise RuntimeError("Credenciais do Spotify não configuradas.")

    if _spotify_token and time.time() < _spotify_token_expires_at:
        return _spotify_token

    response = requests.post(
        SPOTIFY_TOKEN_URL,
        auth=(SPOTIFY_CLIENT_ID, SPOTIFY_CLIENT_SECRET),
        data={"grant_type": "client_credentials"},
        timeout=10,
    )
    response.raise_for_status()

    data = response.json()
    _spotify_token = data["access_token"]
    _spotify_token_expires_at = time.time() + data["expires_in"] - 60

    return _spotify_token


@app.route("/")
def index():
    return render_template("index.html")


@app.route("/saude")
def saude():
    return jsonify(status="ok")


@app.route("/api/spotify/search")
def search_spotify():
    query = request.args.get("q", "").strip()

    if len(query) < 2 or len(query) > 100:
        return jsonify(error="Digite entre 2 e 100 caracteres."), 400

    try:
        token = get_spotify_token()

        response = requests.get(
            f"{SPOTIFY_API_URL}/search",
            headers={"Authorization": f"Bearer {token}"},
            params={
                "q": query,
                "type": "track",
                "limit": 8,
            },
            timeout=10,
        )
        response.raise_for_status()

        data = response.json()
        tracks = data.get("tracks", {}).get("items", [])

        results = []

        for track in tracks:
            results.append({
                "id": track["id"],
                "uri": track["uri"],
                "name": track["name"],
                "artists": [
                    artist["name"] for artist in track.get("artists", [])
                ],
                "album": track.get("album", {}).get("name", ""),
                "image": (
                    track["album"]["images"][0]["url"]
                    if track.get("album", {}).get("images")
                    else None
                ),
                "spotify_url": track.get("external_urls", {}).get(
                    "spotify", ""
                ),
            })

        return jsonify(tracks=results)

    except RuntimeError:
        app.logger.exception("Configuração do Spotify ausente.")
        return jsonify(error="A integração musical não está configurada."), 503

    except requests.RequestException:
        app.logger.exception("Falha na consulta ao Spotify.")
        return jsonify(error="Não foi possível consultar o Spotify agora."), 502


@app.route("/api/music-requests", methods=["POST"])
def create_music_request():
    data = request.get_json(silent=True) or {}
    track_uri = data.get("track_uri", "")

    # Aceita somente URIs de faixas do Spotify.
    if not isinstance(track_uri, str) or not re.fullmatch(
        r"spotify:track:[A-Za-z0-9]+", track_uri
    ):
        return jsonify(error="A faixa selecionada é inválida."), 400

    try:
        with get_db_connection() as connection:
            cursor = connection.execute(
                """
                INSERT INTO music_requests (track_uri)
                VALUES (?)
                """,
                (track_uri,),
            )
            request_id = cursor.lastrowid

        return jsonify(
            ok=True,
            request_id=request_id,
            message="Pedido registrado na fila do Saideira!",
        ), 201

    except sqlite3.Error:
        app.logger.exception("Falha ao registrar pedido musical.")
        return jsonify(error="Não foi possível registrar seu pedido."), 500


init_db()


if __name__ == "__main__":
    app.run(debug=True, port=5000)
