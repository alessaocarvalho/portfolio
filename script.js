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

    document.addEventListener('DOMContentLoaded', function () {
        document.getElementById('contact-form').addEventListener('submit', function (e) {
            e.preventDefault();
    
            const submitBtn = document.getElementById('submit-btn');
            submitBtn.textContent = 'Enviando...';
            submitBtn.disabled = true;
    
            fetch('https://formspree.io/f/xqazzroz', {
                method: 'POST',
                headers: {
                    'Accept': 'application/json'
                },
                body: new FormData(this)
            }).then(response => {
                if (response.ok) {
                    document.getElementById('form-feedback').classList.add('visible');
                    submitBtn.textContent = 'Enviado!';
                    setTimeout(() => {
                        submitBtn.textContent = 'Enviar';
                        submitBtn.disabled = false;
                        document.getElementById('form-feedback').classList.remove('visible');
                    }, 3000);
                    this.reset();
                } else {
                    Swal.fire({
                        icon: 'error',
                        title: 'Erro',
                        text: 'Houve um problema ao enviar a mensagem. Tente novamente.',
                        confirmButtonText: 'Fechar'
                    });
                    submitBtn.textContent = 'Enviar';
                    submitBtn.disabled = false;
                }
            }).catch(error => {
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
    });    
});
