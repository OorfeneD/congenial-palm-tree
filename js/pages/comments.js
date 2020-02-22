function loadComments(type, result, step){
  try{
    if(result == "end"){
      endAutoload();
    }else{
      (function startLoad(page = Object.keys(result).length - 1){
        if(type == pathname && Object.keys(result).length){
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

          let sID   = Object.keys(result)[page],
              mArr  = result[sID]["mes"];
          let ch    = result[sID]["c"],
              sS    = result[sID]["sS"]*1000,
              dur   = result[sID]["d"],
              title = result[sID]["sN"],
              sN    = result[sID]["sN"].length > (80 - ch.length) 
                      ? result[sID]["sN"].slice(0, (77 - ch.length)) + "..." 
                      : result[sID]["sN"];

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

            $("main ul div[load]").before(`
              <input type="checkbox" id="arrow_comments${sID}" ${cookie["turn_arrow"][pathname] == "1" ? "checked" : ""}>
              <label for="arrow_comments${sID}" icon="arrow"></label>
              <li sID="${sID}" type="comments" ${dateType == "time" ? cookie["turn_old"][pathname] ? "old" : "" : ""}>
                <h4>
                  <a target="_blank" href="https://www.twitch.tv/${ch}"ch>${ch}</a>   
                  <a target="_blank" href="${urlLi}" title="${title}" sN>${sN}</a>   
                  <a date="${date}" fulldate="~${dur}" datetype="${dateType}"></a>
                </h4>
                <h8 meme="0" sum="0"></h8>
              </li>
            `);
            addTitleNum();

/**********/for(let i = 0; i < mArr.length; i++){
              let ts = tLS(mArr[i]["t"] - sS - new Date().getTimezoneOffset()*-60000, timeSet),
                  user = mArr[i]["u"],
                  mes = mArr[i]["m"];

              let url = urlLi + `&t=${ts.split(":")[0]}h${ts.split(":")[1]}m${ts.split(":")[2]}s`;

              let meme = $(`ul li[sID="${sID}"] h8`).attr("meme"),
                  sum  = $(`ul li[sID="${sID}"] h8`).attr("sum");
              $(`ul li[sID="${sID}"] h8`).attr({sum: +sum+1})
              if(!filter([`#${user}:</b> ${mes}`], $(`ul li[sID="${sID}"] h8`).html())){
                $(`ul li[sID="${sID}"] h8`).attr({meme: +meme+1})
                $(`ul li[sID="${sID}"] h8`).append(`
                  <div>
                    <a target="_blank" href="${url}">
                      <b>[${ts}] #${user}:</b> ${mes}
                    </a>
                    <div delete></div>
                  </div>
                `);
              }
/**********/}
            // loadCommentsObj[$(`ul li[sID=${sID}]`).offset().top - 20] = sID;


////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////

          setTimeout(() => {
            page--;
            if(page >= 0){
              if(pathname == type){reload();}
            }else{
              getContent(pathname, +step+1);
            }
            function reload(){
              let sH = +$("html").prop('scrollHeight'),
                  sT = +$(document).scrollTop();
              if(pathname == type){
                if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){startLoad(page)}
                  else{setTimeout(() => pathname == type ? reload() : "", 100)}
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
