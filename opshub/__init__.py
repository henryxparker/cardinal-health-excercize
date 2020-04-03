"""
OpsHub

"""
from flask import Flask, request
from flask_restful import Api, Resource
from flask_accept import accept

version = '0.0.1'

#endpoint used for uploading, fetching, and deleting files.
class FileEndpoint(Resource):
    def get(self):
        #TODO:: differentiate endpoint based on passed args, grab data, respond
        return { "message ": "get all files" }
    
    @accept('multipart/form-data')
    def post(self):
        f = request.files['file']
        #TODO:: save file to db, handle errors, return id
        return { "message": "hello" }
    
    def delete(self):
        #TODO:: grab data, delete file, handle errors, return response
        return "return ok or error"


def create_app(*args, **kwargs) -> Flask:
    app = Flask(__name__, *args, **kwargs)
    app.config.from_pyfile('config.py')
    api = Api(app)

    api.add_resource(FileEndpoint, '/files')

    return app
