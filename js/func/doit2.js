///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Смена темы сайта
function getTheme(input){
  if(input){
    let newTheme = $("#getTheme").prop("checked") ? "night" : "day";
    cookie["theme"] = newTheme;
    document.cookie = `theme=${cookie["theme"]};expires=${cookieDate}`;
    $(".getTheme").attr({icon: cookie["theme"]})
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
  if($("ul input[name='hueRotate']")) $("ul input[name='hueRotate']").val(value).attr({deg: +value})
  getHueRotate();
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Смена языка
function getLang(ths){
  let lang = String(ths).length != 2 ? $(ths).attr("for").slice(0, -4) : String(ths);
  cookie["lang"] = lang;
  document.cookie = `lang=${cookie["lang"]};expires=${cookieDate}`;
  $("#title").html(translate(["pages", pathname]));
  
  $("label[for='getTheme']").attr({name: translate(["menu", "getTheme"])})
  for(let page = 0; page < allPages.length; page++){
    let key = allPages[page],
        value = translate(["pages", allPages[page]]);
    $(`label[for='${key}Page']`).attr({name: `» ${value}`})
  }
  
  $(`label[for='filter']`).attr({name: translate(["menu", "filter", "name"])})
  $("title").html(`${translate(["pages", pathname])}${
    $(`label[for='autoload']`).attr("status") == "completed"
    ? " - " + translate(["menu", "autoloadcompleted"])
      : !filter(pageSet["bottomMenu"].hide_autoload, pathname)
        ? " - " + $(".bottomMenu label[for='autoload']").attr("number")
          : ""
  }`);
  
  $(`label[for='autoload']`).attr({name: 
    $(`label[for='autoload']`).attr("status") == "completed" 
    ? translate(["menu", "autoloadcompleted"])
      : translate(["menu", "autoload"])
  })
  
  switch(pathname){
    case "settings":     
      let labelArr = ["theme", "same", ...allPages];
      for(let i = 0; i < labelArr.length; i++){
        $(`.rightFilter label[for="${labelArr[i]}FilterMax"]`).attr({
          name: i == 0 || i == 1 ? translate(["menu", "filter", labelArr[i]]) : translate(["pages", labelArr[i]]),
        })
      }
      switch(hash){
        default: 
          $("ul li[for='cookieBottomMenu'] h4 a").html(translate(["settings", "activePage"]))
        break;
      }
    break;
  }
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
function getAutoload(ths){
  if($(ths).attr("status") == "completed")
  $("#autoload").prop("checked", true)
}   

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Фильтр правого меню
function getRightFilter(){
  setTimeout(() => {
    $(".rightFilter").html("").css({display: $(".bottomMenu #filter").prop("checked") ? "flex" : "none"});
    switch(pathname){
      case "settings":     
        let labelArr = ["theme", "same", ...allPages];
        for(let i = 0; i < labelArr.length; i++){
          $(".rightFilter").append(`
          <a style="display: flex; width: 100%;" href="/${pathname}#${labelArr[i]}">
            <input type="radio" name="filterMax" id="${labelArr[i]}FilterMax" onclick="getSettings(this)">
            <label for="${labelArr[i]}FilterMax"></label>
          </a>
          `)
          $(`.rightFilter label[for="${labelArr[i]}FilterMax"]`).attr({
            name: i == 0 || i == 1 ? translate(["menu", "filter", labelArr[i]]) : translate(["pages", labelArr[i]]),
          })
        }
        getSettings();
      break;
    }
  }, 50)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function getSettings(ths){
  let check = ths ? $(ths).attr("id").slice(0, -9) : hash ? hash : $(".rightFilter input:nth-child(1)").attr("id").slice(0, -9);
  hash = check;
  $(`.rightFilter input#${check}FilterMax`).prop("checked", true);
  history.replaceState('', null, pathname+"#"+check);
  $("main ul").html("");
  if(filter(allPages, check)){
    let list = pageSet.bottomMenu.list;
    for(let i = 0; i < list.length; i++){
      if(
        !filterOnly(pageSet["bottomMenu"][`turn_${list[i]}`], check) && 
        !filterOnly(pageSet["bottomMenu"][`hide_${list[i]}`], check)
      ){  
        if($("ul li[for='cookieRightFilter']").length == 0){
          $("main ul").append(`
            <li for="cookieRightFilter" type="settings">
              <h4><a>${translate(["settings", "activePage"])}</a></h4>
              <h8 style="flex-direction: row;" notcounter></h8>
            </li>
          `)}
        $("li[for='cookieRightFilter'] h8").append(`
          <input type="checkbox" id="${list[i]}Cookie" oninput="objectCookie(this);">
          <label for="${list[i]}Cookie" icon="${list[i]}"></label><br>
        `);
        $(`input#${list[i]}Cookie`).prop("checked", +cookie[`turn_${list[i]}`][check])
      }       
    } 
  }
  switch(check){
    case "theme":
      $("main ul").append(`
        <li type="settings">
          <input type="range" name="hueRotate" class="hueRotateRange" min="0" max="359" step="1" oninput="hueRotate(this)">
        </li>
      `)
      let value = cookie["hueRotate"][cookie["theme"]];
      $("main ul input[name='hueRotate']").val(value).attr({deg: +value})
    break;
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
function endAutoload(){
  $("#autoload").prop("checked", false); 
  $("label[for='autoload']").attr({name: translate(["menu", "autoloadcompleted"]), status: "completed"})
  $("title").html(`${translate(["pages", pathname])} - ${translate(["menu", "autoloadcompleted"])}`)
}   
function reloadAutoload(){
  $("#autoload").prop("checked", false);
  $("label[for='autoload']").attr({name: translate(["menu", "autoload"]), number: 0, status: "process"})
  if(cookie["turn_autoload"][pathname] == "1" && !filterOnly(pageSet.bottomMenu.hide_autoload, pathname)){
    $("#autoload").prop("checked", true);
  }  
}