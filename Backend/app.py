from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import boto3
import os

app = Flask(__name__)

app.config['FLASKS3_BUCKET_NAME'] = 'team-flower'
app.config['UPLOAD_FOLDER'] = "/backend/Images"

s3 = boto3.resource(
    service_name=os.environ['s3_service_name'],
    region_name=os.environ['s3_region_name'],
    aws_access_key_id=os.environ['s3_aws_access_key_id'],
    aws_secret_access_key=os.environ['s3_aws_secret_access_key']
)

# s3 = boto3.client(
#     "s3",
#     region_name=os.environ['s3_region_name'],
#     aws_access_key_id=os.getenv('AWS_ACCESS_KEY'),
#     aws_secret_access_key=os.getenv('AWS_SECRET_ACCESS_KEY')
# )


@app.route('/')
def hello_pybo():
    print('반영')
    return 'Hello, Pybo!'


@app.route('/upload', methods=["POST"])
def uploadFile():

    print("here")

    file = request.files['upload_file']
    file.filename = secure_filename(file.filename)
    file.save(os.path.join(
        app.config['UPLOAD_FOLDER'], file.filename))
    # file.save(os.path.join(app.config['UPLOAD_FOLDER'], secure_filename(file.filename)))

    print(file.filename, ":::asdfasdfasf")

    # s3.upload_fileobj(
    #     file,
    #     'team-flower',
    #     file.filename
    # )

    # output = send_to_s3(file, app.config["S3_BUCKET"])
    print("2")
    # s3.upload_file(app.config['UPLOAD_FOLDER']+"/" +
    #                file.filename, 'team-flower', file.filename)
    print("3")
    return "processed"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# 1 이미지 받아서 데이터베이스에 저장

# 1-1 국화 -> 정보를 데이터베이스에서 조회 유저 반환
