const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let total = 0;


  const lines = data.split('\n');
  const guard = {x:-1, y:-1, z:'^', viewed:[]};
  for( let j = 0; j < lines.length; j++){
      guard.x = Math.max(lines[j].indexOf('^'),lines[j].indexOf('v'),lines[j].indexOf('<'),lines[j].indexOf('>'));
      if( guard.x != -1){
        guard.y = j;
        guard.z=lines[guard.y][guard.x];
        guard.viewed.push({x:guard.x,y:guard.y,z:guard.z});
        break;
      }
  }
  const guard_start = {x:guard.x, y:guard.y, z:guard.z};
  while(!isBlocked(guard,lines)){
    stepForward(guard,lines);
    //dump(guard, data)
  }
  

  const uniq = dedoublonne(guard.viewed);

  console.log("Total: "+uniq.length);
  const positionsToStuck = [];

  for(let i =0; i<uniq.length;i++){
    const lns = getLinesStucked(data, {x:uniq[i].x,y:uniq[i].y})
    const grd = {x:guard_start.x, y:guard_start.y, z:guard_start.z, viewed:[]};
    while(!isBlocked(grd,lns)){
      stepForward(grd,lns);
      if( isStucked(grd)){
        positionsToStuck.push({x:uniq[i].x,y:uniq[i].y});
        break;
      }
      //dump(guard, data)
    }
  }
  console.log("Total2: "+positionsToStuck.length);
});

function isStucked(guard){
  return guard.viewed.filter(item => item.x===guard.x && item.y===guard.y && item.z===guard.z).length>1;
}

function getLinesStucked(data, stuckAt){
  let map = data.split('\n');
  const str = map[stuckAt.y].split('');
  str[stuckAt.x]= 'O';
  map[stuckAt.y] = str.join('');
  return map;
}

function dedoublonne(items) {
  return items.filter((o, index, arr) => arr.findIndex(item => item.x === o.x && item.y === o.y) === index);
}

function dump(guard, data){
  let map = data.split('\n');
  console.log('\n'+map[0].replace(/./g,'=')+'\n');
  for(let i = 0; i < guard.viewed.length; i++){
    const str = map[guard.viewed[i].y].split('');
    str[guard.viewed[i].x]= 'X';
    map[guard.viewed[i].y] = str.join('');
  }
   console.log(map.join('\n')+[...map.join('').matchAll(/X/g)].length);
}

function stepForward(guard, lines){
  switch( guard.z){
    case '^':
      if(lines[guard.y-1][guard.x]==='#'||lines[guard.y-1][guard.x]==='O'){
        guard.z = '>';
      } else {
        guard.y--;
        guard.viewed.push({x:guard.x,y:guard.y,z:guard.z});
      }
      break;
    case 'v':
      if(lines[guard.y+1][guard.x]==='#'||lines[guard.y+1][guard.x]==='O'){
        guard.z = '<';
      } else {
        guard.y++;
        guard.viewed.push({x:guard.x,y:guard.y,z:guard.z});
      }
      break;
    case '>':
      if(lines[guard.y][guard.x+1]==='#'||lines[guard.y][guard.x+1]==='O'){
        guard.z = 'v';
      } else {
        guard.x++;
        guard.viewed.push({x:guard.x,y:guard.y,z:guard.z});
      }
      break;
    case '<':
      if(lines[guard.y][guard.x-1]==='#'||lines[guard.y][guard.x-1]==='O'){
        guard.z = '^';
      } else {
        guard.x--;
        guard.viewed.push({x:guard.x,y:guard.y,z:guard.z});
      }
      break;
  }
}

function isBlocked(guard, lines){
  if( (guard.z == '^' && guard.y==0) || (guard.z == 'v' && guard.y==lines.length-1) || (guard.z == '<' && guard.x==0) || (guard.z == '>' && guard.x==lines[0].length-1) ){
    //console.log(guard.x+":"+guard.y+":"+guard.z+":BLOCKED")
    return true;
  }
  //console.log(guard.x+":"+guard.y+":"+guard.z+":GO")
  return false;
}