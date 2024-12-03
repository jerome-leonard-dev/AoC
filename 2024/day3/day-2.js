const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let data2 = '';
  let total = 0;
  let last_do = 0;
  let last_dont = -1;

  const todo = data.split('do()');
  todo.forEach( one => {
    data2 += one.split('don\'t()')[0];
  });
  
  console.log(data)
  console.log('--------');
  console.log(data2)
  for( const match of data2.matchAll(/mul\([0-9]{1,3},[0-9]{1,3}\)/g)){
    const values = match[0].substr(4, match[0].length-5).split(',');
    total += (values[0]*1)*(values[1]*1);
  }
  console.log("Résultat: " + total);
});