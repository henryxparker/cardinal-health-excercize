"""
OpsHub

"""
from flask import Flask, request
from flask_restful import Api, Resource
from flask_accept import accept
from opshub import models

version = '0.0.1'

#endpoint used for uploading, fetching, and deleting files.
class FileEndpoint(Resource):
    def get(self):
        #TODO:: grab data, respond
        return [ { "filename" : "Fake.txt", "date": "now", "id":1 } ]
    
    @accept('multipart/form-data')
    def post(self):
        files = request.files['file']
        if len(files) < 1:
            return { "errors": "file upload failed" }
        else: #TODO:: show error if multiple files
            file = files[0]
            #TODO:: save the file in on the server, return any failures
            return { "result": file.name }

    
    def delete(self):
        #TODO:: grab data, delete file, handle errors, return response
        return "return ok or error"


def create_app(*args, **kwargs) -> Flask:
    app = Flask(__name__, *args, **kwargs)
    app.config.from_pyfile('config.py')
    api = Api(app)

    api.add_resource(FileEndpoint, '/files')

    return app
