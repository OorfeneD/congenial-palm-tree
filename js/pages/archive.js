function loadArchive(type, result, step, oldget){
  try{
    if(result == "end"){
      endAutoload();
      $("#autoload").attr({act: "stop"})
    }else{
      (function startLoad(page = 0){
        if(window.location.href == type && Object.keys(result).length && oldget == get){
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

          let key   = Object.keys(result)[page],
              sID   = key.slice(2),
              ch    = result[key]["c"],
              sS    = result[key]["sS"]*1000,
              dur   = result[key]["d"],
              title = result[key]["sN"],
              sN    = result[key]["sN"].length > (70 - ch.length) 
                      ? result[key]["sN"].slice(0, (67 - ch.length)) + "..." 
                      : result[key]["sN"];

          let vDur  = (+dur.split(":")[0]*60*60 + +dur.split(":")[1]*60 + +dur.split(":")[2])*1000,
              vTime = tLS(sS - utc(), timeSet),
              vDate = tLS(sS - utc()),
              tDay  = tLS(Date.now() - utc()),
              yDay  = tLS(Date.now() - utc() - 24*60*60*1000);   

          let date = 5*60*1000 - (Date.now() - sS - vDur) > 0
                ? translate(["time", "online"]) : vDate == tDay 
                  ? vTime : vDate == yDay 
                    ? translate(["time", "yesterday"]) : vDate,
              dateType = 5*60*1000 - (Date.now() - sS - vDur) > 0
                  ? "online" : vDate == tDay 
                    ? "today" : vDate == yDay 
                      ? "yesterday" : "time";
          
          let tTypes = ["main", "fbi", "notes", "tags"];
/*////////////////////////////////////////////////////////////////////////////////////////////*/
          for(let ttt = 0; ttt < tTypes.length; ttt++){
            let pn = tTypes[ttt];
            if(result[Object.keys(result)[page]][pn]){
              
/*//////////*/if(pn == "main"){
                
                let memes = result[key][pn];
                content[sID] = memes
                
                let [gmax, allMaxLine, ggg, gggres] = [0, "", "", "0:0"],
                    gmin = Math.floor((sS % 86400000) / 120000);
                for(let i = 0; i < Object.keys(memes).length; i++){
                  let memKey = memes[Object.keys(memes)[i]],
                      memVal = Object.keys(memKey),
                      dmax = 0;
                  ggg = `${i}:0`
                  gmax = gmax < +memVal[Object.keys(memKey).length-1].slice(1) ? +memVal[Object.keys(memKey).length-1].slice(1) : gmax
                  for(let u = 0; u < memVal.length; u++){
                    ggg = `${i}:${+ggg.split(":")[1] + +Object.values(memKey)[u]}`
                    dmax = dmax < Object.values(memKey)[u] ? Math.round(Object.values(memKey)[u]) : dmax
                  }
                  gggres = +gggres.split(":")[1] < +ggg.split(":")[1] ? ggg : gggres
                  allMaxLine += `<dot meme="m${i}" memename="${Object.keys(memes)[i]}" style="bottom: ${dmax*2+10 > 207 ? 207 : dmax*2+10}px; background: ${colorArr[infoBot["memes"][Object.keys(infoBot["memes"])[i]]]};" alt="${dmax}" hover="${!i?1:0}" onclick="dotclick(this);"></dot>`;
                }  
                let width = (gmax-gmin+xW(ch))*xW(ch) < widthLi() ? widthLi() : Math.round((gmax-gmin+xW(ch))/5)*5*xW(ch);
                let rangeMax = Math.round((gmax-gmin)/5) - widthLi()/(5*xW(ch));
                    rangeMax = rangeMax < 0 ? 0 : rangeMax + 1;
                let bottomThumb = (widthLi(60)/(rangeMax+1))*1.5 > widthLi(60) ? widthLi(60) : (widthLi(60)/(rangeMax+1))*1.5,
                    rightThumb  = (heightLi(60)/Object.keys(memes).length)*1.5 > heightLi(60) ? heightLi(60) : (heightLi(60)/Object.keys(memes).length)*1.5

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
                
                if(!$(`li[sID="${sID}"][pathname="${pn}"]`).length){
                  $("main ul div[load]").before(`
                    <input type="checkbox" id="arrow_comments_${pn+sID}" ${cookie["turn"]["arrow"][pathname] == "1" ? "checked" : ""}>
                    <label for="arrow_comments_${pn+sID}" icon="arrow" username="${ch}"></label>
                    <li sID="${sID}" type="main" username="${ch}" pathname="${pn}" ${dateType == "time" && cookie["turn"]["old"][pathname] == "1" ? "old" : ""} counter archive>
                      <h4>
                        <div class="deleteLi" onclick="dlt(this, 'main', 'block');"></div>
                        <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>   
                        <a target="_blank" href="/archive?sID=${sID}" type="${pn}" fn>${translate(["pages", pn])}</a>
                        <a target="_blank" href="${url(sID)}" title="${title}" sN>${sN}</a>   
                        <a target="_blank" href="/archive?date=${vDate}-${vDate}" date="${date}" fulldate="${dur}" datetype="${dateType}" onmouseover="help(this, ['archive'], ' [${vDate}]')"></a>
                      </h4>
                      <h8 meme="${Object.keys(memes)[0]}" sum="0">
                        <div class="graphX" onwheel="event.preventDefault()" min="${gmin}" max="${gmax}" sS="${sS}">
                          <canvas class="graph" id="canvas${sID}" height="200" width="${width}" style="height: 200px; width: ${width}px"></canvas>
                          <canvas class="graphAim" id="aim${sID}" height="200" width="${widthLi()}"onmousemove="getCanvasXY(this, event);" onmouseout="clearCanvas(this);"></canvas>
                        </div>   
                        <div class="allMaxLine">${allMaxLine}</div>
                        <div class="mainMenu"></div>
                        <input type="range" name="bottomRange" class="bottomRange" max="${rangeMax}" step="1" value="0" percent="${!rangeMax ? 100 : 0}" oninput="bottomRange(this);">
                        <input type="range" name="rightRange" class="rightRange" min="0" max="${Object.keys(memes).length-1}" step="1" value="${+gggres.split(":")[0]}" orient="vertical" oninput="rightRange(this);">
                      </h8> 
                      <style>
                        li[sID="${sID}"][pathname="${pn}"] .bottomRange::-webkit-slider-thumb{width: ${Math.round(bottomThumb)}px}
                        li[sID="${sID}"][pathname="${pn}"] .rightRange::-webkit-slider-thumb{width: ${Math.round(rightThumb)}px}
                      </style>
                    </li>
                  `);

                  for(let i = 0; i < Object.keys(memes).length; i++){
                    let meme = Object.keys(memes)[i]
                    $(`li[sID="${sID}"] .rightRange`).attr(`m${i}`, Object.keys(memes[meme]).length)
                  }

                  rightRange($(`li[sID="${sID}"] .rightRange`))

                  if($(`#channel_${ch}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
                    $(`ul li[sID='${sID}'][pathname="${pn}"]`).hide();
                    $(`ul label[for='arrow_comments_${pn+sID}']`).hide();
                  }

                }
                
/*//////////*/}else{
                
                let mArr  = result[key][pn]
                if(!$(`li[sID="${sID}"][pathname="${pn}"]`).length){
                  $("main ul div[load]").before(`
                    <input type="checkbox" id="arrow_comments_${pn+sID}" ${$(`li[sID="${sID}"]`).length ? `next`:""} ${cookie["turn"]["arrow"][pathname] == "1" ? "checked" : ""}>
                    <label for="arrow_comments_${pn+sID}" icon="arrow" username="${ch}"></label>
                    <li sID="${sID}" type="comments" pathname="${pn}" username="${ch}" ${!$(`li[sID="${sID}"]`).length ? `counter`: `next`} ${dateType == "time" && cookie["turn"]["old"][pathname] == "1" ? "old" : ""}>
                      <h4>
                        <div class="deleteLi" onclick="dlt(this, '${pn}', 'block');"></div>
                        <a target="_blank" href="/archive?sID=${sID}" type="${pn}" fn>${translate(["pages", pn])}</a>        
                        ${!$(`li[sID="${sID}"]`).length ? `
                          <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>   
                          <a target="_blank" href="${url(sID)}" title="${title}" sN>${sN}</a>
                          <a target="_blank" href="/archive?date=${vDate}-${vDate}"  date="${date}" fulldate="~${dur}" datetype="${dateType}" onmouseover="help(this, ['archive'], ' [${vDate}]')"></a>
                        ` : ``}   
                      </h4>
                      <h8 meme="0" sum="0"></h8>
                    </li>
                  `);
                  
/****************/for(let i = 0; i < mArr.length; i++){
                    let ts = tLS(mArr[i]["t"] - sS - new Date().getTimezoneOffset()*-60000, timeSet),
                        user = mArr[i]["u"],
                        mes = wwwFilter(smilesFilter(mArr[i]["m"]));

                    let urlMes = url(sID) + `&t=${ts.split(":")[0]}h${ts.split(":")[1]}m${ts.split(":")[2]}s`;

                    let meme = $(`ul li[sID="${sID}"][pathname="${pn}"] h8`).attr("meme"),
                        sum  = $(`ul li[sID="${sID}"][pathname="${pn}"] h8`).attr("sum");
                    $(`ul li[sID="${sID}"][pathname="${pn}"] h8`).attr({sum: +sum+1})
                    if(cookie["turn"]["same"][pn] == "0" || !filter([`#${user}:</b> ${mes}`], $(`ul li[sID="${sID}"] h8`).html())){
                      $(`ul li[sID="${sID}"][pathname="${pn}"] h8`).attr({meme: +meme+1})
                      $(`ul li[sID="${sID}"][pathname="${pn}"] h8`).append(`
                        <div>
                          <a target="_blank" href="${urlMes}"><b>[${ts}] #${user}:</b></a>
                          <div delete onclick="dlt(this, '${pn}', 'message', ${mArr[i]["t"]});"></div>
                        </div>
                      `);
                      $(`ul li[sID="${sID}"][pathname="${pn}"] h8 a[href='${urlMes}']`).append(` ${mes}`)
                    }
/****************/}

                  if($(`#channel_${ch}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
                    $(`ul li[sID='${sID}']`).hide();
                    $(`ul label[for='arrow_comments${sID}']`).hide();
                  }
                  
                }
/*//////////*/}

            }
          }
/*////////////////////////////////////////////////////////////////////////////////////////////*/
          addTitleNum();
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          
          setTimeout(() => {
            page++;
              if(page < Object.keys(result).length){
                if(window.location.href == type){reload();}
              }else{getContent(pathname, +step+1);}
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
    setTimeout(() => loadArchive(type, result, step), 200);
  }  
}
