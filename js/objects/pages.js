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
      };




try{module.exports = allPages;}catch(e){}
