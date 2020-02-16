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
          list: ["filter", "autoload"],
          
          hide_autoload: ["settings", "database"],
          turn_autoload: [],
          
          hide_filter: [],
          turn_filter: ["settings", "database"],
        },
        settings:{
          same: [""],
          main: ["", "Anti"],
          fbi: ["", "Anti"],
          notes: ["User", "", "Anti"],
          tags: ["", "Anti"],
        },
      };




try{module.exports = [allPages, pageSet.settings];}catch(e){}
