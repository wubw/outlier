from flask import Flask, jsonify, request
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

@app.route("/")
def hello():
    return "Hello World!"

@app.route('/test')
def get_test():
    return jsonify("test")

@app.route('/test', methods=['POST'])
def add_test():
    return jsonify("test"), 201