const allPages = [
  "main", 
  "fbi", 
  "notes", 
  "tags", 
  "archive", 
  "calendar",   
  "settings", 
  "database",
];



var pageSet = {
      topMenu: {
        tracking: ["main", "fbi", "notes", "tags",],
      },
      bottomMenu: {
        list: ["filter", "autoload", "old", "chat", "maxline", "midnight"],

        turn_filter: ["settings", "database"],

        hide_autoload: ["settings", "database"],
        hide_chat: ["archive", "calendar", "settings", "database"],
        hide_old: ["settings", "database"],
        hide_maxline: ["fbi", "notes", "tags", "archive", "calendar", "settings", "database"],
        hide_midnight: ["fbi", "notes", "tags", "archive", "calendar", "settings", "database"],
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
