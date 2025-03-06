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

themeToggle.addEventListener('click', () => {
  body.classList.toggle('dark-mode');
  body.classList.toggle('light-mode');

  if (body.classList.contains('dark-mode')) {
    themeToggle.innerHTML = '<img src="./App de Leitura/sun-icon-vector-removebg-preview.png" alt="Light Mode" class="light-mode-icon">';
  } else {
    themeToggle.innerHTML = '<img src="./App de Leitura/Moon-removebg-preview.png" alt="Dark Mode" class="dark-mode-icon">';
  }
});

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
  updateProgressBar(pageNumber); 
  updateBookmarks(); 
}

pages[currentPage].classList.add('active');

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

pageInput.addEventListener('change', () => {
  let pageNumber = parseInt(pageInput.value);
  if (isNaN(pageNumber) || pageNumber < 1 || pageNumber > pages.length) {
    pageNumber = 1;
  }
  currentPage = pageNumber - 1;
  showPage(currentPage);
});

function updateProgressBar(pageNumber) {
  const progress = ((pageNumber + 1) / pages.length) * 100;
  progressBar.style.width = `${progress}%`;
}

increaseFontButton.addEventListener('click', () => {
  changeFontSize('increase');
});

decreaseFontButton.addEventListener('click', () => {
  changeFontSize('decrease');
});

function changeFontSize(action) {
  const currentFontSize = parseInt(window.getComputedStyle(pages[currentPage].querySelector('.text')).fontSize);
  let newFontSize;

  if (action === 'increase') {
    newFontSize = Math.min(currentFontSize + 2, 30); 
  } else if (action === 'decrease') {
    newFontSize = Math.max(currentFontSize - 2, 14); 
  }

  pages[currentPage].querySelector('.text').style.fontSize = `${newFontSize}px`;
}

bookmarkButton.addEventListener('click', () => {
  if (bookmarks.includes(currentPage)) {
    bookmarks = bookmarks.filter(page => page !== currentPage);
  } else {
    bookmarks.push(currentPage);
  }
  updateBookmarks();
});

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

