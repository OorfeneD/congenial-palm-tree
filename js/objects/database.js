let wH = +$(window).height();
let loadLimit = 10; 
var keyFilter = 0;
let dateSet = {day: "2-digit", month: "2-digit", year: "numeric"},
    timeSet = {hour: "2-digit", minute: "2-digit", second: "2-digit"};
let pathname = location.pathname.slice(1);
let hash = location.hash.slice(1);

var content = {},
    infoBot = {};


const colorArr = [
  "#f6e58d", "#ffbe76", "#ff7979", "#badc58", "#dff9fb",
  // "#7ed6df", "#e056fd", "#686de0", "#30336b", "#95afc0",
  // "", "", "", "", "",
]