
document.addEventListener('DOMContentLoaded', function () {
    const LoginRender = () => {
        const logoSrc = '../../img/SPORT.png';

        const getSenha = (event) => {
            senha = event.target.value;
        }

        const getUsuario = (event) => {
            usuario = event.target.value;
        }

        const ValidaUsuario = (event) => {
            event.preventDefault(); 

            const xhr = new XMLHttpRequest();
            const url = '/login';

            xhr.open('POST', url, true);
            xhr.setRequestHeader('Content-Type', 'application/json');

            xhr.onreadystatechange = function () {
                if (xhr.readyState === 4 && xhr.status === 200) {
                    const data = JSON.parse(xhr.responseText);
                    console.log(data);
                }
            };

            const requestBody = JSON.stringify({
                email: usuario,
                senha: senha
            });

            xhr.send(requestBody);
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
