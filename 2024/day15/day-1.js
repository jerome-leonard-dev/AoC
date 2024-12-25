function main(input = 'test'){
  const fs = require('fs');
  console.log(new Date().toString());
  fs.readFile(input, 'utf8', async (err, data) => {
  
  console.log("Start: "+new Date().toString());
/*
########
#..O.O.#
##@.O..#
#...O..#
#.#.O..#
#...O..#
#......#
########

<^^>>>vv<v>>v<<
*/
  let map = [];
  let moves = [];
  let lines = data.split('\n');
  let isMap = true;
  let bot = {x:0,y:0};
  for( let i = 0; i < lines.length; i++){
    const line = lines[i].split('');
    if( line.length == 0){
      isMap = false;
      continue;
    }
    if( isMap){
      map.push(line);
      if(line.indexOf('@')!=-1){
        bot.x = line.indexOf('@');
        bot.y = i;
      }
    } else {
      moves = moves.concat(line);
    }
  }

  
  draw(map);
  moves.forEach(mvt => {
    //console.log(mvt);
    if(move(map, bot,mvt)){
      switch(mvt){
        case '^':
          bot.y = bot.y-1;
          break;
        case 'v':
          bot.y = bot.y+1;
          break;
        case '>':
          bot.x = bot.x+1;
          break;
        case '<':
          bot.x = bot.x-1;
          break;
      }
    }
    //draw(map);
  });

  let total = 0;
  for(let i = 0; i<map.length;i++){
    for(let j = 0; j<map[i].length;j++){
      if(map[i][j]=='O')total += (100*i+j);
    }
  }

  console.log("Total: "+total);
  console.log(new Date().toString());
});
}

function move(map, from, mvt){
  const to = {x:from.x,y:from.y};
  switch(mvt){
    case '^':
      to.y = to.y-1;
      break;
    case 'v':
      to.y = to.y+1;
      break;
    case '>':
      to.x = to.x+1;
      break;
    case '<':
      to.x = to.x-1;
      break;
  }
  const obj = map[to.y][to.x];
  if(obj=='#')return false;
  if(obj == '.'){
    map[to.y][to.x]=map[from.y][from.x];
    map[from.y][from.x]='.';
    return true;
  }
  if(move(map, {x:to.x,y:to.y}, mvt)){
    map[to.y][to.x]=map[from.y][from.x];
    map[from.y][from.x]='.';
    return true;
  }
  return false;
}

function draw(map){
  console.log(map.map(x=>x.join(' ')).join('\n')+'\n');
}

main(process.argv[2]);
