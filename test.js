const maxColor = 6;
const maxTextLenght = 30;
var nextColor = getRandomInt(0, maxColor);

window.addEventListener('DOMContentLoaded', () => {
    showItems();
});

function FindColor() {
    const selectedColor = document.getElementsByName("color");

    for(let i = 0; i < selectedColor.length; i++){
        if(selectedColor[i].checked) {
            return i + 1;
        }
    }    
}
function AddItem() {
    const itemText = document.getElementById("new_item");
    
    if(itemText.value) {
        let dbTest = JSON.parse(localStorage.getItem('test'));
        const setColor = FindColor();
        const newItem = {
            "title": itemText.value,
            "color": setColor
        }

        if(!dbTest) {
            dbTest = [];
        }
        dbTest.push(newItem);
        localStorage.setItem('test', JSON.stringify(dbTest));
        nextColor = getRandomInt(0, maxColor);
        document.getElementsByName("color")[nextColor].checked = true;
        document.getElementById("new_item").value = "";
    }
    showItems();
}
function showItems() {
    const dbTest = JSON.parse(localStorage.getItem('test'));

    while (document.getElementById("itemlist").firstChild) {
        document.getElementById("itemlist").removeChild(document.getElementById("itemlist").firstChild);
    }

    if(dbTest) {
        const itemList = document.getElementById("itemlist");

        for(let i = 0; i < dbTest.length; i++) {
            const newItemLi = document.createElement("li");        
            const newCheck = document.createElement("input");
            const divCheckbox = document.createElement("div");
            const divLiText = document.createElement("div");

            newCheck.type = "checkbox";
            newCheck.name = "checkB"
            
            divCheckbox.id = "divboxsize";
            divCheckbox.appendChild(newCheck);
            newItemLi.appendChild(divCheckbox);
            divLiText.id = "divtextsize";

            createDeleteBtn(i, divLiText);
            let editBtnLabelDiv = createEditBtn(i, divLiText);

            if(dbTest[i].title.length <= maxTextLenght) {
                editBtnLabelDiv.appendChild(document.createTextNode(" " + dbTest[i].title));
            } else {
                const newA = document.createElement("a");
                const newSpan = document.createElement("span");

                newA.className = "tooltip";
                newA.appendChild(document.createTextNode(" " + dbTest[i].title.slice(0,maxTextLenght) + "..."));
                newSpan.appendChild(document.createTextNode(" " + dbTest[i].title));
                newA.appendChild(newSpan);
                editBtnLabelDiv.appendChild(newA);
            }

            newItemLi.appendChild(divLiText);
            itemList.appendChild(newItemLi);
            nextColor = dbTest[i].color;
            divCheckbox.className = "div_color" + nextColor;
            divLiText.className = "div_color" + nextColor;
        }
    }
}

function getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function ChangeColor() {
    let checkedItems = false;
    const dbTest = JSON.parse(localStorage.getItem('test'));
    const checkBoxes = document.getElementsByName("checkB");
    const newColor = FindColor();

    for(let i = 0; i < checkBoxes.length; i++) {
        if(checkBoxes[i].checked) {
            dbTest[i].color = newColor;
            checkedItems = true;
        }
    }
    localStorage.setItem('test', JSON.stringify(dbTest));
   
    if(checkedItems) {
        const itemText = document.getElementById("new_item");
        checkedItems = false;
        itemText.value = "";    
        showItems();
    }
}

function removeItem() {
    let dbTest = JSON.parse(localStorage.getItem('test'));
    const delBtns = document.getElementsByName("delBtn");
    
    for(let i = 0; i < delBtns.length; i++) {
        if(delBtns[i].checked) {
            document.getElementById("itemlist").removeChild(document.getElementById("itemlist").childNodes[i]);
            dbTest.splice(i,1);
        }
    }
    localStorage.setItem('test', JSON.stringify(dbTest));
    showItems();
}
function editItem() {
    const dbTest = JSON.parse(localStorage.getItem('test'));
    const itemText = document.getElementById("new_item");
    const editBtns = document.getElementsByName("editBtn");
    
    for(let i = 0;i < editBtns.length; i++) {
        if(editBtns[i].checked) {
            itemText.value = dbTest[i].title;
            document.getElementsByName("color")[dbTest[i].color-1].checked = true;
        }
    }
    changeActiveBtn("hide", "btnfield1 smallBtnSize btnStyle", "btnfield2 smallBtnSize btnStyle");
}
function saveChanges() {
    const dbTest = JSON.parse(localStorage.getItem('test'));
    const itemText = document.getElementById("new_item");
    const editBtns = document.getElementsByName("editBtn");
    
    for(let i = 0; i < editBtns.length; i++) {
        if(editBtns[i].checked) {
            dbTest[i].title = itemText.value;
            let changeColor = FindColor();
            dbTest[i].color = changeColor;
        }
    }
    localStorage.setItem('test', JSON.stringify(dbTest));
    itemText.value = "";
    changeActiveBtn("btnfield btnStyle", "hide", "hide");
    showItems();
}
function removeChanges() {
    const itemText = document.getElementById("new_item");
    
    itemText.value = "";
    changeActiveBtn("btnfield btnStyle", "hide", "hide");
    showItems();
}

function changeActiveBtn(addBtnStyle, saveBtnStyle, cancelBtnStyle) {
    const addbtn = document.getElementById("add_btn");
    const savebtn = document.getElementById("save_btn");
    const cancelbtn = document.getElementById("cancel_btn");

    addbtn.className = addBtnStyle;
    savebtn.className = saveBtnStyle;
    cancelbtn.className = cancelBtnStyle;
}

function createDeleteBtn(btnId, divNode) {
    const delBtn = document.createElement("input");
    const delBtnLabel = document.createElement("label");
    const labelDiv = document.createElement("div");

    delBtn.type = "checkbox";
    delBtn.className = "delBtnDiv hide";
    delBtn.name = "delBtn";
    delBtn.id = "delBtn" + btnId;
    delBtn.onclick = removeItem;
    delBtnLabel.htmlFor = "delBtn" + btnId;
    delBtnLabel.id = "delBtn" + btnId;
    labelDiv.className = "delBtnDiv";
    labelDiv.appendChild(document.createTextNode("X"));
    delBtnLabel.appendChild(labelDiv)
    divNode.appendChild(delBtn);
    divNode.appendChild(delBtnLabel);
}
function createEditBtn(btnId, divNode) {
    const editBtn = document.createElement("input");
    const editBtnLabel = document.createElement("label");
    const editLabelDiv = document.createElement("div");

    editBtn.type = "radio";
    editBtn.className = "hide";
    editBtn.name = "editBtn";
    editBtn.id = "editBtn" + btnId;
    editBtn.onclick = editItem;
    editBtnLabel.htmlFor = "editBtn" + btnId;
    editBtnLabel.id = "editBtn" + btnId;
    editLabelDiv.className = "editBtnDiv";
    editBtnLabel.appendChild(editLabelDiv)
    divNode.appendChild(editBtn);
    divNode.appendChild(editBtnLabel);
    return editLabelDiv;
}