checkFeedback = document.querySelector(".check-feedback");
feedback = document.querySelector(".feedback");

let noneclick = false;

checkFeedback.onclick = function () {
  if ((feedback.style.display = "none")) {
    feedback.style.display = "block";
    noneclick = true;
    console.log(noneclick);
  } else if ((noneclick = true)) {
    console.log(">>>???");
    feedback.style.display = "none";
  }
};

// function checkFeed() {
//   console.log("클릭됨");
// }
