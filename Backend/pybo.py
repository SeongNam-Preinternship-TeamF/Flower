from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello_pybo():
    print('반영')
    return 'Hello, Pybo!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
