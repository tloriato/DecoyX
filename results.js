module.exports = {
  results: function(numbers, players, table_old) {

    /* Create a table Mmxn where m is the numbers of lines and n is the columns
    The lines represents the players, and the columns represents all seven cards at their
    dispolsal, 2 (hand) + 5(table).
    Ace becomes 14, King 13, Queen 12 and Jack 11.
    */
    table = createArrayofHands(numbers, players, table_old);

    /* Will hold the winning player index in the table while checking for games */
    var winner = -1;
    winner = HighCard(table);
    console.log("VENCEDOR: " + winner);
    console.log(table);
  }
};

var debug = false;

function createArrayofHands(numbers, players, table){
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
