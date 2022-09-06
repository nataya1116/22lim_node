checkPw = document.querySelector('.check-pw')
findId = document.querySelector('.find_id');
checkPw.onclick = function(){
    window.open('http://localhost:4000/find_pw',"findPw","width=850,height=750")
}

findId.onclick = function(){
    window.open('http://localhost:4000/user/find_id',"findId","width=850,height=700");
}

