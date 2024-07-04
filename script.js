document.addEventListener('DOMContentLoaded', function () {

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

    document.getElementById('contact-form').addEventListener('submit', function (e) {
        e.preventDefault();

        const formData = new FormData(this);
        const submitBtn = document.getElementById('submit-btn');

        submitBtn.textContent = 'Enviando...';
        submitBtn.disabled = true;

        fetch('https://formspree.io/f/xqazzroz', {
            method: 'POST',
            headers: {
                'Accept': 'application/json'
            },
            body: formData
        })
            .then(response => {
                if (response.ok) {
                    return response.json();
                } else {
                    throw new Error('Erro ao enviar mensagem');
                }
            })
            .then(data => {
                Swal.fire({
                    icon: 'success',
                    title: 'Mensagem enviada!',
                    text: 'Obrigado por entrar em contato.',
                    confirmButtonText: 'Fechar'
                });
                submitBtn.textContent = 'Enviado!';
                setTimeout(() => {
                    submitBtn.textContent = 'Enviar';
                    submitBtn.disabled = false;
                }, 3000);
                this.reset();
            })
            .catch(error => {
                Swal.fire({
                    icon: 'error',
                    title: 'Erro',
                    text: 'Houve um problema ao enviar a mensagem. Tente novamente.',
                    confirmButtonText: 'Fechar'
                });
                submitBtn.textContent = 'Enviar';
                submitBtn.disabled = false;
            });
    });

    const backToTopButton = document.getElementById('back-to-top');
    const heroSectionHeight = document.querySelector('.hero').offsetHeight;

    if (window.scrollY > heroSectionHeight) {
        backToTopButton.style.display = 'flex';
    } else {
        backToTopButton.style.display = 'none';
    }

    window.addEventListener('scroll', () => {
        if (window.scrollY > heroSectionHeight) {
            backToTopButton.style.display = 'flex';
        } else {
            backToTopButton.style.display = 'none';
        }
    });

    backToTopButton.addEventListener('click', () => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
});