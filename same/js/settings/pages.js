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




const icon = {
  none: "https://image.flaticon.com/icons/svg/64/64299.svg",
  day: "https://image.flaticon.com/icons/svg/60/60967.svg",
  night: "https://image.flaticon.com/icons/svg/1415/1415431.svg",
  main: "https://image.flaticon.com/icons/svg/44/44499.svg",
  fbi: "https://image.flaticon.com/icons/svg/1039/1039481.svg",
  notes: "https://image.flaticon.com/icons/svg/2119/2119695.svg",
  tags: "https://image.flaticon.com/icons/png/64/1873/1873920.png",
  archive: "https://www.flaticon.com/premium-icon/icons/svg/2169/2169319.svg",
  calendar: "https://image.flaticon.com/icons/svg/1535/1535952.svg",   
  settings: "https://image.flaticon.com/icons/svg/70/70367.svg",
  database: "https://image.flaticon.com/icons/svg/76/76725.svg",
  filter: "https://image.flaticon.com/icons/svg/1159/1159884.svg",    
  autoload: "https://image.flaticon.com/icons/svg/1437/1437788.svg",   
}




try{module.exports = allPages;}catch(e){}
