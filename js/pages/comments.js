function loadComments(type, listStream, step){
  try{
    // let sIDs = "";
    // for(let uu = 0; uu < listStream.length; uu++){
    //   sIDs += listStream[uu]["streamID"]+";"
    // }
    // $.ajax({
    //   url: "listStream",
    //   data: {type: type, sIDs: sIDs.slice(0, -1)},
    //   method: 'get',
    //   success: data => {
    //     console.log(data);
    //   }
    // })    
    
    // let page = 0;
    // (function startLoad(){
    for(let page = 0; page < listStream.length; page++){
      if(type == pathname){
        
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
        
        let utc = new Date().getTimezoneOffset()*-60000 - cookie["UTC"]/4*60*60*1000,
            sID = listStream[page]["sI"],
            channel = listStream[page]["c"],
            // streamName = listStream[page]["sN"],
            streamStart = listStream[page]["sS"]*1000,
            // duration = listStream[page]["duration"],
            // views = listStream[page]["views"].split(":")[1],
            // vDur = (+duration.split(":")[0]*60*60 + +duration.split(":")[1]*60 + +duration.split(":")[2])*1000,
            vTime = new Date(streamStart - utc).toLocaleString("ru-RU", timeSet),
            vDate = new Date(streamStart - utc).toLocaleString("ru-RU", dateSet),
            today = new Date(Date.now() - utc).toLocaleString("ru-RU", dateSet),
            yesterday = new Date(Date.now() - utc - 86400000).toLocaleString("ru-RU", dateSet),           
            date = 5*60*1000 - (Date.now() - streamStart - vDur) > 0
              ? translate(["time", "online"]) : vDate == today 
                ? vTime : vDate == yesterday 
                  ? translate(["time", "yesterday"]) : vDate,
            dateType = 5*60*1000 - (Date.now() - streamStart - vDur) > 0
                ? "online" : vDate == today 
                  ? "today" : vDate == yesterday 
                    ? "yesterday" : "time";
        
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
        
        $("main ul").append(`
          <li sS="${sID}" type="comments">
            <h4>
              <a target="_blank" href="https://www.twitch.tv/${channel}" totalsum="${views}" ch>${channel}</a>   
              <a target="_blank" href="https://www.twitch.tv/videos/${sID}" sN>${streamName}</a>   
              <a date="${date}" fulldate="~${duration}" datetype="${dateType}"></a>
            </h4>
            <h8 meme="1" sum="1"></h8>                 
          </li>
        `); 
        addLi();
        let username = "user",
            message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut neque ex. ";
        $(`ul li[sS=${sID}] h8`).append(`
          <div>
            <a target="_blank" href="#">
              <b>[время] #${username}:</b> ${message}
            </a>
            <div delete></div>
          </div>
        `)
          // $(`ul li[cS=${page}] h8 a`).append(`<a href="#2">123</a>`)
        
        
        
        // setTimeout(() => {
        //   page++;
        //   if(page < listStream.length){
        //     if(pathname == type){reload();}
        //   }else{
        //     // if(listStream.length == 10){
        //     //   getContent(pathname, +step+1)
        //     // }else{endAutoload();}
        //   }
        //   function reload(){
        //     let sH = +$("html").prop('scrollHeight'),
        //         sT = +$(document).scrollTop();
        //     if(pathname == type){
        //       if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){startLoad()}
        //         else{setTimeout(() => pathname == type ? reload() : "", 100)}
        //     }
        //   }
        // }, 10) 
      }
    }
    if(listStream.length == loadLimit){
      (function reload(){
        let sH = +$("html").prop('scrollHeight'),
            sT = +$(document).scrollTop();
        if(pathname == type){
          if(sH <= (sT+wH*3) || $("#autoload").prop("checked") == true){getContent(pathname, +step+1);}
            else{setTimeout(() => pathname == type ? reload() : "", 100)}
        }
      })()
    }else{endAutoload();}
    
    // })()
  }catch(e){setTimeout(() => loadComments(type, listStream, step), 200)}  
}