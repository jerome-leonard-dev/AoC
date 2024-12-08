const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let total = 0;


/*
190: 10 19
3267: 81 40 27
7290: 6 8 6 15
*/
//21:45
  const lines = data.split('\n');
  for( let i = 0; i < lines.length; i++){
      const ln = lines[i].split(':');
      const item = {sum:ln[0]*1, values:ln[1].trim().split(' ').map(x=>x*1)};
      if( validateItem(item).length !=0){
        total+= item.sum;
      }
  }

  console.log("Total: "+total);

});

function validateItem(item){
  let results = [];
  for(i = 0; i < 2**(item.values.length-1);i++){
    let tot = item.values[0];
    let calc = ""+item.values[0];
    for( j = 0; j< item.values.length-1; j++){
      if((i&(2**j)) == (2**j)){
        calc += ("+"+item.values[j+1]);
        tot += item.values[j+1];
      }else{
        calc += ("*"+item.values[j+1]);
        tot *= item.values[j+1];
      }
    }
    console.debug("    " + calc+":"+tot);
    if( tot == item.sum){
      results.push(calc);
    }
  }
  console.debug(JSON.stringify(item) + "" + results);
  return results;
}