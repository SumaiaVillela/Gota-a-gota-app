// Seleciona os elementos do formulário e do resultado
document.addEventListener('DOMContentLoaded', function () {
    const imageForm = document.getElementById('image-form');
    const textForm = document.getElementById('text-form');
    const substanceForm = document.getElementById('substance-form');
    const resultContainer = document.getElementById('result-container');
    const loadingMessage = document.getElementById('loading-message');
    const headerP = document.querySelector('header p');
    const logoContainer = document.querySelector('.logo-container');
    const formsContainer = document.querySelector('.forms-container');
    const footer = document.querySelector('footer');

    // Função para exibir a mensagem de carregamento e esconder outros elementos
    function showLoading() {
        // Esconde o texto do cabeçalho e os formulários
        headerP.style.display = 'none';
        formsContainer.style.display = 'none';

        // Mostrar contêiner de resultado e a mensagem de carregamento
        resultContainer.style.display = 'block';
        loadingMessage.style.display = 'block';
    }

    // Função para esconder a mensagem de carregamento
    function hideLoading() {
        loadingMessage.style.display = 'none';
    }

    // Função para exibir o resultado recebido do servidor por meio de HTML
    function displayResult(data) {
        hideLoading();
        resultContainer.innerHTML = data;

        // Adicionar botão "Começar de Novo" abaixo do resultado
        const restartButton = document.createElement('button');
        restartButton.textContent = 'Começar de Novo';
        restartButton.classList.add('restart-button');
        resultContainer.appendChild(restartButton);

        // Event listener para o botão "Começar de Novo"
        restartButton.addEventListener('click', function() {
            window.location.href = '/'; // Redireciona para a página inicial
        });

    }
    
    
    // Função para lidar com o envio de formulário
    function handleFormSubmit(form, url) {
        form.addEventListener('submit', function(event) {
            event.preventDefault();
            showLoading(); // Mostra a mensagem de carregamento
            const formData = new FormData(form);
            fetch(url, {
                method: 'POST',
                body: formData // Envia os dados do formulário via POST
            })
            .then(response => response.text()) // Recebe o HTML como texto
            .then(data => displayResult(data)) // Exibe o HTML recebido
            .catch(error => console.error('Erro:', error)); // Manipula erros de requisição
        });
    }

    // Manipula o envio de cada formulário especificado, de imagem, texto e o dropdown
    handleFormSubmit(imageForm, '/');
    handleFormSubmit(textForm, '/');
    handleFormSubmit(substanceForm, '/');
});
