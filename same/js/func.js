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