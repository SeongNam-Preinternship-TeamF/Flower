from flask import Flask, request, jsonify
import numpy as np
# from keras.models import load_model
# from tensorflow import keras
# import tensorflow as tf
from werkzeug.utils import secure_filename
import pymongo
import boto3
import os

print('asdf')

# # model
#from tensorflow.keras.applications.imagenet_utils import preprocess_input, decode_predictions

app = Flask(__name__)

app.config['FLASKS3_BUCKET_NAME'] = 'team-flower'
app.config['UPLOAD_FOLDER'] = "/backend/Images"
app.config['directory'] = "root_directory"
bucket_name = app.config['FLASKS3_BUCKET_NAME']
rootFolder = app.config['directory']

# model load
# model = tf.keras.models.load_model('./Backend/model/model.hdf5')
label_dict = ['Daisy', 'Sunflower', 'Tulip', 'Dandelion', 'Rose']

myclient = pymongo.MongoClient(
    mongo_info
)
mydb = myclient.flowerdb
myinform = mydb.inform
myurl = mydb.photo_url

@app.route('/')
def hello_pybo():

#         # predict
#         model._make_predict_function()  # predict() 호출 전
#         preds = model.predict(x)

#         # data[] = []
#         data["pred_proba"] = "{:.3f}".format(
#             np.amax(preds))    # Max probability
#         data["pred_class"] = label_dict[preds[0]]               # 꽃 이름

#         # json 형태로 반환
#         return flask.jsonify(data)

#     return None


# s3 = boto3.client(
#     service_name="s3",
#     region_name=os.environ['s3_region_name'],
#     aws_access_key_id=os.getenv('s3_aws_access_key_id'),
#     aws_secret_access_key=os.getenv('s3_aws_secret_access_key'),
#     endpoint_url=os.getenv('endpoint_url')
# )

# myclient = pymongo.MongoClient(
#     "mongodb+srv://teamf:teamf123@flowerdb.37ico.mongodb.net/flowerdb?retryWrites=true&w=majority")
# mydb = myclient.flowerdb
# mycol = mydb.inform

    myurl.insert_one(file_db)
    print("type[file_path]:", type(file_path))

# @app.route('/')
# def hello_pybo():

#     return 'Hello, Pybo!!'


# @app.route('/upload', methods=["POST"])
# def uploadFile():

#     file = request.files['upload_files']
#     # 한글 이름의 파일 입력시 validation이 안되는 문제가 존재
#     file.filename = secure_filename(file.filename)

#     # backend 서버에 파일 저장
#     file.save(os.path.join(
#         app.config['UPLOAD_FOLDER'], file.filename))

#     # s3 bucket에 이미지 파일 저장
#     file_path = app.config['UPLOAD_FOLDER'] + "/" + file.filename
#     s3.upload_file(
#         file_path, rootFolder, file.filename)

#     return "image uploaded"


if __name__ == '__main__':
    print('asdfasf')
    app.run(host='0.0.0.0', port=5000)

# # 1 이미지 받아서 데이터베이스에 저장

# # 1-1 국화 -> 정보를 데이터베이스에서 조회 유저 반환
