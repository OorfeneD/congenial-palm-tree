let atColor = ["#908EED", "#C6DB29", "#E0207B", "#20CAE3", "#A27BFE", "#00E1A1", "#A8A8A8", "#F04624", "#EBB687", "#9ACA2F", "#F0A983"];
let memesColor = {coolstory: 0, gachi: 1, lul: 2, mericcat: 3, monka: 4, nice: 5, pls: 6, pog: 7, s}
let wH = +$(window).height();
let loadLimit = 10; 
var keyFilter = 0;
let dateSet = {day: "2-digit", month: "2-digit", year: "numeric"},
    timeSet = {hour: "2-digit", minute: "2-digit", second: "2-digit"};
let pathname = location.pathname.slice(1);
let hash = location.hash.slice(1);

var content = {};