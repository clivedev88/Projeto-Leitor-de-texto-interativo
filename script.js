const body = document.body;
const themeToggle = document.getElementById('theme-toggle');
const prevPageButton = document.getElementById('prev-page');
const nextPageButton = document.getElementById('next-page');
const pageInput = document.getElementById('page-input');
const pages = document.querySelectorAll('.page');
const progressBar = document.querySelector('.progress-bar');
const increaseFontButton = document.getElementById('increase-font');
const decreaseFontButton = document.getElementById('decrease-font');
const bookmarkButton = document.getElementById('bookmark-page');
const highlightButton = document.getElementById('highlight-text');
const unhighlightButton = document.getElementById('unhighlight-text');
const highlightColorSelect = document.getElementById('highlight-color');
let currentPage = 0;
let bookmarks = [];

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
  updateBookmarks(); // Atualiza a exibição dos marcadores de página
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
    newFontSize = Math.min(currentFontSize + 2, 30); // Limite máximo de 30px
  } else if (action === 'decrease') {
    newFontSize = Math.max(currentFontSize - 2, 14); // Limite mínimo de 14px
  }

  pages[currentPage].querySelector('.text').style.fontSize = `${newFontSize}px`;
}

// Função para marcar ou desmarcar a página atual
bookmarkButton.addEventListener('click', () => {
  if (bookmarks.includes(currentPage)) {
    bookmarks = bookmarks.filter(page => page !== currentPage);
  } else {
    bookmarks.push(currentPage);
  }
  updateBookmarks();
});

// Função para atualizar a exibição dos marcadores de página
function updateBookmarks() {
  pages.forEach((page, index) => {
    const existingBookmark = page.querySelector('.bookmark');
    if (existingBookmark) {
      existingBookmark.remove();
    }
    if (bookmarks.includes(index)) {
      const bookmark = document.createElement('div');
      bookmark.classList.add('bookmark');
      bookmark.textContent = 'Marcado';
      page.appendChild(bookmark);
    }
  });
}

// Função para marcar texto
highlightButton.addEventListener('click', () => {
  const selectedText = window.getSelection().toString();
  if (selectedText) {
    const range = window.getSelection().getRangeAt(0);
    const span = document.createElement('span');
    span.classList.add('highlight');
    span.classList.add(highlightColorSelect.value);
    span.appendChild(range.extractContents());
    range.insertNode(span);
  }
});

// Função para desmarcar texto
unhighlightButton.addEventListener('click', () => {
  const selectedText = window.getSelection();
  if (selectedText.rangeCount > 0) {
    const range = selectedText.getRangeAt(0);
    const container = range.commonAncestorContainer;
    if (container.nodeType === 3) {
      const parent = container.parentNode;
      if (parent.classList.contains('highlight')) {
        parent.replaceWith(...parent.childNodes);
      }
    }
  }
});

// Melhorias futuras sugeridas:
// 1. Implementar um sistema de notas onde os usuários podem adicionar anotações a textos destacados.
// 2. Adicionar suporte para sincronização com a nuvem para que os usuários possam salvar suas marcas e destaques em diferentes dispositivos.
// 3. Melhorar a navegação com a adição de um índice ou menu de capítulos.
// 4. Adicionar uma função de pesquisa que permita aos usuários encontrar palavras ou frases específicas dentro do texto.
// 5. Implementar um sistema de favoritos para marcar e acessar rapidamente passagens ou páginas preferidas.
// 6. Adicionar um modo de leitura noturna ajustável com opções de personalização para diminuir a fadiga ocular.
