///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа правого бегунка 
function rightRange(ths){
  let value = !ths ? 0 : $(ths).val(),
      sID = parent(ths, 2).attr("sID"),
      sort = $(`li[sID="${sID}"]`).attr("sort");
  canvas(ths, value)
  let meme = filter(["main"], sort) 
           ? Object.keys(content[sID][sort])[value] 
           : Object.values(content[sID][sort]["list"])[value] != "allTriggers"
             ? Object.values(content[sID][sort]["list"])[value]
             : "#####"
  $(ths).attr({meme: meme})
  $(ths).parent().siblings("h4").attr({meme: meme, sum: $(ths).attr("m"+value)});
  $(ths).siblings(".allMaxLine").children(`dot`).attr({hover: 0})
                                .siblings(`dot[meme="m${value}"]`).attr({hover: +turn("maxline")})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа нижнего бегунка 
function bottomRange(ths){
  let value = +$(ths).val();
  let max = +$(ths).attr("max");
  $(ths).attr({percent: Math.round((value) * 100 / max)});
  $(ths).siblings(".graphX").children(".graph, .graphMin").css("left", -5*value*factor("xW", parent(ths, 2).attr("username")));
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dotclick(ths){
  let value = +$(ths).attr("meme").slice(1),
      rightRange = $(ths).parent().siblings(".rightRange"),
      sID = parent(ths, 3).attr("sID"),
      sort = $(`li[sID="${sID}"]`).attr("sort"),
      yMax = +parent(ths).siblings(".graphX").children(".graphAim").height(),
      ctx = document.getElementById(`aim${sID}`).getContext("2d");
  ctx.clearRect(0, 0, widthLi(), yMax)
  canvas(rightRange, value)
  let meme = sort == "main" ? Object.keys(content[sID][sort])[value] : Object.values(content[sID][sort]["list"])[value]
  rightRange.val(value).attr({meme: meme});
  parent(ths, 2).siblings("h4").attr({meme: meme, sum: rightRange.attr("m"+value)});
  $(ths).parent().children("dot").attr({hover: 0})
                 .siblings(`dot[meme="m${value}"]`).attr({hover: 1})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function getMainMenu(ths){
  let sID = parent(ths, 2).attr("sID"),
      sort = parent(ths, 2).attr("sort")
  parent(ths, 2).attr({sort: sort == "main" ? "best" : "main"})
  $(ths).siblings(".rightRange").attr({max: content[sID]["best"]["list"].length - (sort == "main" ? 1 : 2)})
  rightRange($(ths).siblings(".rightRange"))
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function openLi(ths){
  let sID = parent(ths, 3).attr("sID"),
      type = pathname == "archive" ? "comments_main" : "comments"
  $(`#arrow_${type+sID}`).prop({checked: false})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function canvas(ths, mem){
  let sID  = +parent(ths, 2).attr("sID"),
      user = parent(ths, 2).attr("username"),
      min  = +$(ths).siblings(".graphX").attr("min"),
      max  = +$(ths).siblings(".graphX").attr("max"),
      sort = parent(ths, 2).attr("sort"),
      rrMax= +$(ths).attr("max"),
      xMax = +$(ths).siblings(".graphX").children(".graph").attr("width"),
      yMax = +$(ths).siblings(".graphX").children(".graph").attr("height"),
      ctx  = document.getElementById(`canvas${sID}`).getContext("2d"),
      ctxMin = document.getElementById(`min${sID}`).getContext("2d"); 
  let maxPoints = 0;
  ctx.clearRect(0, 0, xMax, yMax);
  ctxMin.clearRect(0, 0, xMax, 40);
  canvasTimer(ctx, ctxMin, user, min, max, yMax, xMax, sort);     

  ctx.beginPath();
  ctxMin.beginPath();
  let meme = Object.keys(content[sID][sort])[mem],
      color = colorArr[infoBot["memes"][meme]]
  ctx.fillStyle = ctxMin.fillStyle = color+"cc";
  try{
    if(filter(["main"], sort)){
      ctx.moveTo(0, yMax); 
      ctxMin.moveTo(0, yMax); 
      for(let gap = Math.floor((min-1)/5)*5; gap <= Math.round((max+1)/5)*5; gap++){
        let value = gap < min ? 0 : gap > max ? 0 : Math.round(content[sID][sort][meme]["g"+gap]);
        ctx.lineTo((gap-min+1)*factor("xW", user), yMax - value*factor("xH", user));
        ctx.lineTo((gap-min+2)*factor("xW", user), yMax - value*factor("xH", user));
        ctx.lineTo((gap-min+2)*factor("xW", user), yMax)
        ctxMin.lineTo((gap-min+1)*factor("xW", user), 40 - value*factor("xH", user)/5);
        ctxMin.lineTo((gap-min+2)*factor("xW", user), 40 - value*factor("xH", user)/5);
        ctxMin.lineTo((gap-min+2)*factor("xW", user), 40)
        maxPoints = value > maxPoints ? value : maxPoints;   
      }
      ctx.fill();
      ctxMin.fill();
    }else{
      let memeName = content[sID][sort]["list"][mem];
      for(let i = 0; i < content[sID][sort][memeName]["map"].length; i++){
        let num = Number(String(content[sID][sort][memeName]["map"][i]).split(":")[0]),
            color = Number(String(content[sID][sort]["allTriggers"]["map"][rrMax == +mem ? i : num]).split(":")[1]),
            value = rrMax == +mem ? num : Number(String(content[sID][sort]["allTriggers"]["map"][num]).split(":")[0]);
        
        ctx.beginPath();
        ctx.fillStyle = ctxMin.fillStyle = colorArr[infoBot["memes"][content[sID][sort]["oldlist"][color]]]+"cc"; 
        ctx.moveTo((i)*factor("xW", user), yMax)
        ctx.lineTo((i)*factor("xW", user), yMax - value*factor("xH", user));
        ctx.lineTo((i+1)*factor("xW", user), yMax - value*factor("xH", user));
        ctx.lineTo((i+1)*factor("xW", user), yMax)
        ctx.fill();
        ctxMin.beginPath(); 
        ctxMin.moveTo((i)*factor("xW", user), 40)
        ctxMin.lineTo((i)*factor("xW", user), (yMax - value*factor("xH", user))/5);
        ctxMin.lineTo((i+1)*factor("xW", user), (yMax - value*factor("xH", user))/5);
        ctxMin.lineTo((i+1)*factor("xW", user), 40)
        ctxMin.fill();
        maxPoints = value > maxPoints ? value : maxPoints;   
      }
    }
    if(
      turn("maxline") &&
      $(`li[sID="${sID}"][sort="best"] .rightRange`).val() != content[sID]["best"]["list"].length-1
    ){
      ctx.beginPath();
      ctx.moveTo(0,    (yMax-1) - Math.round(maxPoints)*factor("xH", user));
      ctx.lineTo(xMax, (yMax-1) - Math.round(maxPoints)*factor("xH", user));
      ctx.strokeStyle = color;
      ctx.stroke();
      ctx.textAlign = "center";
      let height = (yMax-5) - Math.round(maxPoints)*factor("xH", user) <= 15 ? 15 : (yMax-5) - Math.round(maxPoints)*factor("xH", user)
      for(let t = Math.floor(min/15); t <= Math.round(max/15)*2; t+=2){    
        ctx.fillText(Math.ceil(maxPoints), 15*factor("xW", user)*((t - Math.floor(min/15)) + 0.5), height)
      }
    }
  }catch(e){console.error(e)}
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function smallLine(ctx, ctxMin, user, start, yMax){
  for(let i = 1; i < 3; i++){
    ctx.beginPath();
    ctx.moveTo(5*factor("xW", user)*(3*start+i), 0);
    ctx.lineTo(5*factor("xW", user)*(3*start+i), yMax);
    ctx.strokeStyle = ctxMin.strokeStyle = "#0002";
    ctx.stroke();
    ctx.clearRect(5*factor("xW", user)*(3*start+i), 0, 1, yMax);    
    ctxMin.beginPath();
    ctxMin.moveTo(5*factor("xW", user)*(3*start+i), 0);
    ctxMin.lineTo(5*factor("xW", user)*(3*start+i), 40);
    ctxMin.stroke();
    ctxMin.clearRect(5*factor("xW", user)*(3*start+i), 0, 1, 40); 
  }  
}
function dotted(ctx, ctxMin, user, start, yMax){
  ctx.strokeStyle = ctxMin.strokeStyle = "#0004";
  let y = 0, length = yMax/5;
  for(let i = 0; i < length; i++){
    ctx.beginPath();
    ctx.moveTo(15*factor("xW", user)*(start+1), y);
    ctx.lineTo(15*factor("xW", user)*(start+1), y+3);
    ctx.stroke();   
    ctxMin.beginPath();
    ctxMin.moveTo(15*factor("xW", user)*(start+1), y);
    ctxMin.lineTo(15*factor("xW", user)*(start+1), y+3);
    ctxMin.stroke();  
    y += 5;
  }
  ctx.clearRect(15*factor("xW", user)*start, 0, 1, yMax); 
  ctxMin.clearRect(15*factor("xW", user)*start, 0, 1, 40);
}
function canvasTimer(ctx, ctxMin, user, min, max, yMax, xMax, sort){
  let num = Math.ceil(100/factor("xH", user));
  let fillText = false;
  ctx.beginPath();
  ctxMin.beginPath();
  ctx.textAlign = "center"; 
  let tMax = Math.round((max)/5) + +cookie["UTC"]
  
  for(let t = 0; t <= tMax+10; t++){ 
    ctx.fillStyle = ctxMin.fillStyle = "#0004";
    ctx.lineWidth = ctxMin.lineWidth = 1;
      let minute = t%2 ? "30" : "00";
      let hour = zero(Math.floor(t/2)%24);
      let start = (t - Math.floor(min/(5*factor("xW", user)))*2);
    if(filter(["main"], sort)){
      ctx.fillText(`${hour} ${minute}`, 15*factor("xW", user)*(start - Math.round(+cookie["UTC"]/2)), ((yMax-10) - num*factor("xH", user))/2);
    }
    
    if(fillText){
      ctx.beginPath();
      ctx.moveTo(15*factor("xW", user)*(start-1), 0);
      ctx.lineTo(15*factor("xW", user)*(start-1), yMax);
      ctx.strokeStyle = ctxMin.strokeStyle = "#0006";
      ctx.stroke();
      ctx.clearRect(15*factor("xW", user)*(start-1), 0, 1, yMax);
      ctx.fillText(num, 15*factor("xW", user)*(start + 0.5), (yMax-5) - num*factor("xH", user))
      ctxMin.beginPath();
      ctxMin.moveTo(15*factor("xW", user)*(start-1), 0);
      ctxMin.lineTo(15*factor("xW", user)*(start-1), 40);
      ctxMin.stroke();
      ctxMin.clearRect(15*factor("xW", user)*(start-1), 0, 1, 40);
    }else{dotted(ctx, ctxMin, user, start, yMax)}
    smallLine(ctx, ctxMin, user, start, yMax) 
    fillText = !fillText;
    
    if(turn("midnight") && hour == "00" && minute == "00" && filter(["main"], sort)){
      ctx.beginPath();
      ctx.moveTo(15*factor("xW", user)*(start - Math.round(+cookie["UTC"]/2)), 0);
      ctx.lineTo(15*factor("xW", user)*(start - Math.round(+cookie["UTC"]/2)), yMax);
      ctx.lineWidth = ctxMin.lineWidth = 2;
      ctx.strokeStyle = ctxMin.strokeStyle = "#0006";
      ctx.stroke();
      ctxMin.beginPath();
      ctxMin.moveTo(15*factor("xW", user)*(start - Math.round(+cookie["UTC"]/2)), 0);
      ctxMin.lineTo(15*factor("xW", user)*(start - Math.round(+cookie["UTC"]/2)), 40);
      ctxMin.stroke();
    }
  }
  for(let i = 1; i < 4; i++){
    ctx.beginPath();
    ctx.moveTo(0, (yMax - num*factor("xH", user))/2*i);
    ctx.lineTo(xMax+100, (yMax - num*factor("xH", user))/2*i);
    ctx.strokeStyle = ctx.strokeStyle = i==2 ? "#0006" : "#0004";
    ctx.stroke();  
    ctx.clearRect(0, (yMax - num*factor("xH", user))/2*i, xMax, 1)  
    if(i == 2){
      ctxMin.beginPath();
      ctxMin.moveTo(0, (40 - num*factor("xH", user)/5)/2*i);
      ctxMin.lineTo(xMax+100, (40 - num*factor("xH", user)/5)/2*i);
      ctxMin.stroke();  
      ctxMin.clearRect(0, (40 - num*factor("xH", user)/5)/2*i, xMax, 1)  
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
    let sID = !turn("chat")
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
      sort = parent(ths, 3).attr("sort"),
      yMax = +$(`#aim${sID}`).height(),
      sS = (parent(ths).attr("sS") - new Date().getTimezoneOffset()*-60000) % 86400000,
      min = +parent(ths).attr("min"),
      mem = +parent(ths).siblings(".rightRange").val(),
      range = +parent(ths).siblings(".bottomRange").val(),
      ctx = document.getElementById(`aim${sID}`).getContext("2d");
  let x = e.offsetX,
      y = e.offsetY,
      gap = "g"+(Math.floor((x + 5*range*factor("xW", user))/factor("xW", user)) + (filter(["best"], sort)?0:min-1));
  ctx.clearRect(0, 0, widthLi(), yMax);


  let res = content[sID][sort][gap.slice(1)] ? content[sID][sort][gap.slice(1)] : {v: 0, m: 0, g: 0}
  if(filter(["best"], sort)){
    [res["v"], res["m"], res["g"]] = String(
                content[sID][sort]["allTriggers"]["map"][
                  $(`li[sID="${sID}"] .rightRange`).val() == content[sID][sort]["list"].length-1
                    ? +gap.slice(1)
                    : content[sID][sort][content[sID][sort]["list"][mem]]["map"][+gap.slice(1)]
                ]
              ).split(":")
    res["m"] = content[sID][sort]["oldlist"][res["m"]]
  }
  let value = filter(["main"], sort) 
      ? Math.round(content[sID][sort][Object.keys(content[sID][sort])[mem]][gap])
      : res["v"];
  let ggg = filter(["main"], sort)
      ? +gap.slice(1)*120000 - sS - new Date().getTimezoneOffset()*-120000
      : res["g"]*120000 - sS - new Date().getTimezoneOffset()*-120000;
  try{
    ctx.beginPath();
    ctx.fillStyle = "#0009";
    if(value){
      ctx.fillRect(
        Math.round((x-(factor("xW", user)/2))/factor("xW", user))*factor("xW", user), 
        yMax - value*factor("xH", user), 
        factor("xW", user), 
        value*factor("xH", user)
      ); 
      $("#awayMove").attr({href: `${url(sID)}&t=${tLS2(tLS(ggg, timeSet), timeSet)}`})
    }else{
      $("#awayMove").attr({href: ``})
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
  
  if(value && value != "undefined"){
    let x1 = x + 10, x2 = x + 10;
    let y1 = y - 10, y2 = y + 20;
    let tA1 = "start", tA2 = "start";
    if(y > 180){tA2 = "end"; y2 = y1; x2 = x - 10}
    if(y < 20) {tA1 = "end"; y1 = y2; x1 = x - 10}
    if(y > 180 && x < 5*factor("xW", user)){tA2 = "start"; y2 = y1; x2 = x + 35}
    if(y < 20 && x < 5*factor("xW", user)) {tA1 = "start"; y1 = y2; x1 = x + 10; x2 = x + 35}  
    if(x > 5*factor("xW", user)*23){tA1 = tA2 = "end"; x1 = x2 = x - 10}
    if(y > 180 && x > 5*factor("xW", user)*23){tA2 = "end"; y2 = y1; x2 = x - 35}
    if(y < 20 && x > 5*factor("xW", user)*23) {tA1 = "end"; y1 = y2; x1 = x - 10; x2 = x - 35}
    
    ctx.beginPath();
    ctx.fillStyle = "#0009";
    ctx.font = "bold 14px sans-serif";
    ctx.textAlign = tA1;    
    if(filter(["best"], sort) &&
      $(`li[sID="${sID}"] .rightRange`).val() == content[sID][sort]["list"].length-1
    ) value+= ` [${res["m"]}]`
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
    let sID = !min ? !turn("chat")
                ? $(ths).attr("href").split("videos/")[1].split("?")[0]
                : $(ths).attr("href").split("video=v")[1].split("&")[0]
              : parent(ths, 3).attr("sID"),
        li = `li[sID='${sID}']`,
        sort = $(li).attr("sort"),
        user = !min ? $(ths).attr("username") : parent(ths, 3).attr("username");
    if(+keyFilter == 16){
      let value = +$(`${li} .rightRange`).val() + deltaY;
      if(value >= 0 && value <= $(`${li} .rightRange`).attr("max")){
        let meme = Object.keys(content[sID][sort])[value]
            
        $(`${li} .rightRange`).val(value).attr({meme: meme});
        $(`${li} .allMaxLine>dot`).attr({hover: 0});
        $(`${li} .allMaxLine>dot[meme="m${value}"]`).attr({hover: 1});
        $(`${li} h4`).attr({meme: meme, sum: $(`${li} .rightRange`).attr("m"+value)});
        canvas(`${li} .rightRange`, value); 
      }
      getCanvasXY(`#aim${sID}`, {offsetX: +$("#awayMove").attr("x"), offsetY: +$("#awayMove").attr("y")});
    }else if(+keyFilter == 17){
      $(li).attr({sort: sort == "best" ? "main" : "best"})
      $(`${li} .rightRange`).attr({max: content[sID]["best"]["list"].length - (sort == "main" ? 1 : 2)})
      rightRange($(`${li} .rightRange`))
    }else{
      let bottomRange = $(`${li} .bottomRange`);
      let value = +bottomRange.val() + deltaY; 
      if(0 <= value && value <= +bottomRange.attr("max")){
        bottomRange.val(value)
        bottomRange.siblings(".graphX").children(".graph, .graphMin").css("left", -5*value*factor("xW", user));
        getCanvasXY(`#aim${sID}`, {offsetX: +$("#awayMove").attr("x"), offsetY: +$("#awayMove").attr("y")})
      }
    }
  }catch(e){}
} 



