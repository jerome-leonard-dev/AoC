function main(input = 'input', num = ''){
  const fs = require('fs');
  console.log(new Date().toString());
  fs.readFile(input+num, 'utf8', async (err, data) => {
    
    if (err) {
      console.error(err);
      return;
    }

    //125 17
    let stones = data.split(' ').map(x=>BigInt(x));
    for( let i = 0; i < 75; i++){
      const start = Date.now();
      let tmp = await processData(stones);

      console.log ((""+(Date.now()-start)).padStart(10,"0")+":"+ (""+i).padStart(4,' ')+" : "+(""+tmp.length).padStart(20,' ') +" : "+new Date().toString());
      console.log(tmp.join(' '));
      stones = tmp;
    }


    const batchSize = 100000; // Taille d'un lot
    let i = 0;
    for (; i*batchSize < stones.length; i++) {
      try {
        fs.writeFileSync('int'+(i+1), stones.slice(i*batchSize, (i +1)*batchSize).join(' '));
      } catch (err) {
        console.error(err);
      }
    }


    console.log("Total: "+stones.length);
    console.log("Chuncks: "+i);
    console.log(new Date().toString());
    return i;
  });

  const blinkStones = (values) => {
    let result = [];
    for( i = 0; i < values.length; i++){
      result.push(blinkStone(values[i]));
    }
    return result;
  }

  const blinkStone = (value) => {
    const start = Date.now();
    let res = []
    if( value == 0){
      res = [BigInt(1)]
    } else if( (""+value).length%2==0){
      svalue = ""+value;
      res =  [BigInt(svalue.slice(0,svalue.length/2)),BigInt(svalue.slice(svalue.length/2))];

    } else {
      res = [value*BigInt(2024)];
    }
    //console.log("=="+(Date.now()-start));
    //console.log(value + " => " + res);
    return res;
  }

  const processData = async (data) => {
    const batchSize = 5000; // Taille d'un lot
    const batches = [];
    
    for (let i = 0; i < data.length; i += batchSize) {
        batches.push(data.slice(i, i + batchSize));
    }
    
    const promises = batches.map((batch) => blinkStones(batch));
    const results = await Promise.all(promises);
    return results.flat().flat(); // Combine les résultats
  };
}

main(process.argv[2], process.argv[3]);


