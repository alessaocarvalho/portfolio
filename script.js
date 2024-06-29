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

        const submitBtn = document.getElementById('submit-btn');
        submitBtn.setAttribute('disabled', 'true'); // Desabilita o botão durante o envio

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

            // Substitui o botão pelo feedback de sucesso
            submitBtn.style.display = 'none'; // Oculta o botão de envio
            document.getElementById('submit-btn-msg').style.display = 'inline'; // Mostra a mensagem de sucesso

            setTimeout(function () {
                feedback.classList.remove('visible');
                submitBtn.style.display = 'inline'; // Restaura o botão após alguns segundos
                document.getElementById('submit-btn-msg').style.display = 'none'; // Oculta novamente a mensagem
                submitBtn.removeAttribute('disabled'); // Habilita o botão novamente
            }, 3000);
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Houve um erro ao enviar o email. Por favor, tente novamente.');
            submitBtn.removeAttribute('disabled'); // Garante que o botão seja reabilitado em caso de erro
        });
    });
});