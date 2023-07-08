// selecting elements from dom
const form = document.querySelector('#form');
const searchWord = document.querySelector('#searchWord');
const selection = document.querySelector('#selection');
const all = document.querySelector('#all');
const definition = document.querySelector('#definition');
const examples = document.querySelector('#examples');
const synonyms = document.querySelector('#synonyms');
const antonyms = document.querySelector('#antonyms');
const wordDisplay = document.querySelector('#wordDisplay');
const checking = document.querySelector('.checking');
const isCheckingAll = document.querySelector('.check-box');
// show Error message function
function showError(input, message) {
  const inputMessage = input.parentElement;
  inputMessage.className = 'input-message error';
  const small = document.querySelector('small');
  small.style.visibility = 'visible';
  small.innerText = message;
}

function showSuccess(input) {
  const inputMessage = input.parentElement;
   inputMessage.className = 'input-message success';
  const small = document.querySelector('small');
  small.style.visibility = 'hidden';
}

// check required function
function checkRequired(input) {
  if(input.value.trim() === '' && selection.value !== 'select') {
    showError(input, `${getFieldName(input)} is required`)
  } else {
    showSuccess(input);
  }
}

// get field name function
function getFieldName(input) {
  return input.id.charAt(0).toUpperCase() + input.id.slice(1);
}

// fetching words from a json file
async function getWords() {
  const response = await fetch('./words.json')
  const data = await response.json();
  return data;
}
function checkIfWordExists(word) {
  const wordsFromStorage = getAllElementsFromStorage();
  return wordsFromStorage.some((element) => element.word.toLowerCase() === word.toLowerCase());
}

// show word all function

async function showWordAll() {
  // Clear previous content
  wordDisplay.innerHTML = '';

  // Checking if input is empty
  checkRequired(searchWord);

  // Check if error message is displayed
  const errorMessage = document.querySelector('.error');
  if (errorMessage === null && selection.value === 'All') {
    const words= await getWords();
    const word = words.find((element) => element.word.toLowerCase() === searchWord.value.toLowerCase());
 if(word) {
  
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'visible';

   if (checkIfWordExists(word.word)) {
    const checking = document.querySelector('.checking');
    checking.style.visibility = 'hidden';
    showError(searchWord, 'That word already checked!');
    return searchWord.value;
  }
 
    const allElement = document.createElement('div');
    allElement.classList.add('AllElement');
    allElement.innerHTML = `
      <div>
        <h1>Word:</h1>
        <p>${word.word}</p>
      </div>
      <div>
        <h1>Definition:</h1>
        <p>${word.definition}</p>
      </div>
      <div>
        <h1>Examples:</h1>
        <p>${word.examples}</p>
      </div>
      <div>
        <h1>Synonyms:</h1>
        <p>${word.synonyms}</p>
      </div>
      <div>
        <h1>Antonyms:</h1>
        <p>${word.antonyms}</p>
      </div>
    `;
    wordDisplay.appendChild(allElement);

 } else {
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'hidden';
  showError(searchWord, 'Word not found');
 }
   
  }
}

// show word definition 

async function showWordDefinition() {
  // Clear previous content
  wordDisplay.innerHTML = '';

  // Checking if input is empty
  checkRequired(searchWord);

  // Check if error message is displayed
  const errorMessage = document.querySelector('.error');
  if (errorMessage === null && selection.value === 'Definition') {
    const words= await getWords();
    const word = words.find((element) => element.word.toLowerCase() === searchWord.value.toLowerCase());
 if(word) {
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'visible';
  
  if (checkIfWordExists(word.word)) {
    const checking = document.querySelector('.checking');
    checking.style.visibility = 'hidden';
    showError(searchWord, 'That word already checked!');
    return searchWord.value;
  }
    const definitionEl = document.createElement('div');
    definitionEl.classList.add('definitionEl');
    definitionEl.innerHTML = `
      <div>
        <h1>Word:</h1>
        <p>${word.word}</p>
      </div>
      <div>
        <h1>Definition:</h1>
        <p>${word.definition}</p>
      </div>
    `;
    wordDisplay.appendChild(definitionEl);

 } else {
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'hidden';
  showError(searchWord, 'Word not found');
 }
   
  }
}

// show word examples

async function showWordExamples() {
  // Clear previous content
  wordDisplay.innerHTML = '';

  // Checking if input is empty
  checkRequired(searchWord);

  // Check if error message is displayed
  const errorMessage = document.querySelector('.error');
  if (errorMessage === null && selection.value === 'Examples') {
    const words= await getWords();
    const word = words.find((element) => element.word.toLowerCase() === searchWord.value.toLowerCase());
 if(word) {
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'visible';
  
  if (checkIfWordExists(word.word)) {
    const checking = document.querySelector('.checking');
    checking.style.visibility = 'hidden';
    showError(searchWord, 'That word already checked!');
    return searchWord.value;
  }
    const examplesEl = document.createElement('div');
    examplesEl.classList.add('examplesEl');
    examplesEl.innerHTML = `
      <div>
        <h1>Word:</h1>
        <p>${word.word}</p>
      </div>
      <div>
        <h1>Examples:</h1>
        <p>${word.examples}</p>
      </div>
    `;
    wordDisplay.appendChild(examplesEl);

 } else {
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'hidden';
  showError(searchWord, 'Word not found');
 }
   
  }
}
// show word synonyms function

async function showWordSynonyms() {
  // Clear previous content
  wordDisplay.innerHTML = '';

  // Checking if input is empty
  checkRequired(searchWord);

  // Check if error message is displayed
  const errorMessage = document.querySelector('.error');
  if (errorMessage === null && selection.value === 'Synonyms') {
    const words= await getWords();
    const word = words.find((element) => element.word.toLowerCase() === searchWord.value.toLowerCase());
 if(word) {
  
  if (checkIfWordExists(word.word)) {
    const checking = document.querySelector('.checking');
    checking.style.visibility = 'hidden';
    showError(searchWord, 'That word already checked!');
    return searchWord.value;
  }
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'visible';
    const synonymsEl = document.createElement('div');
    synonymsEl.classList.add('synonymsEl');
    synonymsEl.innerHTML = `
      <div>
        <h1>Word:</h1>
        <p>${word.word}</p>
      </div>
      <div>
        <h1>Synonyms:</h1>
        <p>${word.synonyms}</p>
      </div>
    `;
    wordDisplay.appendChild(synonymsEl);

 } else {
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'hidden';
  showError(searchWord, 'Word not found');
 }
   
  }
}
// show word Antonyms function

async function showWordAntonyms() {
  // Clear previous content
  wordDisplay.innerHTML = '';

  // Checking if input is empty
  checkRequired(searchWord);

  // Check if error message is displayed
  const errorMessage = document.querySelector('.error');
  if (errorMessage === null && selection.value === 'Antonyms') {
    const words= await getWords();
    const word = words.find((element) => element.word.toLowerCase() === searchWord.value.toLowerCase());
 if(word) {
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'visible';

  
  if (checkIfWordExists(word.word)) {
    const checking = document.querySelector('.checking');
    checking.style.visibility = 'hidden';
    showError(searchWord, 'That word already checked!');
    return searchWord.value;
  }
    const antonymsEl = document.createElement('div');
    antonymsEl.classList.add('antonymsEl');
    antonymsEl.innerHTML = `
      <div>
        <h1>Word:</h1>
        <p>${word.word}</p>
      </div>
      <div>
      <h1>Antonyms:</h1>
      <p>${word.antonyms}</p>
    </div>
    `;
    wordDisplay.appendChild(antonymsEl);

 } else {
  const checking = document.querySelector('.checking');
  checking.style.visibility = 'hidden';
  showError(searchWord, 'Word not found');
 }
   
  }
}
// get all elements from storage
function getAllElementsFromStorage() {
  const elementsFromStorage = localStorage.getItem('allElements');
  return elementsFromStorage ? JSON.parse(elementsFromStorage) : [];
}
// add all elements to local storage
function addAllElementsToLocalStorage() {
  // Check if error message is displayed
   const errorMessage = document.querySelector('.error');
   if (errorMessage === null && selection.value === 'All' || selection.value === 'Definition'|| selection.value === 'Examples' || selection.value === 'Synonyms' || selection.value === 'Antonyms') {
    getWords().then(words => {
      const word = words.find((element) => element.word.toLowerCase() === searchWord.value.toLowerCase());
      if(word) {
        const isCheckingAll = document.querySelector('.check-box');
        if (isCheckingAll.checked) {
          const addToStorage = getAllElementsFromStorage();
          const allElements = {
            word: word.word,
            definition: word.definition,
            examples: word.examples,
            synonyms: word.synonyms,
            antonyms: word.antonyms,
          }
           addToStorage.push(allElements);
            localStorage.setItem('allElements', JSON.stringify(addToStorage));
        }
        setTimeout(() => {
          isCheckingAll.checked = '';
          searchWord.value = '';
        }, 1000)

      }
    })
  }

}

form.addEventListener('change', (e) => {
  e.preventDefault();
  checkRequired(searchWord);
  showWordAll();
  showWordDefinition();
  showWordExamples();
  showWordSynonyms();
  showWordAntonyms(); 
});

isCheckingAll.addEventListener('change', function(e) {
  e.preventDefault();
  addAllElementsToLocalStorage();
});