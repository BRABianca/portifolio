// Seleciona o botão de toggle e o menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Alterna a exibição do menu ao clicar no botão
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Função para lidar com o formulário de contato
const contactForm = document.querySelector("#contact-form");

if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
        event.preventDefault(); // Evita o envio padrão do formulário

        // Captura os dados do formulário
        const name = document.querySelector("#name").value;
        const email = document.querySelector("#email").value;
        const message = document.querySelector("#message").value;

        // Cria o objeto mensagem
        const newMessage = { name, email, message, date: new Date().toLocaleString() };

        // Recupera mensagens do Local Storage ou inicializa o array
        const storedMessages = getMessagesFromLocalStorage();

        // Adiciona a nova mensagem ao array
        storedMessages.push(newMessage);

        // Atualiza o Local Storage com o novo array de mensagens
        saveMessagesToLocalStorage(storedMessages);

        // Limpa o formulário após o envio
        contactForm.reset();

        alert("Mensagem enviada com sucesso!");
    });
}

// Recupera as mensagens armazenadas no Local Storage
function getMessagesFromLocalStorage() {
    return JSON.parse(localStorage.getItem("messages")) || [];
}

// Salva as mensagens no Local Storage
function saveMessagesToLocalStorage(messages) {
    localStorage.setItem("messages", JSON.stringify(messages));
}

// Exibe as mensagens no HTML
const messagesContainer = document.getElementById("messages-container");

const storedMessages = getMessagesFromLocalStorage();

if (storedMessages.length > 0) {
    storedMessages.forEach((message, index) => {
        const messageDiv = document.createElement("div");
        messageDiv.classList.add("message");
        messageDiv.innerHTML = `
            <p><strong>Nome:</strong> ${message.name}</p>
            <p><strong>E-mail:</strong> ${message.email}</p>
            <p><strong>Mensagem:</strong> ${message.message}</p>
            <p><small><strong>Data:</strong> ${message.date}</small></p>
            <button class="delete-btn" data-index="${index}">Excluir</button>
            <hr>
        `;
        messagesContainer.appendChild(messageDiv);
    });

    // Adiciona os eventos de exclusão
    const deleteButtons = document.querySelectorAll('.delete-btn');
    deleteButtons.forEach(button => {
        button.addEventListener('click', function() {
            const index = button.getAttribute('data-index');
            deleteMessage(index);
        });
    });
} else {
    messagesContainer.innerHTML = "<p>Não há mensagens ainda.</p>";
}

// Função para excluir a mensagem
function deleteMessage(index) {
    // Recupera as mensagens novamente (importante após qualquer atualização)
    const storedMessages = getMessagesFromLocalStorage();

    // Remove a mensagem do array
    const updatedMessages = storedMessages.filter((message, i) => i != index);

    // Atualiza o Local Storage
    saveMessagesToLocalStorage(updatedMessages);

    // Atualiza a exibição das mensagens
    window.location.reload();
}

// Função para apagar todas as mensagens
function deleteAllMessages() {
    // Limpa o Local Storage
    localStorage.removeItem("messages");

    // Atualiza a exibição das mensagens
    window.location.reload();
}

// Cria o botão para apagar todas as mensagens
const deleteAllBtn = document.createElement("button");
deleteAllBtn.textContent = "Apagar Todas as Mensagens";
deleteAllBtn.classList.add("delete-all-btn");
document.body.insertBefore(deleteAllBtn, messagesContainer);

// Adiciona o evento de clique no botão "Apagar Todas as Mensagens"
deleteAllBtn.addEventListener('click', deleteAllMessages);
