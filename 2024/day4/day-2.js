const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let total = 0;
  const lines = data.replace(/ /g,'').split('\n');
  for( let j = 1; j < lines.length-1; j++){
      for( let i = 1; i < lines[j].length-1; i++){
        if( lines[j][i]=='A'){
          let str=j+":"+i;
          if( ((lines[j-1][i-1]==='M' && lines[j+1][i+1]==='S') || (lines[j-1][i-1]==='S' && lines[j+1][i+1]==='M')) &&
              ((lines[j+1][i-1]==='M' && lines[j-1][i+1]==='S') || (lines[j+1][i-1]==='S' && lines[j-1][i+1]==='M'))){
            total++;
            str+="X";
          }
          console.log(str);
        }

      }
  };

  console.log("Total: "+total);
});