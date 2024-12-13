const fs = require('fs');
console.log(new Date().toString());
fs.readFile('input', 'utf8', (err, data) => {
  
  if (err) {
    console.error(err);
    return;
  }

  //125 17
  let stones = data.split(' ').map(x=>x*1);
  for( let i = 0; i < 25; i++){
    let tmp = [];
    //console.log(stones);
    for( j in stones){
      tmp = tmp.concat(blinkStone(stones[j]));
    };
    console.log ( (""+i).padStart(4,' ')+" : "+(""+tmp.length).padStart(10,' '));//+" : "+tmp);
    stones = tmp;
  }

  console.log("Total: "+stones.length);
  console.log(new Date().toString());
});

function blinkStone(value){
  let res = []
  if( value == 0){
    res = [1]
  } else if( (""+value).length%2==0){
    svalue = ""+value;
    res =  [svalue.slice(0,svalue.length/2)*1,svalue.slice(svalue.length/2)*1];

  } else {
    res = [value*2024];
  }
  //console.log(value + " => " + res);
  return res;
}

