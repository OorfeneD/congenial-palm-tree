///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка нижнего меню
function getBottomMenu(){
  for(let i = 0; i < $(".bottomMenu label").length; i++){
    let name = $(".bottomMenu label").eq(i).attr("for");
    $(`.bottomMenu label[for='${name}']`).css({
      display: filterOnly(pageSet["bottomMenu"][`hide_${name}`], pathname) ? "none" : "flex",
    })
  }  
  $(".bottomMenu").css({display: 
    $(".bottomMenu label[style*='display: none;']").length == $(".bottomMenu label").length 
    ? "none" 
      : "flex",
  })
  if(cookie["turn_filter"][pathname] == "1" && !filterOnly(pageSet.bottomMenu.hide_filter, pathname)){  
    $(".bottomMenu #filter").prop("checked", true); 
  }  
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function getRightFilter(){
  setTimeout(() => {
    let active = $(".bottomMenu #filter").prop("checked");
    $(".rightFilter").html("<div></div>").css({display: active ? "flex" : "none"});
    $(".rightFilter>div").append(`<div view="button" id="resetAll" name="${translate(["menu", "filter", "resetAll"])}" onclick="allReset()"></div>`)
    switch(pathname){
      case "settings":
        let labelArr = ["theme", "same", ...allPages];
        for(let i = 0; i < labelArr.length; i++){
          $(".rightFilter>div").append(`
            <a style="display: flex; width: 100%;" href="/${pathname}#${labelArr[i]}">
              <input type="radio" name="filterMax" id="${labelArr[i]}FilterMax" onclick="loadSettings(this)">
              <label view="button" for="${labelArr[i]}FilterMax"></label>
            </a>
          `)
          $(`.rightFilter input#${hash}FilterMax`).prop("checked", true);
          $(`.rightFilter label[for="${labelArr[i]}FilterMax"]`).attr({
            name: i == 0 || i == 1 ? translate(["menu", "filter", labelArr[i]]) : translate(["pages", labelArr[i]]),
          })
        }
        let widthSmall = $(".rightMenu").width(),
            paddingTop = ($(document).height() % widthSmall )+ widthSmall;
        $(".rightFilter>div").css("padding-bottom", paddingTop + "px")
      break;
    }
  }, 50)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Смена темы сайта
function getTheme(input){
  if(input){
    let newTheme = $(input).attr("for").slice(0, -5);
    cookie["theme"] = newTheme;
    document.cookie = `theme=${cookie["theme"]};expires=${cookieDate}`;
  }
  let themeStyle = ":root{";
  for(let i = 0; i < Object.values(colorObj[cookie["theme"]]).length; i++){
    let key = Object.keys(colorObj[cookie["theme"]])[i],
        value = Object.values(colorObj[cookie["theme"]])[i];
    themeStyle = themeStyle + `--${key}: ${value};`;
  }
  if(!$("head style[theme]").length){$("head").append("<style theme></style>")}  
  $("style[theme]").html(`${themeStyle}}`);
  let value = cookie["hueRotate"][cookie["theme"]];
  if($("ul input[name='theme']")) $("ul input[name='theme']").val(value).attr({deg: +value})
  getHueRotate();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Кнопка "вверх" и обратно 
function getScroll(){
  if($(document).scrollTop() == 0){
    $(document).scrollTop($(this).attr("oldScroll"))
    $(this).attr("oldScroll", 0);
  }else{
    $(this).attr("oldScroll", $(document).scrollTop())
    $(document).scrollTop(0);
  }    
}    
    
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function addLi(){
  let title = $("title").html(),
      value = $("ul li").length;
  $("title").html(`${translate(["pages", pathname])} - ${value}`)
  $("label[for='autoload']").attr({number: value})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function getClickAutoload(ths){
  if($(ths).attr("status") == "completed")
  $("#autoload").prop("checked", true)
}   
function getReloadAutoload(){
  $("#autoload").prop("checked", false);
  $("label[for='autoload']").attr({name: translate(["menu", "autoload"]), number: 0, status: "process"})
  if(cookie["turn_autoload"][pathname] == "1" && !filterOnly(pageSet.bottomMenu.hide_autoload, pathname)){
    $("#autoload").prop("checked", true);
  }  
}
function endAutoload(){
  $("#autoload").prop("checked", false); 
  $("label[for='autoload']").attr({name: translate(["menu", "autoloadcompleted"]), status: "completed"})
  $("title").html(`${translate(["pages", pathname])} - ${translate(["menu", "autoloadcompleted"])}`)
}   

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function allReset(){
  if(confirm(translate(["menu", "filter", "resetAllConfirm"]))){
    for(let i = 0; i < $(".rightFilter a").length; i++){
      let key = $(".rightFilter a").eq(i).attr("href").split("#")[1];
      reset(key, 1);
    }
  }
}
function reset(url, pass){
  let name = url == "theme" || url == "same" ? translate(["menu", "filter", url]) : translate(["pages", url]);
  if(pass || confirm(`${translate(["menu", "filter", "resetConfirm"])} #${name}`)){
    switch(url){
      case "theme":
        for(let i = 0; i < Object.keys(colorObj).length; i++){
          let key = Object.keys(colorObj)[i];
          cookie["hueRotate"][key] = "000";
          $("input.hueRotateRange").attr({deg: 0}).val(0);
        }
        getHueRotate();
        document.cookie = `hueRotate=${JSON.stringify(cookie["hueRotate"]).replace(/"/g,"")};expires=${cookieDate}`; 
      break;
      default: 
        for(let i = 0; i < pageSet.bottomMenu.list.length; i++){
          let key = pageSet.bottomMenu.list[i],
              value = filterOnly(pageSet["bottomMenu"][`turn_${key}`], url) ? 1 : 0;
          cookie[`turn_${key}`][url] = value;
          $(`ul input#${key}Cookie`).prop("checked", value);
          document.cookie = `turn_${key}=${JSON.stringify(cookie[`turn_${key}`]).replace(/"/g,"")};expires=${cookieDate}`; 
        }
      break;
    }
    loadSettings(pathname)
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function hint(ths, text){
  let hDiv = $(ths).height() ,
      wDiv = $(ths).width(),
      top = $(ths).offset().top,
      left = $(ths).offset().left;
  $(ths).attr({event: "hover", onmouseout: "hintOut(this);"}).css({cursor: "help"})
  setTimeout(() => {
    if($(ths).attr("event") == "hover"){
      $(ths).css({cursor: ""})
      $(".hint").html(translate(["hint", pathname, text])).show();
      let hHint = $(".hint").height();
      $(".hint").css({
        left: 10+wDiv+left+"px",
        top: top+(hHint > hDiv ? 0 : (hDiv - hHint) / 2 - 7)+"px"
      })
    }
  }, 1000)
}
function hintOut(ths){
  $(ths).attr({event: ""}).css({cursor: ""})
  $(".hint").html("").hide();
}




