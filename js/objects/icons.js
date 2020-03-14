const iconsObj = {
  none:        "64/64299.svg",
  
  day:         "60/60967.svg",
  night:       "1415/1415431.svg",
  guru:        "697/697109.svg",
  dandelion:   "2577/2577543.svg",
  
  main:        "44/44499.svg",
  fbi:         "1039/1039481.svg",
  notes:       "2119/2119695.svg",
  tags: "https://image.flaticon.com/icons/png/64/1873/1873920.png",
  archive: "https://www.flaticon.com/premium-icon/icons/svg/2169/2169319.svg",
  calendar:     "1535/1535952.svg",   
  settings:     "70/70367.svg",
  database:     "76/76725.svg",
  
  scrollTop:    "57/57169.svg",
  theme:        "483/483619.svg",
  same:         "639/639219.svg",
  filter:       "1159/1159884.svg",    
  autoload:     "1437/1437788.svg",   
  chat:         "992/992450.svg",
  username:     "2089/2089136.svg",
  old:          "812/812680.svg",
  url:          "455/455691.svg",
  smile:         "1933/1933575.svg",
  resettings: "1632/1632932.svg",
  arrow:         "566/566004.svg",
  maxline: "1828/1828961.svg",
  midnight: "359/359866.svg",
  sortGraph: "56/56855.svg",
  help:          "2088/2088076.svg",
  first:         "1292/1292970.svg",
  best:          "1152/1152861.svg",
  
  sort_order: "626/626013.svg",
  sort_id: "929/929307.svg",
  sort_duration: "1479/1479995.svg",
  sort_pop: "1828/1828961.svg",
}
const iconsObjChecked = {
  scrollTop: "56/56920.svg",
}
for(let i = 0; i < Object.keys(iconsObj).length; i++){
  let key = Object.keys(iconsObj)[i]
  if(!iconsObjChecked[key]){
    iconsObjChecked[key] = iconsObj[key]
  }
}