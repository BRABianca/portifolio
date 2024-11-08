// Seleciona o botão de toggle e o menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Alterna a exibição do menu ao clicar no botão
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Seleção dos elementos do modal
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
