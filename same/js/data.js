var streamers = [];
$.ajax({
  url: "streamers",
  method: 'get',
  success: res => {
    for(let i = 0; i < res.length; i++){
      streamers[i] = res[i]["username"];
    }
  },
})

let pathname = location.pathname.slice(1);
const pageSet = {
        hideBottomFilter: ["settings", "database"],
      };
const langSet = {
        ru: {
          loading: "Загружаем",
          pages: {
            main: "Графики",
            fbi: "FBI",
            notes: "Заметки",
            tags: "Теги",
            archive: "Архив",
            settings: "Настройки",
            database: "База данных",
          },
          menu: {
            getTheme: "Тема сайта",
            autoload: "Автозагрузка",
            autoloadfinal: "Всё загружено",
            filter: {
              name: "Фильтр",
            },
          }
        },
      }; 

var get = {};
var cookie = {},
    cookieDOM = document.cookie.split("; "),
    cookieDate = "Fri, 7 Aug 2020 00:00:00 UTC";

for(let i = 0; i < cookieDOM.length; i++){
  cookie[cookieDOM[i].split("=")[0]] = cookieDOM[i].split("=")[1];
}  
if(!cookie["lang"]){
  cookie["lang"] = Object.keys(langSet)[0];
  document.cookie = `lang=${Object.keys(langSet)[0]};expires=${cookieDate}`;
}
// else if(cookie["graph"].length != cookieGraph.length){fixCookie(cookieGraph.length, "graph", 1)}
