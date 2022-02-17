const QWERTY = [
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
];

const ALPHABET = QWERTY.join("");

const WORD_LIST = "about other which their there first would these click price state email world music after video where books links years order items group under games could great hotel store terms right local those using phone forum based black check index being women today south pages found house photo power while three total place think north posts media water since guide board white small times sites level hours image title shall class still money every visit tools reply value press learn print stock point sales large table start model human movie march yahoo going study staff again april never users topic";

const words = new Set(WORD_LIST.split(" "));

let word;

let row = 0;
let col = 0;
let keys = {};


//
// Entry point
//

function start(event) {
  if (event.target.readyState === 'complete') {
    createBoard();
    createKeyboard(QWERTY);
    supressSelection();
    word = randomWord();
  }
}

//
// Page setup
// 

function createBoard() {
  let board = document.getElementById("board");
  for (let i = 0; i < 6; i++) {
    board.appendChild(createBoardRow());
  }
}

function createBoardRow() {
  let row = document.createElement("div");
  for (let j = 0; j < 5; j++) {
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
  key.onclick = keyClicked;
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
  document.documentElement.addEventListener('mousedown', e => e.preventDefault());
}


//
// Key handlers
//

function handleTyping(e) {
  if (e.key === "Enter") {
    submitGuess();
  } else if (e.key === "Backspace") {
    backspace();
  } else if (ALPHABET.indexOf(e.key) !== -1) {
    maybeAddLetter(e.key);
  }
}

function keyClicked(e) {
  maybeAddLetter(e.target.innerText);
}

function maybeAddLetter(key) {
  if (col < 5) {
    currentRow()[col++].innerText = key;
  }
}

function submitGuess() {
  if (col === word.length) {
    checkGuess(getGuess());
  }
}

function backspace() {
  if (col > 0) {
    currentRow()[--col].innerText = "";
    hideNotAWord();
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
