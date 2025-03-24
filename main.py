from flask import Flask, render_template, request, jsonify
import psycopg2 as pg
from datetime import datetime

app = Flask(__name__)


conn = pg.connect(
    host="localhost",
    user="postgres",
    password="*******",
    port="5432",
    dbname="SportSphere.bd" 
)

@app.route('/')
def inicio():
    return render_template('landing.html')

@app.route("/login", methods=['POST', 'GET'])
def login():
    if request.method == 'POST':
        data = request.get_json()
        email = data.get('email')  
        senha = data.get('senha')

        cursor = conn.cursor()
        cursor.execute("SELECT * FROM TB_USUARIO WHERE email = %s AND senha = %s", (email, senha))
        user = cursor.fetchone()  

        if user:
            return jsonify({'message': 'Login bem-sucedido'})
        else:
            return jsonify({'error': 'Usuário não encontrado ou senha incorreta'}), 401  

    return render_template('Login.html')

@app.route('/cadastro', methods=['POST','GET'])
def cadastro():
    if request.method == 'POST':
        try:
            data = request.get_json()
            nome = data.get('nome')
            email = data.get('email')
            telefone = data.get('telefone')
            senha = data.get('senha')

            if nome and email and telefone and senha:
                cursor = conn.cursor()
                cursor.execute("INSERT INTO TB_USUARIO (nome, email, telefone, senha) VALUES (%s, %s, %s, %s)", (nome, email, telefone, senha))
                conn.commit()
                cursor.close()
            else:
                return jsonify({'error': 'Dados incompletos'}), 400

        except Exception as e:
            print('Erro durante o processamento:', str(e))
            return jsonify({'error': 'Erro durante o processamento'}), 500
        
    return render_template('Cadastro.html')

@app.route("/submit_post", methods=["POST"])
def submit_post():
    data = request.get_json()
    post_content = data.get('content')
    post_time = data.get('time')
    

    cursor = conn.cursor()
    cursor.execute('INSERT INTO TB_POSTS(content, time) VALUES (%s, %s)', (post_content, post_time))
    conn.commit()

    return jsonify({'status': 'success'})

@app.route("/get_posts", methods=["POST","GET"])
def get_post():
    try:
        cursor = conn.cursor()
        cursor.execute("SELECT content, time FROM TB_POSTS ORDER BY id DESC")
        posts = cursor.fetchall()
        cursor.close()

        post_list = []
        for post in posts:
            content = post[0]
            time_str = post[1]

            if isinstance(time_str, str):
                time_str = datetime.strptime(time_str, "%Hh %Mmin").strftime('%Hh %Mmin') if time_str else None
            
            post_list.append({'content': content, 'time': time_str})

        return jsonify(post_list)
    except Exception as e:
        print("Erro ao obter posts:", str(e))
        return jsonify([])
    


@app.route("/home", methods=["POST", "GET"])
def postagens():
    return render_template("postagens.html")

@app.route("/home/configPerfil", methods=["POST","GET"])
def configPerfil():
    return render_template("ConfiguracaoPerfil.html")

@app.route("/home/times", methods=["POST","GET"])
def times():
    return render_template("times.html")

if __name__ == '__main__':
    app.run(debug=True)

