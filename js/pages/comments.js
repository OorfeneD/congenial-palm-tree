function loadComments(type, listStream, step){
  try{
    (function startLoad(page = 0){
      if(type == pathname){
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
        
        let ch    = listStream[page]["c"],
            sS    = listStream[page]["sS"]*1000,
            sI    = listStream[page]["sI"],
            dur   = listStream[page]["d"],
            sN    = listStream[page]["sN"],
            value = listStream[page]["v"].split(":")[1];
        
        let vDur  = (+dur.split(":")[0]*60*60 + +dur.split(":")[1]*60 + +dur.split(":")[2])*1000,
            vTime = new Date(sS - utc()).toLocaleString("ru-RU", timeSet),
            vDate = new Date(sS - utc()).toLocaleString("ru-RU", dateSet),
            tDay  = new Date(Date.now() - utc()).toLocaleString("ru-RU", dateSet),
            yDay  = new Date(Date.now() - utc() - 86400000).toLocaleString("ru-RU", dateSet);   
            
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
          data: {type: pathname, sI: sI},
          method: 'get',
          success: data => {
            for(let i = 0; i < data.length; i++){
              let ts = data[i]["t"],
                  user = data[i]["u"],
                  mes = data[i]["m"];
              
              console.log(date, dateType)
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