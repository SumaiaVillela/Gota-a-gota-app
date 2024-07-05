document.addEventListener('DOMContentLoaded', function () {
    const imageForm = document.getElementById('image-form');
    const textForm = document.getElementById('text-form');
    const substanceForm = document.getElementById('substance-form');
    const resultContainer = document.getElementById('result-container');
    const loadingMessage = document.getElementById('loading-message');
    const headerP = document.querySelector('header p');
    const logoContainer = document.querySelector('.logo-container');
    const formsContainer = document.querySelector('.forms-container');

    function showLoading() {
        // Mover logo e formulários para a esquerda
        headerP.style.display = 'none';
        formsContainer.style.display = 'none';

        // Mostrar contêiner de resultado
        resultContainer.style.display = 'block';
        loadingMessage.style.display = 'block';
    }

    function hideLoading() {
        loadingMessage.style.display = 'none';
    }

    function displayResult(data) {
        hideLoading();
        resultContainer.innerHTML = data;

        // Adicionar botão "Começar de Novo"
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Começar de Novo';
        restartButton.classList.add('restart-button');
        resultContainer.appendChild(restartButton);

        // Event listener para o botão "Começar de Novo"
        restartButton.addEventListener('click', function() {
            resultContainer.style.display = 'none'; // Esconde o resultado
            formsContainer.style.display = 'block'; // Mostra os formulários novamente
            headerP.style.display = 'block'; // Mostra o texto do header novamente
        });
    }

    function handleFormSubmit(form, url) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            showLoading();
            const formData = new FormData(form);
            fetch(url, {
                method: 'POST',
                body: formData
            })
            .then(response => response.text()) // Recebe o HTML como texto
            .then(data => displayResult(data)) // Exibe o HTML recebido
            .catch(error => console.error('Erro:', error));
        });
    }

    handleFormSubmit(imageForm, '/');
    handleFormSubmit(textForm, '/');
    handleFormSubmit(substanceForm, '/');
});
