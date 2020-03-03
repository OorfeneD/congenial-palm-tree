const allPages = [
  "main", 
  "fbi", 
  "notes", 
  "tags", 
  "archive", 
  // "calendar",   
  "settings", 
  // "database",
];
const settingsPages = ["theme", "same", ...allPages, "help"];


var pageSet = {
      topMenu: {
        tracking: ["main", "fbi", "notes", "tags",],
      },
      bottomMenu: {
        list: [
                "help", "theme", "filter", "autoload", "arrow", 
                "old", "chat", "username", "same", "link", 
                "smile", "maxline", "midnight", "scrollTop",
              ],
        
        turn_filter:   ["settings", "database"],

        hide_help:     ["same", "help"],
        hide_filter:   ["theme", "same", "help"],
        hide_autoload: ["theme", "same", "help", "settings", "database"],
        hide_arrow:    ["theme", "same", "help", "settings", "database"],
        hide_old:      ["theme", "same", "help", "settings", "database"],
        hide_chat:     ["theme", "same", "help", "calendar", "settings", "database"],
        hide_username: ["theme", "same", "help", "main", "calendar", "settings", "database"],
        hide_same:     ["theme", "same", "help", "main", "calendar", "settings", "database"],
        hide_link:     ["theme", "same", "help", "main", "calendar", "settings", "database"],
        hide_smile:    ["theme", "same", "help", "main", "calendar", "settings", "database"],
        hide_maxline:  ["theme", "same", "help", "fbi", "notes", "tags", "calendar", "settings", "database"],
        hide_midnight: ["theme", "same", "help", "fbi", "notes", "tags", "calendar", "settings", "database"],
        hide_theme:    ["same", "help", "fbi", "notes", "tags", "archive", "calendar", "settings", "database"],
        hide_scrollTop:["same", "help", "fbi", "notes", "tags", "archive", "calendar", "settings", "database"],
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
let zzz = pageSet.bottomMenu.list;
for(let z = 0; z < zzz.length; z++){
  if(!pageSet.bottomMenu[`turn_${zzz[z]}`]) pageSet.bottomMenu[`turn_${zzz[z]}`] = [];
  if(!pageSet.bottomMenu[`hide_${zzz[z]}`]) pageSet.bottomMenu[`hide_${zzz[z]}`] = [];
}



try{module.exports = [allPages, pageSet.settings.add];}catch(e){}
