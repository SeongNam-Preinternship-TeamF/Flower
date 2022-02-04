from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello_pybo():
    print('반영')
    return 'Hello, Pybo!'
