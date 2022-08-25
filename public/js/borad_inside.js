checkFeedback = document.querySelector(".check-feedback");
feedback = document.querySelector(".feedback");

checkFeedback.onclick = function () {
  console.log("눌림");
  if ((feedback.style.display = "none")) {
    feedback.style.display = "block";
  } else {
    feedback.style.display = "none";
  }
};

// function checkFeed() {
//   console.log("클릭됨");
// }
