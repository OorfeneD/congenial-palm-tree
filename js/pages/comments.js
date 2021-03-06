function loadComments(type, result, step, oldget){
  try{
    if(result == "end"){
      endAutoload();
      $("#autoload").attr({act: "stop"})
    }else{
      (function startLoad(page = 0){
        if(type == window.location.href && Object.keys(result).length && oldget == get){
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          
          if(result[Object.keys(result)[page]][pathname]){

            let key   = Object.keys(result)[page],
                sID   = key.slice(2);
            let {
              c: ch, 
              sS: sS, 
              d: dur, 
              sN: title, 
              [pathname]: mArr
            } = result[key];
            sS *= 1000;
            let sN = title.length > (70 - ch.length) 
                   ? title.slice(0, (67 - ch.length)) + "..." 
                   : title;

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
            
            let fns = "", fn = 0;
            for(let i = 0; i < commentPages.length; i++){
              let link = commentPages[i];
              if(link != pathname){
                let num = +result[key][`t${link.toUpperCase().slice(0, 1)}`]
                fn += num
                fns += `<a target="_blank" href="/archive?sID=${sID}" onmouseover="help(this, ['pages', '${link}'])" view="icon" icon="${link}" name="${num}" onclick="fns(this, event)"></a>`
              }
            }
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
              if(!$(`li[sID="${sID}"]`).length){
                let order = filter(["time"], dateType) ? 0 : -mArr[0].t % 172800000
                $("main ul div[load]").before(`
                  <input type="checkbox" id="arrow_comments${sID}" ${turn("arrow") ? "checked" : ""}>
                  <label for="arrow_comments${sID}" icon="arrow" username="${ch}" style="order: ${order}"></label>
                  <li sID="${sID}" type="comments" username="${ch}" ${dateType == "time" && turn("old")? "old" : ""} style="order: ${order}" counter>
                    <h4 meme="0" sum="0">
                      <a target="_blank" href="https://www.twitch.tv/${ch}" ch>${ch}</a>   
                      <a target="_blank" href="${url(sID)}" title="${title}" sN>${sN}</a>   
                      <a target="_blank" href="/archive?date=${vDate}-${vDate}" date="${date}" fulldate="${tLS3(dur)}" datetype="${dateType}" onmouseover="help(this, ['help', 'archive'], ' [${vDate}]')"></a>
                    </h4>
                    <div class="deleteLi" onclick="dlt(this, '${pathname}', 'block');"></div>
                    <h8 type="${pathname}" fn="${fn}"><div fn>${fns}</div></h8>
                  </li>
                `);

/**************/for(let i = 0; i < mArr.length; i++){
                  let ts = tLS(mArr[i]["t"] - sS - new Date().getTimezoneOffset()*-60000, timeSet),
                      user = mArr[i]["u"],
                      mes = mesFilter(mArr[i]["m"]),
                      mesT = mArr[i]["t"]

                  let urlMes = url(sID) + `&t=${ts.split(":")[0]}h${ts.split(":")[1]}m${ts.split(":")[2]}s`;

                  let meme = $(`ul li[sID="${sID}"] h4`).attr("meme"),
                      sum  = $(`ul li[sID="${sID}"] h4`).attr("sum");
                  $(`ul li[sID="${sID}"] h4`).attr({sum: +sum+1})
                  
                  if(!turn("same") || !filter([`#${user}:</b> ${mes}`], $(`ul li[sID="${sID}"] h8`).html())){
                    $(`ul li[sID="${sID}"] h4`).attr({meme: +meme+1})
                    $(`ul li[sID="${sID}"] h8`).append(`
                      <div>
                        <a target="_blank" href="${urlMes}"><b>[${ts}] #${user}:</b></a>
                        <div delete onclick="dlt(this, '${pathname}', 'message', ${ mesT });"></div>
                      </div>
                    `);
                    $(`ul li[sID="${sID}"] h8 a[href='${urlMes}']`).append(` ${mes}`)
                  }
/**************/}

                if($(`#channel_${ch}`).length && !$(`.channelFilterWrap #channel_${ch}`).prop("checked")){
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
