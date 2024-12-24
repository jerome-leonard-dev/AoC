const { clearScreenDown } = require('readline');

function main(input = 'test', maxX=11, maxY=7, at=100 ){
  const fs = require('fs');
  console.log(new Date().toString());
  fs.readFile(input, 'utf8', async (err, data) => {
  
  console.log("Start: "+new Date().toString());
/*
p=0,4 v=3,-3
p=6,3 v=-1,-3
p=10,3 v=-1,2
p=2,0 v=2,-1
p=0,0 v=1,3
p=3,0 v=-2,-2
p=7,6 v=-1,-3
p=3,0 v=-1,-2
p=9,3 v=2,3
p=7,3 v=-1,2
  p=2,4 v=2,-3
p=9,5 v=-3,-3
*/
  let bots = [];
  let lines = data.split('\n');
  for( let i = 0; i < lines.length; i++){
    const line = lines[i];
    const splits = line.replaceAll(/[=,]/g,' ').split(' ');
    bots[i] = {x0:splits[1]*1, y0:splits[2]*1, dx:splits[4]*1, dy:splits[5]*1};
  }

  //for(let i = 0; i < 6; i++)seeBotAt(bots[10], i, maxX, maxY);
  for(let n = 0; n<at; n++){
    let botsByLine = [];
    for(let i = 0; i < bots.length; i++){
      const bot = bots[i];
      const posAtTime = getPosAt(bot, n, maxX, maxY);
      posAtTime.bot=i;
      if( undefined == botsByLine[posAtTime.y])botsByLine[posAtTime.y] = "".padStart(maxX," ").split('');
      botsByLine[posAtTime.y][posAtTime.x]=1;
    }
    if( botsByLine.filter(x=>x.join('').indexOf("11111111")!=-1).length>5){
      seeBotAt(bots, n, maxX, maxY);
      await sleep(1000);
    }
  }
  console.log(new Date().toString());
});
}

main(process.argv[2], process.argv[3]*1, process.argv[4]*1, process.argv[5]*1);

function getPosAt(bot, time, maxX, maxY){
  const pos = {x:(bot.x0+(time*bot.dx))%maxX,y:(bot.y0+(time*bot.dy))%maxY};
  if(pos.x < 0) pos.x += maxX;
  if(pos.y < 0) pos.y += maxY;
  return pos;
}

function seeBotAt(bots, time, maxX, maxY){
  const map = [];
  const line = [];
  for(let i = 0; i<maxX; i++)line.push(0);
  for(let i = 0; i<maxY; i++)map.push(JSON.parse(JSON.stringify(line)));
  
  bots.forEach(bot => {
    const posAtTime = getPosAt(bot, time, maxX, maxY);
    map[posAtTime.y][posAtTime.x]+=1;
  });
  
  console.log("After "+time+" seconds:");
  console.log(map.map(x=>x.join(' ').replaceAll("0"," ")).join('\n')+'\n');
  console.log("it was "+time+" seconds:");
}

function sleep(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}