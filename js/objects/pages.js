const graphPages = [
  "main", 
  // "best", 
]
const commentPages = [
  "fbi", 
  "notes", 
  "tags", 
]
const allPages = [
  ...graphPages,
  ...commentPages,
  // "calendar",  
  "clips",
  "archive",  
  "settings", 
  // "database",
];
const settingsPages = ["theme", "same", ...allPages];


var pageSet = {
      topMenu: {
        tracking: ["main", ...commentPages],
      },
      turn: {
        list: [
                "help", "theme", "filter", "autoload", "arrow", 
                "old", "chat", "username", "same", "url", "sortGraph",
                "smile", "maxline", "midnight", "scrollTop",
              ],
        auto: { // По стандарту включены:
          help:     [...settingsPages],
          filter:   ["settings"],
        },
        show: { // Есть возможность изменить
          help:     ["theme", ...allPages],
          filter:   [...commentPages, ...graphPages, "archive", "clips"],
          autoload: [...commentPages, ...graphPages, "archive", "clips"],
          arrow:    [...commentPages, ...graphPages, "archive"],
          old:      [...commentPages, ...graphPages, "archive"],
          chat:     [...commentPages, ...graphPages, "archive"],
          username: [...commentPages, "archive"],
          same:     [...commentPages, "archive"],
          url:      [...commentPages, "archive"],
          smile:    [...commentPages, "archive"],
          sortGraph:[...graphPages, "archive"],
          maxline:  [...graphPages, "archive"],
          midnight: ["main", "archive"],
          theme:    ["theme"],
          scrollTop:["theme"],
        }
      },
      ban: { // По стандарту отключены
        autoload: ["settings"],
      },
      settings:{
        add: {
          same: [""],
          main: ["", "Anti"],
          fbi: ["", "Anti"],
          notes: ["User", "", "Anti"],
          tags: ["", "Anti"],
        },
      },
    };
let zzz = pageSet.turn.list;
for(let z = 0; z < zzz.length; z++){
  if(!pageSet.turn.show[zzz[z]]) pageSet.turn.show[zzz[z]] = [];
  if(!pageSet.turn.auto[zzz[z]]) pageSet.turn.auto[zzz[z]] = [];
  if(!pageSet.ban[zzz[z]]) pageSet.ban[zzz[z]] = [];
}


try{module.exports = [allPages, pageSet.settings.add];}catch(e){}
