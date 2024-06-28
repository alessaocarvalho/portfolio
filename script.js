document.addEventListener('DOMContentLoaded', function() {
    // Smooth scroll script
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

    // Contact form submission handling
    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        fetch('https://formspree.io/f/xqazzroz', {
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
            const feedback = document.getElementById('form-feedback');
            feedback.textContent = 'Mensagem enviada com sucesso!';
            feedback.classList.add('visible');

            document.getElementById('name').value = '';
            document.getElementById('email').value = '';
            document.getElementById('message').value = '';

            setTimeout(function () {
                feedback.classList.remove('visible');
            }, 3000);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Houve um erro ao enviar o email. Por favor, tente novamente.');
        });
    });
});