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


const lang = $("html").attr("lang"),
      langSet = {
        ru: {
          loading: "Загружаем",
          pages: {
            main: "SqboBot",
            fbi: "FBI",
            notes: "Заметки",
            tags: "Теги",
            settings: "Настройки",
            database: "База данных",
          },
          menu: {
            autoload: "Автозагрузка",
            filter: {
              name: "Фильтр",
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
