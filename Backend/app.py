from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pymongo
import boto3
import os

app = Flask(__name__)

app.config['FLASKS3_BUCKET_NAME'] = 'team-flower'
bucket_name = app.config['FLASKS3_BUCKET_NAME']
app.config['UPLOAD_FOLDER'] = "/backend/Images"
app.config['directory'] = "root_directory"
rootFolder = app.config['directory']

s3 = boto3.client(
    service_name="s3",
    region_name=os.environ['s3_region_name'],
    aws_access_key_id=os.getenv('s3_aws_access_key_id'),
    aws_secret_access_key=os.getenv('s3_aws_secret_access_key'),
    endpoint_url=os.getenv('endpoint_url')
)

myclient = pymongo.MongoClient("mongodb+srv://teamf:teamf123@flowerdb.37ico.mongodb.net/flowerdb?retryWrites=true&w=majority")
mydb = myclient.flowerdb
mycol = mydb.inform

@app.route('/')
def hello_pybo():

    return 'Hello, Pybo!'


@app.route('/upload', methods=["POST"])
def uploadFile():

    file = request.files['upload_file']
    print("1file.filename", file.filename)
    file.filename = secure_filename(file.filename)
    print("2file.filename", file.filename)
    file.save(os.path.join(
        app.config['UPLOAD_FOLDER'], file.filename))
    outcome = s3.put_object(Body=file,
                            Bucket=app.config['directory'],
                            Key=file.filename,
                            ContentType=request.mimetype)
    file_dir = os.getenv('endpoint_url') + "/" + \
        app.config['directory'] + "/" + file.filename
    print("file_dir:", file_dir)

    print("type:", type(file_dir))

    file_db = {
        "URL": file_dir
    }
    mycol.insert_one(file_db)

    doc = mycol.find({"URL": file_dir})
    print("type:", type(doc))


    return doc


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# 1 이미지 받아서 데이터베이스에 저장

# 1-1 국화 -> 정보를 데이터베이스에서 조회 유저 반환
