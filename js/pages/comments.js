function loadComments(type, listStream){
  try{
    let page = 0;
    (function startLoad(){
      if(type == pathname){
        let channel = listStream[page]["channel"],
            streamName = listStream[page]["streamName"],
            streamStart = listStream[page]["streamStart"],
            views = listStream[page]["views"].split(":")[1],
            duration = listStream[page]["duration"],
            fulldate = new Date(streamStart + cookie["UTC"]*900000 + new Date().getTimezoneOffset()*60000).toLocaleString("ru-RU", timeSet);
            // today = new Date().toLocaleString("ru-RU", dateSet),
            // yesterday = new Date(Date.parse(new Date()) - 86400000).toLocaleString("ru-RU", dateSet),
            // date = fulldate == today 
            //   ? Date.now() - listStream[page]["duration"] < 180000
            //     ? translate(["time", "online"]) : translate(["time", "today"]) : fulldate == yesterday 
            //       ? translate(["time", "yesterday"]) : fulldate,
            // dateType = fulldate == today 
            //   ? Date.now() - listStream[page]["duration"] < 180000
            //     ? "online" : "today" : fulldate == yesterday 
            //       ? "yesterday" : "time";
        // console.log(channel, duration)
        $("main ul").append(`
          <li sS="${streamStart}" type="comments">
            <h4>
              <a target="_blank" href="https://www.twitch.tv/${channel}" totalsum="${streamName}">${channel}[${views}] </a>      
              <br><a date="${fulldate}" fulldate="~${duration}" datetype="${123}"></a>
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