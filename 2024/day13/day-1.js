function main(input = 'input', num = ''){
  const fs = require('fs');
  console.log(new Date().toString());
  fs.readFile(input+num, 'utf8', async (err, data) => {
  
  console.log("Start: "+new Date().toString());
/*
Button A: X+94, Y+34
Button B: X+22, Y+67
Prize: X=8400, Y=5400

*/
  let claws = [];
  let lines = data.split('\n');
  let claw = {};
  for( let i = 0; i < lines.length; i++){
    if( lines[i].startsWith("Button A:")){
      claw.Ax = lines[i].replaceAll('+', ' ').replace(',','').split(' ')[3]*1;
      claw.Ay = lines[i].replaceAll('+', ' ').replace(',','').split(' ')[5]*1;
    } else if( lines[i].startsWith("Button B:")){
      claw.Bx = lines[i].replaceAll('+', ' ').replace(',','').split(' ')[3]*1;
      claw.By = lines[i].replaceAll('+', ' ').replace(',','').split(' ')[5]*1;
    } else if( lines[i].startsWith("Prize:")){
      claw.x = lines[i].replaceAll('=', ' ').replace(',','').split(' ')[2]*1;
      claw.y = lines[i].replaceAll('=', ' ').replace(',','').split(' ')[4]*1;
    } else {
      claws[claws.length]=claw;
      claw = {};
    }
  }

  let total = 0;
  for(let i = 0; i < claws.length; i++){
    const claw = claws[i];
    const a = getA(claw);
    const b = getB(claw);
console.log(i+":"+JSON.stringify(claw)+" => A:"+a+",B:"+b+"="+(3*a+b));
    if( !isNaN(a) && !isNaN(b)){
      total += 3*a;
      total += b;
    }

  }

  console.log("Total: "+total);
  console.log(new Date().toString());
});
}

main(process.argv[2], process.argv[3]);

function getA(claw){
  const B = getB(claw);
  if( isNaN(B)) return NaN;
  let A = (claw.x-(claw.Bx*B))/claw.Ax;
  if( isNaN(A) || A%1!=0){
    A = NaN;
  }
  return A;
}

function getB(claw){
  let B = ((claw.Ax*claw.y)-(claw.Ay*claw.x))/((claw.Ax*claw.By)-(claw.Ay*claw.Bx));
  if( isNaN(B) || B%1!==0){
    B = NaN;
  }
  return B;
}

