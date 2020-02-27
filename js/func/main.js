///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа правого бегунка 
function rightRange(ths){
  let value = !ths ? 0 : $(ths).val(),
      sID = parent(ths, 2).attr("sID");
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
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function dotclick(ths){
  let value = +$(ths).attr("meme").slice(1);
  $(ths).parent().siblings(".rightRange").val(value);
  $(ths).parent().children("dot").attr({hover: 0})
                 .siblings(`dot[meme="m${value}"]`).attr({hover: 1})
}


///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function canvas(ths, mem){
  let 
      // type = location.pathname.slice(1),
      sID  = +parent(ths, 2).attr("sID"),
      // cS   = "d"+parent(ths, 2).attr("cS"),
      // day  = "d"+parent(ths, 2).attr("day"),
      min  = +$(ths).siblings(".graphX").attr("min"),
      max  = +$(ths).siblings(".graphX").attr("max"),
      xMax = +$(ths).siblings(".graphX").children(".graph").attr("width"),
      yMax = +$(ths).siblings(".graphX").children(".graph").attr("height"),
      ctx  = document.getElementById(`canvas${sID}`).getContext("2d"); 
  let maxPoints = 0;
  ctx.clearRect(0, 0, xMax, yMax);
  // canvasTimer(ctx, cID, min, max, yMax, xMax);     

  ctx.beginPath();
  ctx.fillStyle = atColor[mem]+"cc";
  try{
    ctx.moveTo(0, yMax);
    for(let gap = Math.floor(min/5)*5; gap < Math.round(max/5)*5; gap++){
      let points = gap < min ? 0 : gap > max ? 0 : Math.floor(channelArray[type][cS]["c"+cID][day]["m"+mem]["g"+gap]);
      ctx.lineTo((gap-min+1)*xW(cID), yMax - points*xH(cID));
      ctx.lineTo((gap-min+2)*xW(cID), yMax - points*xH(cID));
      ctx.lineTo((gap-min+2)*xW(cID), yMax)
      maxPoints = points > maxPoints ? points : maxPoints;   
    }
    ctx.fill();

//     if(coo["graph"].slice(0,1) == 1){
//       ctx.beginPath();
//       ctx.moveTo(0,    (yMax-1) - maxPoints*xH(cID));
//       ctx.lineTo(xMax, (yMax-1) - maxPoints*xH(cID));
//       ctx.strokeStyle = atColor[mem];
//       ctx.stroke();
//       ctx.textAlign = "center";
//       for(let t = Math.floor(min/15); t <= Math.round(max/15)*2; t+=2){
//         let height = (yMax-5) - maxPoints*xH(cID) <= 10 ? 10 : (yMax-5) - maxPoints*xH(cID)
//         ctx.fillText(Math.ceil(maxPoints), 15*xW(cID)*((t - Math.floor(min/15)) + 0.5), height)
//       }
//     }
  }catch(e){}
}





