const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }
  let total = 0;
  let total2 = 0;

  let rules = [];
  let pages = [];
  let isPages = false;
  const lines = data.split('\n');
  for( let j = 0; j < lines.length; j++){
      const line = lines[j];
    if(line.length ==0){
      isPages=true;
      rules.forEach((v,k) => {console.log(k+"=>"+v)});
      console.log("================");
      continue;
    }
    if(!isPages){
      const rule = line.split('|')
      if( undefined == rules[rule[0]]){
        rules[rule[0]] = [];
      }
      rules[rule[0]].push(rule[1]);
    }else{
      //check rules for line
      let isValid = isLineValid(line, rules);
      console.log(j+"=>"+line+ "{valid:"+isValid.valid+",k:"+isValid.k+",r:"+isValid.r+",i:"+isValid.i+"} ");
      if(isValid.valid){
        const ln = line.split(',');
//        console.log(ln[(ln.length-1)/2]*1);
        total += ln[(ln.length-1)/2]*1;
      } else {
        let ln = line.split(',');
        while(!isValid.valid){
          const v1 = ln[isValid.k];
          const v2 = rules[isValid.r][isValid.i];
          ln[isValid.k] = v2;
          ln[isValid.f] = v1;
          isValid = isLineValid(ln.join(','), rules);
          console.log(j+"=>"+ln+ "{valid:"+isValid.valid+",k:"+isValid.k+",r:"+isValid.r+",i:"+isValid.i+"}");
        }
        total2 += ln[(ln.length-1)/2]*1;
      }

    }

  };

  console.log("Total: "+total);
  console.log("Total2: "+total2);
});

function isLineValid(line, rules){
      //75,47,61,53,29
//console.log("****check line:"+line);
      const ln = line.split(',');

      for( let k = 0; k < ln.length; k++){
        const v = ln[k];
//        console.log("check elt:"+k+"::"+v);
        //(75,0)
        const rule = rules[v];
        //75=>29,53,47,61,13
        if(rule){
//          console.log("check rule:"+rule);
          for( let i = 0; i <rule.length; i++){
//            console.log("check page "+rule[i] + " after "+v+"   "+ ln.indexOf( rule[i]) + "<"+k);
            if(ln.indexOf( rule[i]) >=0 && ln.indexOf( rule[i]) <k){
              return {valid:false, k:k, f:ln.indexOf( rule[i]), r:v, i:i, };
            }
          }
        }
      };
      return {valid:true};
}