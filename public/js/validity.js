// 모든 인풋값 정규식 검사

// 이름 정규식
function nameCheck(name) {
  const nameRegex = /^[가-힣]{2,20}$/;
  if (nameRegex.test(name) == false) {
    name_check.innerHTML = "이름을 다시 확인해주세요.";
    return false;
  } else {
    name_check.innerHTML = "";
    return true;
  }
}

// 아이디 정규식
function idCheck(id) {
  // 유저 아이디 인풋창이 리드 온리면 중복확인까지 완료되었다는 의미

  const idRegex = /^[a-zA-Z0-9]{4,20}$/g;
  if (!idRegex.test(id)) {
    if(!user_id.readOnly) id_check.innerHTML = "아이디를 다시 확인해주세요.";
    return false;
  } else {
    if(is_id_check.value){
      id_check.innerHTML = "";
      return true;
    } else {
      id_check.innerHTML = "아이디 중복 체크를 해주세요.";
      return true;
    }
  }
}

// 아이디 중복확인
async function idOverlap(){

  const userId = user_id.value;
  
  if(id_check.innerHTML != "아이디 중복 체크를 해주세요.") return;
  
  const url = "/user/id_overlap";
  const data = {userId};

  let result;
  await $.post(url, data, (ret) => {
    if(ret == "err") {
      alert("오류가 발생하였습니다. 다시 실행하여 주세요");
      result = false;
    }
    else if(ret == false) {
      alert("사용가능한 아이디 입니다.");
      id_check.innerHTML = "";
      user_id.readOnly = true;
      is_id_check.value = "true";
      result = true;
    } else {
      id_check.innerHTML = "중복되는 아이디가 있습니다.";
      result = false;
    }
  });

  return result;
}

// 비밀번호 정규식
function pwCheck(pw, check) {
  const pwRegex =
    /^(?=.*?[A-Z])(?=.*\d)(?=.*?[@$!%*#?&])[A-z\d@$!%*#?&]{8,20}$/g;
  if (pwRegex.test(pw) == false) {
    check.innerHTML =
      "대문자, 숫자, 특수문자(@$!%*#?&만 사용가능) 1개이상 포함(8~20자리)";
    return false;
  } else {
    check.innerHTML = "";
    return true;
  }
}

// 비밀번호 재확인
function pwDoubleCheck(pwDouble, check) {

  if(!pwCheck(pwDouble, check)) return;
  
  const pw = user_pw.value;

  if( pw !== pwDouble){
    check.innerHTML = "비밀번호와 동일한 값을 입력해주세요.";
    return false;
  } else {
    check.innerHTML = "";
    return true;
  }
}

// 핸드폰 정규식
function phoneCheck(phone) {
  const phoneRegex = /^([010]{3})([0-9]{4})([0-9]{4})$/g;
  if (phoneRegex.test(phone) == false) {
    phone_check.innerHTML = "숫자를 입력해주세요";
    return false;
  } else {
    phone_check.innerHTML = "";
    return true;
  }
}

// 이메일 정규식
function emailCheck(email) {
  const emailRegex =
    /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/g;
  if (emailRegex.test(email) == false) {
    email_check.innerHTML = "이메일을 확인해주세요";
    return false;
  } else {
    if(is_email_check.value){
      email_check.innerHTML = "";
      mail_btn.disabled = true;
      return true;
    } else {
      email_check.innerHTML = "이메일을 인증해주세요.";
      mail_btn.disabled = false;
      return true;
    }

  }
}

async function mailNumCheck() {
  
  const randNum = random_num.value

  const url = "/user/email_num_check";
  const data = {randNum};

  let result;
  await $.post(url, data, (ret) => {
    if (ret == "fail") {
      num_check.innerHTML = "유효시간이 지났습니다.";
      result = false;
    } else if (ret == "suc") {

      alert("인증번호가 일치합니다.");

      num_check.innerHTML = "";
      email_check.innerHTML = "";

      random_num.readOnly = true;

      mail_btn.disabled = true;
      num_btn.disabled = true;

      is_email_check.value = "true";
      is_num_check.value = "true";

      result = true;
    } else if (ret == "wrong"){
      num_check.innerHTML = "인증번호가 일치하지 않습니다.";

      mail_btn.disabled = true;

      result = false;
    }
    else {
      alert("알 수 없는 에러가 발생하였습니다. 이메일을 다시 확인해주세요.");
      result = false;
    }
  });
  return result;
}


// 마지막에 완료버튼을 누르면 전체 체크하고 하나라도 false가 있으면 넘어갈 수 없게
function allCheck() {

  if(!nameCheck(user_name.value)) return false;

  if(!idCheck(user_id.value)) return false;

  if(!is_id_check.value) return false;

  if(!pwCheck(user_pw.value, pw_check)) return false;

  if(!pwDoubleCheck(user_pw_check.value, pass_check)) return false;

  if(!phoneCheck(user_phone.value)) return false;

  if(!emailCheck(user_email.value)) return false;

  if(!is_email_check.value) return false;
  
  if(!is_num_check.value){
    num_check.innerHTML = "인증번호를 확인해주세요.";
    return false;
  }
  return true;
}

function findIdEmailCheck(){
  if(!emailCheck(user_email.value)) return false;
  return true;
}