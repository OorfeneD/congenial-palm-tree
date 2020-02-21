function loadComments(type, listStream, step){
  try{
    (function startLoad(page = 0){
      if(type == pathname){
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
        
        let ch    = listStream[page]["c"],
            sS    = listStream[page]["sS"]*1000,
            sID   = listStream[page]["sI"],
            dur   = listStream[page]["d"],
            sN    = listStream[page]["sN"],
            views = listStream[page]["v"].split(":")[1];
        
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
        
        $.ajax({
          url: "listDB",
          data: {type: pathname, sID: sID},
          method: 'get',
          success: data => {
            
            if(!$(`ul li[sID=${sID}]`).length && data.length){
              $("main ul").append(`
                <li sID="${sID}" type="comments">
                  <h4>
                    <a target="_blank" href="https://www.twitch.tv/${ch}" totalsum="${views}" ch>${ch}</a>   
                    <a target="_blank" href="https://www.twitch.tv/videos/${sID}" sN>${sN}</a>   
                    <a date="${date}" fulldate="~${dur}" datetype="${dateType}"></a>
                  </h4>
                  <h8 meme="0" sum="0"></h8>
                </li>
              `); 
            }
            addTitleNum();
            
            for(let i = 0; i < data.length; i++){
              let ts = tLS(data[i]["t"] - sS - new Date().getTimezoneOffset()*-60000, timeSet),
                  user = data[i]["u"],
                  mes = data[i]["m"];
              
              let url = !cookie["turn_chat"][pathname] 
                  ? `https://twitch.tv/videos/${sID}?t=${ts.split(":")[0]}h${ts.split(":")[1]}m${ts.split(":")[2]}s` 
                  : `https://player.twitch.tv/?autoplay=true&video=v${sID}?t=${ts.split(":")[0]}h${ts.split(":")[1]}m${ts.split(":")[2]}s`;
              
              let meme = $(`ul li[sID="${sID}"] h8`).attr("meme"),
                  sum  = $(`ul li[sID="${sID}"] h8`).attr("sum");
              $(`ul li[sID="${sID}"] h8`).attr({sum: +sum+1})
              if(!$(`ul li[sID="${sID}"] h8>div>a[usermes="${user+mes}"]`).length){
                $(`ul li[sID="${sID}"] h8`).attr({meme: +meme+1})
                $(`ul li[sID="${sID}"] h8`).append(`
                  <div>
                    <a target="_blank" href="${url}" usermes="${user+mes}">
                      <b>[${ts}] #${user}:</b> ${mes}
                    </a>
                    <div delete></div>
                  </div>
                `);
              }
            }
          }
        })

////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
        
        setTimeout(() => {
          page++;
          if(page < listStream.length){
            if(pathname == type){reload();}
          }else{
            if(listStream.length == loadLimit){
              getContent(pathname, +step+1)
            }else{endAutoload();}
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
  }catch(e){setTimeout(() => loadComments(type, listStream, step), 200)}  
}