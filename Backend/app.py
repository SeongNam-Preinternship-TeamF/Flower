from io import BytesIO
import requests
from PIL import Image
import numpy as np
from bson.objectid import ObjectId
from bson import json_util
from keras.models import load_model
from tensorflow import keras
import tensorflow as tf
from flask import Flask, request, jsonify
from werkzeug.utils import secure_filename
import pymongo
import os
import json

os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'

# # model

app = Flask(__name__)

app.config['FLASKS3_BUCKET_NAME'] = 'team-flower'
app.config['UPLOAD_FOLDER'] = "/backend/Images"
app.config['directory'] = "root_directory"
bucket_name = app.config['FLASKS3_BUCKET_NAME']
rootFolder = app.config['directory']
myclient = pymongo.MongoClient(
    os.environ['mondb_URI']
)
mydb = myclient.flowerdb
myurl = mydb.photo_url

# model load
model = tf.keras.models.load_model('model/model.hdf5')


@app.route('api/v1/predict', methods=['GET'])
def model_predict():
    if request.method == 'POST':

        # 분석 전 db에서 사진 URL 가져오기
        db_data = myurl.find_one(
            ObjectId(request.args.get('id'))
        )
        mongo_data = json.loads(
            json_util.dumps(db_data)
        )
        url = mongo_data["URL"]
        # url = "https://team-flower.s3.ap-northeast-2.amazonaws.com/root_directory/aaron-burden-2IzoIHBgYAo-unsplash.jpg"
        response = requests.get(url)
        img = Image.open(BytesIO(response.content))

        img = img.resize((150, 150))
        x = tf.keras.utils.img_to_array(img)
        x = np.true_divide(x, 255)
        x = np.expand_dims(x, axis=0)

        label_dict = ['Daisy', 'Sunflower', 'Tulip', 'Dandelion', 'Rose']

        # predict
        preds = model.predict(x)
        predicted_index = np.argmax(preds)

    return jsonify(
        Predicted_label=label_dict[predicted_index],
        Predicted_score="{:.3f}".format(np.amax(preds))
    )


if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
