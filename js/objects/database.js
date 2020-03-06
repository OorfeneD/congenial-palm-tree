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
  "#1abc9c", "#16a085", "#2ecc71", "#27ae60", "#3498db", "#2980b9",
  "#9b59b6", "#8e44ad", "#34495e", "#2c3e50", "#f1c40f", "#f39c12",
  "#e67e22", "#d35400", "#e74c3c", "#c0392b", "#7ed6df", "#22a6b3",
  "#badc58", "#6ab04c", "#30336b", "#130f40", "#fd79a8", "#e84393",
]