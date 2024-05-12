const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageInput = document.getElementById('page-input');
const pages = document.querySelectorAll('.page');
const progressBar = document.querySelector('.progress-bar');
const increaseFontButton = document.getElementById('increase-font');
const decreaseFontButton = document.getElementById('decrease-font');
let currentPage = 0;

// Função para alternar entre temas
themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  if (body.classList.contains('dark-mode')) {
    themeToggle.innerHTML = '<img src="./App de Leitura/sun-icon-vector-removebg-preview.png" alt="Light Mode" class="light-mode-icon">';
  } else {
    themeToggle.innerHTML = '<img src="./App de Leitura/Moon-removebg-preview.png" alt="Dark Mode" class="dark-mode-icon">';
  }
});

// Função para exibir a página atual
// Função para exibir a página atual
// Função para exibir a página atual
function showPage(pageNumber) {
    pages.forEach((page, index) => {
      if (index === currentPage) {
        page.classList.remove('next', 'prev');
      } else if (index < currentPage) {
        page.classList.remove('next');
        page.classList.add('prev');
      } else {
        page.classList.remove('prev');
        page.classList.remove('active');
        page.classList.add('next');
      }
      if (index === pageNumber) {
        page.classList.add('active');
      }
    });
    updateProgressBar(pageNumber); // Atualiza a barra de progresso ao exibir uma nova página
  }
    
// Adicionando a classe 'active' à página inicial
pages[currentPage].classList.add('active');

// Event listeners para navegação entre páginas
prevPageButton.addEventListener('click', () => {
  currentPage = Math.max(currentPage - 1, 0);
  pageInput.value = currentPage + 1;
  showPage(currentPage);
});

nextPageButton.addEventListener('click', () => {
  currentPage = Math.min(currentPage + 1, pages.length - 1);
  pageInput.value = currentPage + 1;
  showPage(currentPage);
});

// Event listener para alteração manual de página
pageInput.addEventListener('change', () => {
  let pageNumber = parseInt(pageInput.value);
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > pages.length) {
    pageNumber = 1;
  }
  currentPage = pageNumber - 1;
  showPage(currentPage);
});

// Função para atualizar a barra de progresso
function updateProgressBar(pageNumber) {
  const progress = ((pageNumber + 1) / pages.length) * 100;
  progressBar.style.width = `${progress}%`;
}

// Event listeners para redimensionamento de texto
increaseFontButton.addEventListener('click', () => {
  changeFontSize('increase');
});

decreaseFontButton.addEventListener('click', () => {
  changeFontSize('decrease');
});

// Função para alterar o tamanho da fonte
function changeFontSize(action) {
  const currentFontSize = parseInt(window.getComputedStyle(pages[currentPage].querySelector('.text')).fontSize);
  let newFontSize;

  if (action === 'increase') {
    newFontSize = Math.min(currentFontSize + 2, 20); // Limite máximo de 20px
  } else if (action === 'decrease') {
    newFontSize = Math.max(currentFontSize - 2, 14); // Limite mínimo de 14px
  }

  pages[currentPage].querySelector('.text').style.fontSize = `${newFontSize}px`;
}
