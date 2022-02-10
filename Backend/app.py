from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pymongo
import boto3
import os

app = Flask(__name__)

app.config['FLASKS3_BUCKET_NAME'] = 'team-flower'
app.config['UPLOAD_FOLDER'] = "/backend/Images"
app.config['directory'] = "root_directory"
bucket_name = app.config['FLASKS3_BUCKET_NAME']
rootFolder = app.config['directory']

s3 = boto3.client(
    service_name="s3",
    region_name=os.environ['s3_region_name'],
    aws_access_key_id=os.getenv('s3_aws_access_key_id'),
    aws_secret_access_key=os.getenv('s3_aws_secret_access_key'),
    endpoint_url=os.getenv('endpoint_url')
)

<<<<<<< HEAD
# API sample

=======
myclient = pymongo.MongoClient("mongodb+srv://teamf:<password>@flowerdb.37ico.mongodb.net/flowerdb?retryWrites=true&w=majority")
mydb = myclient.flowerdb
mycol = mydb.inform
>>>>>>> mongodb-minseok

@app.route('/')
def hello_pybo():

    return 'Hello, Pybo!'


@app.route('/upload', methods=["POST"])
def uploadFile():

    file = request.files['upload_files']
    # 한글 이름의 파일 입력시 validation이 안되는 문제가 존재
    file.filename = secure_filename(file.filename)

    # backend 서버에 파일 저장
    file.save(os.path.join(
        app.config['UPLOAD_FOLDER'], file.filename))
<<<<<<< HEAD

    # s3 bucket에 이미지 파일 저장
    file_path = app.config['UPLOAD_FOLDER'] + "/" + file.filename
    s3.upload_file(
        file_path, rootFolder, file.filename)

    return "image uploaded"
=======
    outcome = s3.put_object(Body=file,
                            Bucket=app.config['directory'],
                            Key=file.filename,
                            ContentType=request.mimetype)
    file_dir = os.getenv('endpoint_url') + "/" + \
        app.config['directory'] + "/" + file.filename
    print("file_dir:", file_dir)

    print("type:", type(file_dir))
>>>>>>> mongodb-minseok

    file_db = {
        "URL": file_dir
    }
    mycol.insert_one(file_db)

    doc = mycol.find_one({"URL": file_dir})
    docc = str(doc.values())
    print("type:", type(docc))

    return docc

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# 1 이미지 받아서 데이터베이스에 저장

# 1-1 국화 -> 정보를 데이터베이스에서 조회 유저 반환
