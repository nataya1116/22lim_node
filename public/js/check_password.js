checkPw = document.querySelector('.check-pw')
findId = document.querySelector('.find_id');
checkPw.onclick = function(){
    window.open('http://localhost:4000/find_pw',"findPw","width=850,height=750")
}

findId.onclick = function(){
    window.open('http://localhost:4000/find_id',"findId","width=850,height=700");
}

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
  };
  
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