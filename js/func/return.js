///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Настройка графиков (ширина/высота столбца, линия среднего значения, лимит разовой загрузки через ajax)
function random(min, max){return (Math.random()*(max - min) + min).toFixed()}
function returnURL(width, height, group){
  return `https://static-cdn.jtvnw.net/previews-ttv/live_user_${group}-${width}x${height}.jpg?d=${Math.random()}`}
      
function widthLi(n = 0){return 780 - n}
function heightLi(n = 0){return 200 - n}
function factor(type, user){
  if(cookie["graph"][type][user]){
    return +cookie["graph"][type][user]
  }else{
    cookie["graph"][type][user] = coo[type]
    document.cookie = `graph=${JSON.stringify(cookie["graph"])};expires=${cookieDate}`;
    return +coo[type]
  }
}

function url(sID){
  return !+cookie["turn"]["chat"][pathname]
         ? `https://twitch.tv/videos/${sID}?` 
         : `https://player.twitch.tv/?autoplay=true&video=v${sID}`
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
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
function tLS3(dur, gap = null){
  if(dur == "00:00:00"){
    if(gap){
      let value = gap*120;
      let sec = zero(value%60),
          min = zero(Math.floor(value/60)%60),
          hour = zero(Math.floor(value/3600)%86400)
      return `~${hour}:${min}:${sec}`
      }else{ return "??:??:??" }
  }else{ return dur }
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
  if(!arr || !arr.length) return false;
  for(let word = 0; word < arr.length; word++){
    if(String(text).toLowerCase().indexOf(String(arr[word]).toLowerCase()) != (-1)) return true;
    if(+word+1 == arr.length) return false;
  }
}
function filterOnly(arr, text){
  if(!arr || !arr.length) return false;
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
    result = result[`${String(way[i])}`] || "";
    err += way[i]+" » "
  }
  if(!result) console.log(`%cLang err: %c[${cookie["lang"]}] ${err.slice(0, -3)}`, "color: red", "color: black")
  return result || err.slice(0, -3)
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Находит в [message] ссылку и заменяет ее рабочей ссылкой
function wwwFilter(message){
  if(filter(["http://", "https://", "www."], message) && cookie["turn"]["url"][pathname] == "1"){
    let mesArr = message.split(" ");
    for(let step = 0; step < mesArr.length; step++){
      if((mesArr[step].slice(0, 4) == "http" || mesArr[step].slice(0, 4) == "www.") && !filter(['src="smile"'], mesArr[step])){
        mesArr[step] = `<a target="_blank" href="${mesArr[step]}">${mesArr[step]}</a>`
      }
      if(mesArr[step].slice(0, 1) == "@" && cookie["turn"]["username"][pathname] == "1"){
        mesArr[step] = `<a target="_blank" href="https://twitch.tv/${mesArr[step].slice(1)}">${mesArr[step]}</a>`
      }
    }
    message = mesArr.join(" ")
  }   
  return message;
}

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
////////////////////////////////// Находит в [message] код смайлов и заменяет его картинками смайлов
function smilesFilter(message){
  if(cookie["turn"]["smile"][pathname] == "1"){
    for(let i = 0; i < Object.keys(smiles).length; i++){
      if(message.toLowerCase().indexOf(Object.keys(smiles)[i].toLowerCase()) != (-1)){
        message = message.replace(new RegExp(Object.keys(smiles)[i], "ig"), `<img class="smile" src="${smiles[Object.keys(smiles)[i]]}">`)
      }
    }
  }
  return message;
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
        <h4 meme="${translate([pathname, "total"])}" sum="0">
          <a>${translate([pathname, hash, "add"+type])}</a>
        </h4>
        <h8>
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





