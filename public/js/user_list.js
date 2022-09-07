function stopUser(userId, stop_days_td, condition_td, stop_days_select){
    const stopDay = stop_days_select.value;
    if (!confirm(`${userId}님의 활동을 ${stopDay}일 중지시키겠습니까?`)) {
        return;
    }
    const url = "/admin/stop_user";
    const data = { userId, stopDay };

    $.post(url, data, (result) => {
        if(result.result = "suc"){
            stop_days_td.innerHTML = result.stopDay+"일 남음";
            condition_td.innerHTML = "활동 중지";
            alert(`${userId}님의 활동 정지가 완료되었습니다.`);
        } else {
            alert(`${userId}님의 활동 정지가 실패하였습니다.`);
        }
    });
}

function approvalUser(userId, stop_days_td, condition_td, approval_td){
    if(!confirm(`${userId}님의 활동을 승인하시겠습니까?`)){
        return;
    }
    const url = "/admin/approval_user";
    const data = { userId };

    $.post(url, data, (result) => {
        if(result == "suc"){
            stop_days_td.innerHTML = `                            
            <select name="stopFewDays" id="stopFewDays<%=i%>" onchange="stopUser('${userId}', ${condition_td}, ${approval_td})">
                <option value="0" selected>-</option>
                <option value="1">1</option>
                <option value="3">3</option>
                <option value="7">7</option>
                <option value="10">10</option>
                <option value="15">15</option>
                <option value="30">30</option>
            </select>`
            condition_td.innerHTML = "활동 가능";
            approval_td.innerHTML = "-";
            alert(`${userId}님의 승인이 완료되었습니다.`);
        } else {
            alert(`${userId}님의 승인이 실패하였습니다.`);
        }
    });
}