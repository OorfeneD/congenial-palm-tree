///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка графиков (ширина/высота столбца, линия среднего значения, лимит разовой загрузки через ajax)
function random(min, max){return (Math.random()*(max - min) + min).toFixed()}
function returnURL(width, height, group){
  return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${group}-${width}x${height}.jpg?d=${Math.random()}`}
        
function xW(ch){return 6}
function xH(ch){return 2}
function xLine(ch){if(cookie["xLine"].slice(cID, +cID+1)) return true}
// function loadLimit(){return 20}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// 
function utc(){return new Date().getTimezoneOffset()*-60000 - cookie["UTC"]*900000}
function tLS(value, set = dateSet){
  return new Date(value).toLocaleString("ru-RU", set)
}
function tLS2(value, set){
  if(!set){
    let date = value.split(".");
    return new Date(+date[2], +date[1]-1, +date[0])
               .toLocaleString("ru-RU", dateSet)
  }else{
    let time = value.split(":");
    time[0] = +time[0] > 23 ? 23 : time[0];
    time = new Date((+time[0]*3600 + +time[1]*60 + +time[2])*1000 - new Date().getTimezoneOffset()*-60000)
               .toLocaleString("ru-RU", timeSet).split(":")
    return `${time[0]}h${time[1]}m${time[2]}s`
  }
}
function tLSr(values){
  let result = "";
  values = values.split("-");
  if(values.length == 2){
    for(let i = 0; i < values.length; i++){
      if(values[i].split("h").length != 2){return false}
      if(values[i].split("m").length != 2){return false}
      if(values[i].split("s").length != 2){return false}
      let time = {
        hour: +values[i].split("h")[0],
        min: +values[i].split("h")[1].split("m")[0],
        sec: +values[i].split("m")[1].split("s")[0],
      }
      time.min = time.sec - 60 > 0 ? Math.floor(time.sec/60) + time.min : time.min;
      time.sec = time.sec > 60 ? time.sec%60 : time.sec < 0 ? 0 : time.sec;
      time.hour = time.min - 60 > 0 ? Math.floor(time.min/60) + time.hour : time.hour;
      time.min = time.min > 60 ? time.min%60 : time.min < 0 ? 0 : time.min;
      time.hour = time.hour > 23 ? 23 : time.hour < 0 ? 0 : time.hour;

      result += `${zero(time.hour)}:${zero(time.min)}:${zero(time.sec)}`
      if(!i) result += "-"
    }
    return result
  }else{return false}
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
    if(String(text.trim()).toLowerCase().indexOf(String(arr[word]).toLowerCase()) != (-1)) return true;
    if(+word+1 == arr.length) return false;
  }
}
function filterOnly(arr, text){
  if(!arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(String(text).toLowerCase() == String(arr[word]).toLowerCase()) return true;
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
////////////////////////////////// 
function parent(ths, N = 1){
  ths = $(ths);
  for(let step = 0; step < N; step++){
    ths = ths.parent();
  }
  return ths
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





