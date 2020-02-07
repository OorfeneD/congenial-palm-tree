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
  let result = langObj[cookie["lang"]],
      err = "";
  for(let i = 0; i < way.length; i++){
    result = result[way[i]] || "";
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

