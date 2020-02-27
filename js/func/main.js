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
  let max = +$(ths).siblings(".graphX").attr("max"),
      min = +$(ths).siblings(".graphX").attr("min");
  $(ths).attr({percent: Math.round((value) * 100 / (max))});
  console.log(min, value, max)
  $(ths).siblings(".graphX").children(".graph").css("left", -5*(value)*xW(parent(ths, 2).attr("username")));
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
  canvasTimer(ctx, user, min, max, yMax, xMax);     

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

function smallLine(ctx, user, start, yMax){
  for(let i = 1; i < 3; i++){
    ctx.beginPath();
    ctx.moveTo(5*xW(user)*(3*start+i), 0);
    ctx.lineTo(5*xW(user)*(3*start+i), yMax);
    ctx.strokeStyle = "#0002";
    ctx.stroke();
    ctx.clearRect(5*xW(user)*(3*start+i), 0, 1, yMax);    
  }  
}
function dotted(ctx, user, start, yMax){
  ctx.strokeStyle = "#0004";
  let y = 0, length = yMax/5;
  for(let i = 0; i < length; i++){
    ctx.beginPath();
    ctx.moveTo(15*xW(user)*start, y);
    ctx.lineTo(15*xW(user)*start, y+3);
    ctx.stroke();   
    y += 5;
  }
  ctx.clearRect(15*xW(user)*start, 0, 1, 200);  
}
function canvasTimer(ctx, user, min, max, yMax, xMax){
  let num = Math.ceil(100/xH(user));
  let fillText = false;
  ctx.beginPath();
  ctx.fillStyle = "#0004";
  ctx.lineWidth = 1;
  ctx.textAlign = "center"; 
  for(let t = Math.floor(min/15); t <= Math.round(max/15)*2; t++){   
    let minute = t%2*30 == "0" ? t%2*30+"0" : t%2*30;
    let hour = zero(Math.floor(t/2) > 23 ? Math.floor(t/2)-24 : Math.floor(t/2), 2);
    let start = (t - Math.floor(min/15));
    ctx.fillText(`${hour} ${minute}`, 15*xW(user)*start-1, ((yMax-10) - num*xH(user))/2);
    
    if(fillText){
      ctx.beginPath();
      ctx.moveTo(15*xW(user)*start, 0);
      ctx.lineTo(15*xW(user)*start, yMax);
      ctx.strokeStyle = "#0006";
      ctx.stroke();
      ctx.clearRect(15*xW(user)*start, 0, 1, yMax);
      ctx.fillText(num, 15*xW(user)*(start + 0.5), (yMax-5) - num*xH(user))
    }else{dotted(ctx, user, start, yMax)}
    smallLine(ctx, user, start, yMax) 
    fillText = !fillText;
  }
  for(let i = 1; i < 4; i++){
    ctx.beginPath();
    ctx.moveTo(0, (yMax - num*xH(user))/2*i);
    ctx.lineTo(xMax, (yMax - num*xH(user))/2*i);
    ctx.strokeStyle = i==2 ? "#0006" : "#0004";
    ctx.stroke();  
    ctx.clearRect(0, (yMax - num*xH(user))/2*i, xMax, 1)  
  } 
  if(cookie["turn_midnight"][pathname] == "1"){
    ctx.beginPath();
    ctx.moveTo((720 - Math.floor(min/5)*5)*xW(user), 0);
    ctx.lineTo((720 - Math.floor(min/5)*5)*xW(user), yMax);
    ctx.lineWidth = 2;
    ctx.strokeStyle = "#0006";
    ctx.stroke();  
  }
} 

