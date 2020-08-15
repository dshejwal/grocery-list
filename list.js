const listParent = document.querySelector('#myUL');
const spanDelete = document.createElement('span');
spanDelete.className = "fa fa-trash-o";

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
        listElement += `<li><input type='text' value='${item}' readonly/> <span class='fa fa-trash-o' onclick='closeFunct(${index})'></span> <span class='fa fa-pencil'></span></li>`
    }
    listParent.innerHTML = listElement;
}

createListFunc();

//Add item in list
const addBtn = document.querySelector('.addBtn');
addBtn.addEventListener('click', addFuncList);

function addFuncList(){

    //Input value get
    let inputValue = document.querySelector('#myInput').value;

    // Push data in list
    if(inputValue === ''){
        alert(`Please enter the value`);
    } else {
        alert(`Successfully Added : ${inputValue}`);
        dataList.push(inputValue);
        localStorage.setItem('myDataList', JSON.stringify(dataList));
        document.getElementById('myInput').value = '';
        createListFunc();
    }
}

//Delete signle item
function closeFunct(index) {
    dataList.splice(index, 1);
    localStorage.setItem('myDataList', JSON.stringify(dataList));
    event.target.parentElement.remove();    
}

//Clear all items
function clearAllFunc(){
    if(confirm('Clear All Items?')){
        localStorage.removeItem('myDataList');
        listParent.innerHTML = '';
    }
}