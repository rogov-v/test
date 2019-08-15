const maxColor = 6;
const maxTextLenght = 30;
var nextColor = getRandomInt(0, maxColor);

window.addEventListener('DOMContentLoaded', (event) => {
    showItems();
});

function FindColor(){
    let selectedColor = document.getElementsByName("color");

    for(let i = 0; i < selectedColor.length; i++){
        if(selectedColor[i].checked) {
            return i + 1;
        }
    }    
}
function AddItem() {
    let itemText = document.getElementById("new_item");
    
    if(itemText.value) {
        let test =JSON.parse(localStorage.getItem('test'));

        if(!test) {
            test=[];
        }
        let setColor = FindColor();
        let test1 = {
            "title": itemText.value,
            "color": setColor
        }
        test.push(test1);
        localStorage.setItem('test', JSON.stringify(test));

        nextColor = getRandomInt(0, maxColor);
        document.getElementsByName("color")[nextColor].checked = true;
        document.getElementById("new_item").value="";
    }
    showItems();
}
function showItems() {
    let test = JSON.parse(localStorage.getItem('test'));

    while (document.getElementById("itemlist").firstChild) {
        document.getElementById("itemlist").removeChild(document.getElementById("itemlist").firstChild);
    }

    if(test){
        for(let i = 0;i<test.length;i++){
            let itemList=document.getElementById("itemlist");
            let newItem = document.createElement("li");        
            let newCheck=document.createElement("input");
            newCheck.type = "checkbox";
            newCheck.name = "checkB"
            let divCheckbox=document.createElement("div");
            divCheckbox.id="divboxsize";
            divCheckbox.appendChild(newCheck);
            newItem.appendChild(divCheckbox);
            let divLiText=document.createElement("div");
            divLiText.id="divtextsize";

            let delBtn = document.createElement("input");
            delBtn.type = "checkbox";
            delBtn.className = "delB";
            delBtn.name = "delBtn";
            delBtn.id = "delBtn" + i;
            delBtn.onclick = removeItem;
            let delBtnLabel = document.createElement("label");
            delBtnLabel.htmlFor = "delBtn" + i;
            delBtnLabel.id = "delBtn" + i;
            let labelDiv = document.createElement("div");
            labelDiv.className = "delBtnDiv";
            labelDiv.appendChild(document.createTextNode("X"));
            delBtnLabel.appendChild(labelDiv)
            divLiText.appendChild(delBtn);
            divLiText.appendChild(delBtnLabel);

            let editBtn = document.createElement("input");
            editBtn.type = "radio";
            editBtn.className = "editB";
            editBtn.name = "editBtn";
            editBtn.id = "editBtn" + i;
            editBtn.onclick = editItem;
            let editBtnLabel = document.createElement("label");
            editBtnLabel.htmlFor = "editBtn" + i;
            editBtnLabel.id = "editBtn" + i;
            let editLabelDiv = document.createElement("div");
            editLabelDiv.className = "editBtnDiv";
            editBtnLabel.appendChild(editLabelDiv)
            divLiText.appendChild(editBtn);
            divLiText.appendChild(editBtnLabel);

            if(test[i].title.length <= maxTextLenght) {
                editLabelDiv.appendChild(document.createTextNode(" " + test[i].title));
            } else {
                let newA=document.createElement("a");
                newA.className="tooltip";
                newA.appendChild(document.createTextNode(" " + test[i].title.slice(0,maxTextLenght) + "..."));
                let newSpan=document.createElement("span");
                newSpan.appendChild(document.createTextNode(" " + test[i].title));
                newA.appendChild(newSpan);
                editLabelDiv.appendChild(newA);
            }

            newItem.appendChild(divLiText);
            itemList.appendChild(newItem);
            nextColor = test[i].color;
            divCheckbox.className="div_color"+nextColor;
            divLiText.className="div_color"+nextColor;
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function ChangeColor() {
    let checkedItems = false;
    let test = JSON.parse(localStorage.getItem('test'));
    let checkBoxes=document.getElementsByName("checkB");
    let newColor=FindColor();
    for(let i=0;i<checkBoxes.length;i++){
        if(checkBoxes[i].checked){
            test[i].color = newColor;
            checkedItems = true;
        }
    }
    localStorage.setItem('test', JSON.stringify(test));
    if(checkedItems){
        checkedItems = false;
        let itemText = document.getElementById("new_item");
        itemText.value="";    
        showItems();
    }
}

function removeItem(){
    let test = JSON.parse(localStorage.getItem('test'));
    let delBtns=document.getElementsByName("delBtn");
    for(let i=0;i<delBtns.length;i++){
        if(delBtns[i].checked){
            document.getElementById("itemlist").removeChild(document.getElementById("itemlist").childNodes[i]);
            test.splice(i,1);
        }
    }
    localStorage.setItem('test', JSON.stringify(test));
    showItems();
}
function editItem(){
    let test = JSON.parse(localStorage.getItem('test'));
    let itemText = document.getElementById("new_item");
    let editBtns = document.getElementsByName("editBtn");
    for(let i=0;i<editBtns.length;i++){
        if(editBtns[i].checked){
            itemText.value = test[i].title;
            document.getElementsByName("color")[test[i].color-1].checked = true;
        }
    }
    let addbtn = document.getElementById("add_btn");
    addbtn.className = "hide"
    let savebtn = document.getElementById("save_btn");
    savebtn.className = "btnfield1"
    let cancelbtn = document.getElementById("cancel_btn");
    cancelbtn.className = "btnfield2"
}
function saveChanges(){
    let test = JSON.parse(localStorage.getItem('test'));
    let itemText = document.getElementById("new_item");
    let editBtns = document.getElementsByName("editBtn");
    for(let i=0;i<editBtns.length;i++){
        if(editBtns[i].checked){
            test[i].title = itemText.value;
            let changeColor = FindColor();
            test[i].color = changeColor;
        }
    }
    localStorage.setItem('test', JSON.stringify(test));
    itemText.value="";
    let addbtn = document.getElementById("add_btn");
    addbtn.className = "btnfield"
    let savebtn = document.getElementById("save_btn");
    savebtn.className = "hide"
    let cancelbtn = document.getElementById("cancel_btn");
    cancelbtn.className = "hide"
    showItems();
}
function removeChanges(){
    let itemText = document.getElementById("new_item");
    itemText.value="";
    let addbtn = document.getElementById("add_btn");
    addbtn.className = "btnfield"
    let savebtn = document.getElementById("save_btn");
    savebtn.className = "hide"
    let cancelbtn = document.getElementById("cancel_btn");
    cancelbtn.className = "hide"

    showItems();
}