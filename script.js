document.addEventListener('DOMContentLoaded', function() {
    // Script para animação de scroll suave
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();

            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth'
                });
            }
        });
    });

    // Script para envio do formulário de contato
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        // Enviar o formulário para o Formspree
        fetch(this.action, {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: new FormData(this)
        })
            .then(response => {
                if (!response.ok) {
                    throw new Error('Houve um problema ao enviar o formulário.');
                }
                document.getElementById('form-feedback').classList.remove('hidden');
                // Limpa os campos do formulário após o envio
                document.getElementById('name').value = '';
                document.getElementById('email').value = '';
                document.getElementById('message').value = '';

                // Oculta a mensagem de feedback após 3 segundos
                setTimeout(function () {
                    document.getElementById('form-feedback').classList.add('hidden');
                }, 3000);
            })
            .catch(error => {
                console.error('Erro:', error);
                alert('Houve um erro ao enviar o email. Por favor, tente novamente.');
            });
    });
});
