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
        guard.viewed.push({x:guard.x,y:guard.y});
        break;
      }
  }

  while(!isBlocked(guard,lines)){
    stepForward(guard,lines);
    //dump(guard, data)
  }
  

  const uniq = dedoublonne(guard.viewed);

  console.log("Total: "+uniq.length); 

});

function dedoublonne(items) {
  return Array.from(new Set(items.map(o => JSON.stringify(o)))).map(str => JSON.parse(str));
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
      if(lines[guard.y-1][guard.x]==='#'){
        guard.z = '>';
      } else {
        guard.y--;
        guard.viewed.push({x:guard.x,y:guard.y});
      }
      break;
    case 'v':
      if(lines[guard.y+1][guard.x]==='#'){
        guard.z = '<';
      } else {
        guard.y++;
        guard.viewed.push({x:guard.x,y:guard.y});
      }
      break;
    case '>':
      if(lines[guard.y][guard.x+1]==='#'){
        guard.z = 'v';
      } else {
        guard.x++;
        guard.viewed.push({x:guard.x,y:guard.y});
      }
      break;
    case '<':
      if(lines[guard.y][guard.x-1]==='#'){
        guard.z = '^';
      } else {
        guard.x--;
        guard.viewed.push({x:guard.x,y:guard.y});
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