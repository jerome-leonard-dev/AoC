const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let res = [];
  const values = data.split('');
  for( let i = 0; i < values.length; i++){
    if(i%2 == 0){
      push(res, values[i]*1, ""+(i/2));
    }else{
      push(res, values[i]*1, ".");
    }
  }
  //console.log(res);

  let end = res.length-1;
  for(let i = 0; i < res.length;i++){
    if(res[i] == '.'){
      while(res[end]=='.'){
        end--;
      if(end <= i)break;
      }
      if(end <= i)break;
      res[i]=res[end];
      res[end]='.'
    }
    //console.log(res.join('').substring(0,165));
    if(end <= i)break;
  }
console.log(res.join('|'));
  let total = 0;
  for(let i = 0 ;i<res.length;i++){
    if( res[i] != '.'){
      total += (res[i]*1)*i;
    }
  }

  console.log("Total: "+total);

});

function push(tab, nb, id){
  for(i = 0; i<nb;i++){
    tab.push(id);
  }
}