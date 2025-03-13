import os
import subprocess
import hashlib
import pickle
import jwt  # Unsicherer Umgang mit JWT
from flask import Flask, request

app = Flask(__name__)

# 1. Hartecodiertes Passwort (CWE-259)
SECRET_PASSWORD = "12345"

# 2. Unsichere kryptografische Hash-Funktion (CWE-327)
def insecure_hash(password):
    return hashlib.md5(password.encode()).hexdigest()

# 3. Command Injection (CWE-78)
def execute_command(user_input):
    return subprocess.Popen(f"echo {user_input}", shell=True)

# 4. Unsichere Deserialisierung (CWE-502)
def insecure_deserialization(data):
    return pickle.loads(data)  # Gefahr: Kann beliebigen Code ausführen!

# 5. Unsichere JWT-Verwendung (CWE-347)
def create_jwt_token(payload):
    return jwt.encode(payload, "secret", algorithm="none")  # Kein Algorithmus zur Signatur

@app.route("/login", methods=["POST"])
def login():
    password = request.form.get("password")
    if password == SECRET_PASSWORD:
        return "Login erfolgreich!"
    return "Falsches Passwort!", 401

@app.route("/cmd", methods=["POST"])
def run_cmd():
    user_input = request.form.get("cmd")
    return execute_command(user_input)

if __name__ == "__main__":
    app.run(debug=True)
