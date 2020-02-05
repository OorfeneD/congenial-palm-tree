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
      display: filter(pageSet[hideFilter][`hide_${name}`], pathname) ? "none" : "flex",
    })
  }  
  $(`.${hideFilter}`).css({
    display: $(`.${hideFilter} label[style*='display: none;']`).length == $(`.${hideFilter} label`).length? "none" : "flex",
  })
  if(filter(pageSet[hideFilter].show_filter, pathname) && !filter(pageSet[hideFilter].hide_filter, pathname)){
    $("input#filter").prop("checked", true); 
  }  
  getRightFilter();
  if(+cookie["autoload"][pathname]){
    $("#autoload").prop("checked", true);
    getAutoload(".bottomFilter label[for='autoload']")
  } 
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
    let rootKey = Object.keys(colorSet[cookie["theme"]])[i],
        rootValue = Object.values(colorSet[cookie["theme"]])[i];
    themeStyle = themeStyle + `--${rootKey}: ${rootValue};`;
  }
  $("style[theme]").html(`${themeStyle}}`);
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Смена языка
function lang(){return $(".getLang input:checked").attr("id").slice(0, -4);}
function getLang(ths){
  let lang = String(ths).length != 2 ? $(ths).attr("for").slice(0, -4) : String(ths);
  cookie["lang"] = lang;
  document.cookie = `lang=${lang};expires=${cookieDate}`;
  $("title, #title").html(langSet[lang]["pages"][pathname]);
  $("html").attr({lang: lang})
  
  $("label[for='getTheme']").attr({name: langSet[lang].menu.getTheme})
  for(let page = 0; page < Object.keys(langSet[lang]["pages"]).length; page++){
    let pKey = Object.keys(langSet[lang]["pages"])[page],
        pVal = Object.values(langSet[lang]["pages"])[page];
    $(`label[for='${pKey}Page']`).attr({name: `» ${pVal}`})
  }
  $(`label[for='filter']`).attr({name: langSet[lang].menu.filter.name})
  $(`label[for='autoload']`).attr({name: langSet[lang].menu.autoload})
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
  if($(ths).attr("name") == langSet[lang()].menu.autoloadfinal)
  $("#autoload").prop("checked", true)
}   

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Фильтр правого меню
function getRightFilter(){
  setTimeout(() => {
    $(".activeBottomFilter").css({display: $(".bottomFilter #filter").prop("checked") ? "flex" : "none"});
  }, 50)
}