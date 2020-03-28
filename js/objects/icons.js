const iconsObj = {
  none:         "64/64299",
  
  day:           "60/60967",
  night:         "1415/1415431",
  guru:          "697/697109",
  dandelion:     "2577/2577543",
  
  main:          "44/44499",
  fbi:           "1039/1039481",
  notes:         "2119/2119695",
  tags:          "1873/1873920",
  archive:       "480/480249",
  clips:         "633/633832",
  calendar:      "1535/1535952",   
  settings:      "70/70367",
  database:      "76/76725",
  
  scrollTop:     "57/57169",
  theme:         "483/483619",
  same:          "639/639219",
  filter:        "1159/1159884",    
  autoload:      "1437/1437788",   
  chat:          "992/992450",
  username:      "2089/2089136",
  old:           "812/812680",
  url:           "455/455691",
  smile:         "1933/1933575",
  resettings:    "1632/1632932",
  arrow:         "566/566004",
  maxline:       "1828/1828961",
  midnight:      "359/359866",
  sortGraph:     "56/56855",
  help:          "2088/2088076", 
  best:          "1152/1152861",
  
  first:         "1292/1292970",
  reload:        "56/56824",
  
  sort_order:    "626/626013",
  sort_id:       "929/929307",
  sort_duration: "1479/1479995",
  sort_pop:      "1828/1828961",
}
const iconsObjChecked = {
  scrollTop:     "56/56920",
}
for(let i = 0; i < Object.keys(iconsObj).length; i++){
  let key = Object.keys(iconsObj)[i]
  if(!iconsObjChecked[key]){
    iconsObjChecked[key] = iconsObj[key]
  }
}