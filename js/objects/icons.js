const iconsObj = {
  none: "https://image.flaticon.com/icons/svg/64/64299.svg",
  
  day: "https://image.flaticon.com/icons/svg/60/60967.svg",
  night: "https://image.flaticon.com/icons/svg/1415/1415431.svg",
  guru: "https://image.flaticon.com/icons/svg/697/697109.svg",
  dandelion: "https://image.flaticon.com/icons/svg/2577/2577543.svg",
  
  main: "https://image.flaticon.com/icons/svg/44/44499.svg",
  fbi: "https://image.flaticon.com/icons/svg/1039/1039481.svg",
  notes: "https://image.flaticon.com/icons/svg/2119/2119695.svg",
  tags: "https://image.flaticon.com/icons/png/64/1873/1873920.png",
  archive: "https://www.flaticon.com/premium-icon/icons/svg/2169/2169319.svg",
  calendar: "https://image.flaticon.com/icons/svg/1535/1535952.svg",   
  settings: "https://image.flaticon.com/icons/svg/70/70367.svg",
  database: "https://image.flaticon.com/icons/svg/76/76725.svg",
  
  scrollTop: "https://image.flaticon.com/icons/svg/57/57169.svg",
  theme: "https://image.flaticon.com/icons/svg/483/483619.svg",
  same: "https://image.flaticon.com/icons/svg/639/639219.svg",
  filter: "https://image.flaticon.com/icons/svg/1159/1159884.svg",    
  autoload: "https://image.flaticon.com/icons/svg/1437/1437788.svg",   
  chat: "https://image.flaticon.com/icons/svg/992/992450.svg",
  username: "https://image.flaticon.com/icons/svg/2089/2089136.svg",
  old: "https://image.flaticon.com/icons/svg/812/812680.svg",
  url: "https://image.flaticon.com/icons/svg/455/455691.svg",
  smile: "https://image.flaticon.com/icons/svg/1933/1933575.svg",
  resettings: "https://image.flaticon.com/icons/svg/1632/1632932.svg",
  arrow: "https://image.flaticon.com/icons/svg/566/566004.svg",
  maxline: "https://image.flaticon.com/icons/svg/1828/1828961.svg",
  midnight: "https://image.flaticon.com/icons/svg/359/359866.svg",
  sortGraph: "https://image.flaticon.com/icons/svg/1535/1535963.svg",
  help: "https://image.flaticon.com/icons/svg/2088/2088076.svg",
  first: "https://image.flaticon.com/icons/svg/1292/1292970.svg",
  best: "https://image.flaticon.com/icons/svg/1152/1152861.svg",
  
  sort_order: "https://image.flaticon.com/icons/svg/626/626013.svg",
  sort_id: "https://image.flaticon.com/icons/svg/929/929307.svg",
  sort_duration: "https://image.flaticon.com/icons/svg/1479/1479995.svg",
  sort_pop: "https://image.flaticon.com/icons/svg/1828/1828961.svg",
}
const iconsObjChecked = {
  scrollTop: "https://image.flaticon.com/icons/svg/56/56920.svg",
  sortGraph: "https://image.flaticon.com/icons/svg/3/3755.svg",
}
for(let i = 0; i < Object.keys(iconsObj).length; i++){
  let key = Object.keys(iconsObj)[i]
  if(!iconsObjChecked[key]){
    iconsObjChecked[key] = iconsObj[key]
  }
}