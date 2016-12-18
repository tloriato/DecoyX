var players = require("./players.json");
var results = require('./results.js');

console.log("Numero de Players:");
var numbers_of_players = Number(process.argv.slice(2)) ;
console.log(numbers_of_players);

var deck = [
            "A♣",            "A♦",            "A♥",            "A♠",
            "2♣",            "2♦",            "2♥",            "2♠",
            "3♣",            "3♦",            "3♥",            "3♠",
            "4♣",            "4♦",            "4♥",            "4♠",
            "5♣",            "5♦",            "5♥",            "5♠",
            "6♣",            "6♦",            "6♥",            "6♠",
            "7♣",            "7♦",            "7♥",            "7♠",
            "8♣",            "8♦",            "8♥",            "8♠",
            "9♣",            "9♦",            "9♥",            "9♠",
           "10♣",           "10♦",           "10♥",           "10♠",
            "J♣",            "J♦",            "J♥",            "J♠",
            "Q♣",            "Q♦",            "Q♥",            "Q♠",
            "K♣",            "K♦",            "K♥",            "K♠"
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

initialHand(new_deck, numbers_of_players, players);

function initialHand(new_deck, numbers, players) {

  for (var i = numbers*2, z = 0, k = 0 ; i > 0 ; i--, z++, k++)
    {
      if ( k > numbers - 1)
      {
        players.players[k-numbers].cards[1] = new_deck[z];
      }
      else {
        players.players[k].cards[0] = new_deck[z];
      }
    }
}

var table = flop(numbers_of_players, new_deck);

function flop(numbers, deck){
  return [deck[numbers*2+1], deck[numbers*2+2], deck[numbers*2+3]];
}

table = turn(numbers_of_players, new_deck);

function turn(numbers, deck) {
  return [deck[numbers*2+1], deck[numbers*2+2], deck[numbers*2+3], deck[numbers*2+5]];
}

table = river(numbers_of_players, new_deck);

function river(numbers, new_deck){
  return [deck[numbers*2+1], deck[numbers*2+2], deck[numbers*2+3], deck[numbers*2+5], deck[numbers*2+7]];
}

results.results(numbers_of_players, players, table);
