from flask import Flask, request, jsonify
from pymongo import MongoClient
from bson.json_util import dumps
from bson.objectid import ObjectId

app = Flask(__name__)
client = MongoClient('mongodb://localhost:27017/')
db = client['KoogleDB']
collection = db['Users']

class UsersController:
    @app.route('/api/users/add', methods=['POST'])
    def add_user():
        user_data = request.json
        
        if not user_data or not user_data.get('Email') or not user_data.get('Password') or not user_data.get('Name'):
            return jsonify({"message": "Invalid user data"}), 400
        
        new_user = {
            "name": user_data['Name'],
            "email": user_data['Email'],
            "password": user_data['Password']
        }

        result = collection.insert_one(new_user)
        return jsonify({"message": "User added successfully"}), 200

    @app.route('/api/users/check', methods=['POST'])
    def check_user():
        user_data = request.json
        
        if not user_data or not user_data.get('Email') or not user_data.get('Password'):
            return jsonify({"message": "Invalid user data"}), 400
        
        filter_query = {
            "email": user_data['Email'],
            "password": user_data['Password']
        }

        existing_user = collection.find_one(filter_query)

        if existing_user:
            result = {
                "Id": str(existing_user['_id']),
                "Name": existing_user['name'],
                "Email": existing_user['email']
            }
            return jsonify(result), 200
        
        return jsonify({"message": "User not found"}), 404

# Run the Flask app
if __name__ == '__main__':
    app.run(debug=True)
