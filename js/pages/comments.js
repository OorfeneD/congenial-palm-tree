function loadComments(type){
  try{
    let page = 0;
    (function startLoad(){
      $("main ul").append(`
        <li cS="${page}" type="comments">
          <h4>
            <a target="_blank" href="https://www.twitch.tv/Alcore" totalsum="Название стрима">Alcore</a>      
            <br><a date="сегодня" fulldate="03 февраля"></a>
          </h4>
          <h8 meme="${page+5}" sum="${page*2 + 5}"></h8>                 
        </li>
      `);
      addLi();
      let username = "user",
          message = "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut neque ex. "
      for(let i = 0; i < page+5; i++){
        $(`ul li[cS=${page}] h8`).append(`
          <div>
            <a target="_blank" href="#">
              <b>[время]${type == "fbi" ? " #"+username : ""}:</b> ${message}
            </a>
            <div delete></div>
          </div>
        `)
        message = message + "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent ut neque ex. "
        // $(`ul li[cS=${page}] h8 a`).append(`<a href="#2">123</a>`)
      }
      setTimeout(() => {
        page++;
        if(page < 15){
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
    })()
  }catch(e){setTimeout(() => loadMain(type), 200)}  
}