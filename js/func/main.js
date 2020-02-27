///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа правого бегунка 
function rightRange(ths){
  let value = !ths ? 0 : $(ths).val(),
      sID = parent(ths, 2).attr("sID");
  canvas(ths, value)
  $(ths).parent().attr({meme: Object.keys(content[sID])[value], sum: $(ths).attr("m"+value)});
  $(ths).siblings(".allMaxLine").children(`dot`).attr({hover: 0})
                                .siblings(`dot[meme="m${value}"]`).attr({hover: 1})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа нижнего бегунка 
function bottomRange(ths){
  let value = +$(ths).val();
  let max = +$(ths).attr("max"),
      min = +$(ths).attr("min");
  $(ths).attr({percent: Math.round((value - min) * 100 / (max - min))});
  $(ths).siblings(".graphX").children(".graph").css("left", -5*(value - min)*xW(parent(ths, 2).attr("username")));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dotclick(ths){
  let value = +$(ths).attr("meme").slice(1),
      rightRange = $(ths).parent().siblings(".rightRange")
  canvas(rightRange, value)
  rightRange.val(value);
  $(ths).parent().children("dot").attr({hover: 0})
                 .siblings(`dot[meme="m${value}"]`).attr({hover: 1})
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function canvas(ths, mem){
  let sID  = +parent(ths, 2).attr("sID"),
      user = +parent(ths, 2).attr("username"),
      min  = +$(ths).siblings(".graphX").attr("min"),
      max  = +$(ths).siblings(".graphX").attr("max"),
      xMax = +$(ths).siblings(".graphX").children(".graph").attr("width"),
      yMax = +$(ths).siblings(".graphX").children(".graph").attr("height"),
      ctx  = document.getElementById(`canvas${sID}`).getContext("2d"); 
  let maxPoints = 0;
  ctx.clearRect(0, 0, xMax, yMax);
  canvasTimer(ctx, sID, min, max, yMax, xMax);     

  ctx.beginPath();
  ctx.fillStyle = atColor[mem]+"cc";
  try{
    ctx.moveTo(0, yMax); 
    for(let gap = Math.floor(min/5)*5; gap < Math.round(max/5)*5; gap++){
      let points = gap < min ? 0 : gap > max ? 0 : Math.floor(content[sID][Object.keys(content[sID])[mem]]["g"+gap]);
      ctx.lineTo((gap-min+1)*xW(user), yMax - points*xH(user));
      ctx.lineTo((gap-min+2)*xW(user), yMax - points*xH(user));
      ctx.lineTo((gap-min+2)*xW(user), yMax)
      maxPoints = points > maxPoints ? points : maxPoints;   
    }
    ctx.fill();

    if(cookie["turn_maxline"][pathname] == "1"){
      ctx.beginPath();
      ctx.moveTo(0,    (yMax-1) - maxPoints*xH(user));
      ctx.lineTo(xMax, (yMax-1) - maxPoints*xH(user));
      ctx.strokeStyle = atColor[mem];
      ctx.stroke();
      ctx.textAlign = "center";
      for(let t = Math.floor(min/15); t <= Math.round(max/15)*2; t+=2){
        let height = (yMax-5) - maxPoints*xH(user) <= 10 ? 10 : (yMax-5) - maxPoints*xH(user)
        ctx.fillText(Math.ceil(maxPoints), 15*xW(user)*((t - Math.floor(min/15)) + 0.5), height)
      }
    }
  }catch(e){}
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function canvasTimer(ctx, cID, min, max, yMax, xMax){
  let num = Math.ceil(100/xH(cID));
  let fillText = false;
  ctx.beginPath();
  ctx.fillStyle = "#0004";
  ctx.lineWidth = 1;
  ctx.textAlign = "center"; 
  for(let t = Math.floor(min/15); t <= Math.round(max/15)*2; t++){   
    let minute = t%2*30 == "0" ? t%2*30+"0" : t%2*30;
    let hour = zero(Math.floor(t/2) > 23 ? Math.floor(t/2)-24 : Math.floor(t/2), 2);
    let start = (t - Math.floor(min/15));
    ctx.fillText(`${hour} ${minute}`, 15*xW(cID)*start-1, ((yMax-10) - num*xH(cID))/2);
    
    if(fillText){
      ctx.beginPath();
      ctx.moveTo(15*xW(cID)*start, 0);
      ctx.lineTo(15*xW(cID)*start, yMax);
      ctx.strokeStyle = "#0006";
      ctx.stroke();
      ctx.clearRect(15*xW(cID)*start, 0, 1, yMax);
      ctx.fillText(num, 15*xW(cID)*(start + 0.5), (yMax-5) - num*xH(cID))
    }else{dotted(ctx, cID, start, yMax)}
    smallLine(ctx, cID, start, yMax) 
    fillText = !fillText;
  }
  for(let i = 1; i < 4; i++){
    ctx.beginPath();
    ctx.moveTo(0, (yMax - num*xH(cID))/2*i);
    ctx.lineTo(xMax, (yMax - num*xH(cID))/2*i);
    ctx.strokeStyle = i==2 ? "#0006" : "#0004";
    ctx.stroke();  
    ctx.clearRect(0, (yMax - num*xH(cID))/2*i, xMax, 1)  
  } 
  if(coo["graph"].slice(1,2) == 1){
    ctx.beginPath();
    ctx.moveTo((720 - Math.floor(min/5)*5)*xW(cID), 0);
    ctx.lineTo((720 - Math.floor(min/5)*5)*xW(cID), yMax);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0006";
    ctx.stroke();  
  }
} 



