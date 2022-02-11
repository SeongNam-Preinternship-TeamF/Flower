from elasticsearch import Elasticsearch
import json

es = Elasticsearch('http://localhost:9200')

# 인덱스 생성


es.indices.create(
    index='dictionary',
    body={
        "settings": {
            "index": {
                "analysis": {
                    "analyzer": {
                        "my_analyzer": {
                            "type": "custom",
                            "tokenizer": "nori_tokenizer"
                        }
                    }
                }
            }
        },
        "mappings": {
            "dictionary_datas": {
                "properties": {
                    "name": {
                        "type": "text",
                        "analyzer": "my_analyzer"
                    },
                    "flower_meaning": {
                        "type": "text",
                        "analyzer": "my_analyzer"
                    },
                    "water": {
                        "type": "text"
                    },
                    "caution": {
                        "type": "text"
                    },

                }
            }
        }
    }
)

with open("dictionary_data.json", encoding='utf-8') as json_file:
    json_data = json.loads(json_file.read())

body = ""
for i in json_data:
    body = body + json.dumps({"index": {"_index": "dictionary", "_type": "dictionary_datas"}}) + '\n'
    body = body + json.dumps(i, ensure_ascii=False) + '\n'

es.bulk(body)
