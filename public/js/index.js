startBtn = document.querySelector(".w-button");
startBtn2 = document.querySelector(".start_btn");
!(function (o, c) {
  console.log("o",o);
  console.log("c",c);
  var n = c.documentElement,
    t = " w-mod-";
  (n.className += t + "js"),
    ("ontouchstart" in o ||
      (o.DocumentTouch && c instanceof DocumentTouch)) &&
      (n.className += t + "touch");
})(window, document);

$(".click-to-top").click(function () {
  var topZ = 0;
  $(".click-to-top").each(function () {
    var thisZ = parseInt($(this).css("z-index"), 10);
    if (thisZ > topZ) {
      topZ = thisZ;
    }
  });
  $(this).css("z-index", topZ + 1);
});

// startBtn.onclick = function(){
//   window.open('http://localhost:4000/game_paranoia',"game_parnoia","width=1200,height=800")
// }
// startBtn2.onclick = function(){
//   window.open('http://localhost:4000/game_paranoia',"game_parnoia","width=1200,height=800")
// }

