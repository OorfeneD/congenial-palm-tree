///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка графиков (ширина/высота столбца, линия среднего значения, лимит разовой загрузки через ajax)
function random(min, max){return (Math.random()*(max - min) + min).toFixed()}
function xW(cID){return Number(cookie["xW"].slice(cID, +cID+1))+1}
function xH(cID){return Number(cookie["xH"].slice(cID, +cID+1))+1}
function xLine(cID){if(cookie["xLine"].slice(cID, +cID+1)) return true}
function loadLimit(){return 20}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Проверка начилия [name] в [arr]
function indexOf(name, arr){
  for(let step = 0; step < arr.length; step++){
    if(arr[step].slice(0,1) == "!"){if(name == arr[step].slice(1)){return true}}
      else if(name.indexOf(arr[step]) != (-1)) return true
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Проверка начилия любого элемента из массива [arr] в [text]
function filter(arr, text){
  for(let word = 0; word < arr.length; word++){
    if(text.trim().toLowerCase().indexOf(arr[word].toLowerCase()) != (-1)) return true
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Добавляет 0 к [num] до достижения длины [length]
function zero(num, length = 2){
  for(let deg = 1; deg < length; deg++){
    +num < 10**deg ? num = "0"+num : ""
  }
  return num
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Переводит ник стримера в его порядковый номер в массиве [streamers] (cID)
function getChannelID(ch){
  for(let cID = 0; cID < streamers.length; cID++){
    if(streamers[cID].toLowerCase() == String(ch).toLowerCase()) return cID
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа правого бегунка (графики)
function rightRange(ths){
  let value = $(ths).val();
  $(ths).parent().attr({"meme": memes[value], "sum": $(ths).attr("m"+value)});
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
  $(`label[for='filterMenu']`).attr({name: langSet[lang].menu.filter.name})
  $(`label[for='autoload']`).attr({name: langSet[lang].menu.autoload})
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
////////////////////////////////// Фильтр правого меню
function openFilter(ths){
  if(!$("#filterMenu").prop("checked")){
    $(".rightFilter").after(`<div class="activeBottomFilter"></div>`)
  }else{
    $(".activeBottomFilter").remove();
  }
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
function autoload(ths){
  if($(ths).attr("number") == 50){
    $(ths).attr("number", 0);
    $(ths).attr({name: langSet[lang()].menu.autoload})
  }
  (function loading(){
    setTimeout(() => {
      if($(`input#${$(ths).attr("for")}`).prop("checked")){
        let num = $(ths).attr("number");
        if(num < 50){
          $(ths).attr({number: +num+1})
          loading();        
        }else{
          $(`input#${$(ths).attr("for")}`).prop("checked", false);
          $(ths).attr({name: langSet[lang()].menu.autoloadfinal})
        }
      }
    }, 100)    
  })()
}