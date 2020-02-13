///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка графиков (ширина/высота столбца, линия среднего значения, лимит разовой загрузки через ajax)
function random(min, max){return (Math.random()*(max - min) + min).toFixed()}
// function xW(cID){return Number(cookie["xW"].slice(cID, +cID+1))+1}
// function xH(cID){return Number(cookie["xH"].slice(cID, +cID+1))+1}
// function xLine(cID){if(cookie["xLine"].slice(cID, +cID+1)) return true}
// function loadLimit(){return 20}

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
  // if(!result) console.error(`Lang err: [${cookie["lang"]}] ${err.slice(0, -1)}`)
  return result || err.slice(0, -1)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function appendLiContentAdd(type = ""){
  $("ul").append(`
    <li content="${hash+type}Add" type="settings">
      <h4><a>${translate([pathname, hash, "add"+type])}</a></h4>
      <h8 meme="${translate([pathname, "total"])}" sum="0">
        <div class="${hash+type}Add">
          <input type="text" onkeyup="${hash}KeyUpAdd${type}(event, this);">
          <div view="button" class="add" name="${translate([pathname, "add"])}" onclick="${hash}Add${type}(this);"></div>
        </div>
      </h8>
    </li>
  `);
}
function appendLiContent(type = ""){
  $(`ul li[content="${hash+type}Add"]`).after(`
    <li content="${hash+type}" type="settings">
      <h4 display="1">
        <a>${translate([pathname, hash, "title"+type])}</a>
        <div subtitle>${translate([pathname, hash, "subtitle"])}</div>
      </h4><h8></h8><h9></h9>
    </li>
  `);
}
function appendRange(type = "", title= [], MMS = [0, 1, 1]){
  title.unshift(pathname)
  $("ul").append(`
    <li content="${type}" type="settings">
      <h4><a>${translate(title)}</a></h4>
      <h8 style="flex-direction: row;">
        <input type="range" name="${type}" min="${MMS[0]}" max="${MMS[1]}" step="${MMS[2]}" oninput="${type}Range(this)">
      </h8>
    </li>
  `);
}





