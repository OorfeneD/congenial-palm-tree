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
let startLang = Object.keys(langSet)[0];
const pageSet = {
        hideBottomFilter: ["settings", "database"],
      }
      langSet = {
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
        en: {
          loading: "Loading",
          pages: {
            main: "Main",
            fbi: "FBI",
            notes: "Notes",
            tags: "Tags",
            archive: "Archive",
            settings: "Settings",
            database: "Database",
          },
          menu: {
            getTheme: "Change theme",
            autoload: "Autoload",
            autoloadfinal: "Load complete",
            filter: {
              name: "Filter",
            },
          }
        },
      }    


// var get = {};
// var cookie = {},
//     cookieDOM = document.cookie.split("; "),
//     cookieDate = "Fri, 7 Aug 2020 00:00:00 UTC",
//     cookieName = {"xH": 1, "xW": 5, "loadGraph": 1, "loadFBI": 1},
//     cookieGraph = ["Линия пикового значения", "Отметка полуночи", "Активная автозагрузка", "Ссылки без чата", "Выделение устаревшего"];
