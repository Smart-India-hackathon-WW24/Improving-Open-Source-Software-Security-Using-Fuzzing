# logging_server.py
from flask import Flask, jsonify
app = Flask(__name__)

# Example storage (replace with a database or file for persistence)
crash_log = []
coverage_data = {}

@app.route("/api/crashes", methods=["GET"])
def get_crashes():
    return jsonify(crash_log)

@app.route("/api/coverage", methods=["GET"])
def get_coverage():
    return jsonify(coverage_data)
