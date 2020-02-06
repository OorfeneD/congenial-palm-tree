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
  if(!arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(text.trim().toLowerCase().indexOf(arr[word].toLowerCase()) != (-1)) return true;
    if(+word+1 == arr.length) return false;
  }
}
function filterOnly(arr, text){
  if(!arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(text.toLowerCase() == arr[word].toLowerCase()) return true;
    if(+word+1 == arr.length) return false;
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
////////////////////////////////// При отсутствии перевода возращает [#&%@?!]
function translate(way){
  let result = langSet[cookie["lang"]],
      err = "";
  for(let i = 0; i < way.length; i++){
    result = result[way[i]];
    err += way[i]+"/"
  }
  if(!result) console.error(`Lang err: [${cookie["lang"]}] ${err.slice(0, -1)}`)
  return result || err.slice(0, -1)
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
  $(ths).parent().attr({meme: memes[value], sum: $(ths).attr("m"+value)});
  $(ths).siblings(".allMaxLine").children(`dot`).attr({hover: 0})
                                .siblings(`dot[meme="m${value}"]`).attr({hover: 1})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function dotclick(ths){
  let value = +$(ths).attr("meme").slice(1);
  $(ths).parent().siblings(".rightRange").val(value);
  $(ths).parent().children("dot").attr({hover: 0})
                 .siblings(`dot[meme="m${value}"]`).attr({hover: 1})
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Работа нижнего бегунка (графики)
function bottomRange(ths){
  let value = +$(ths).val();
  let max = +$(ths).attr("max"),
      min = +$(ths).attr("min");
  $(ths).attr({percent: Math.round((value - min) * 100 / (max - min))});
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function getHueRotate(){
  if($("style[hueRotate]")){$("style[hueRotate]").remove()}
  $("head").append(`
    <style hueRotate>
      .activeBottomFilter, 
#title, 
.getLang label, 

.scrollTop
{filter: hue-rotate(${cookie["hueRotate"][cookie["theme"]]}deg)}
      .allMaxLine{filter: hue-rotate(-${cookie["hueRotate"][cookie["theme"]]}deg)}
    </style>
  `)
}

a, 
.totalLI,
body .dopload div[tr]:after,
body .bottomFilter a[filter]:hover,
#fbi li h8 div:hover a b,
#fbi li h8 div:hover a,
body .bottomFilter div a[filter],
body .dopload div[tr] scroll div:hover a,
body .dopload div[tr] scroll div:hover a b,
ul li div[num]:after, 
label[for$="Page"]:hover:before, 
label[for="filter"]:hover:before, 
label[for="autoload"]:hover:before,
h4,
a[streamer],
body .dopload div[tr]:before,
.getTheme,
ul li a[fbi], 
ul li a[notes],
ul li div[num]:before,
label[for$="Page"]:before, 
label[for="filter"]:before, 
label[for="autoload"]:before,
#fbi li h8 div:hover a>a
.getLang input[type="radio"]+label,
a:hover,
#setting .line div[table] .point:hover,
.getLang input[type="radio"]+label:hover,
.getLang input[type="radio"]:checked+label:hover,
#fbi li h8 a b,
body .dopload div[tr] scroll a b,
#fbi li h8 a,
body .dopload div[tr] scroll a,
main,
#stats[fbi] div[num]:after,
input[type="range"][name="bottomRange"]:after,
.getLang input[type="radio"]:checked+label,
.rightFilter,
.pageChoiceWrap>div,
#setting .tagsBox .tag,
.activeBottomFilter:before,
.getLang input[type="radio"]:checked+label,
#setting .line div[content] .tagsAdd > input,
#setting .line div[content] .tagsAdd > .tagAdd,
#setting .line div[content] .antitagsAdd > input,
#setting .line div[content] .antitagsAdd > .antitagAdd,
.activeBottomFilter input[type="radio"]+label[for$="Max"]:before,
#setting .line>p, hr,
#setting .line div[table] .point[yesno="1"]:after,
#setting .line div[table] .linePoint>div:nth-child(2)>p[pm="1"]:hover,
.cap10px,
ul li h8:before,
input[type="range"][name="rightRange"]::-webkit-slider-runnable-track,
input[type="range"][name="bottomRange"]:before,   
input[type="range"][name="rightRange"]::-webkit-slider-thumb,
input[type="range"][name="bottomRange"]::-webkit-slider-thumb,
ul li h8 .menu,
body,
loading,
.bottomFilter label,
input[type="range"][name="bottomRange"]::-webkit-slider-runnable-track,
body .dopload div[tr],
#resEmpty,
.graphX,
a[filter],
.graphMemeBox,
.box404,
.topFilter,
.bottomFilter,
.getLang input[type="radio"]+label,
input[id$="Page"] + label[for$="Page"],
input[id="filter"] + label[for="filter"],
input[id="autoload"] + label[for="autoload"],