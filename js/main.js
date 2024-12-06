// Seleciona o botão de toggle e o menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Alterna a exibição do menu ao clicar no botão
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

const modal = document.getElementById('modal');
const closeModal = document.querySelector('.close');
const modalText = document.getElementById('modal-text');

// Abre o modal com conteúdo específico
function openModal(content) {
  modalText.innerText = content;
  modal.style.display = 'flex';
}

// Fecha o modal ao clicar no "X" ou fora dele
closeModal.addEventListener('click', () => {
  modal.style.display = 'none';
});
window.addEventListener('click', (e) => {
  if (e.target === modal) {
    modal.style.display = 'none';
  }
});

// Abre modal com detalhes da tecnologia ao clicar no título
document.querySelectorAll('.technology h2').forEach(tech => {
  tech.addEventListener('click', () => {
    const content = tech.nextElementSibling.textContent;
    openModal(content);
  });
});

// Seleciona o formulário de contato
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
        const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

        // Adiciona a nova mensagem ao array
        storedMessages.push(newMessage);

        // Salva o array atualizado no Local Storage
        localStorage.setItem("messages", JSON.stringify(storedMessages));

        // Limpa os campos do formulário
        contactForm.reset();

        alert("Mensagem enviada com sucesso!");
    });
}


// Página de listagem de mensagens
const messagesContainer = document.querySelector("#messages-container");
const clearAllButton = document.querySelector("#clear-all");

if (messagesContainer) {
    // Recupera mensagens do Local Storage
    const storedMessages = JSON.parse(localStorage.getItem("messages")) || [];

    // Função para renderizar as mensagens
    function renderMessages() {
        messagesContainer.innerHTML = ""; // Limpa o container

        if (storedMessages.length === 0) {
            messagesContainer.innerHTML = "<p>Nenhuma mensagem recebida.</p>";
            return;
        }

        storedMessages.forEach((msg, index) => {
            const messageElement = document.createElement("div");
            messageElement.classList.add("message");
            messageElement.innerHTML = `
                <p><strong>Nome:</strong> ${msg.name}</p>
                <p><strong>Email:</strong> ${msg.email}</p>
                <p><strong>Mensagem:</strong> ${msg.message}</p>
                <p><em>${msg.date}</em></p>
                <button class="delete-message" data-index="${index}">Remover</button>
            `;
            messagesContainer.appendChild(messageElement);
        });

        // Adiciona evento para deletar mensagens individuais
        document.querySelectorAll(".delete-message").forEach(button => {
            button.addEventListener("click", function () {
                const index = this.getAttribute("data-index");
                storedMessages.splice(index, 1); // Remove a mensagem do array
                localStorage.setItem("messages", JSON.stringify(storedMessages)); // Atualiza Local Storage
                renderMessages(); // Atualiza a lista
            });
        });
    }

    // Evento para remover todas as mensagens
    clearAllButton.addEventListener("click", function () {
        localStorage.removeItem("messages"); // Remove do Local Storage
        renderMessages(); // Atualiza a lista
    });

    renderMessages(); // Renderiza as mensagens na página
}
