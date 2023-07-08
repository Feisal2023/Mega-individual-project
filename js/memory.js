
let limit = 5;
let page = 1;
let isLoading = false; // Track loading state

function getAllElementsFromStorage() {
  const elementsFromStorage = localStorage.getItem('allElements');
  return elementsFromStorage ? JSON.parse(elementsFromStorage) : [];
}

function displayWordsFromLocalStorage() {
  const wordsContainer = document.getElementById('words');

  // Only clear the container if it's the first page
  if (page === 1) {
    wordsContainer.innerHTML = '';
  }

  const storedWords = getAllElementsFromStorage();
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;

  storedWords.slice(startIndex, endIndex).forEach((word, index) => {
    const wordElement = document.createElement('div');
    wordElement.classList.add('word-element');
    wordElement.innerHTML = `
      <h1>Word ${startIndex + index + 1}</h1>
      <p><span>Word:</span> ${word.word}</p>
      <p><span>Definition:</span> ${word.definition}</p>
      <p><span>Examples:</span> ${word.examples}</p>
      <p><span>Synonyms:</span> ${word.synonyms}</p>
      <p><span>Antonyms:</span> ${word.antonyms}</p>
    `;

    wordsContainer.appendChild(wordElement);
  });
}

function showLoading() {
  // If already loading, prevent multiple calls
  if (isLoading) {
    return;
  }

  const loading = document.querySelector('.loader');
  isLoading = true; // Set loading state to true
  loading.classList.add('show');

  setTimeout(() => {
    loading.classList.remove('show');

    setTimeout(() => {
      page++;
      isLoading = false; // Set loading state to false
      displayWordsFromLocalStorage();
    }, 300);
  }, 1000);
}

displayWordsFromLocalStorage();

window.addEventListener('scroll', () => {
  const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

  if (scrollTop + clientHeight >= scrollHeight - 5) {
    showLoading();
  }
});

