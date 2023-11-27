export class FormPost {
    constructor(idForm, idTextarea, idUlPost) {
        this.form = document.getElementById(idForm);
        this.textarea = document.getElementById(idTextarea);
        this.ulPost = document.getElementById(idUlPost);
        console.log(this.form, this.textarea, this.ulPost);
        this.addSubmit();
        this.loadPosts(); 
    }

    onSubmit(func) {
        this.form.addEventListener('submit', func);
    }

    formValidate(value) {
        if (value == '' || value == null || value == undefined || value.length < 3) {
            return false;
        }
        return true;
    }

    getTime() {
        const time = new Date();
        const hour = time.getHours();
        const minutes = time.getMinutes();
        return `${hour}h ${minutes}min`;
    }

    addSubmit() {
        const handleSubmit = (event) => {
            event.preventDefault();
            if (this.formValidate(this.textarea.value)) {
                const time = this.getTime();
                const postContent = this.textarea.value;

                // Enviar dados para o servidor
                fetch('/submit_post', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ content: postContent, time: time }),
                })
                    .then(response => response.json())
                    .then(data => {
                        // Lidar com a resposta, se necessário
                        console.log(data);

                        // Atualizar a interface do usuário, se necessário
                        const newPost = document.createElement('li');
                        newPost.classList.add('post');
                        newPost.innerHTML = `
                            <div class="infoUserPost">
                                <div class="imgUserPost"></div>
                                <div class="nameAndHour">
                                    <strong>Matheus Henrique</strong>
                                    <p>${time}</p>
                                </div>
                            </div>
                            <p>
                                ${postContent}
                            </p>
                            <div class="actionBtnPost">
                                <button type="button" class="filesPost like">
                                    <img src="/static/images/heart.svg" alt="Curtir">Curtir
                                </button>
                                <button type="button" class="filesPost comment">
                                    <img src="/static/images/comment.svg" alt="Comentar">Comentar
                                </button>
                                <button type="button" class="filesPost share">
                                    <img src="/static/images/share.svg" alt="Compartilhar">Compartilhar
                                </button>
                            </div>
                        `;
                        this.ulPost.append(newPost);
                        this.textarea.value = '';
                    })
                    .catch(error => {
                        console.error('Erro:', error);
                        alert('Falha ao enviar o post. Por favor, tente novamente.');
                    });
            } else {
                alert('Verifique o que foi digitado');
            }
        };

        this.onSubmit(handleSubmit);
    }

    async loadPosts() {
        try {
            const response = await fetch('/get_posts');
            if (response.ok) {
                const posts = await response.json();
                this.renderPosts(posts);
            } else {
                throw new Error('Erro ao obter posts: ' + response.status);
            }
        } catch (error) {
            console.error('Erro ao obter posts:', error);
        }
    }

    renderPosts(posts) {
        posts.forEach(post => {
            const newPost = document.createElement('li');
            newPost.classList.add('post');
            newPost.innerHTML = `
                <div class="infoUserPost">
                    <div class="imgUserPost"></div>
                    <div class="nameAndHour">
                        <strong>Matheus Henrique</strong>
                        <p>${post.time}</p>
                    </div>
                </div>
                <p>${post.content}</p>
                <div class="actionBtnPost">
                    <button type="button" class="filesPost like">
                        <img src="/static/images/heart.svg" alt="Curtir">Curtir
                    </button>
                    <button type="button" class="filesPost comment">
                        <img src="/static/images/comment.svg" alt="Comentar">Comentar
                    </button>
                    <button type="button" class="filesPost share">
                        <img src="/static/images/share.svg" alt="Compartilhar">Compartilhar
                    </button>
                </div>
            `;
            this.ulPost.append(newPost);
        });
    }
}

const postForm = new FormPost('formPost', 'textarea', 'posts');
