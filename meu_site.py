from flask import Flask, request, jsonify
from sqlalchemy import create_engine, Column, Integer, String, Sequence
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker
import requests
import json

app = Flask(__name__)

engine = create_engine('sqlite:///sport.db')

Base = declarative_base()

class Usuario(Base):
    __tablename__ = 'TB_USUARIO'

    id = Column(Integer, Sequence('user_id_seq'), primary_key=True)
    email = Column(String(60))
    senha = Column(String(60))

Base.metadata.create_all(engine)

Session = sessionmaker(bind=engine)
session = Session()

@app.route("/login", methods=['POST','GET'])
def login():
    data = request.get_json()
    email = data['email']
    senha = data['senha']
    
    new_user = Usuario(email=email, senha=senha)
    session.add(new_user)
    session.commit()

    return jsonify({"message": "Usuário criado com sucesso!"}), 201

@app.route("/login/cadastro", methods=['POST', 'GET'])
def contatos():
    return "A API de cadastro também está no ar !"


if __name__ == "__main__":
    app.run(debug=True)

    

