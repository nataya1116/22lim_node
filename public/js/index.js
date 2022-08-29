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

