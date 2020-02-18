function loadComments(type, listStream, step){
  try{

    (function startLoad(page = 0){
    // for(let page = 0; page < listStream.length; page++){
      if(type == pathname){
        
        let utc = new Date().getTimezoneOffset()*-60000 - cookie["UTC"]/4*60*60*1000,
            sID      = listStream[page]["sI"],
            channel  = listStream[page]["c"],
            ts       = listStream[page]["t"],
            username = listStream[page]["u"],
            message  = listStream[page]["m"];
        
        if(!streamArr[sID]){
          $.ajax({
            url: "listStream",
            data: {from: Object.keys(streamArr).length, limit: loadLimit},
            method: 'get',
            success: data => {
              for(let i = 0; i < data.length; i++){
                sSmax = data[i]["sS"] > sSmax ? data[i]["sS"] : sSmax;
                let sID = data[i]["sI"];
                delete data[i]["sI"];
                streamArr[sID] = data[i];
              }
              startLoad(page)
            }
          })
          
        }else{
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          let sN    = streamArr[sID]["sN"],
              sS    = streamArr[sID]["sS"]*1000,
              dur   = streamArr[sID]["d"],
              views = streamArr[sID]["v"].split(":")[1],
              vDur  = (+dur.split(":")[0]*60*60 + +dur.split(":")[1]*60 + +dur.split(":")[2])*1000,
              vTime = new Date(sS - utc).toLocaleString("ru-RU", timeSet),
              vDate = new Date(sS - utc).toLocaleString("ru-RU", dateSet),
              today = new Date(Date.now() - utc).toLocaleString("ru-RU", dateSet),
              yesterday = new Date(Date.now() - utc - 86400000).toLocaleString("ru-RU", dateSet),           
              date = 5*60*1000 - (Date.now() - sS - vDur) > 0
                ? translate(["time", "online"]) : vDate == today 
                  ? vTime : vDate == yesterday 
                    ? translate(["time", "yesterday"]) : vDate,
              dateType = 5*60*1000 - (Date.now() - sS - vDur) > 0
                  ? "online" : vDate == today 
                    ? "today" : vDate == yesterday 
                      ? "yesterday" : "time";

  ////////////////////////////////////////////////////////////////////////////////////////////////
  ////////////////////////////////////////////////////////////////////////////////////////////////
          console.log(sID, channel, username, message);
          if(!$(`ul li[sID=${sID}]`).length){
            $("main ul").append(`
              <li sID="${sID}" type="comments">
                <h4>
                  <a target="_blank" href="https://www.twitch.tv/${channel}" totalsum="${views}" ch>${channel}</a>   
                  <a target="_blank" href="https://www.twitch.tv/videos/${sID}" sN>${sN}</a>   
                  <a date="${date}" fulldate="~${dur}" datetype="${dateType}"></a>
                </h4>
                <h8 meme="0" sum="0"></h8>
              </li>
            `); 
          }
          addTitleNum();
          $(`ul li[sID="${sID}"] h8`).append(`
            <div>
              <a target="_blank" href="#">
                <b>[${ts}] #${username}:</b> ${message}
              </a>
              <div delete></div>
            </div>
          `);
            // $(`ul li[cS=${page}] h8 a`).append(`<a href="#2">123</a>`)
        
        
        
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
        }
      }
    // }
    // if(listStream.length == loadLimit){
    //   (function reload(){
    //     let sH = +$("html").prop('scrollHeight'),
    //         sT = +$(document).scrollTop();
    //     if(pathname == type){
    //       if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){getContent(pathname, +step+1);}
    //         else{setTimeout(() => pathname == type ? reload() : "", 100)}
    //     }
    //   })()
    // }else{endAutoload();}
    
    })()
  }catch(e){setTimeout(() => loadComments(type, listStream, step), 200)}  
}