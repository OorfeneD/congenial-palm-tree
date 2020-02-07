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
        bottomFilter: {
          list: ["filter", "autoload"],
          
          hide_autoload: ["settings", "database"],
          turn_autoload: [],
          
          hide_filter: [],
          turn_filter: ["settings", "database"],
        },
      };




try{module.exports = allPages;}catch(e){}
