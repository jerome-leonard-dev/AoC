const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let total = 0;
  for( const match of data.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)){
    const values = match[0].substr(4, match[0].length-5).split(',');
    total += (values[0]*1)*(values[1]*1);
  }
  console.log("Résultat: " + total);
});