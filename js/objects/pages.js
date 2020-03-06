const graphPages = [
  "main", 
  "best", 
  "archive", 
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
  "settings", 
  // "database",
];
const settingsPages = ["theme", "same", ...allPages, "help"];


var pageSet = {
      topMenu: {
        tracking: ["main", ...commentPages],
      },
      turn: {
        list: [
                "help", "theme", "filter", "autoload", "arrow", 
                "old", "chat", "username", "same", "url", 
                "smile", "maxline", "midnight", "scrollTop",
              ],
        auto: { // По стандарту включены:
          help:     [...settingsPages],
          filter:   ["settings"],
        },
        show: { // Есть возможность изменить
          help:     ["theme", ...allPages],
          filter:   [...commentPages, ...graphPages],
          autoload: [...commentPages, ...graphPages],
          arrow:    [...commentPages, ...graphPages],
          old:      [...commentPages, ...graphPages],
          chat:     [...commentPages, ...graphPages],
          username: [...commentPages, "archive"],
          same:     [...commentPages, "archive"],
          url:      [...commentPages, "archive"],
          smile:    [...commentPages, "archive"],
          maxline:  [...graphPages],
          midnight: ["main", "archive"],
          theme:    ["theme"],
          scrollTop:["theme"],
        }
      },
      ban: {
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
}


try{module.exports = [allPages, pageSet.settings.add];}catch(e){}
