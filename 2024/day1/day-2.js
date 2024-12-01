const fs = require('fs');

fs.readFile('test', 'utf8', (err, data) => {
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
    left = left.sort();
    right = right.sort();
/*
    1   3
    2   3
    3   3
    3   4
    3   5
    4   9
*/
    let total = 0;
    let j = 0;
    for( let i = 0; i < left.length; i++){
        console.log(i+"=>"+left[i]+"   ->    "+total);
        while(left[i]>=right[j]){
          total+=left[i];
          console.log("  "+i+"=>"+left[i]+"   ->    "+total);
          j++;
        }
    }
    console.log("Résultat: " + total);
  });