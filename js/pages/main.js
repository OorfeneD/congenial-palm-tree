function loadMain(type, result, step, oldget){
  try{
    if(result == "end"){
      endAutoload();
      $("#autoload").attr({act: "stop"})
    }else{
      (function startLoad(page = 0){
        if(window.location.href == type && Object.keys(result).length && oldget == get){
          if(result[Object.keys(result)[page]]["values"]){
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

            let key   = Object.keys(result)[page],
                sID   = key.slice(2),
                ch    = result[key]["c"],
                sS    = result[key]["sS"]*1000,
                dur   = result[key]["d"],
                title = result[key]["sN"],
                memes = result[key]["values"],
                sN    = result[key]["sN"].length > (80 - ch.length) 
                        ? result[key]["sN"].slice(0, (77 - ch.length)) + "..." 
                        : result[key]["sN"];

            let urlLi = !+cookie["turn_chat"][pathname]
                        ? `https://twitch.tv/videos/${sID}?мама=явтелевизоре` 
                        : `https://player.twitch.tv/?autoplay=true&video=v${sID}`;

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

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
              if(!$(`li[sID="${sID}"]`).length){
                $("main ul div[load]").before(`
                  <input type="checkbox" id="arrow_comments${sID}" ${cookie["turn_arrow"][pathname] == "1" ? "checked" : ""}>
                  <label for="arrow_comments${sID}" icon="arrow" username="${ch}"></label>
                  <li sID="${sID}" type="main" username="${ch}" ${dateType == "time" && cookie["turn_old"][pathname] == "1" ? "old" : ""}>
                    <h4>
                      <div class="deleteLi" onclick="alert(123);"></div>
                      <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>   
                      <a target="_blank" href="${urlLi}" title="${title}" sN>${sN}</a>   
                      <a date="${date}" fulldate="~${dur}" datetype="${dateType}"></a>
                    </h4>
                    <h8 meme="${Object.keys(memes)[0]}" sum="0">
                      <div class="graphX">
                        <canvas class="graph" id="canvas${sID}" height="200" width="1440px" style="height: 200px; width: 1440px"></canvas>
                        <canvas class="graphAim" id="aim${sID}"></canvas>
                      </div>   
                      <div class="allMaxLine"></div>
                      <div class="mainMenu" onclick="alert('Тут что-то будет')"><div></div></div>
                      <input type="range" name="bottomRange" class="bottomRange" min="0" max="51" step="1" value="0" percent="0" oninput="bottomRange(this);">
                      <input type="range" name="rightRange" class="rightRange" min="0" max="8" step="1" value="0" orient="vertical" oninput="rightRange(this);" m0="13" m1="0" m2="8" m3="2" m4="1" m5="0" m6="4" m7="0" m8="3">
                    </h8>   
                  </li>
                `);

  // /************/for(let i = 0; i < mArr.length; i++){
  //                 let ts = tLS(mArr[i]["t"] - sS - new Date().getTimezoneOffset()*-60000, timeSet),
  //                     user = mArr[i]["u"],
  //                     mes = mArr[i]["m"];

  //                 let url = urlLi + `&t=${ts.split(":")[0]}h${ts.split(":")[1]}m${ts.split(":")[2]}s`;

  //                 let meme = $(`ul li[sID="${sID}"] h8`).attr("meme"),
  //                     sum  = $(`ul li[sID="${sID}"] h8`).attr("sum");
  //                 $(`ul li[sID="${sID}"] h8`).attr({sum: +sum+1})
  //                 if(!filter([`#${user}:</b> ${mes}`], $(`ul li[sID="${sID}"] h8`).html())){
  //                   $(`ul li[sID="${sID}"] h8`).attr({meme: +meme+1})
  //                   $(`ul li[sID="${sID}"] h8`).append(`
  //                     <div>
  //                       <a target="_blank" href="${url}">
  //                         <b>[${ts}] #${user}:</b> ${mes}
  //                       </a>
  //                       <div delete onclick="dlt(this, '${pathname}', 'message', ${mArr[i]["t"]});"></div>
  //                     </div>
  //                   `);
  //                 }
  // /************/}

                if($(`#channel_${ch}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
                  $(`ul li[sID='${sID}']`).hide();
                  $(`ul label[for='arrow_comments${sID}']`).hide();
                }

                addTitleNum();
              }
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          }
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
    setTimeout(() => loadComments(type, result, step), 200);
  }  
}
