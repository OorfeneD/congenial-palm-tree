function loadClips(type, result, step, oldget){
  try{
    if(result == "end"){
      endAutoload();
      $("#autoload").attr({act: "stop"})
    }else{
      (function startLoad(page = 0){
        if(window.location.href == type && Object.keys(result).length && oldget == get){
          
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
          console.log(result[page])
          if(true){
 
            let {
              n: id, 
              c: channel,
              u: creator,
              g: gID,
              t: title,
              v: views,
              s: time,
              i: icon
            } = result[page];
            let [year, month, day] = time.split("T")[0].split("-")
            time = time.split("T")[0]
            let date = `${day}.${month}.${year}`
            title = title.length > (70 - channel.length) 
                  ? title.slice(0, (67 - channel.length)) + "..." 
                  : title;

//             let vTime = tLS(sS - utc(), timeSet),
//                 vDate = tLS(sS - utc()),
//                 tDay  = tLS(Date.now() - utc()),
//                 yDay  = tLS(Date.now() - utc() - 24*60*60*1000);   

//             let date = 5*60*1000 - (Date.now() - sS) > 0
//                   ? translate(["time", "online"]) : vDate == tDay 
//                     ? vTime : vDate == yDay 
//                       ? translate(["time", "yesterday"]) : vDate,
//                 dateType = 5*60*1000 - (Date.now() - sS) > 0
//                     ? "online" : vDate == tDay 
//                       ? "today" : vDate == yDay 
//                         ? "yesterday" : "time";        

            
////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////////////////////////////
            
            if(!$(`li#${id}`).length){
              $("main ul div[load]").before(`
                <input type="checkbox" id="arrow_comments_${id}" ${turn("arrow") ? "checked" : ""}>
                <label for="arrow_comments_${id}" icon="arrow" username="${channel}"></label>
                <li id="${id}" type="${pathname}" pathname="${pathname}" username="${channel}" counter>
                  <h4 meme="${creator}" sum="${views}">
                    <a target="_blank" href="https://www.twitch.tv/${channel}" ch>${channel}</a>
                    <a target="_blank" href="${url(id)}" title="${title}" sN>${title}</a>   
                    <a target="_blank" date="${date}"></a>
                  </h4>
                  <div class="deleteLi" onclick="dlt(this, '${pathname}', 'block');"></div>
                  <h8></h8>
                </li>
              `);
            
              
              if($(`#clip_${id}`).length && !$(`.channelFilterWrap #clip_${id}`).prop("checked")){
                $(`ul li#${id}`).hide();
                $(`ul label[for='arrow_comments_${id}']`).hide();
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
              }
            // else{getContent(pathname, +step+1);}
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
    setTimeout(() => loadClips(type, result, step, oldget), 200);
  }  
}
