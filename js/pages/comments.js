function loadComments(type, listStream){
  try{
    let page = 0;
    (function startLoad(){
      if(type == pathname){
        let date = new Date(listStream[page]["streamStart"] + cookie["UTC"]/4*60*60*1000).toLocaleString("ru-RU", dateSet);
        $("main ul").append(`
          <li sS="${listStream[page]["streamStart"]}" type="comments">
            <h4>
              <a target="_blank" href="https://www.twitch.tv/${listStream[page]["channel"]}" totalsum="${listStream[page]["streamName"]}">${listStream[page]["channel"]}</a>      
              <br><a date="${date}" fulldate="${listStream[page]["streamStart"]}"></a>
            </h4>
            <h8 meme="${page+5}" sum="${page*2 + 5}"></h8>                 
          </li>
        `); 
        addLi();
        let username = "user",
            message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut neque ex. "
          $(`ul li[sS=${listStream[page]["streamStart"]}] h8`).append(`
            <div>
              <a target="_blank" href="#">
                <b>[время] #${username}:</b> ${message}
              </a>
              <div delete></div>
            </div>
          `)
          message = message + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut neque ex. "
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
        }, 200) 
      }
    })()
  }catch(e){setTimeout(() => loadComments(type), 200)}  
}