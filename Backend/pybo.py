from flask import Flask
app = Flask(__name__)


@app.route('/')
def hello_pybo():
    print('반영')
    return 'Hello, Pybo!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# 1 이미지 받아서 데이터베이스에 저장

# 1-1 국화 -> 정보를 데이터베이스에서 조회 유저 반환
