from flask import Flask, jsonify
from flask_cors import CORS
app = Flask(__name__)


@app.route('/python/vue-cli4')
def hello_world():
    data = {
        "name": "Lindong",
        "age": "22"
    }
    return jsonify(data)


if __name__ == '__main__':
    app.run()
