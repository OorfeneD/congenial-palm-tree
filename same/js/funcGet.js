function start(pathname){
  switch(pathname){
    case "main": loadMain(pathname); break;
    case "fbi": case "notes": case "tags": loadComments(pathname); break;
    // case "archive": loadArchive(pathname); break;
    case "settings": loadSettings(pathname); break;
    // case "database": loadDatabase(pathname); break;
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка нижнего меню
function getBottomFilter(){
  let hideFilter = "bottomFilter";
  for(let i = 0; i < $(`.${hideFilter} label`).length; i++){
    let name = $(`.${hideFilter} label`).eq(i).attr("for");
    $(`.${hideFilter} label[for='${name}']`).css({
      display: filterOnly(pageSet[hideFilter][`hide_${name}`], pathname) ? "none" : "flex",
    })
  }  
  $(`.${hideFilter}`).css({display: 
    $(`.${hideFilter} label[style*='display: none;']`).length == $(`.${hideFilter} label`).length 
    ? "none" 
      : "flex",
  })
  if(cookie["turn_filter"][pathname] == "1" && !filterOnly(pageSet.bottomFilter.hide_filter, pathname)){  
    $(".bottomFilter #filter").prop("checked", true); 
  }  
  getRightFilter();
  reloadAutoload()
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Смена темы сайта
function getTheme(input){
  if(input){
    let newTheme = $("#getTheme").prop("checked") ? "night" : "day";
    cookie["theme"] = newTheme;
    document.cookie = `theme=${newTheme};expires=${cookieDate}`;
  }
  let themeStyle = ":root{";
  for(let i = 0; i < Object.values(colorSet[cookie["theme"]]).length; i++){
    let key = Object.keys(colorSet[cookie["theme"]])[i],
        value = Object.values(colorSet[cookie["theme"]])[i];
    themeStyle = themeStyle + `--${key}: ${value};`;
  }
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
      : !filter(pageSet["bottomFilter"].hide_autoload, pathname)
        ? " - " + $(".bottomFilter label[for='autoload']").attr("number")
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
        $(`.activeBottomFilter label[for="${labelArr[i]}FilterMax"]`).attr({
          name: i == 0 || i == 1 ? translate(["menu", "filter", labelArr[i]]) : translate(["pages", labelArr[i]]),
        })
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
    $(".activeBottomFilter")
      .css({display: $(".bottomFilter #filter").prop("checked") ? "flex" : "none"})
      .html("");
    switch(pathname){
      case "settings":     
        let labelArr = ["theme", "same", ...allPages];
        for(let i = 0; i < labelArr.length; i++){
          $(".activeBottomFilter").append(`
          <a style="display: flex; width: 100%;" href="/${pathname}#${labelArr[i]}">
            <input type="radio" name="filterMax" id="${labelArr[i]}FilterMax" onclick="getSettings(this)">
            <label for="${labelArr[i]}FilterMax"></label>
          </a>
          `)
          $(`.activeBottomFilter label[for="${labelArr[i]}FilterMax"]`).attr({
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
  let check = $(ths ? ths : ".activeBottomFilter input:nth-child(3)").attr("id").slice(0, -9);
  alert(ckeck)
  $(`.activeBottomFilter input#${check}FilterMax`).prop("checked", true);
  // let check = $(".activeBottomFilter input:checked").attr("id").slice(0, -9);
  $("main ul").html("")
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
  if(cookie["turn_autoload"][pathname] == "1" && !filterOnly(pageSet.bottomFilter.hide_autoload, pathname)){
    $("#autoload").prop("checked", true);
  }  
}