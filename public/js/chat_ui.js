nds = document.querySelector(".nds");
exitBtn = document.querySelector(".exit-btn");
mainBox = document.querySelector(".main-box ");

nds.onclick = function () {
  console.log("눌림");
  mainBox.style.zIndex = 999;
};

exitBtn.onclick = function () {
  mainBox.style.zIndex = -1;
  location.reload("mainBox");
};
