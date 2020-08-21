const listParent = document.querySelector('#myUL');
const liNode = document.createElement('LI');
const inputNote = document.createElement('input');
const spanDelete = document.createElement('span');
const spanEdit = document.createElement('span');

//Store data 
var dataList = [];

let getDataList = JSON.parse(localStorage.getItem('myDataList'));
        
if( Array.isArray(getDataList) ) {
    dataList = getDataList;
}

//Create list Element
function createListFunc (){

    let listElement = '';
    
    dataList.forEach(myFunction);    

    function myFunction(item, index) {
        liNode.appendChild(inputNote);
        inputNote.type = 'text';
        inputNote.setAttribute("readonly", 'readonly');
        inputNote.setAttribute("value", item);
        liNode.appendChild(spanDelete);
        spanDelete.className = "fa fa-trash-o delete-item";
        spanDelete.setAttribute("onclick", `closeFunct(${index})`);
        liNode.appendChild(spanEdit);
        spanEdit.className = "fa fa-pencil edit-item";
        spanEdit.setAttribute("onclick", `editFunct(${index})`);    
        listElement += liNode.outerHTML;
    }

    listParent.innerHTML = listElement;
}
createListFunc();

//Add item in list
const addBtn = document.querySelector('#add-btn');
addBtn.addEventListener('click', addFuncList);

function addFuncList(){
    //Input value get
    let inputValue = document.querySelector('#myInput').value;

    // Push data in list
    if(inputValue === ''){
        alert(`Please enter the value`);
    } else {
        if( dataList.indexOf(inputValue) == -1){
            alert(`Successfully Added : ${inputValue}`);
            dataList.push(inputValue);
            localStorage.setItem('myDataList', JSON.stringify(dataList));
            document.getElementById('myInput').value = '';
            createListFunc();
        } else {
            alert(`${inputValue} : Dublicate this item. please enter new item`);
        }
    }
}

//Delete signle item
function closeFunct(index) {
    dataList.splice(index, 1);
    localStorage.setItem('myDataList', JSON.stringify(dataList));
    event.target.parentElement.remove();    
}

// Edit signle item.
function editFunct(index){
    let editItem = event.target.parentElement.children[0];

    if(event.target.className == 'fa fa-pencil'){  
        editItem.removeAttribute("readonly");
        editItem.className = "input-edit";
        event.target.className = "fa fa-check";
    } else {
        event.target.className = "fa fa-pencil";
        editItem.removeAttribute('class');
        editItem.setAttribute("readonly", 'readonly');
        dataList.splice(index, 1, editItem.value);
        localStorage.setItem('myDataList', JSON.stringify(dataList));
    }
}

//Clear all items
function clearAllFunc(){
    if(confirm('Clear All Items?')){
        localStorage.removeItem('myDataList');
        listParent.innerHTML = '';
    }
}

