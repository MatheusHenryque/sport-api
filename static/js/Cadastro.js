document.addEventListener('DOMContentLoaded', function () {
    const CadastroRender = () => {
        const getNome = (event) => {
            nome = event.target.value;
        }

        const getEmail = (event) => {
            email = event.target.value;
        }

        const getTelefone = (event) => {
            telefone = event.target.value;
        }

        const getSenha = (event) => {
            senha = event.target.value;
        }

        const cadastrarUsuario = async (event) => {
            event.preventDefault();
            console.log('Cadastrando usuário:', nome, email, telefone, senha);    
            try {
                const response = await fetch('/cadastro', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        nome,
                        email,
                        telefone,
                        senha,
                    }),
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                console.log(data);
            } catch (error) {
                console.error('Error during fetch:', error);
            }
        };

        return {
            getNome: getNome,
            getEmail: getEmail,
            getTelefone: getTelefone,
            getSenha: getSenha,
            cadastrarUsuario: cadastrarUsuario,
        };
    }

    const cadastroModule = CadastroRender();

    
    document.getElementById('inpUsuario').addEventListener('input', cadastroModule.getNome);
    document.getElementById('inpEmail').addEventListener('input', cadastroModule.getEmail);
    document.getElementById('inpTelefone').addEventListener('input', cadastroModule.getTelefone);
    document.getElementById('inpSenha').addEventListener('input', cadastroModule.getSenha);
    document.querySelector('.formInputs form').addEventListener('submit', cadastroModule.cadastrarUsuario);
});
