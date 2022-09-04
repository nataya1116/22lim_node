checkFeedback = document.querySelector(".check-feedback");
feedback = document.querySelector(".feedback");

let noneclick = false;

// checkFeedback.onclick = function () {
//   if ((feedback.style.display = "none")) {
//     feedback.style.display = "block";
//     noneclick = true;
//     console.log(noneclick);
//   } else if ((noneclick = true)) {
//     console.log(">>>???");
//     feedback.style.display = "none";
//   }
// };

// function checkFeed() {
//   console.log("클릭됨");
// }

function viewReplyNested(labelId) {
  if (labelId.style.display == "none"){
    labelId.style.display = "block";

  } else {
    labelId.style.display = "none"
  }
}

function createReplyNested(offset, userId, boardId, replyId, content, url) {
  // console.log(offset, userId, boardId, replyId, content);
  const form = document.createElement("form");
  form.method = "post";
  form.action = `/${url}/create_nested`;
  document.body.appendChild(form);

  const offsetInput = document.createElement("input");
  offsetInput.type = "hidden";
  offsetInput.name = "offset"
  offsetInput.value = offset;
  form.appendChild(offsetInput);

  const userIdInput = document.createElement("input");
  userIdInput.type = "hidden";
  userIdInput.name = "userId"
  userIdInput.value = userId;
  form.appendChild(userIdInput);

  const boardIdInput = document.createElement("input");
  boardIdInput.type = "hidden";
  boardIdInput.name = "boardId"
  boardIdInput.value = boardId;
  form.appendChild(boardIdInput);

  const replyIdInput = document.createElement("input");
  replyIdInput.type = "hidden";
  replyIdInput.name = "replyId"
  replyIdInput.value = replyId;
  form.appendChild(replyIdInput);

  const contentInput = document.createElement("input");
  contentInput.type = "hidden";
  contentInput.name = "content"
  contentInput.value = content;
  form.appendChild(contentInput);

  form.submit();
}

function createReply(offset, userId, boardId, content, url) {
  const form = document.createElement("form");
  form.method = "post";
  form.action = `/${url}/create`;
  document.body.appendChild(form);

  const offsetInput = document.createElement("input");
  offsetInput.type = "hidden";
  offsetInput.name = "offset"
  offsetInput.value = offset;
  form.appendChild(offsetInput);

  const userIdInput = document.createElement("input");
  userIdInput.type = "hidden";
  userIdInput.name = "userId"
  userIdInput.value = userId;
  form.appendChild(userIdInput);

  const boardIdInput = document.createElement("input");
  boardIdInput.type = "hidden";
  boardIdInput.name = "boardId"
  boardIdInput.value = boardId;
  form.appendChild(boardIdInput);

  const contentInput = document.createElement("input");
  contentInput.type = "hidden";
  contentInput.name = "content"
  contentInput.value = content;
  form.appendChild(contentInput);

  form.submit();
}

function replyUpdate(updateBtn, content, saveBtn, updateInput ) {
  updateBtn.style.display = 'none';
  content.style.display = 'none';
  saveBtn.style.display = 'block';
  updateInput.style.display = 'block';
  updateInput.focus();
}

function replySave(offset, id, content, url){
  const form = document.createElement("form");
  form.method = "post";
  form.action = `/${url}/update`;
  document.body.appendChild(form);

  const offsetInput = document.createElement("input");
  offsetInput.type = "hidden";
  offsetInput.name = "offset"
  offsetInput.value = offset;
  form.appendChild(offsetInput);

  const idInput = document.createElement("input");
  idInput.type = "hidden";
  idInput.name = "id"
  idInput.value = id;
  form.appendChild(idInput);

  const contentInput = document.createElement("input");
  contentInput.type = "hidden";
  contentInput.name = "content"
  contentInput.value = content;
  form.appendChild(contentInput);

  form.submit();
}