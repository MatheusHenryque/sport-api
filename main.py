from flask import Flask, render_template, request, jsonify
import psycopg2 as pg

app = Flask(__name__)


conn = pg.connect(
    host="localhost",
    user="postgres",
    password="Ml304210?",
    port="5432",
    dbname="SportSphere.bd" 
)

@app.route("/", methods=['POST', 'GET'])
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

if __name__ == '__main__':
    app.run(debug=True)

