var players = [
  {
    name: "Satoshi Nakamoto";
    money: 100;
    card1: null;
    card2: null;
  },
  {
    name: "Vitalik Buterin";
    money: 100;
    card1: null;
    card2: null;
  {
    name: "Gavin Wood";
    money: 100;
    card1: null;
    card2: null;
  },
  {
    name: "Hal Finney";
    money: 100;
    card1: null;
    card2: null;
  },
  {
    name: "Victor Maia";
    money: 100;
    card1: null;
    card2: null;
  },
  {
    name: "Nick Szabo";
    money: 100;
    card1: null;
    card2: null;
  },
  {
    name: "Craig Wright"
    money: 100;
    card1: null;
    card2: null;
  },
  {
    name: "Wei Dai"
    money: 100;
    card1: null;
    card2: null;
  },
  {
    name: "Gregory Maxwell"
    money: 100;
    card1: null;
    card2: null;
  },
];

var deck = [
            "AceC",        "AceD",          "AceH",          "AceS",
            "2C",            "2D",            "2H",            "2S",
            "3C",            "3D",            "3H",            "3S",
            "4C",            "4D",            "4H",            "4S",
            "5C",            "5D",            "5H",            "5S",
            "6C",            "6D",            "6H",            "6S",
            "7C",            "7D",            "7H",            "7S",
            "8C",            "8D",            "8H",            "8S",
            "9C",            "9D",            "9H",            "9S",
            "10C",           "10D",           "10H",           "10S",
            "JC",            "JD",            "JH",            "JS",
            "QC",            "QD",            "QH",            "QS",
            "KC",            "KD",            "KH",            "KS"
            ];

var new_deck = shuffle(deck);

function shuffle(array_old) {

  var num = array_old.length;
  var array = array_old;
  // Enquanto existir elementos
  while (num) {

    var t, i;

    // Escolhe um elemento não escolhido ainda.
    i = Math.floor(Math.random() * num--);

    // Substitui o último elemento não sortido array pelo novo
    t = array[num];
    array[num] = array[i];
    array[i] = t;
  }

  return array;
}

console.log(new_deck);
