document.addEventListener('DOMContentLoaded', function () {
    const LoginRender = () => {
        const logoSrc = '/static/images/SPORT.png';
        let senha = '';
        let usuario = '';

        const getSenha = (event) => {
            senha = event.target.value;
        }

        const getUsuario = (event) => {
            usuario = event.target.value;
        }

        const redirectToHome = () => {
            // Redirecionar para a página /home
            window.location.href = '/home';
        }

        const ValidaUsuario = (event) => {
            event.preventDefault();

            fetch('/login', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    email: usuario,
                    senha: senha
                }),
            })
            .then(response => {
                if (!response.ok) {
                    throw new Error(`Erro na solicitação: ${response.status}`);
                }
                return response.json();
            })
            .then(data => {
                if (data.message === 'Login bem-sucedido') {
                    console.log(data);
                    redirectToHome();
                } else {
                    console.log('Login falhou');
                    window.alert('Login de usuário ou Senha incorreta')
                }
            })
            .catch(error => {
                // Código para lidar com erros
                console.error(error);
            });
        }

        return {
            logoSrc: logoSrc,
            getUsuario: getUsuario,
            getSenha: getSenha,
            ValidaUsuario: ValidaUsuario,
        };
    }

    const loginModule = LoginRender();

    document.getElementById('inpUsuario').addEventListener('input', loginModule.getUsuario);
    document.getElementById('inpSenha').addEventListener('input', loginModule.getSenha);
    document.querySelector('form').addEventListener('submit', loginModule.ValidaUsuario);

    document.querySelector('.containerLogin img').src = loginModule.logoSrc;
});
