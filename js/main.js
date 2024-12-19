// Seleciona o botão de toggle e o menu
const menuToggle = document.querySelector('.menu-toggle');
const menu = document.querySelector('.menu');

// Alterna a exibição do menu ao clicar no botão
menuToggle.addEventListener('click', () => {
  menu.classList.toggle('show');
});

// Lógica para mostrar detalhes das tecnologias
document.querySelectorAll('section').forEach(section => {
  section.addEventListener('mouseover', function() {
    const description = section.querySelector('.tech-description');
    description.style.display = 'block';  // Torna visível a descrição
  });

  section.addEventListener('mouseout', function() {
    const description = section.querySelector('.tech-description');
    description.style.display = 'none';  // Esconde a descrição ao tirar o mouse
  });

  section.addEventListener('click', function() {
    const description = section.querySelector('.tech-description');
    description.style.display = (description.style.display === 'block') ? 'none' : 'block';  // Alterna visibilidade
  });
});

