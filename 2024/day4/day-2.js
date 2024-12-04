const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let lns = [];
  let cols = [];
  let diags = [];
  let diags2 = [];
  const lines = data.split('\n');
  for( let j = 0; j < lines.length; j++){
      const line = lines[j];
      lns.push(line);
      for( let i = 0; i < line.length; i++){
        cols[i] = (cols[i]==undefined?"":cols[i])+line[i];
         diags[lines.length-j+i] = (diags[lines.length-j+i]==undefined?"":diags[lines.length-j+i])+line[i];
         diags2[lines.length-j+i] = (diags2[lines.length-j+i]==undefined?"":diags2[lines.length-j+i])+line[line.length-i-1];
      }
  };

  let total = 0;
  const full = lns.concat(cols, diags, diags2);
  for( let i = 0; i < full.length; i++){
    if(full[i]){
      console.log( full[i] + "  => "+[...full[i].matchAll('XMAS')].length + ":" +[...full[i].matchAll('SAMX')].length);
      total += [...full[i].matchAll('XMAS')].length;
      total += [...full[i].matchAll('SAMX')].length;
    }
  }

  console.log("Total: "+total);
});