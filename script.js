const WORD_LENGTH = 5;
const GUESSES = 6;

const QWERTY = [
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
];

// WORD_LIST defined in words.js
const words = new Set(WORD_LIST.join(" ").split(" "));

let word;

let row = 0;
let col = 0;
let keys = {};


//
// Entry point
//

function start(event) {
  if (event.target.readyState === 'complete') {
    setupUI();
    word = randomWord();
  }
}

//
// Page setup
// 

function setupUI() {
  createBoard();
  createKeyboard(QWERTY);
  supressSelection();
}

function createBoard() {
  let board = document.getElementById("board");
  for (let i = 0; i < GUESSES; i++) {
    board.appendChild(createBoardRow());
  }
}

function createBoardRow() {
  let row = document.createElement("div");
  for (let j = 0; j < WORD_LENGTH; j++) {
    row.appendChild(createLetterBox());
  }
  return row;
}

function createLetterBox() {
  let box = document.createElement("span");
  box.classList.add("box");
  return box;
}

function createKeyboard(layout) {
  let keyboard = document.getElementById("keyboard");
  for (let row of layout) {
    keyboard.appendChild(createKeyboardRow(row));
  }
  addExtraKeys(keyboard.childNodes[layout.length - 1]);
}

function createKeyboardRow(letters) {
  let row = document.createElement("div");
  for (let letter of letters) {
    row.appendChild(createKeyboardKey(letter));
  }
  return row;
}

function createKeyboardKey(letter) {
  let key = document.createElement("span");
  key.classList.add("letter");
  key.innerText = letter;
  keys[letter] = key;
  key.onclick = e => maybeAddLetter(letter);
  return key;
}

function addExtraKeys(row) {
  row.insertBefore(makeEnterKey(), row.firstChild);
  row.append(makeDeleteKey());
}

function makeEnterKey() {
  let enter = document.createElement("span");
  enter.classList.add("enter");
  enter.innerText = "enter";
  enter.onclick = submitGuess;
  return enter;
}

function makeDeleteKey() {
  let del = document.createElement("span");
  del.classList.add("del");
  del.innerText = "del";
  del.onclick = backspace;
  return del;
}

function supressSelection() {
  // This prevents mousing on the letters in the keyboard from selecting the text
  // of the key which is distracting and ugly.
  document.documentElement.addEventListener('mousedown', e => e.preventDefault());
}


//
// Key handlers
//

function handleTyping(e) {
  if (e.key in keys) {
    maybeAddLetter(e.key);
  } else if (e.key === "Backspace") {
    backspace();
  } else if (e.key === "Enter") {
    submitGuess();
  }
}

function maybeAddLetter(key) {
  if (col < WORD_LENGTH) {
    currentRow()[col++].innerText = key;
  }
}

function backspace() {
  if (col > 0) {
    currentRow()[--col].innerText = "";
    hideNotAWord();
  }
}

function submitGuess() {
  if (col === word.length) {
    checkGuess(getGuess());
  }
}


//
// Game play
//

function randomWord() {
  return Array.from(words)[Math.floor(Math.random() * words.size)];
}

function currentRow() {
  return document.getElementById("board").childNodes[row].childNodes;
}

function getGuess() {
  return Array.from(currentRow()).map(c => c.innerText).join("");
}

function checkGuess(guess) {
  if (isWord(guess)) {
    updateLetters(guess, currentRow());
    row++;
    col = 0;
  } else {
    showNotAWord();
  }
}

function isWord(word) {
  return words.has(word);
}

function updateLetters(guess, row) {
  for (let i = 0; i < word.length; i++) {
    let letter = guess[i];
    let c = letterClass(letter, i);
    row[i].classList.add(c);
    colorKey(letter, c);
  }
}

function letterClass(letter, i) {
  if (letter === word[i]) {
    return "in-position";
  } else if (word.indexOf(letter) !== -1) {
    return "in-word";
  } else {
    return "not-in-word";
  }
}

function colorKey(letter, c) {
  let key = keys[letter];
  // Remove them all to clear out whatever one (if any) is there already.
  key.classList.remove("in-position", "in-word", "not-in-word");
  key.classList.add(c);
  if (c === "not-in-word") {
    key.onclick = undefined;
  }
}

function showNotAWord() {
  document.getElementById("not-a-word").style.display = "block";
}

function hideNotAWord() {
  document.getElementById("not-a-word").style.display = "none";
}

document.addEventListener('readystatechange', start);
document.addEventListener('keydown', handleTyping);
