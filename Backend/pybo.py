from flask import Flask
import boto3
import os

app = Flask(__name__)

app.config['FLASKS3_BUCKET_NAME'] = 'team-flower'
s3 = boto3.resource(
    service_name=os.environ['s3_service_name'],
    region_name=os.environ['s3_region_name'],
    aws_access_key_id=os.environ['s3_aws_access_key_id'],
    aws_secret_access_key=os.environ['s3_aws_secret_access_key']
)


@app.route('/')
def hello_pybo():
    print('반영')
    return 'Hello, Pybo!'


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# 1 이미지 받아서 데이터베이스에 저장

# 1-1 국화 -> 정보를 데이터베이스에서 조회 유저 반환
