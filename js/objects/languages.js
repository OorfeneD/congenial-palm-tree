const langObj = {
  ru: {
    loading: "Загружаем",
    reboot: "Перезагрузка бота",
    pages: {
      main: "Графики",
      fbi: "FBI",
      notes: "Заметки",
      tags: "Теги",
      archive: "Архив",
      calendar: "Календарь",
      settings: "Настройки",
      database: "База данных",
      help: "Помощь",
    },
    menu: {
      // getTheme: "Тема сайта",
      autoload: "Автозагрузка",
      autoloadNodata: "Данных нет",
      autoloadCompleted: "Всё загружено",   
      filter: {
        name: "Фильтр",
        same: "Общее",
        theme: "Оформление",
        active: "Отфильтровать",
        less: "меньше",
        more: "больше",
        resetAll: "Сброс всех фильтров",
        resetAllConfirm: "Подтвердите сброс всех фильтров для страницы #",
        resetAllSettings: "Сброс всех настроек",
        resetAllConfirmSettings: "Подтвердите сброс всех настроек для страницы #",
        wrap: {
          date: "По дате",
          pop: "По популярности",
          duration: "По длительности",
          channel: "По каналам",
        },
      },
    },
    settings: {
      activePage: "Действия на странице",
      UTC: "Часовой пояс",
      add: "Добавить",
      ignore: "Игнорировать",
      delete: "Удалить",
      save: "Сохранить",
      total: "Суммарно",
      reset: "Сброс",
      success: "Успех",
      resetConfirm: "Подтвердите сброс настроек для страницы",
      theme: {
        title: "Кастомизация палитры сайта",
      },
      same: {
        add: "Добавить новый канал",
        title: "Список каналов",
        subtitle: "Отслеживание",        
      },
      main: {
        add: "Добавить новую группу",
        title: "Список групп",
        subtitle: "Список триггеров",
        addAnti: "Исключить из отслеживания",
        titleAnti: "Список исключенного",
      },
      fbi: {
        add: "Добавить новое отслеживание",
        title: "Список отслеживаемого",
        addAnti: "Исключить из отслеживания",
        titleAnti: "Список исключенного",
      },
      notes: {
        addUser: "Добавить нового пользователя для отслеживания",
        titleUser: "Список отслеживаемых пользователей",
        add: "Добавить новый триггер",
        title: "Список триггеров",
        addAnti: "Исключить из отслеживания",
        titleAnti: "Список исключенного",
      },
      tags: {
        add: "Добавить новый тег",
        title: "Список тегов",
        addAnti: "Исключить из отслеживания",
        titleAnti: "Список исключенного",
      },
    },
    time: {
      online: "онлайн",
      today: "сегодня",
      yesterday: "вчера",
      month: {
        m0: "января",
        m1: "февраля",
        m2: "марта",
        m3: "апреля",
        m4: "мая",
        m5: "июня",
        m6: "июля",
        m7: "августа",
        m8: "сентября",
        m9: "октября",
        m10: "ноября",
        m11: "декабря",
      }
    },
    help: {
      archive: "» Архив",
      fn: {
        main: "FBI<br>Заметки<br>Теги",
        fbi: "Графики<br>Заметки<br>Теги",
        notes: "Графики<br>FBI<br>Теги",
        tags: "Графики<br>FBI<br>Заметки",
      },
      sort: {
        id: this.ru.menu.filter.wrap.date,
        pop: this.ru.menu.filter.wrap.pop,
        duration: this.ru.menu.filter.wrap.duration,
      },
    },
  },  
  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////  
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////    
    
  en: {
    loading: "Loading",
    reboot: "Bot reboot",
    pages: {
      main: "Main",
      fbi: "FBI",
      notes: "Notes",
      tags: "Tags",
      archive: "Archive",
      calendar: "Calendar",
      settings: "Settings",
      database: "Database",
      help: "Help",
    },
    menu: {
      autoload: "Autoload",
      autoloadNodata: "No data",
      autoloadCompleted: "All uploaded",
      filter: {
        name: "Filter",
        same: "Same",
        theme: "Decor",
        active: "Filter out",
        less: "less",
        more: "more",
        resetAll: "Reset all filters",
        resetAllConfirm: "Confirm reset all filters for page #",
        resetAllSettings: "Reset all settings",
        resetAllConfirmSettings: "Confirm reset all settings for page #",
        wrap: {
          date: "By date",
          pop: "By popularity",
          duration: "By duration",
          channel: "By channels",
        },
      },
    },
    settings: {
      activePage: "Actions on the page", 
      UTC: "Timezone",
      add: "Add",
      ignore: "Ignore",
      delete: "Delete",
      save: "Save",
      total: "Total",
      reset: "Reset",
      success: "Success",
      resetConfirm: "Confirm reset for page",
      theme: {
        title: "Site palette customization",
      },
      same: {
        add: "Add new channel", 
        title: "Channel list", 
        subtitle: "Tracking",
      },
      main: {
        add: "Add new group",
        title: "Group list",
        subtitle: "Trigger list",    
        addAnti: "Exclude from tracking",
        titleAnti: "Excluded list",
      },
      fbi: {
        add: "Add new tracking",
        title: "Track List",
        addAnti: "Exclude from tracking",
        titleAnti: "Excluded list",
      },
      notes: {
        addUser: "Add new user to track",
        titleUser: "List of tracked users",
        add: "Add new trigger",
        title: "Trigger list",
        addAnti: "Exclude from tracking",
        titleAnti: "Excluded list",
      },
      tags: {
        add: "Add new tag",
        title: "Tag list",
        addAnti: "Exclude from tracking",
        titleAnti: "Excluded list",
      },
    },
    time: {
      online: "online",
      today: "today",
      yesterday: "yesterday",
      month: {
        m0: "January",
        m1: "February",
        m2: "March",
        m3: "April",
        m4: "May",
        m5: "June",
        m6: "July",
        m7: "August",
        m8: "September",
        m9: "October",
        m10: "November",
        m11: "December",
      }
    },
    help: {
      archive: "» Archive",
      fn: {
        main: "FBI<br>Notes<br>Tags",
        fbi: "Main<br>Notes<br>Tags",
        notes: "Main<br>FBI<br>Tags",
        tags: "Main<br>FBI<br>Notes",
      },
    },
  },    
}; 
