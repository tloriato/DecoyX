function shuffle(array) {
  var num = array.length, t, i;

  // Enquanto existir elementos
  while (num) {

    // Escolhe um elemento não escolhido ainda.
    i = Math.floor(Math.random() * num--);

    // Substitui o último elemento não sortido array pelo novo
    t = array[num];
    array[num] = array[i];
    array[i] = t;
  }
  
  return array;
}
