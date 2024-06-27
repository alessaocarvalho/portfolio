// Script para animação de scroll suave
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();

        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Script para validação e envio do formulário de contato
document.getElementById('contact-form').addEventListener('submit', function(e) {
    e.preventDefault();

    // Simulação de envio bem-sucedido (substitua com lógica real de envio)
    fetch(this.action, {
        method: 'POST',
        body: new FormData(this)
    })
    .then(response => response.json())
    .then(data => {
        if (data.success) {
            document.getElementById('form-feedback').classList.remove('hidden');
            // Limpa os campos do formulário após o envio
            document.getElementById('contact-form').reset();

            // Oculta a mensagem de feedback após 3 segundos
            setTimeout(function() {
                document.getElementById('form-feedback').classList.add('hidden');
            }, 3000);
        } else {
            alert('Houve um erro ao enviar o email. Por favor, tente novamente.');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        alert('Houve um erro ao enviar o email. Por favor, tente novamente.');
    });
});