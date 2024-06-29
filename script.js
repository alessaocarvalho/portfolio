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
            // Utiliza SweetAlert2 para mostrar mensagem de sucesso
            Swal.fire({
                icon: 'success',
                title: 'Mensagem enviada com sucesso!',
                showConfirmButton: false,
                timer: 3000
            });

            submitBtn.removeAttribute('disabled'); // Habilita o botão novamente
            this.reset(); // Limpa o formulário após o envio
        })
        .catch(error => {
            console.error('Erro:', error);
            alert('Houve um erro ao enviar o email. Por favor, tente novamente.');
            submitBtn.removeAttribute('disabled'); // Garante que o botão seja reabilitado em caso de erro
        });
    });
});
