const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let total = 0;

  let map = {};
  const lines = data.split('\n');
  const maxX = lines[0].length;
  const maxY = lines.length;
  for( let i = 0; i < lines.length; i++){
      const cars = lines[i].split('');
      for( let j = 0; j < cars.length; j++){
        const car = cars[j];
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
        const antinode = {y:ref.y+(ref.y-check.y),x:ref.x+(ref.x-check.x)}; //{"y":1,"x":8} Vs {"y":2,"x":5}->{y:0,x:11}
        if(antinode.x >=0 && antinode.x < maxX && antinode.y >= 0 && antinode.y < maxY){
          //console.log("    "+JSON.stringify(antinode));
          antinodes.push(antinode);
        }
      }
    }
  };
  
  console.log(JSON.stringify(antinodes));

  total = dedoublonne(antinodes).length;

  console.log("Total: "+total);

});

function dedoublonne(items) {
  return items.filter((o, index, arr) => arr.findIndex(item => item.x === o.x && item.y === o.y) === index);
}
