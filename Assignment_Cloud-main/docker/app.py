from flask import Flask , request , make_response, jsonify,render_template
from flask_sqlalchemy import SQLAlchemy
from os import environ
from flask_cors import CORS


app = Flask(__name__)
CORS(app)
app.config['SQLALCHEMY_DATABASE_URI'] = environ.get('DB_URL')


db = SQLAlchemy(app)

class User(db.Model):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(80), unique= True, nullable=False)
    age = db.Column(db.Integer,  nullable=False)
    gender = db.Column(db.String(80),  nullable=False)
    email = db.Column(db.String(120), unique= True, nullable=False)

    def json(self):
        return {'id':self.id,'username': self.username,'age':self.age,'gender':self.gender,'email':self.email}

db.create_all()

@app.route('/test', methods=['GET'])
def test():
    return make_response(jsonify({'massage':'test route'}),200)


@app.route('/users', methods=['POST'])
def create_user():
    try:
        data = request.get_json()
        new_user = User(username=data['username'],age=data['age'],gender=data['gender'],email=data['email'])
        db.session.add(new_user)
        db.session.commit()
        return make_response(jsonify(new_user.json()),201)
    except Exception as e:
        return make_response(jsonify({'massage':'errror creating user'}),500)
    
@app.route('/users', methods=['GET'])
def get_users():
    try:
        users = User.query.all()
        return make_response(jsonify({'users':[user.json() for user in users]}),200)
    
    except Exception as e:
        return make_response(jsonify({'massage':'errror getting user'}),500)
    
@app.route('/users/<int:id>',methods=['GET'])
def get_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            return make_response(jsonify({'user': user.json()}),200)
        return make_response(jsonify({'massage':'user not found'}),404)
        
    except Exception as e:
        return make_response(jsonify({'massage':'errror getting user'}),500)
    
@app.route('/users/<int:id>',methods=['PUT'])
def update_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            data = request.get_json()
            user.username = data['username']
            user.age = data['age']
            user.gender = data['gender']
            user.email = data['email']
            db.session.commit()
            return make_response(jsonify(user.json()),200)
        return make_response(jsonify({'massage':'user not found'}),404)
    except Exception as e:
        return make_response(jsonify({'massage':'errror updating  user'}),500)

@app.route('/users/<int:id>',methods=['DELETE'])
def delete_user(id):
    try:
        user = User.query.filter_by(id=id).first()
        if user:
            db.session.delete(user)
            db.session.commit()
            return make_response(jsonify({'massage':'user deleted'}),200)
        return make_response(jsonify({'massage':'user not found'}),404)
    except Exception as e:
        return make_response(jsonify({'massage':'errror deleting  user'}),500)
    

        
            
