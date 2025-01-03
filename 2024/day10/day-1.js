const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  const map = [];

  const values = data.split('\n');
  for( let y = 0; y < values.length; y++){
    map[y] = [];
    for( let x = 0; x < values[y].length; x++){
      map[y][x] = values[y][x]*1;
    }
  }
  dump(map);

  const paths = [];
  for( let y = 0; y < map.length; y++){
    for( let x = 0; x < map[y].length; x++){
      if( map[y][x] == 0){
        const start = {x:x, y:y};
        const startId = ""+(start.x+"x"+start.y);
        paths[startId] = [];
        moveNext(map, paths, start, start);
      }
    }
  }

  console.log("Paths: "+JSON.stringify(paths));

  let total = 0;
  for(let i in paths){
    total += dedoublonne(paths[i]).length;
  }

  console.log("Total: "+total);

});

function moveNext(map, paths, start, current){
  const val = map[current.y][current.x];
  
  console.log( "".padStart(val, "  ") + JSON.stringify(current)+"   :  "+val);
  if(val == 9){
    const startId = ""+(start.x+"x"+start.y);
    paths[startId].push(current);
    console.log(JSON.stringify(start)+"==>"+JSON.stringify(current))
    return;
  }
  //N :  0,-1
  if( current.y > 0 && map[current.y-1][current.x]==map[current.y][current.x]+1){
    moveNext(map, paths, start, {x:current.x, y: current.y-1});
  }
  //S :  0, 1
  if( current.y < map.length-1 && map[current.y+1][current.x]==map[current.y][current.x]+1){
    moveNext(map, paths, start, {x:current.x, y: current.y+1});
  }
  //E :  1, 0
  if( current.x < map[0].length-1 && map[current.y][current.x+1]==map[current.y][current.x]+1){
    moveNext(map, paths, start, {x:current.x+1, y: current.y});
  }
  //W : -1, 0 
  if( current.x > 0 && map[current.y][current.x-1]==map[current.y][current.x]+1){
    moveNext(map, paths, start, {x:current.x-1, y: current.y});
  }
}

function dump(tab){
  for( let i in tab){
    console.log( tab[i].join(' '));
  }
}

function dedoublonne(items) {
  return items.filter((o, index, arr) => arr.findIndex(item => item.x === o.x && item.y === o.y) === index);
}
