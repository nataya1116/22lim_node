async function idUseCheck() {
  const userId = user_id.value;
  if (id_check.innerHTML != "아이디 중복 체크를 해주세요.") return;
  const url = "/user/id_overlap";
  const data = { userId };
  let result;
  await $.post(url, data, (ret) => {
    if (ret == false) {
      alert("아이디가 확인 되었습니다.");
      is_id_check.value = "true";
      result = true;
    } else if (ret == true) {
      alert("없는 아이디 입니다.");
      is_id_check.value = "true";
      result = false;
    } else if (ret == "err") {
      alert("오류가 발생하였습니다. 다시 실행하여 주세요");
      is_id_check.value = "true";
      result = false;
    }
  });
  return result;
}

function nullInputCheck() {
  if (!idCheck(user_id.value)) return false;
  if (!is_id_check.value) return false;
  if (!emailCheck(user_email.value)) return false;
  if (!is_email_check.value) return false;
  if (!is_num_check.value) {
    num_check.innerHTML = "인증번호를 확인해주세요.";
    return false;
  }
  return true;
}
