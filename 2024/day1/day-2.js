const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let left = [];
    let right = [];

    const lines = data.split('\n');
    lines.forEach(line => {
        const blocs = line.split('   ');
        left.push(blocs[0]*1);
        right.push(blocs[1]*1);
    });
/*
    3   4
    4   3
    2   5
    1   3
    3   9
    3   3
*/

    let factor = [];
    for( let i = 0; i < right.length; i++){
      factor[right[i]] = isNaN(factor[right[i]])?1:factor[right[i]]+1;
    }
    let total = 0;
    for( let i = 0; i < left.length; i++){
      total += isNaN(factor[left[i]])?0:+(left[i]*factor[left[i]]);
    }
    console.log("Résultat: " + total);
  });