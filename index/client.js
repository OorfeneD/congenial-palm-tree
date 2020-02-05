function getPage(ths){
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// измненеие названия и url путя страницы
  pathname = $(ths).attr("id").slice(0, -4).toLowerCase();
  if(location.pathname.slice(1) != pathname){
    let title = langSet[lang()]["pages"][pathname];
    $("#title, title").html(title);
    history.replaceState('', null, pathname);

/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// после смены страницы обнулить все данные
    $(document).scrollTop(0);
    $("input#autoload, input#filter").prop("checked", false);  
    $("label[for='autoload']").attr({number: 0})
    $(".activeBottomFilter").remove();
    $("main ul").html("");
 
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// скрыть/показать иконки нижнего меню в зависимости от страницы
    getBottomFilter()
    start(pathname);
/////////////////////////////////////////////////////////////////////////////////////////////
  }
}
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function loadMain(type){
  try{
    for(let page = 0; page < 5; page++){
      $("main ul").append(`
        <li day="0" cS="${page}" cID="0" zoom="0" type="main">
          <h4>
            <a target="_blank" href="https://www.twitch.tv/Alcore" totalsum="Название стрима">Alcore</a>
            <br><a date="сегодня" fulldate="03 февраля"></a>
          </h4>
          <h8 meme="${memes[0]}" sum="0">
            <div class="graphX">
              <canvas class="graph" id="canvas1580717733000" height="200" width="1440px" style="height: 200px; width: 1440px"></canvas>
              <canvas class="graphAim" id="aim1580717733000"></canvas>
            </div>   
            <div class="allMaxLine"></div>
            <div class="menu" onclick="alert('Тут что-то будет')"><div></div></div>
            <input type="range" name="bottomRange" class="bottomRange" min="0" max="51" step="1" value="0" percent="0" oninput="bottomRange(this);">
            <input type="range" name="rightRange" class="rightRange" min="0" max="8" step="1" value="0" orient="vertical" oninput="rightRange(this);" m0="13" m1="0" m2="8" m3="2" m4="1" m5="0" m6="4" m7="0" m8="3">
          </h8>                 
        </li>
      `);
      for(let i = 0; i < memes.length; i++){
        $(`li[cS='${page}'] .rightRange`).attr(`m${i}`, 20*i);
        $(`li[cS='${page}'] .allMaxLine`).append(`
          <dot meme="m${i}" memename="m${memes[i]}" style="bottom: ${20*(i+1)}px; background: #908EED; color: #222" alt="${i}" hover="${!i?1:0}" onclick="dotclick(this);"></dot>      
        `)
      }
    }
  }catch(e){setTimeout(() => loadMain(type), 200)}  
}

function loadComments(type){
  try{
    for(let page = 0; page < 5; page++){
      $("main ul").append(`
        <li cS="${page}" type="comments">
          <h4>
            <a target="_blank" href="https://www.twitch.tv/Alcore" totalsum="Название стрима">Alcore</a>      
            <br><a date="сегодня" fulldate="03 февраля"></a>
          </h4>
          <h8 meme="${page+5}" sum="${page*2 + 5}"></h8>                 
        </li>
      `);
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
    }
  }catch(e){setTimeout(() => loadMain(type), 200)}  
}