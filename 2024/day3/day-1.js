const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let total = 0;
  const lines = data.split('\n');
  lines.forEach(line => {
    const blocs = line.split(' ');
    const asc = (blocs[1] * 1) > (blocs[0] * 1);
    total++;
    if (asc) {
      for (let i = 1; i < blocs.length; i++) {
        const diff = blocs[i] * 1 - blocs[i - 1] * 1;
        if (diff < 1 || diff > 3) {
          total--;
          break;
        }
      }
    } else {
      for (let i = 1; i < blocs.length; i++) {
        const diff = blocs[i] * 1 - blocs[i - 1] * 1;
        if (diff < -3 || diff > -1) {
          total--;
          break;
        }
      }
    }
  });


  console.log("Résultat: " + total);
});