function main(input = 'input', num = ''){
  const fs = require('fs');
  console.log(new Date().toString());
  fs.readFile(input+num, 'utf8', async (err, data) => {
  
  console.log(new Date().toString());
/*
  RRRRIICCFF
  RRRRIICCCF
  VVRRRCCFFF
  VVRCCCJFFF
  VVVVCJJCFE
  VVIVCCJJEE
  VVIIICJJEE
  MIIIIIJJEE
  MIIISIJEEE
  MMMISSJEEE
*/
  let total=0;
  let map = [];
  let lines = data.split('\n');
  for( let i = 0; i < lines.length; i++){
    map[map.length] = lines[i].split('');
  }
  let map_o = JSON.parse(JSON.stringify(map));

  let zones = [];

  for(let y = 0; y < map.length; y++){
    for(let x = 0; x < map[y].length; x++){
      if( map[y][x] != '.'){
        if(zones[map[y][x]] == undefined)zones[map[y][x]]=[];
        let garden = [];
        propage(map, y, x, garden);
        zones[map_o[y][x]][zones[map_o[y][x]].length]=garden;
      }
    }
  }

  let nb = 1;
  for( let type in zones){
    for( let idx in zones[type]){
      let surface = 0;
      let perimetre = 0;
      for(let i = 0; i < zones[type][idx].length; i++){
        surface+=1;
        perimetre+=getPerimetre(map_o, zones[type][idx][i].x, zones[type][idx][i].y);
      }
      console.log(nb+++":"+type+"=>"+surface+"*"+perimetre+"="+surface*perimetre);
      total+=(surface*perimetre);
    }
  }

  console.log("Total: "+total);
  console.log(new Date().toString());
});


}

main(process.argv[2], process.argv[3]);

function propage(map, y, x, zones){
  zones[zones.length]={x:x,y:y};
  const type = map[y][x];
  map[y][x]='*';
  if( map[y-1] != undefined && map[y-1][x] == type)propage(map, y-1, x, zones);
  if( map[y+1] != undefined && map[y+1][x] == type)propage(map, y+1, x, zones);
  if( map[y][x-1] != undefined && map[y][x-1] == type)propage(map, y, x-1, zones);
  if( map[y][x+1] != undefined && map[y][x+1] == type)propage(map, y, x+1, zones);
//  console.log('\n\n'+map.map(x=>x.join(' ')).join('\n'));
  map[y][x]='.';
  return zones;
}

function getPerimetre(map, x, y){
  let perimetre = 0;
  const type = map[y][x];
  if( map[y-1] == undefined || map[y-1][x] == undefined || map[y-1][x] != type)perimetre+=1;
  if( map[y+1] == undefined || map[y+1][x] == undefined || map[y+1][x] != type)perimetre+=1;
  if( map[y][x-1] == undefined || map[y][x-1] != type)perimetre+=1;
  if( map[y][x]+1 == undefined || map[y][x+1] != type)perimetre+=1;

  return perimetre;
}

