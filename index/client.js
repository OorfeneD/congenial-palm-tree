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
 
/////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////// скрыть/показать иконки нижнего меню в зависимости от страницы
    getBottomFilter()
    
/////////////////////////////////////////////////////////////////////////////////////////////

    
    // if(cookie["autoload"]){$("#autoload").prop("checked", true)}
    //   else{$("#autoload").prop("checked", false)}



    switch(url){
      case "main": loadMain(url); break;
      case "fbi", "notes", "tags": loadComments(url); break;
      case "archive": loadArchive(url); break;
      case "settings": loadSettings(url); break;
      case "database": loadDatabase(url); break;
    }
  }
}
////////////////////////////////////////////////////////////////////////
////////////////////////////////////////////////////////////////////////

function loadMain(type){
  try{
    for(let page = 0; page < 5; page++){
      $("main ul").append(`
        <li day="0" cS="${page}" cID="0" zoom="0" graph>
          <h4>
            <a target="_blank" href="https://www.twitch.tv/Alcore" totalsum="Название стрима">Alcore</a>
            <br><a date="сегодня" fulldate="03 февраля"></a>
          </h4>
          <h8 meme="312" sum="532">
            <div class="graphX">
              <canvas class="graph" id="canvas1580717733000" height="200" width="1440px" style="height: 200px; width: 1440px"></canvas>
              <canvas class="graphAim" id="aim1580717733000"></canvas>
            </div>   
            <div class="menu" onclick="alert('Тут что-то будет')"><div></div></div>
            <input type="range" name="bottomRange" class="bottomRange" min="0" max="51" step="1" value="0" percent="0" oninput="bottomRange(this);">
            <input type="range" name="rightRange" class="rightRange" min="0" max="8" step="1" value="0" orient="vertical" oninput="rightRange(this);" m0="13" m1="0" m2="8" m3="2" m4="1" m5="0" m6="4" m7="0" m8="3">
          </h8>                 
        </li>
      `);
      for(let i = 0; i < memes.length; i++){
        $(`li[cS='${page}'] input.rightRange`).attr(`m${i}`, 5*i);
        
      }
    }
  }catch(e){setTimeout(() => loadMain(type), 200)}  
}