const fs = require('fs');

fs.readFile('input', 'utf8', (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  let res = [];
  console.log(data);
  const values = data.split('');
  for( let i = 0; i < values.length; i++){
    if(i%2 == 0){
      res.push({id:i/2, length:values[i]*1});
    }else{
      res.push({id:-1, length:values[i]*1});
    }
  }
  //dump(res);

  let end = res[res.length-1].id;
  while(end >0){
    const item = res.find(x=>x.id==end);
    res = moveOne(res, item);
    //if(item.id!=-1)dump(res, "    ");
    end = end-1;
  }
  //dump(res);
  
  let total = 0;
  let idx = 0;
  for(let i = 0 ;i<res.length;i++){
    const count = res[i].length;
    const id = res[i].id;
    for(j = 0; j < count;j++){
      if( res[i].id != -1){
        total += id*idx;
      }
      idx++;
    }
  }

  console.log("Total: "+total);

});

function moveOne( list, item){
  let res = [];
  let fill = false;
  let moved = false;
  for(let i = 0; i < list.length;i++){
    if( fill){
      res.push(list[i]);
      continue;
    }
    switch(list[i].id){
      case -1:
        if(!moved && list[i].length == item.length){
          res.push(item);
          moved = true;
        } else if(!moved && list[i].length >= item.length){
          res.push(item);
          res.push({id:-1, length:(list[i].length - item.length)});
          moved = true;
        } else {
          res.push(list[i]);
        }
        break;
      case item.id:
        if(!moved){
          res.push(list[i]);
        } else {
          res.push({id:-1, length:item.length});
        }
        fill = true;
        break;
      default:
        res.push(list[i]);
        break
    }
  }

  return res;
}

function dump(list, prefix=""){
  let res = "";
  for(let i = 0;i<list.length;i++){
    if( list[i].id==-1){
      res += "".padStart(list[i].length,'.');
    }else{
      res += "".padStart(list[i].length,""+list[i].id);
    }
  }
  console.log(prefix+res);
}
