///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа правого бегунка 
function rightRange(ths){
  let value = !ths ? 0 : $(ths).val(),
      sID = parent(ths, 2).attr("sID");
  canvas(ths, value)
  let meme = filter(["main", "archive"], pathname) ? Object.keys(content[sID])[value] : "Все"
  $(ths).attr({meme: meme})
  $(ths).parent().siblings("h4").attr({meme: meme, sum: $(ths).attr("m"+value)});
  $(ths).siblings(".allMaxLine").children(`dot`).attr({hover: 0})
                                .siblings(`dot[meme="m${value}"]`).attr({hover: cookie["turn"]["maxline"][pathname]})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа нижнего бегунка 
function bottomRange(ths){
  let value = +$(ths).val();
  let max = +$(ths).attr("max");
  $(ths).attr({percent: Math.round((value) * 100 / max)});
  $(ths).siblings(".graphX").children(".graph, .graphMin").css("left", -5*value*xW(parent(ths, 2).attr("username")));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dotclick(ths){
  let value = +$(ths).attr("meme").slice(1),
      rightRange = $(ths).parent().siblings(".rightRange"),
      sID = parent(ths, 3).attr("sID"),
      yMax = +parent(ths).siblings(".graphX").children(".graphAim").height(),
      ctx = document.getElementById(`aim${sID}`).getContext("2d");
  ctx.clearRect(0, 0, widthLi(), yMax);
  canvas(rightRange, value)
  rightRange.val(value).attr({meme: Object.keys(content[sID])[value]});
  parent(ths, 2).siblings("h4").attr({meme: Object.keys(content[sID])[value], sum: rightRange.attr("m"+value)});
  $(ths).parent().children("dot").attr({hover: 0})
                 .siblings(`dot[meme="m${value}"]`).attr({hover: 1})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openLi(ths){
  let sID = parent(ths, 3).attr("sID"),
      type = pathname == "archive" ? "main" : "comments"
  $(`#arrow_${type+sID}`).prop({checked: false})
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function canvas(ths, mem){
  let sID  = +parent(ths, 2).attr("sID"),
      user = parent(ths, 2).attr("username"),
      min  = +$(ths).siblings(".graphX").attr("min"),
      max  = +$(ths).siblings(".graphX").attr("max"),
      xMax = +$(ths).siblings(".graphX").children(".graph").attr("width"),
      yMax = +$(ths).siblings(".graphX").children(".graph").attr("height"),
      ctx  = document.getElementById(`canvas${sID}`).getContext("2d"),
      ctxMin = document.getElementById(`min${sID}`).getContext("2d"); 
  let maxPoints = 0;
  ctx.clearRect(0, 0, xMax, yMax);
  ctxMin.clearRect(0, 0, xMax, 40);
  canvasTimer(ctx, ctxMin, user, min, max, yMax, xMax);     

  ctx.beginPath();
  ctxMin.beginPath();
  let meme = Object.keys(content[sID])[mem],
      color = colorArr[infoBot["memes"][meme]]
  ctx.fillStyle = ctxMin.fillStyle = color+"cc";
  try{
    if(filter(["main", "archive"], pathname)){
      ctx.moveTo(0, yMax); 
      ctxMin.moveTo(0, yMax); 
      for(let gap = Math.floor((min-1)/5)*5; gap <= Math.round((max+1)/5)*5; gap++){
        let points = gap < min ? 0 : gap > max ? 0 : Math.round(content[sID][meme]["g"+gap]);
        ctx.lineTo((gap-min+1)*xW(user), yMax - points*xH(user));
        ctx.lineTo((gap-min+2)*xW(user), yMax - points*xH(user));
        ctx.lineTo((gap-min+2)*xW(user), yMax)
        ctxMin.lineTo((gap-min+1)*xW(user), 40 - points*xH(user)/5);
        ctxMin.lineTo((gap-min+2)*xW(user), 40 - points*xH(user)/5);
        ctxMin.lineTo((gap-min+2)*xW(user), 40)
        maxPoints = points > maxPoints ? points : maxPoints;   
      }
      ctx.fill();
      ctxMin.fill();

      if(cookie["turn"]["maxline"][pathname] == "1"){
        ctx.beginPath();
        ctx.moveTo(0,    (yMax-1) - maxPoints*xH(user));
        ctx.lineTo(xMax, (yMax-1) - maxPoints*xH(user));
        ctx.strokeStyle = ctxMin.strokeStyle = color;
        ctx.stroke();
        ctx.textAlign = "center";
        ctxMin.beginPath();
        ctxMin.moveTo(0,    (40-1) - maxPoints*xH(user)/5);
        ctxMin.lineTo(xMax, (40-1) - maxPoints*xH(user)/5);
        ctxMin.stroke();
        for(let t = Math.floor(min/15); t <= Math.round(max/15)*2; t+=2){
          let height = (yMax-5) - maxPoints*xH(user) <= 10 ? 10 : (yMax-5) - maxPoints*xH(user)
          ctx.fillText(Math.ceil(maxPoints), 15*xW(user)*((t - Math.floor(min/15)) + 0.5), height)
        }
      }
    }else{
      let memeName = max == mem ? "allTriggers" : content[sID]["list"][mem];
      for(let i = 0; i < content[sID][memeName]["map"].length; i++){
        let num = +content[sID][memeName]["map"][i].split(":"),
            // color = colorArr[infoBot["memes"][Object.keys(infoBot["memes"])[content[sID]["allTriggers"]["val"][num]]]],
            value = max == mem ? num : +content[sID]["allTriggers"]["map"][num];
        
        ctx.beginPath();
        // ctx.fillStyle = ctxMin.fillStyle = color+"cc"; 
        ctx.moveTo((i)*xW(user), yMax)
        ctx.lineTo((i)*xW(user), yMax - value*xH(user));
        ctx.lineTo((i+1)*xW(user), yMax - value*xH(user));
        ctx.lineTo((i+1)*xW(user), yMax)
        ctx.fill();
        ctxMin.beginPath(); 
        ctxMin.moveTo((i)*xW(user), 40)
        ctxMin.lineTo((i)*xW(user), (yMax - value*xH(user))/5);
        ctxMin.lineTo((i+1)*xW(user), (yMax - value*xH(user))/5);
        ctxMin.lineTo((i+1)*xW(user), 40)
        ctxMin.fill();
      }
    }
  }catch(e){}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function smallLine(ctx, ctxMin, user, start, yMax){
  for(let i = 1; i < 3; i++){
    ctx.beginPath();
    ctx.moveTo(5*xW(user)*(3*start+i), 0);
    ctx.lineTo(5*xW(user)*(3*start+i), yMax);
    ctx.strokeStyle = ctxMin.strokeStyle = "#0002";
    ctx.stroke();
    ctx.clearRect(5*xW(user)*(3*start+i), 0, 1, yMax);    
    ctxMin.beginPath();
    ctxMin.moveTo(5*xW(user)*(3*start+i), 0);
    ctxMin.lineTo(5*xW(user)*(3*start+i), 40);
    ctxMin.stroke();
    ctxMin.clearRect(5*xW(user)*(3*start+i), 0, 1, 40); 
  }  
}
function dotted(ctx, ctxMin, user, start, yMax){
  ctx.strokeStyle = ctxMin.strokeStyle = "#0004";
  let y = 0, length = yMax/5;
  for(let i = 0; i < length; i++){
    ctx.beginPath();
    ctx.moveTo(15*xW(user)*(start+1), y);
    ctx.lineTo(15*xW(user)*(start+1), y+3);
    ctx.stroke();   
    ctxMin.beginPath();
    ctxMin.moveTo(15*xW(user)*(start+1), y);
    ctxMin.lineTo(15*xW(user)*(start+1), y+3);
    ctxMin.stroke();  
    y += 5;
  }
  ctx.clearRect(15*xW(user)*start, 0, 1, yMax); 
  ctxMin.clearRect(15*xW(user)*start, 0, 1, 40);
}
function canvasTimer(ctx, ctxMin, user, min, max, yMax, xMax){
  let num = Math.ceil(100/xH(user));
  let fillText = false;
  ctx.beginPath();
  ctxMin.beginPath();
  ctx.textAlign = "center"; 
  let tMax = Math.round((max)/5) + +cookie["UTC"]
  
  for(let t = 0; t <= tMax+10; t++){ 
    ctx.fillStyle = ctxMin.fillStyle = "#0004";
    ctx.lineWidth = ctxMin.lineWidth = 1;
      let minute = t%2=="0" ? "00" : "30";
      let hour = zero(Math.floor(t/2)%24);
      let start = (t - Math.floor(min/(5*xW(user)))*2);
    if(filter(["main", "archive"], pathname)){
      ctx.fillText(`${hour} ${minute}`, 15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), ((yMax-10) - num*xH(user))/2);
    }
    
    if(fillText){
      ctx.beginPath();
      ctx.moveTo(15*xW(user)*(start-1), 0);
      ctx.lineTo(15*xW(user)*(start-1), yMax);
      ctx.strokeStyle = ctxMin.strokeStyle = "#0006";
      ctx.stroke();
      ctx.clearRect(15*xW(user)*(start-1), 0, 1, yMax);
      ctx.fillText(num, 15*xW(user)*(start + 0.5), (yMax-5) - num*xH(user))
      ctxMin.beginPath();
      ctxMin.moveTo(15*xW(user)*(start-1), 0);
      ctxMin.lineTo(15*xW(user)*(start-1), 40);
      ctxMin.stroke();
      ctxMin.clearRect(15*xW(user)*(start-1), 0, 1, 40);
    }else{dotted(ctx, ctxMin, user, start, yMax)}
    smallLine(ctx, ctxMin, user, start, yMax) 
    fillText = !fillText;
    
    if(cookie["turn"]["midnight"][pathname] == "1" && hour == "00" && minute == "00"){
      ctx.beginPath();
      ctx.moveTo(15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), 0);
      ctx.lineTo(15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), yMax);
      ctx.lineWidth = ctxMin.lineWidth = 2;
      ctx.strokeStyle = ctxMin.strokeStyle = "#0006";
      ctx.stroke();
      ctxMin.beginPath();
      ctxMin.moveTo(15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), 0);
      ctxMin.lineTo(15*xW(user)*(start - Math.round(+cookie["UTC"]/2)), 40);
      ctxMin.stroke();
    }
  }
  for(let i = 1; i < 4; i++){
    ctx.beginPath();
    ctx.moveTo(0, (yMax - num*xH(user))/2*i);
    ctx.lineTo(xMax+100, (yMax - num*xH(user))/2*i);
    ctx.strokeStyle = ctx.strokeStyle = i==2 ? "#0006" : "#0004";
    ctx.stroke();  
    ctx.clearRect(0, (yMax - num*xH(user))/2*i, xMax, 1)  
    if(i == 2){
      ctxMin.beginPath();
      ctxMin.moveTo(0, (40 - num*xH(user)/5)/2*i);
      ctxMin.lineTo(xMax+100, (40 - num*xH(user)/5)/2*i);
      ctxMin.stroke();  
      ctxMin.clearRect(0, (40 - num*xH(user)/5)/2*i, xMax, 1)  
    }
  } 
} 

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function clearCanvas(ths){
  let sID = parent(ths, 3).attr("sID"),
      yMax = +$(ths).height(),
      ctx = document.getElementById(`aim${sID}`).getContext("2d");
  if($('#awayMove:hover').length == 0) 
    ctx.clearRect(0, 0, widthLi(), yMax);
}
function awayMove(ths){
  try{
    let sID = !+cookie["turn"]["chat"][pathname] 
            ? $(ths).attr("href").split("videos/")[1].split("?")[0]
            : $(ths).attr("href").split("video=v")[1].split("&")[0],
        yMax = $(`#aim${sID}`).height(),
        ctx = document.getElementById(`aim${sID}`).getContext("2d");
    ctx.clearRect(0, 0, widthLi(), yMax);
  }catch(e){}
}
function getCanvasXY(ths, e){
  let sID = parent(ths, 3).attr("sID"),
      user = parent(ths, 3).attr("username"),
      yMax = +$(`#aim${sID}`).height(),
      sS = (parent(ths).attr("sS") - new Date().getTimezoneOffset()*-60000) % 86400000,
      min = +parent(ths).attr("min"),
      mem = parent(ths).siblings(".rightRange").val(),
      range = +parent(ths).siblings(".bottomRange").val(),
      ctx = document.getElementById(`aim${sID}`).getContext("2d");
  let x = e.offsetX,
      y = e.offsetY,
      gap = "g"+(Math.floor((x + 5*range*xW(user))/xW(user)) + min - (filter(["main", "archive"], pathname)?1:0));
  ctx.clearRect(0, 0, widthLi(), yMax);


  let res = content[sID][gap.slice(1)] ? content[sID][gap.slice(1)] : {v: 0, g: 0, m: 0}
  let value = filter(["main", "archive"], pathname) 
      ? Math.round(content[sID][Object.keys(content[sID])[mem]][gap])
      : res["v"];
  let ggg = filter(["main", "archive"], pathname)
          ? +gap.slice(1)*120000 - sS - new Date().getTimezoneOffset()*-120000
          : res["g"]*120000 - sS - new Date().getTimezoneOffset()*-120000;
  try{
    ctx.beginPath();
    ctx.fillStyle = "#0009";
    if(value){
      ctx.fillRect(
        Math.round((x-(xW(user)/2))/xW(user))*xW(user), 
        yMax - value*xH(user), 
        xW(user), 
        value*xH(user)
      ); 
      $("#awayMove").attr({href: `${url(sID)}&t=${tLS2(tLS(ggg, timeSet), timeSet)}`})
    }
  }catch(e){$("#awayMove").removeAttr("href")}

  $("#awayMove")
    .css({top: $(window).scrollTop() + e.y-41+"px", left: x+9+"px"})
    .attr({x: x, y: y})
  
  ctx.beginPath();
  ctx.moveTo(0, y);
  ctx.lineTo(widthLi(), y);
  ctx.stroke();  
  ctx.beginPath();
  ctx.moveTo(x, 0);
  ctx.lineTo(x, yMax);
  ctx.stroke(); 
  
  if(value){
    let x1 = x + 10, x2 = x + 10;
    let y1 = y - 10, y2 = y + 20;
    let tA1 = "start", tA2 = "start";
    if(y > 180){tA2 = "end"; y2 = y1; x2 = x - 10}
    if(y < 20) {tA1 = "end"; y1 = y2; x1 = x - 10}
    if(y > 180 && x < 5*xW(user)*(range+1)){tA2 = "start"; y2 = y1; x2 = x + 35}
    if(y < 20 && x < 5*xW(user)*(range+1)) {tA1 = "start"; y1 = y2; x1 = x + 10; x2 = x + 35}  
    if(x > 5*xW(user)*(range+23)){tA1 = tA2 = "end"; x1 = x2 = x - 10}
    if(y > 180 && x > 5*xW(user)*(range+23)){tA2 = "end"; y2 = y1; x2 = x - 35}
    if(y < 20 && x > 5*xW(user)*(range+23)) {tA1 = "end"; y1 = y2; x1 = x - 10; x2 = x - 35}
    
    ctx.beginPath();
    ctx.fillStyle = "#0009";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = tA1;    
    if(filter(["best"], pathname)) value+= ` [${res["m"]}]`
    ctx.fillText(value, x1, y1); 

    ctx.textAlign = tA2;
    ctx.fillText(tLS(ggg, timeSet), x2, y2);    
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function graphXWheel(ths, e, min = 0){
  e.preventDefault(); 
  let deltaY = e.deltaY > 0 ? 1 : -1;
  try{
    let sID = !min ? cookie["turn"]["chat"][pathname] != "1"
                ? $(ths).attr("href").split("videos/")[1].split("?")[0]
                : $(ths).attr("href").split("video=v")[1].split("&")[0]
              : parent(ths, 3).attr("sID"),
        li = `li[sID='${sID}']`,
        user = !min ? $(ths).attr("username") : parent(ths, 3).attr("username");
    if(+keyFilter == 16){
      let value = +$(`${li} .graphX`).siblings(".rightRange").val() + deltaY;
      if(value >= 0 && value <= $(`${li} .graphX`).siblings(".rightRange").attr("max")){
        let meme = Object.keys(content[sID])[value]
        canvas(`${li} .bottomRange`, value);     
        $(`${li} .graphX`).siblings(".rightRange").val(value).attr({meme: meme});
        $(`${li} .allMaxLine>dot`).attr({hover: 0});
        $(`${li} .allMaxLine>dot[meme="m${value}"]`).attr({hover: 1});
        $(`${li} h8`).siblings("h4").attr({meme: meme, sum: $(`${li} .rightRange`).attr("m"+value)});
      }
      getCanvasXY(`#aim${sID}`, {offsetX: +$("#awayMove").attr("x"), offsetY: +$("#awayMove").attr("y")});
    // }
    // else if(keyFilter == 18){ 
    //   let zoom = Number($(li).attr("zoom"));
    }else{
      let bottomRange = $(`${li} .bottomRange`);
      let value = +bottomRange.val() + deltaY; 
      if(0 <= value && value <= +bottomRange.attr("max")){
        bottomRange.val(value)
        bottomRange.siblings(".graphX").children(".graph, .graphMin").css("left", -5*value*xW(user));
        getCanvasXY(`#aim${sID}`, {offsetX: +$("#awayMove").attr("x"), offsetY: +$("#awayMove").attr("y")})
      }
    }
  }catch(e){}
} 



