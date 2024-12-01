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

    left = left.sort();
    right = right.sort();

    let total = 0;
    for( let i = 0; i < left.length; i++){
        total += Math.abs(left[i]-right[i]);
    }
    console.log("Résultat: " + total);
  });