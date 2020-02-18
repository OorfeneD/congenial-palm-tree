function loadComments(type, listStream){
  try{
    let page = 0;
    (function startLoad(){
      if(type == pathname){
        let utc = new Date().getTimezoneOffset()*-60000,
            channel = listStream[page]["channel"],
            streamName = listStream[page]["streamName"],
            streamStart = listStream[page]["streamStart"],
            duration = listStream[page]["duration"],
            views = listStream[page]["views"].split(":")[1],
            vDur = (+duration.split(":")[0]*3600 + +duration.split(":")[1]*60 + +duration.split(":")[2])*1000,
            vTime = new Date(streamStart - utc + cookie["UTC"]/4*60*60*1000).toLocaleString("ru-RU", timeSet),
            vDate = new Date(streamStart - utc + cookie["UTC"]/4*60*60*1000).toLocaleString("ru-RU", dateSet),
            today = new Date(Date.now() - utc + cookie["UTC"]*900000).toLocaleString("ru-RU", dateSet),
            yesterday = new Date(Date.now() - utc + cookie["UTC"]*900000 - 86400000).toLocaleString("ru-RU", dateSet),
            date = vDate == today 
              ? (Date.now() - (streamStart+vDur)) <= 2*60*1000
                ? translate(["time", "online"]) : vTime
                : vDate == yesterday 
                  ? translate(["time", "yesterday"]) : vDate,
            dateType = vDate == today 
              ? (Date.now() - (streamStart+vDur)) <= 2*60*1000
                ? "online" : "today" : vDate == yesterday 
                  ? "yesterday" : "time";
        console.log(channel, 2*60*1000 - (Date.now() - (streamStart+vDur)), new Date(Date.now() - (streamStart+vDur) - utc).toLocaleString("ru-RU", timeSet))
        // console.error(channel);
        // console.log(`_sS:  %c${streamStart}  %c${new Date(streamStart - utc).toLocaleString("ru-RU", timeSet)}`, "color: blue", "color:black");
        // console.log(`dur:  %c${zero(vDur, 13)}  %c${new Date(vDur - utc).toLocaleString("ru-RU", timeSet)}`, "color: blue", "color:black");
        // console.log(`s+D:  %c${streamStart+vDur}  %c${new Date(streamStart+vDur - utc).toLocaleString("ru-RU", timeSet)}`, "color: blue", "color:black");
        // console.log(`///:  %c${zero(Date.now() - (streamStart+vDur), 13)}  %c${new Date(Date.now() - (streamStart+vDur) - utc).toLocaleString("ru-RU", timeSet)}`, "color: blue", "color:black");
        // console.log(`now:  %c${Date.now()}  %c${new Date(Date.now() - utc).toLocaleString("ru-RU", timeSet)}`, "color: blue", "color:black");
        $("main ul").append(`
          <li sS="${streamStart}" type="comments">
            <h4>
              <a target="_blank" href="https://www.twitch.tv/${channel}" totalsum="${streamName}">${channel}[${views}] </a>      
              <br><a date="${date}" fulldate="~${duration}" datetype="${dateType}"></a>
            </h4>
            <h8 meme="1" sum="1"></h8>                 
          </li>
        `); 
        addLi();
        let username = "user",
            message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut neque ex. ";
        $(`ul li[sS=${streamStart}] h8`).append(`
          <div>
            <a target="_blank" href="#">
              <b>[время] #${username}:</b> ${message}
            </a>
            <div delete></div>
          </div>
        `)
          // $(`ul li[cS=${page}] h8 a`).append(`<a href="#2">123</a>`)
        setTimeout(() => {
          page++;
          if(page < listStream.length){
            if(pathname == type){reload();}
          }else{endAutoload();}
          function reload(){
            let sH = +$("html").prop('scrollHeight'),
                sT = +$(document).scrollTop();
            if(pathname == type){
              if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){startLoad()}
                else{setTimeout(() => pathname == type ? reload() : "", 100)}
            }
          }
        }, 100) 
      }
    })()
  }catch(e){setTimeout(() => loadComments(type), 200)}  
}