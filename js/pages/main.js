function loadMain(type){
  try{
    $("main").append(`<a id="awayMove" target="_blank" onwheel="graphXWheel(this, event)"></a>`)
    let page = 0;
    (function startLoad(){
      if(type == pathname){
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
              <div class="mainMenu" onclick="alert('Тут что-то будет')"><div></div></div>
              <input type="range" name="bottomRange" class="bottomRange" min="0" max="51" step="1" value="0" percent="0" oninput="bottomRange(this);">
              <input type="range" name="rightRange" class="rightRange" min="0" max="8" step="1" value="0" orient="vertical" oninput="rightRange(this);" m0="13" m1="0" m2="8" m3="2" m4="1" m5="0" m6="4" m7="0" m8="3">
            </h8>                 
          </li>
        `);
        addLi(); 
        for(let i = 0; i < memes.length; i++){
          $(`li[cS='${page}'] .rightRange`).attr(`m${i}`, 20*i);
          $(`li[cS='${page}'] .allMaxLine`).append(`
            <dot meme="m${i}" memename="${memes[i]}" style="bottom: ${20*(i+1)}px; background: ${atColor[i]}; color: #222" alt="${i}" hover="${!i?1:0}" onclick="dotclick(this);"></dot>      
          `)
        }
        setTimeout(() => {
          page++; 
          if(page < 15){
            if(pathname == type){reload()}
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
  }catch(e){setTimeout(() => loadMain(type), 200)}  
}