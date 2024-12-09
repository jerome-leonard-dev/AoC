const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let total = 0;

  let res=[];
  let map = {};
  const lines = data.split('\n');
  const maxX = lines[0].length;
  const maxY = lines.length;
  for( let i = 0; i < lines.length; i++){
    res[i]=[];
    const cars = lines[i].split('');
    for( let j = 0; j < cars.length; j++){
      const car = cars[j];
      res[i][j] = car;
      if( car == '.')continue;
      if(map[car] == undefined){
        map[car]=[];
      }
      map[car].push({y:i,x:j});
    }
  }

  let antinodes = []
  for( var key in map) {
    console.log(key+"=>"+JSON.stringify(map[key]));
    const antenas = map[key];
    for( i = 0; i < antenas.length;i++) {
      const ref = antenas[i];
      for( j = 0; j < antenas.length; j++) {
        const check = antenas[j];
        //console.log(JSON.stringify(ref)+" Vs "+JSON.stringify(check));
        if( check.x == ref.x && check.y == ref.y)continue;
        let antinode = {y:ref.y, x:ref.x};
        antinodes.push(antinode);
        while(true){
          antinode = {y:antinode.y+(ref.y-check.y),x:antinode.x+(ref.x-check.x)};
          //{"y":1,"x":8} Vs {"y":2,"x":5}->{y:0,x:11}
          if(antinode.x >=0 && antinode.x < maxX && antinode.y >= 0 && antinode.y < maxY){
            res[antinode.y][antinode.x] = '#';
            //console.log("    "+JSON.stringify(antinode));
            antinodes.push(antinode);
          } else {
            break;
          }
        }
      }
    }
  };
  
  console.log(JSON.stringify(antinodes));

  total = dedoublonne(antinodes).length;

  const res2 = res.map(item=>item.join(' '));
  console.log(res2);

  console.log("Total: "+total);



});

function dedoublonne(items) {
  return items.filter((o, index, arr) => arr.findIndex(item => item.x === o.x && item.y === o.y) === index);
}
