 
function textBoxView(text){
    isPopupOpen = true;
    isTextBoxView = true;
    _text_box.style.display = "flex";
    _text.innerHTML = text;
}

function textBoxHidden(){
    isPopupOpen = false;
    isTextBoxView = false;
    _text_box.style.display = "none";
    _text.innerHTML = "";
}

function settingBoardView(){
    isPopupOpen = true;
    _setting_board.style.display = "flex";
    isSettingBoardView = true;
}

function settingBoardHidden(){
    isPopupOpen = false;
    _setting_board.style.display = "none";
    isSettingBoardView= false;
}

function inventoryView(name){
    isPopupOpen = true;
    _inventory.style.display = "flex";
    _item_use.style.display = "none";
    _item_text.data = name;
    isInventoryView = true;

}


function saveFileView(){
    isPopupOpen = true;
    _save_filed.style.display = "flex";
    isSaveFileView = true;
}

function saveFileHidden(){
    isPopupOpen = false;
    _save_filed.style.display = "none";
    isSaveFileView = false;
}

function loadFileView(){
    isPopupOpen = true;
    _load_filed.style.display = "flex";
    isLoadFileView = true;
}

function loadFileHidden(){
    isPopupOpen = false;
    _load_filed.style.display = "none";
    isLoadFileView = false;
}

function inventoryHidden(){
    isPopupOpen = false;
    _inventory.style.display = "none";
    _item_use.style.display = "none";
    isInventoryView = false;

    let itemTdList = document.querySelectorAll(".item_td");
    itemTdList.forEach((item)=>{
        item.classList.remove("active");
    });
}

function quizeBoxHidden(){
    isPopupOpen = false;
    isQuizeBox = false;
    _quize_box.style.display = "none";
    _answer.innerHTML = "";
    _answer_input.data = "";
}

function quizeBoxView(text, portalName, isKeyboard){
    isPopupOpen = true;
    isQuizeBox = true;
    _answer_input.data = portalName;
    // console.log(_answer_input.data);
    _quize_box.style.display = "flex";
    _answer.innerHTML = text;
    // console.log(`_answer_input.value ${_answer_input.value}`);
    _answer_input.value = "";

    if (isKeyboard) {
        _return_text.style.visibility = "visible"; 
        _answer_input.style.visibility = "visible";
    }else {
        _return_text.style.visibility = "hidden";
        _answer_input.style.visibility = "hidden";
    }

    _answer_input.focus();
}

function paragraph(element) {
    const array = element.innerText.split('')
    const special = ['~', '@', '!', '#', '$', '%', '^', '&', '*']
    const exception = [' ', '\n', '.', ',']
    const random = (min, max) => {
        return Math.floor(Math.random() * (max - min + 1) + min)
    }
    
    const numArray = []
    array.forEach(char => {
        const num = random(5, 40)
        numArray.push(num)
    })
    
    let completeCount
    let newText
    const timer = setInterval(() => { 
    completeCount = 0
    newText = '';
    numArray.forEach((num, i) => {
      if (exception.includes(array[i]) || numArray[i] === 0) {
        newText += array[i]
        completeCount += 1
      } else {
        newText += special[numArray[i] % special.length]
        numArray[i] = --num
      }
    })

    element.innerText = newText
    if (completeCount === numArray.length) clearInterval(timer)
  }, 120)
}

function chageMap(){
    
}