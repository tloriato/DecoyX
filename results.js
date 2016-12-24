module.exports = {
  results: function(numbers, players, table_old) {

    /* Create a table Mmxn where m is the numbers of lines and n is the columns
    The lines represents the players, and the columns represents all seven cards at their
    dispolsal, 2 (hand) + 5(table).
    Ace becomes 14, King 13, Queen 12 and Jack 11.
    */
    table = createArrayofHands(numbers, players, table_old);

    /* Print the table */
    console.log(table);

    /* Set the winner and Print it */
    var winner = setWinner(winner);
    console.log(winner);
  }
};

var debug = false;

function setWinner(winner){
  /* check if someone has a royal street flush 
    if not check if someone has a street flush 
    if not check if someone has a four 
    if not check if someone has a fullhouse
    if not check if someone has a flush 
    if not check if someone has a Sequence 
    if not check if someone has a Trunk 
    if not check if someone has double Pairs 
    if not check if someone has Pairs 
    if not check who has the highests cards return the winner*/
  winner = RoyalStreetFl(table);
    if (winner === undefined || winner.length == 0) {
      winner = StreetFl(table);
      if(winner === undefined || winner.length == 0){
        winner = Four(table);
        if(winner == 0 || winner == -1){
          winner = FullHouse(table);
          if(winner == 0 || winner == -1){
            winner = Flush(table);
            if(winner === undefined || winner.length == 0){
                winner = Sequence(table);
                if(winner === undefined || winner.length == 0){
                    winner = Trunk(table);
                    if(winner == 0 || winner == -1){
                        winner = DoublePairs(table);
                        if(winner === undefined || winner.length == 0){
                            winner = Pairs(table);
                            if(winner === undefined || winner.length == 0){
                              winner = HighCard(table);
                              console.log("Vencedor com HighCard: ");
                    }
                    else
                      console.log("Vencedor com 1 par: ");
                  }
                  else
                    console.log("Vencedor com 2 pares: ");
                }
                else
                  console.log("Vencedor com uma trinca: ");
              }
              else
                console.log("Vencedor com uma sequencia: ");
            }
            else
              console.log("Vencedor com um flush: ");
          }
          else
            console.log("Vencedor com FullHouse: ");
        }
        else
          console.log("Vencedor com Four: ");
      }
      else
        console.log("Vencedor com Street Flus: ");
    }
    else
      console.log("ROYAL STREET FLUSH: ");
    return winner;
}

function aux_DoublePair(array, value){
  /* Purpose: Auxiliary function to determine if the hand has another pair different form the value that is passed. 
  Used on DoublePairs function. Array is all 7 cards of the players and value is the pair to be ignored.
  Method: For loop with auxiliary counter, taking advantage that the array passed is sorted.*/
  var z = 0;
  for(var i = 0; i < array.length - 1; i++)
  {
    z = z + 1;
    if (Number(array[i].slice(0,-1)) == Number(array[z].slice(0,-1)) && Number(array[i].slice(0,-1)) != value)
      return Number(array[i].slice(0,-1));
  }
  return -1;
}

function aux_PairSimple(array){
  //Purpose: Auxiliary function to determine if the hand has any pairs and return its value.
  // Method: For loop with auxiliary counter, taking advantage that the array passed is sorted.
  var aux = 0, check = Number(array[0].slice(0,-1));
  for(var i = 0; i < array.length; i++)
  {
    if (aux == 2)
      return check;
    if (Number(array[i].slice(0,-1)) == check)
      aux++;
    else {
      aux = 0;
      check = Number(array[i].slice(0,-1));
    }
  }
  return -1;
}

function aux_checkPairOnFull(array, value){
   //Purpose: check if the user has a pair, return true or false 
   //Used it with: FullHouse, where the value of the pair doesn't really matter
  for(var i = 0; i < array.length; i++)
  {
    if (Number(array[i].slice(0,-1)) == Number(array[i+1].slice(0,-1)) && Number(array[i].slice(0,-1)) != value)
      return true;
  }
  return false;
}

function aux_trunkVerify(array){
  // Check if the user has three of a kind (trunk or trinca)
  // Return its value
  // Method: For loop with auxiliary counter, taking advantage that the array passed is sorted.
  var aux = 0, check = Number(array[0].slice(0,-1));
  for(var i = 0; i < array.length; i++)
  {
    if (aux == 3)
      return check;
    if (Number(array[i].slice(0,-1)) == check)
      aux++;
    else {
      aux = 0;
      check = Number(array[i].slice(0,-1));
    }
  }
  return -1;
}

function aux_FourVerify(array){
  // Verify if user has 4 cards of the same value.
  // Method: For loop with auxiliary counter, taking advantage that the array passed is sorted.
  var aux = 0, check = Number(array[0].slice(0,-1));
  for(var i = 0; i < array.length; i++)
  {
    if (aux == 4)
      return check;
    if (Number(array[i].slice(0,-1)) == check)
      aux++;
    else {
      aux = 0;
      check = Number(array[i].slice(0,-1));
    }
  }
  return -1;
}

function aux_sequenceVerifiy(array){
  /* Function that verifies if a sequence exists and return from where it starts
  Method: Take advantage of the fact that the middle card of the array, [3], is always inside of a sequence if it exists.
  After that it test for a few cases and its branches.
  */
  if (Number(table[3].slice(0,-1)) == (Number(table[4].slice(0,-1)) - 1))
  {
    if (Number(table[3].slice(0,-1)) == (Number(table[2].slice(0,-1)) + 1))
    {
      if (Number(table[3].slice(0,-1)) == (Number(table[5].slice(0,-1)) - 2))
      {
        if (Number(table[3].slice(0,-1)) == (Number(table[6].slice(0,-1)) - 3))
          return 2;
        else if (Number(table[3].slice(0,-1)) == (Number(table[1].slice(0,-1)) + 2))
          return 1;
        else
          return -1;
      }
      else if ((Number(table[3].slice(0,-1)) == (Number(table[1].slice(0,-1)) + 2)))
        if ((Number(table[3].slice(0,-1)) == (Number(table[1].slice(0,-1)) + 3)))
          return 1;
      else
        return -1; 
    }

    else if (Number(table[3].slice(0,-1)) == (Number(table[2].slice(0,-1))))
    {
      if (Number(table[3].slice(0,-1)) == (Number(table[5].slice(0,-1)) - 2))
        if (Number(table[3].slice(0,-1)) == (Number(table[6].slice(0,-1)) - 3)) 
          if (Number(table[3].slice(0,-1)) == (Number(table[1].slice(0,-1)) + 1)) 
            return 1;
          else
            return -1;
        else
          return -1;
      else
        return -1;
    }
    else
      return -1;
  }
  else if (Number(table[3].slice(0,-1)) == Number(table[4].slice(0,-1)))
  {
    if (((Number(table[3].slice(0,-1)) == Number(table[2].slice(0,-1))) + 1) && 
       ((Number(table[3].slice(0,-1)) == Number(table[1].slice(0,-1))) + 2) &&
       ((Number(table[3].slice(0,-1)) == Number(table[6].slice(0,-1))) - 2) &&
       ((Number(table[3].slice(0,-1)) == Number(table[5].slice(0,-1))) - 1))
       return 1;

    else if (((Number(table[3].slice(0,-1)) == Number(table[2].slice(0,-1))) + 1) && 
            ((Number(table[3].slice(0,-1)) == Number(table[1].slice(0,-1))) + 2) &&
            ((Number(table[3].slice(0,-1)) == Number(table[0].slice(0,-1))) + 3) &&
            ((Number(table[3].slice(0,-1)) == Number(table[5].slice(0,-1))) - 1))
             return 0;
    else
      return -1;
  }
  else 
    return -1; // sem sequencia
}

function aux_checkSuitST(array, index, amount){
  // Check to see if all cards, starting at [index] up to [amount] are of the same suit.
  // Used on Street Flush and Royal Steet Flush
  for(var i = index, suits = array[index].slice(-1), z = 0; z < amount; z++, i++)
  {
    if(array[i].slice(-1) != suits)
    {
      return false;
    }
  }
  return true;
}

function aux_checkSuits(array) {
  // Check if the user has 5 cards of the same suit
  // Return the highest card inside of it.
  // Method: For loop with auxiliary counter, taking advantage that the array passed is sorted.
  var aux = 0, suit = array[0].slice(-1), high = -1;
  for(var i = 0; i < array.length; i++)
  {
    if (aux == 5)
    {
      return high;
    }

    if (array[i].slice(-1) == suit)
    {
      aux++;
      if (Number(array[i].slice(0,-1) > high))
        high = Number(array[i].slice(0,-1));
    }
    else {
      aux = 0;
      suit = array[i].slice(-1);
    }
  }
  return -1;
}

function createArrayofHands(numbers, players, table){
  // 'Main' function that creates a table from the players object, array of the cards in the table and numbers of players.
  // A -> 14
  // K -> 13
  // Q -> 12
  // J -> 11
  var array = [];
  for ( var i = numbers, k = 0; k < i; k++)
  {
    array[k] = [];
    array[k] = players.players[k].cards.concat(table);

    for (var z = 0, len = array[k].length; z < len; z++) {
      if (array[k][z].charAt(0) == 'A')
        array[k][z] = '14' + array[k][z].charAt(1);
      else if (array[k][z].charAt(0) == 'K')
        array[k][z] = '13' + array[k][z].charAt(1);
      else if (array[k][z].charAt(0) == 'Q')
        array[k][z] = '12' + array[k][z].charAt(1);
      else if (array[k][z].charAt(0) == 'J')
        array[k][z] = '11' + array[k][z].charAt(1);
    }

    array[k] = array[k].sort(function(a,b){return Number(a.slice(0, -1))-Number(b.slice(0,-1))});
  }

  return array;
}

function HighCard(table){
  // Don't try to understand it, walk away slowly...
  // Check wich player has the "higher" card, the lowest score on Texas Hold'em
  var windex, hcard = 1;
  var run = [];
  var run1 = [];
  var run2 = [];
  var run3 = [];
  var run4 = [];
  var first_time = true;

  for ( var i = 0; i < table.length; i++)
  {
    if (Number(table[i][6].slice(0,-1)) > hcard){
      hcard = Number(table[i][6].slice(0,-1));
      windex = i;
      run = [];
      debug ? console.log("Adicionando o Index " + i + " como maior valor") : null;
      run.push(i);
      debug ? console.log(run) : null;
    }
    else if (Number(table[i][6].slice(0,-1)) == hcard){
      debug ? console.log("Adicionando " + i + "ao array") : null;
      run.push(i);
      debug ? console.log(run) : null;
    }
  }

  if (run.length > 1){
    debug ? console.log("##PRIMEIRO IF###") : null ;
    hcard = 1;
    for ( var i = 0; i < table.length; i++)
    {
      if (Number(table[i][5].slice(0,-1)) > hcard && run.includes(i))
      {
        hcard = Number(table[i][5].slice(0,-1));
        run1 = [];
        debug ? console.log("Adicionando o Index " + i + " como maior valor") : null;
        run1.push(i);
        windex = i;
        debug ? console.log(run1) : null;
      }
      else if (Number(table[i][5].slice(0,-1)) < hcard && run.includes(i))
      {
        var index = run.indexOf(Number(table[i][5].slice(0,-1)));
        run = run.splice(index, 1);
      }
      else if (Number(table[i][5].slice(0,-1)) == hcard && run.includes(i)){
        debug ? console.log("Adicionando " + i + "ao array") : null;
        run1.push(i);
        debug ? console.log(run1) : null;
      }

    }

    if (run1.length > 1) {
      debug ? console.log(run1) : null;
      debug ? console.log("##SEGUNDO IF###") : null;
      hcard = 1;
      for ( var i = 0; i < table.length; i++)
      {
        if (Number(table[i][4].slice(0,-1)) > hcard && run1.includes(i))
        {
          hcard = Number(table[i][4].slice(0,-1));
          run2 = [];
          debug ? console.log("Adicionando o Index " + i + " como maior valor") : null;
          run2.push(i);
          windex = i;
          debug ? console.log(run2) : null;
        }
        else if (Number(table[i][4].slice(0,-1)) < hcard && run1.includes(i))
        {
          var index = run1.indexOf(Number(table[i][4].slice(0,-1)));
          run1 = run1.splice(index, 1);
        }
        else if (Number(table[i][4].slice(0,-1)) == hcard && run1.includes(i)){
          debug ? console.log("Adicionando " + i + "ao array") : null;
          run2.push(i);
          debug ? console.log(run2) : null;
        }
      }

      if (run2.length > 1)
      {
        debug ? console.log(run2) : null;
        debug ? console.log("##TERCEIRO IF###") : null;
        hcard = 1;
        for ( var i = 0; i < table.length; i++)
        {
          if (Number(table[i][3].slice(0,-1)) > hcard && run2.includes(i))
          {
            hcard = Number(table[i][3].slice(0,-1));
            run3 = [];
            debug ? console.log("Adicionando o Index " + i + " como maior valor") : null;
            run3.push(i);
            windex = i;
            debug ? console.log(run3) : null;
          }
          else if (Number(table[i][3].slice(0,-1)) < hcard && run2.includes(i))
          {
            var index = run2.indexOf(Number(table[i][3].slice(0,-1)));
            run2 = run2.splice(index, 1);
          }
          else if (Number(table[i][3].slice(0,-1)) == hcard && run2.includes(i)){
            debug ? console.log("Adicionando " + i + "ao array") : null;
            run3.push(i);
            debug ? console.log(run3) : null;
          }
        }
        if (run3.length > 1)
        {
          debug ? console.log(run3) : null;
          debug ? console.log("##QUARTO IF###") : null;
          hcard = 1;
          for ( var i = 0; i < table.length; i++)
          {
            if (Number(table[i][2].slice(0,-1)) > hcard && run3.includes(i))
            {
              hcard = Number(table[i][2].slice(0,-1));
              run4 = [];
              debug ? console.log("Adicionando o Index " + i + " como maior valor") : null;
              run4.push(i);
              windex = i;
              debug ? console.log(run4) : null;
            }
            else if (Number(table[i][2].slice(0,-1)) < hcard && run3.includes(i))
            {
              var index = run3.indexOf(Number(table[i][2].slice(0,-1)));
              run3 = run3.splice(index, 1);
            }
            else if (Number(table[i][2].slice(0,-1)) == hcard && run3.includes(i)){
              debug ? console.log("Adicionando " + i + "ao array") : null;
              run4.push(i);
              debug ? console.log(run4) : null;
            }
          }

          if (run4.length > 1)
          {
            debug ? console.log(run4) : null;
            debug ? console.log("##QUINTO IF###") : null;
            debug ? console.log("Empate Tecnico") : null;
            return -1;
          }
          else{
            debug ? console.log("VENCEDOR: " + windex) : null;
            return windex;
          }
        }
        else {
          return windex;
        }
      }
      else {
        return windex;
      }
    }
    else {
      return windex;
    }
  }

  else {
    return windex;
  }
}

function RoyalStreetFl(table){
  var winner = [];
  for(var i = 0; i < table.length; i++)
  {
    var index = aux_sequenceVerifiy(table[i]);
    if (index != -1)
    {
      if(aux_checkSuitST(table[i], index, 5))
      {
        if(Number(table[i][index].slice(0,-1)) == 10)
        {
          winner.push(i);
        }
      }
    }
  }
  return winner;
}

function StreetFl(table){
  var winner = [];
  var street = 0;

  for(var i = 0; i < table.length; i++)
  {
    var index = aux_sequenceVerifiy(table[i]);
    if (index != -1)
    {
      if(aux_checkSuitST(table[i], index, 5))
      {
       if(Number(table[i][index].slice(0,-1)) > street)
       {
         winner = [];
         winner.push(i);
         street = Number(table[i][index].slice(0,-1));
       }
       else if (Number(table[i][index].slice(0,-1)) == street)
       {
         winner.push(i);
       }
      }
    }
  }
  return winner;
}

function Four(table){
  var winner = -1;
  var four = 0;
  for (var i = 0, aux = 0; i < table.length; i++)
  {
    aux = aux_FourVerify(table[i]);
    if ( aux != -1)
    {
      if (aux > four)
      {
        four = aux;
        winner = i;
      }
    }
  }
  return winner;
}

function FullHouse(table){
  var winner = -1;
  var full = 0;
  for ( var i = 0; i < table.length; i++)
  {
    var aux = aux_trunkVerify(table[i]);
    if ( aux != -1)
    {
      if(aux_checkPairOnFull(table[i],aux))
      {
        if(aux > full)
        {
          full = aux;
          winner = i;
        }
      }
    }
  }

  return winner;
}

function Flush(table){
  var winner = [];
  var high = 0;
  for (var i = 0; i < table.length; i++)
  {
    var aux = aux_checkSuits(table[i]);
    if (aux != -1)
    {
      if (aux > high)
      {
        winner = [];
        winner.push(i);
        high = aux;
      }
      if ( aux == high)
      {
        winner.push(i);
      }
    }
  }

  return winner;
}

function Sequence(table){
  var winner = [];
  var high = 0;
  for (var i = 0; i < table.length; i++)
  {
    var aux = aux_sequenceVerifiy(table[i]);
    if ( aux != -1)
    {
      aux = Number(table[i][aux].slice(0,-1));
      if ( aux > high)
      {
        winner = [];
        winner.push(i);
        high = aux;
      }
      else if ( aux == high)
      {
        winner.push(i);
      }
    }
  }
  return winner;
}

function Trunk(table){
  var winner = -1;
  var high = 0;
  for ( var i = 0; i < table.length; i++){
    var aux = aux_trunkVerify(table[i]);
    if ( aux > high)
    {
      winner = i;
      high = aux;
    }
  }
  return winner;
}

function DoublePairs(table){
  var winner = [];
  var high = 0;
  for ( var i = 0; i < table.length; i++)
  {
    var pair1 = aux_PairSimple(table[i]);
    if ( pair1 != -1)
    {
      var pair2 = aux_DoublePair(table[i], pair1);
      if ( pair2 != -1)
      {
        if( pair2 > pair1)
        {
          if( pair2 > high)
          {
            winner = [];
            winner.push(i);
            high = pair2;
          }
          else if ( pair2 == high)
          {
            winner.push(i);
          }
        }
        else {
          if( pair1 > high)
          {
            winner = [];
            winner.push(i);
            high = pair1;
          }
          else if ( pair1 == high)
          {
            winner.push(i);
          }
        }
      }
    }
  }

  return winner;
}

function Pairs(table){
  var winner = []
  var high = 0;
  for ( var i = 0; i < table.length; i++)
  {
    var aux = aux_PairSimple(table[i]);
    if (!(aux == -1))
    {
      if ( aux > high)
      {
        winner = [];
        high = aux;
        winner.push(i);
      }
      else if ( aux == high)
      {
        winner.push(i);
      }
    }
  }
  return winner;
} 
