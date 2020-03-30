function loadClips(type, result, step, oldget){
  try{
    if(result == "end"){
      endAutoload();
      $("#autoload").attr({act: "stop"})
    }else{
      (function startLoad(page = 0){
        if(window.location.href == type && Object.keys(result).length && oldget == get){
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          console.log(result[page])
          if(true){
 
            let {
              n: id, 
              c: channel,
              u: creator,
              g: gID,
              t: title,
              v: views,
              s: sS,
              i: icon
            } = result[page];
            title = title.length > (70 - channel.length) 
                  ? title.slice(0, (67 - channel.length)) + "..." 
                  : title;

            let vTime = tLS(sS - utc(), timeSet),
                vDate = tLS(sS - utc()),
                tDay  = tLS(Date.now() - utc()),
                yDay  = tLS(Date.now() - utc() - 24*60*60*1000);   

            let date = 5*60*1000 - (Date.now() - sS) > 0
                  ? translate(["time", "online"]) : vDate == tDay 
                    ? vTime : vDate == yDay 
                      ? translate(["time", "yesterday"]) : vDate,
                dateType = 5*60*1000 - (Date.now() - sS) > 0
                    ? "online" : vDate == tDay 
                      ? "today" : vDate == yDay 
                        ? "yesterday" : "time";        

            
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
            
            if(!$(`li[sID="${sID}"]`).length){
              $("main ul div[load]").before(`
                <input type="checkbox" id="arrow_comments${sID}" ${turn("arrow") ? "checked" : ""}>
                <label for="arrow_comments${sID}" icon="arrow" username="${ch}"></label>
                <li sID="${sID}" type="${pathname}" pathname="${pathname}" username="${ch}" sort="${turn("sortGraph") ? "best" : "main"}" ${dateType == "time" && turn("old") ? "old" : ""} counter>
                  <h4 meme="${Object.keys(memes)[0]}" sum="0">
                    <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>
                    <a target="_blank" href="${url(sID)}" title="${title}" sN>${sN}</a>   
                    <a target="_blank" href="/archive?date=${vDate}-${vDate}" date="${date}" fulldate="${tLS3(dur, gmax-gmin)}" datetype="${dateType}" onmouseover="help(this, ['help', 'archive'], ' [${vDate}]')"></a>
                  </h4>
                  <div class="deleteLi" onclick="dlt(this, '${pathname}', 'block');"></div>
                  <h8 fn="${fn}">
                    <div class="graphX" onwheel="event.preventDefault()" min="${gmin}" max="${gmax}" sS="${sS}">
                      <canvas class="graph" id="canvas${sID}" height="${heightLi()}" width="${width}" style="height: ${heightLi()}px; width: ${width}px"></canvas>
                      <canvas class="graphMin" id="min${sID}" height="40" width="${width}" style="height: 40px; width: ${width}px" onwheel='graphXWheel(this, event, 1)' onclick="openLi(this)"></canvas>
                      <canvas class="graphAim" id="aim${sID}" height="${heightLi()}" width="${widthLi()}"onmousemove="getCanvasXY(this, event);" onmouseout="clearCanvas(this);"></canvas>
                    </div>   
                    <div fn>${fns}</div>
                    <div class="allMaxLine">${allMaxLine}</div>
                    <div class="mainMenu" onclick="getMainMenu(this)" onmouseover="help(this, ['help', 'settings', 'cookie_sortGraph'])"></div>
                    <input type="range" name="bottomRange" class="bottomRange" max="${rangeMax}" step="1" value="0" percent="${!rangeMax ? 100 : 0}" oninput="bottomRange(this);">
                    <input type="range" name="rightRange" class="rightRange" min="0" max="${rrMax}" step="1" value="${+gggres.split(":")[0]}" orient="vertical" oninput="rightRange(this);">
                  </h8> 
                </li>
              `);
            
              
              if($(`#${id}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
                $(`ul li[sID='${sID}']`).hide();
                $(`ul label[for='arrow_comments${sID}']`).hide();
              }

              addTitleNum();
            }
          }
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

          setTimeout(() => {
            page++;
              if(page < Object.keys(result).length){
                if(window.location.href == type){reload();}
              }
            // else{getContent(pathname, +step+1);}
            function reload(){
              let sH = +$("html").prop('scrollHeight'),
                  sT = +$(document).scrollTop();
              if(window.location.href == type){
                if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){
                  startLoad(page);
                  $("#autoload").attr({act: "load"})
                }else{setTimeout(() => {
                  if(window.location.href == type){
                    reload();
                    $("#autoload").attr({act: "stop"})
                  }
                }, 50)}
              }
            }
          }, 50) 

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

        }
      })()
    }
  }catch(e){
    console.error(e);
    setTimeout(() => loadClips(type, result, step, oldget), 200);
  }  
}
