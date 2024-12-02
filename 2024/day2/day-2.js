const fs = require('fs');

function isSafe(input){
  if((input[1]*1)<(input[0]*1)){
    input.reverse();
  }

  for( let i =1; i<input.length;i++){
    const diff = input[i]*1-input[i-1]*1;
    if( diff < 1 || diff > 3){
      return false;
    }
  }
  console.log(input + " Safe");
  return true;
}

fs.readFile('input', 'utf8', (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    let total = 0;
    const lines = data.trim().split('\n');
    lines.forEach(line => {
        const blocs = line.split(' ');
       
        if( isSafe(blocs)){
          total++;
        }else{
          for(let i = 0; i<blocs.length;i++){
            let input = blocs.slice();
            input.splice(i,1);
            if( isSafe(input)){
              total++;
              break;
            }
          }
        }
    });


    console.log("Résultat: " + total);
  });