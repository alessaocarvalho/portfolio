document.addEventListener('DOMContentLoaded', function() {
    console.log('Script carregado!'); // Verifique se o script está sendo carregado

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
        console.log('Formulário enviado!'); // Verifique se o evento de envio está sendo capturado

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
            const feedback = document.getElementById('submit-btn-msg');
            if (feedback) {
                feedback.style.display = 'inline'; // Exibe a mensagem de sucesso

                setTimeout(function () {
                    feedback.style.display = 'none'; // Oculta novamente a mensagem
                    submitBtn.removeAttribute('disabled'); // Habilita o botão novamente
                }, 3000);
            } else {
                console.error('Elemento #submit-btn-msg não encontrado.');
            }
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Houve um erro ao enviar o email. Por favor, tente novamente.');
            submitBtn.removeAttribute('disabled'); // Garante que o botão seja reabilitado em caso de erro
        });
    });
});