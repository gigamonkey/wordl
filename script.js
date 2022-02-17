const keyboardLayout = [
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
];

let wordsList = "about other which their there first would these click price state email world music after video where books links years order items group under games could great hotel store terms right local those using phone forum based black check index being women today south pages found house photo power while three total place think north posts media water since guide board white small times sites level hours image title shall class still money every visit tools reply value press learn print stock point sales large table start model human movie march yahoo going study staff again april never users topic";

let words = new Set(wordsList.split(" "));

let word;

let row = 0;
let col = 0;
let keys = {};

function start(event) {
  if (event.target.readyState === 'complete') {
    createBoard();
    createKeyboard();
    supressSelection();
    word = randomWord();
  }
}

function createBoard() {
  let board = document.getElementById("board");
  for (let i = 0; i < 6; i++) {
    board.appendChild(createRow());
  }
}

function createRow() {
  let row = document.createElement("div");
  for (let j = 0; j < 5; j++) {
    row.appendChild(createBox());
  }
  return row;
}

function createBox() {
  let box = document.createElement("span");
  box.classList.add("box");
  return box;
}

function createKeyboard() {
  let keyboard = document.getElementById("keyboard");
  for (let row of keyboardLayout) {
    let div = document.createElement("div");
    for (let letter of row) {
      let key = document.createElement("span");
      key.classList.add("letter");
      key.innerText = letter;
      keys[letter] = key;
      key.onclick = keyClicked;
      div.appendChild(key);
    }
    keyboard.appendChild(div);
  }

  let bottomRow = keyboard.childNodes[keyboardLayout.length - 1];
  bottomRow.insertBefore(makeEnterKey(), bottomRow.firstChild);
  bottomRow.append(makeDeleteKey());
}

function supressSelection() {
  document.documentElement.addEventListener('mousedown', e => e.preventDefault());
}

function randomWord() {
  return Array.from(words)[Math.floor(Math.random() * words.size)];
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
  del.innerText = "del";
  del.classList.add("del");
  del.onclick = backspace;
  return del;
}

function currentRow() {
  return document.getElementById("board").childNodes[row].childNodes;
}

function nextBox() {
  return currentRow()[col];
}

function keyClicked(e) {
  if (col < 5) {
    nextBox().innerText = e.target.innerText;
    col++;
  }
}
function submitGuess() {
  if (col === word.length) {
    if (checkGuess(currentRow())) {
      row++;
      col = 0;
    }
  }
}

function backspace() {
  if (col > 0) {
    col--;
    nextBox().innerText = "";
    document.getElementById("not-a-word").style.display = "none";
  }
}

function getGuess(row) {
  return Array.from(row).map(c => c.innerText).join("");
}

function checkGuess(row) {
  if (words.has(getGuess(row))) {

    for (let i = 0; i < word.length; i++) {
      let letter = row[i].innerText;
      let c;
      if (letter === word[i]) {
        c = "in-position";
      } else if (word.indexOf(letter) !== -1) {
        c = "in-word";
      } else {
        c = "not-in-word";
      }
      row[i].classList.add(c);
      colorKey(letter, c);
    }
      return true;
    }
  } else {
    document.getElementById("not-a-word").style.display = "block";
    return false;
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

document.addEventListener('readystatechange', start);