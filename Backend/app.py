from flask import Flask, request, jsonify, Blueprint
from werkzeug.utils import secure_filename
import pymongo
from bson.objectid import ObjectId
import boto3
import os
import time
import json
from elasticsearch import Elasticsearch, helpers
from flask_cors import CORS, cross_origin
from bson.json_util import dumps, loads
from bson import json_util
import redis
from random import random
from flask_restx import Resource, Api, Namespace, fields


app = Flask(__name__)
CORS(app)


es = Elasticsearch(
    hosts=['http://elasticsearch:9200'],
    http_auth=('elastic', 'changeme')
)

cache = redis.Redis(host='redis', port=6379)

mongo_info = os.environ['mondb_URI']

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

myclient = pymongo.MongoClient(
    mongo_info
)
mydb = myclient.flowerdb
myinform = mydb.inform
myurl = mydb.photo_url

doc = myinform.find()

# corsur to json
json_data = dumps(list(doc))

# swagger 설정 ------------
api = Api(
    app,
    version='1.0',
    title="JustKode's API Server",
    description="JustKode's Todo API Server!",
    terms_url="/",
    contact="justkode@kakao.com",
    license="MIT"
)

find = Namespace('Search',description='식물 키우기를 도와주는 웹사이트')
api.add_namespace(find,'/api')

    #post 메소드에 들어가는 내용
img_uploaded = find.model('Todo', {  # Model 객체 생성
    'data': fields.String(description='사진을 업로드 받음', required=True, example="what to do")
})

img_uridb_id = find.inherit('Todo With ID',{  # todo_fields 상속 받음
    'todo_id': fields.String(description='업로드 받은 이미지를 s3에 저장, 그 s3의 uri를 저장한 db의 id')
}) 

# -----------------------

def get_hit_count():
    time.sleep(random() * 0.5)
    retries = 5
    while True:
        try:
            return cache.incr('hits')
        except redis.exceptions.ConnectionError as exc:
            if retries == 0:
                raise exc
            retries -= 1
            time.sleep(0.5)


@find.route('/', methods=['GET'])
@find.doc(params={'count': '일치하는 갯수'})  #객체를 받으며, 키로는 파라미터 변수명, 값으로는 설명을 적을 수 있습니다.
class Hello(Resource):
    @find.doc(responses={202: 'Success'})   # 객체를 받으며, 키로는 Status Code, 값으로는 설멍을 적을 수 있습니다.
    @find.doc(responses={500: 'Failed'})    # 에러 코드는 delete의 값  get에 맞는 걸로 바꿔야함
    # @common_counter
    def get(self):
        """"이 api는 어떤건지 잘 모르겠습니다"""
        count = get_hit_count()
        return 'Flask in a Docker!!! Hello World! I have been seen {} times.\n'.format(count)


@app.route('/api/v1/initialize')
def hello_pybo():

    with open('mapping.json', 'r') as f:
        mapping = json.load(f)

    index = "flower_idx"

    es.indices.create(index=index, body=mapping)

    with open("local_dict.json", encoding='utf-8') as json_file:
        json_data = json.loads(json_file.read())

    helpers.bulk(es, json_data, index=index)

    return 'Hello, Pybo!'


@find.route('/v1/search', methods=["GET"])
@find.doc(params={'q': '검색어'}) 
class searchAPI(Resource):
    @find.doc(responses={202: 'Success'})
    @find.doc(responses={500: 'Failed'})
    def searchAPI():
        """"검색어를 받아와 elasticsearch를 통해 일치하는 내용이 있는 모든 documents 를 반환해주는 api"""
        order = request.args.get('q')
        # docs = es.search(
        #     index='flower_idx',
        #     body={
        #         "query": {
        #             "multi_match": {
        #                 "query": order,
        #                 "fields": ["name", "flowerMeaning", "water", "sunlight", "caution"]
        #             }
        #         }
        #     }
        # )
        return_dict = {}
        obj = []
        # data_list = docs['hits']
        # for hit in data_list['hits']:
        #     obj.append(
        #         {
        #             "id": hit["_source"]["id"]
        #         }
        #     )

        obj = [
            {
                "name": "6204e11b4ca120dbd68abd08",
                "imgURL": "https://team-flower.s3.ap-northeast-2.amazonaws.com/root_directory/aaron-burden-wes5JqFptkQ-unsplash.jpg",
            },
            {
                "name": "6204e11b4ca120dbd68abd08",
                "imgURL": "https://team-flower.s3.ap-northeast-2.amazonaws.com/root_directory/annie-spratt-4wz1YsANFB0-unsplash.jpg",
            },
            {
                "name": "6204e11b4ca120dbd68abd08",
                "imgURL": "https://team-flower.s3.ap-northeast-2.amazonaws.com/root_directory/edward-howell-dZ3YRMco4XU-unsplash.jpg",
            }
        ]

        return_dict = {
            "result_list": obj
        }

        return return_dict


# on development


@find.route('/v1/analyze', methods=["GET"])
@find.doc(params={'id': 'img가 저장된 uri'}) 
class analyze(Resource):
    @find.doc(responses={202: 'Success'})
    @find.doc(responses={500: 'Failed'})
    def get(self):
        """"img의 uri가 저장된 db의 id값을 ai서버에 보내 결과의 정보가 저장된 db의 id를 받아오는 api"""
        db_data = myurl.find_one(
            ObjectId(request.args.get('id'))
        )
        # ObjectId to json
        result = json.loads(
            json_util.dumps(db_data)
        )
        req = result["URL"]
        #############################################
        # request to AI server + 서버 분리
        #############################################
        analysis = myinform.find_one({"name": "장미"})

        result = json.loads(
            json_util.dumps(analysis)
        )
        result.update(
            {
                "id": result["_id"]["$oid"]
            }
        )
        del(result['_id'])

        return result


@find.route('/v1/upload', methods=["POST"])
@find.doc(params={'upload_files': '사진 파일'})
class uploadFile(Resource):
    @find.expect(img_uploaded)
    @find.response(201, 'Success', img_uridb_id)
    def post(self):
        """"frontend로 부터 업로드된 사진파일을 받아와 파일이 저장된 uri가 포함된 db의 id를 반환해주는 api"""

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

        file_dir = os.getenv('endpoint_url') + "/" + \
            app.config['directory'] + "/" + file.filename

        file_db = {
            "URL": file_dir
        }

        result = myurl.insert_one(file_db)

        return {"id": str(result.inserted_id)}


@find.route('/v1/search/details', methods=["GET"])
@find.doc(params={'upload_files': '사진 파일'})
class respone_data(Resource):
    @find.doc(responses={202: 'Success'})
    @find.doc(responses={500: 'Failed'})
    def get(self):
        """"db의 id를 받아와 해당 id를 가진 document가 가진 정보를 반환해주는 api"""
        json_information = json.loads(
            json_util.dumps(
                myinform.find_one(
                    ObjectId(
                        request.args.get('id')
                    )
                )
            )
        )
        json_information.update(
            {
                "id": json_information["_id"]["$oid"]
            }
        )
        del(json_information['_id'])

        return json_information


if __name__ == '__main__':

    app.run(host='0.0.0.0', port=5000)

# 1 이미지 받아서 데이터베이스에 저장

# 1-1 국화 -> 정보를 데이터베이스에서 조회 유저 반환
