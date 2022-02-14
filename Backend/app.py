from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pymongo
import boto3
import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# # model
import tensorflow as tf
from tensorflow import keras
from keras.models import load_model
import numpy as np
from PIL import Image
import requests
from io import BytesIO


app = Flask(__name__)

app.config['FLASKS3_BUCKET_NAME'] = 'team-flower'
app.config['UPLOAD_FOLDER'] = "/backend/Images"
app.config['directory'] = "root_directory"
bucket_name = app.config['FLASKS3_BUCKET_NAME']
rootFolder = app.config['directory']

# model load
model = tf.keras.models.load_model('model/model.hdf5')

@app.route('/predict',methods = ['GET','POST'])
def model_predict():  
    if request.method == 'POST':
        # Get the image 
        #file_path ="/backend/Images/"
        #file = request.files['upload_files']
        #img = Image.open(file)
        
        url = "https://team-flower.s3.ap-northeast-2.amazonaws.com/root_directory/aaron-burden-2IzoIHBgYAo-unsplash.jpg"
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))
        
        img = img.resize((150,150))
        x = tf.keras.utils.img_to_array(img)
        x = np.true_divide(x,255)
        x = np.expand_dims(x, axis=0)
        
        label_dict = ['Daisy','Sunflower','Tulip', 'Dandelion','Rose']  
        
        # predict
        preds = model.predict(x)
        predicted_index = np.argmax(preds)

    return jsonify(
            Predicted_label = label_dict[predicted_index],
            Predicted_score = "{:.3f}".format(np.amax(preds))
        )



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

    return 'Hello, Pybo!!'


@app.route('/upload', methods=["POST"])
def uploadFile():

    file = request.files['upload_files']
    # 한글 이름의 파일 입력시 validation이 안되는 문제가 존재
    file.filename = secure_filename(file.filename)

    # backend 서버에 파일 저장
    file.save(os.path.join(
        app.config['UPLOAD_FOLDER'], file.filename))

    # s3 bucket에 이미지 파일 저장
    file_path = app.config['UPLOAD_FOLDER'] + "/" + file.filename
    s3.upload_file(
        file_path, rootFolder, file.filename)

    return "image uploaded"


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)

# 1 이미지 받아서 데이터베이스에 저장

# 1-1 국화 -> 정보를 데이터베이스에서 조회 유저 반환
