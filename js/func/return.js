///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка графиков (ширина/высота столбца, линия среднего значения, лимит разовой загрузки через ajax)
function random(min, max){return (Math.random()*(max - min) + min).toFixed()}
function returnURL(width, height){
  return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${group.toLowerCase()}-${width}x${height}.jpg?d=${Math.random()}`}
        
// function xW(cID){return Number(cookie["xW"].slice(cID, +cID+1))+1}
// function xH(cID){return Number(cookie["xH"].slice(cID, +cID+1))+1}
// function xLine(cID){if(cookie["xLine"].slice(cID, +cID+1)) return true}
// function loadLimit(){return 20}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function utc(){return new Date().getTimezoneOffset()*-60000 - cookie["UTC"]*900000}
function tLS(value, set = dateSet){
  return new Date(value).toLocaleString("ru-RU", set)
}

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
////////////////////////////////// При отсутствии перевода возращает [error]
function translate(way){
  let result = langObj[cookie["lang"]],
      err = "";
  for(let i = 0; i < way.length; i++){
    result = result[way[i]] || "";
    err += way[i]+"/"
  }
  if(!result) console.log(`%cLang err: %c[${cookie["lang"]}] ${err.slice(0, -1)}`, "color: red", "color: black")
  return result || err.slice(0, -1)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function appendLiContentAdd(type = ""){
  let display = type == "Anti" ? "ignore" : "add";
  if(!$(`li[content="${hash+type}Add"][type="${pathname}"]`).length){
    $("ul").append(`
      <input type="checkbox" id="arrow_${hash+type}">
      <label for="arrow_${hash+type}" icon="arrow"></label>
      <li content="${hash+type}Add" type="${pathname}">
        <h4><a>${translate([pathname, hash, "add"+type])}</a></h4>
        <h8 meme="${translate([pathname, "total"])}" sum="0">
          <div class="${hash+type}Add">
            <input type="text" 
              onkeydown="${pathname}KeyDown('${type}', this, event);" 
              onkeyup="${pathname}KeyUp('${type}', this, event);"
            >
            <div view="button" class="${display}" name="${translate([pathname, display])}" onclick="${pathname}Add('${type}', this);"></div>
          </div>
        </h8>
      </li>
    `);
  }
}
function appendLiContent(type = ""){
  if(!$(`li[content="${hash+type}"][type="${pathname}"]`).length){
    $(`ul li[content="${hash+type}Add"]`).after(`
      <li content="${hash+type}" type="${pathname}">
        <h4 display="1">
          <a>${translate([pathname, hash, "title"+type])}</a>
          ${filterOnly(["main"], hash+type) ? `<div subtitle>${translate([pathname, hash, "subtitle"])}</div>` : ""}
        </h4><h8></h8><h9></h9>
      </li>
    `);
  }
}
function appendRange(type = "", title= [], MMS = [0, 1, 1]){
  title.unshift(pathname)
  $("ul").append(`
    <li content="${type}" type="${pathname}">
      <h4><a>${translate(title)}</a></h4>
      <h8 style="flex-direction: row;">
        <input type="range" name="${type}" min="${MMS[0]}" max="${MMS[1]}" step="${MMS[2]}" oninput="${type}Range(this)">
      </h8>
    </li>
  `);
}





