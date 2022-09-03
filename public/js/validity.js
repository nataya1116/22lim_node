// 모든 인풋값 정규식 검사

// 이름 정규식
function nameCheck(name) {
  const nameRegex = /^[가-힣]{2,20}$/;
  if (nameRegex.test(name) == false) {
    name_check.innerHTML = "이름을 다시 확인해주세요.";
  } else name_check.innerHTML = "";
}

// 아이디 정규식
function idCheck(id) {
  const idRegex = /^[a-zA-Z0-9]{4,20}$/g;
  if (idRegex.test(id) == false) {
    id_check.innerHTML = "아이디를 다시 확인해주세요.";
  } else id_check.innerHTML = "";
}

// 아이디 중복확인
function idOverlap(idInput){

  const idValue = idInput.value;
  
  if(idCheck(idValue)) return;
  
  const url = "/user/id_overlap";
  const data = {idValue};

  $.post(url, data, (ret) => {
    if(ret) {
      alert("사용가능한 아이디 입니다.");
      idInput.readOnly = true;
    } else {
      id_check.innerHTML = "중복되는 아이디가 있습니다.";
    }
  });

}

// 비밀번호 정규식
function pwCheck(pw) {
  const pwRegex =
    /^(?=.*?[A-Z])(?=.*\d)(?=.*?[@$!%*#?&])[A-z\d@$!%*#?&]{8,20}$/g;
  if (pwRegex.test(pw) == false) {
    pw_check.innerHTML =
      "(대문자, 특수문자(@$!%*#?&만 사용가능) 1개이상 포함(8~20자리))";
  } else pw_check.innerHTML = "";
}

// 핸드폰 정규식
function phoneCheck(phone) {
  const phoneRegex = /^([010]{3})([0-9]{4})([0-9]{4})$/g;
  if (phoneRegex.test(phone) == false) {
    phone_check.innerHTML = "'-' 빼고 입력해주세요";
  } else {
    phone_check.innerHTML = "";
  }
}

// 이메일 정규식
function emailCheck(email) {
  const emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/g;
  if (emailRegex.test(email) == false) {
    email_check.innerHTML = "이메일을 확인해주세요";
  } else email_check.innerHTML = "";
}

// 마지막에 완료버튼을 누르면 전체 체크하고 하나라도 false가 있으면 넘어갈 수 없게
function allCheck() {}
