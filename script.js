const WORD_LENGTH = 5;
const GUESSES = 6;

const QWERTY = [
  "qwertyuiop",
  "asdfghjkl",
  "zxcvbnm",
];

const WORD_LIST = [
  "about other which their there first would these click price state email world music after video where books links years",
  "order items group under games could great hotel store terms right local those using phone forum based black check index",
  "being women today south pages found house photo power while three total place think north posts media water since guide",
  "board white small times sites level hours image title shall class still money every visit tools reply value press learn",
  "print stock point sales large table start model human movie march yahoo going study staff again never users topic below",
  "party login legal above quote story rates young field paper girls night texas poker issue range court audio light write",
  "offer given files event china needs might month major areas space cards child enter share added radio until color track",
  "least trade green close drive short means daily beach costs style front parts early miles sound works rules final adult",
  "thing cheap third gifts cover often watch deals words heart error clear makes taken known cases quick whole later basic",
  "shows along among death speed brand stuff doing loans shoes entry notes force river album views plans build types lines",
  "apply asked cross weeks lower union names leave teens woman cable score shown flash ideas allow homes super asian cause",
  "focus rooms voice comes brown forms glass happy smith thank prior sport ready round built blood earth basis award extra",
  "rated quite horse stars lists owner takes bring input agent valid grand trial units wrote ships metal funds guest seems",
  "trust grade panel floor match plant sense stage goods maybe youth break dance apple enjoy block civil steel songs fixed",
  "wrong hands paris fully worth peace coast grant agree blogs scale stand frame chief gives heard begin royal clean bible",
  "suite vegas piece sheet seven older cells looks calls whose naked lives stone tests buyer label waste chair phase motor",
  "shirt crime count claim patch alone jones saint drugs joint fresh dates upper prime limit began steps shops creek urban",
  "tours labor admin heavy solid theme touch goals serve magic mount smart latin avoid birth virus abuse facts faith chain",
  "moved reach sorry gamma truth films owned draft chart clubs equal codes kinds teams funny tried named laser taxes mouse",
  "brain dream false falls stats carry hello clips brief ended eight wants alert queen sweet diego truck votes ocean signs",
  "depth train feeds route anime speak query rural judge bytes fight filed banks leads minor noted spent helps cycle sleep",
  "scene drink intel rings guess ahead devel delta alpha bonus adobe trees dress refer babes layer spend clock ratio proof",
  "empty ideal specs parks cream boxes hills aware shape firms usage mixed exist wheel angel width noise array sharp occur",
  "knows coach kevin plate logic sizes plain costa trail buddy setup blues scope crazy bears mouth meter fruit sugar stick",
  "allen genre slide exact bound storm micro dolls paint delay pilot novel ultra plays truly lodge broad foods guard newly",
  "raise drama bands lunch audit polls tower yours shell solar catch doubt tasks doors forth split twice shift marks loved",
  "birds saved shots treat piano risks ports teach rapid hairy dutch boots holds pulse metro strip pearl heads logos honda",
  "bills opera asset blank humor lived tight meant plane meets tampa grace villa inner roman taste trips sides turns cache",
  "lease proud giant seats alarm usual angle vinyl worst honor eagle pants nurse quiet comic crown maker crack picks smoke",
  "craft apart blind coins gross actor finds fifth prize dirty alive prove wings ridge modem skill moves throw trend worse",
  "boats tells fiber graph talks bonds fraud crash inter grove spray roads faces mayor yield hence radar lakes diary kings",
  "flags baker shock walls ebony drawn beast dodge pizza yards woods jokes globe pride brass plaza quest booty acres venue",
  "vital excel modes enemy wells opens thick vista chips flood arena grown smile lands armed tokyo candy pills tiger folks",
  "boost icons keeps pound roses bread tough gonna chest solve tones sight towns worry reads roles glory fault rugby fluid",
  "grass sized manga theft swing dated shoot elite poems robot winds gnome roots noble shore loves loose slots rocks genes",
  "hosts atlas feels corps liver decor texts fails aging intro clerk mills jeans fonts favor sigma aside essay camps trace",
  "packs spoke arrow rough weird holes blade meals robin strap crowd cloud valve knife shelf liked adopt outer tales islam",
  "nodes seeds cited tired steam acute stood carol stack curve amber trunk waves lamps juice chase sauce beads flows fewer",
  "proxy lanka voted bikes gates combo haven charm basin ranch drunk toner latex alien broke nylon discs rocky fleet bunch",
  "cents omega civic saver grill grain seeks gains spots salon turbo aimed reset brush spare skirt honey gauge faced sixth",
  "farms cheat sandy macro laugh pitch autos dozen teeth cloth stamp lotus cargo salem likes tapes zones races maple depot",
  "blend probe debug chuck ebook bingo minds sunny leeds cedar hopes mason burns pumps mario pairs chose blast brake congo",
  "olive cyber clone relay tears oasis angry lover rolls malta daddy ferry loads motel rally dying stuck stops vocal organ",
  "lemon toxic bench rider butts bobby sheep wines salad paste relax sword sells pixel float paths acids dairy admit fancy",
  "squad wages males chaos wheat bases unity bride begun socks fever drums rover flame tanks spell annex hints wired elvis",
  "argue arise jamie chess oscar menus herbs lying drill hobby tries trick drops wider screw blame fifty uncle brick naval",
  "cabin fired tires retro anger suits handy crops guild tribe batch alter edges twins amend thong medal walks booth indie",
  "bones breed polar patio beans berry ought fixes sends timer verse highs racks nasty tumor watts forty tubes queue skins",
  "exams belly elder sonic thumb twist ranks debut penny ivory remix alias newer spice ascii donor trash manor disco minus",
  "shade digit lions pools lyric grave saves lobby punch gotta karma shake holly silly mercy fence shame fatal flesh sheer",
  "puppy smell satin tunes nerve renew locks euros rebel hired kills slope nails whats rides rehab merit disks condo fairy",
  "shaft casio kitty drain fires panic onion beats merry scuba dried derby steal fears tuner alike scout dealt bucks badge",
  "wrist heath lexus realm jenny yemen buses rouge yeast brook wives sorts armor viral pipes laden merge sperm craps frost",
  "yacht tracy whale grows cliff tract shine diffs ozone pasta serum swift inbox focal samba wound lined boxed cubic spies",
  "elect bunny flyer baths climb token belts flush jewel dryer ruled funky joins scary cakes mixer tooth stays drove upset",
  "mines lance colon lanes purse align bless crest alloy plots draws bloom loops surge souls spank vault wires mails blake",
  "orbit bacon spine trout oxide badly scoop blink tiles fuzzy grams forge dense brave awful wagon knock peers quilt mambo",
  "flour choir blond burst daisy crude bored fares hoped safer marsh theta stake arbor rifle bulbs waist sewer vitro romeo",
  "demos sided cuban resin linen seals decay usher skate flats heels voter urine capri towel sears flies crane popup habit",
  "coupe lords tends sixty spark spike backs soils hunks sedan cares flora hardy bells denim buick doses baked glove plush",
  "urged adapt fuels stern tutor debit edits raven slice aspen lemma venus dolby halls pause demon gabon couch downs rogue",
  "optic chili grief sweat masks quake alley twain buffy loyal renal spite imply chill liner lifts vivid acted skull ninja",
  "sands steak cobra threw ninth marry wills atoms drake rails fried malls woody cried plugs coded rival beige gases genus",
  "debts knees poets woven rigid salsa blown baton abbey evite diets sauna bowls cruel eager pupil feast ankle decks blunt",
  "react rises coats fairs flute harsh cease poles equip hedge curry worms pouch hooks peaks spoon bombs niche cigar curse",
  "forex titan shout nudes straw reuse loses suede peach uncut stove bluff sadly hatch stein spill drift crisp scans onset",
  "assay tents snack pulls squid maxim slate pagan widow skies kicks canoe juicy moody pedal tuned scrap vapor aloud hydro",
  "playa noisy abide bliss parse jelly mania bolts typed cheer clamp grape deeds traps racer guilt sweep ducks lunar posed",
  "forks boxer weigh rodeo moose crush lever tasty rants tarot carts cocoa mixes fizzy offal staid pithy shirk pangs knell",
  "exalt wisps guano boars begat brawn pacts quine wring seeps roped clang djinn bared humus pales felts tykes frock wrest",
];

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
