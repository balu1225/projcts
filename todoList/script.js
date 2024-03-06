const inputBox =document.getElementById("input-box");
const listContainer =document.getElementById("list-container");
const addBtn =document.getElementById("add-btn");

addBtn.addEventListener("click", function (){
    if (inputBox.value==""){
        alert("you must write something" );

    }
    else{
        let li = document.createElement("li");
        li.innerHTML= inputBox.value;
        listContainer.appendChild(li);
        let span =document.createElement("span");
        span.innerHTML="\u00d7";
        li.append(span)
        saveData();
    }
    inputBox.value='';

})

listContainer.addEventListener("click", function(modifyList){
    if (modifyList.target.tagName == "LI"){
        modifyList.target.classList.toggle("checked");
        saveData();
    }
    else if (modifyList.target.tagName=="SPAN"){
        modifyList.target.parentElement.remove();
        saveData();
    }

})

function saveData(){
    localStorage.setItem("data",listContainer.innerHTML);

}
function showTask(){
    listContainer.innerHTML= localStorage.getItem("data");
}

showTask();

console.log(localStorage);