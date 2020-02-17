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



const pageSet = {
        topMenu: {
          tracking: ["main", "fbi", "notes", "tags",],
        },
        bottomMenu: {
          list: ["filter", "autoload", "old", "chat"],
          
          hide_filter: [],
          turn_filter: ["settings", "database"],
          
          hide_autoload: ["settings", "database"],
          turn_autoload: [],
          
          hide_old: [],
          turn_old: [],
          
          hide_chat: ["archive", "calendar"],
          turn_chat: [],
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




try{module.exports = [allPages, pageSet.settings.add];}catch(e){}
