let wH = +$(window).height();
let loadLimit = 10; 
var keyFilter = 0;
var widthSmall = 40;
let dateSet = {day: "2-digit", month: "2-digit", year: "numeric"},
    timeSet = {hour: "2-digit", minute: "2-digit", second: "2-digit"};
let pathname = location.pathname.slice(1);
let hash = location.hash.slice(1);

var coo = {xH: 2, xW: 6}
var content = {},
    infoBot = {};

var filterDefault = {
  date: {
    after: tLS(new Date()),
    before: "01.01.2020",
  },
  duration: {
    after: "23:59:59",
    before: "00:00:00",
  },
  pop: {
    after: "99999999",
    before: "0",
  },
}
