// console.log("Hello here Nishchay");
showNotes();

//Getting button
let addBtn = document.getElementById("addBtn");
addBtn.addEventListener("click", function (e) {
    //Getting textArea
    let addTxt = document.getElementById("addTxt");
    let addTitle = document.getElementById("addTitle");
    // console.log(addTxt.value);
    if(addTitle.value.length!=0 && addTxt.value.length!=0){

        
        //Getting local storage
        let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        // console.log(notesObj);
    }
    
    myObj = {
        title: addTitle.value,
        text: addTxt.value
    }
    // notesObj.push(addTxt.value);
    notesObj.push(myObj);
    // console.log(notesObj);

    localStorage.setItem("notes", JSON.stringify(notesObj));
    // console.log(notesObj);
    addTxt.value = "";
    addTitle.value = "";

    //Adding notes in html div
    showNotes();
}
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
    }
    let html = "";
    notesObj.forEach(function (element, index) {
        html += `
        <div class="noteCard text-white  my-2 mx-2 bg-secondary" style="width: 18rem;">
        <div class="card-body">
          <h5 class="card-title">${element.title}</h5>
          <p id="para" class="card-text">${element.text}</p>
          <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-primary">Delete Note</button>
        </div>
      </div>
        `
        // console.log(element);
    });
    let notesElm = document.getElementById("notesDiv");
    if (notesObj.length == 0) {
        notesElm.innerHTML = "No notes to show"
    }
    else {
        notesElm.innerHTML = html;
    }
}


//function to delete notes
function deleteNote(index) {
    //   console.log("hey index ",index," is Deleting" );
    let notes = localStorage.getItem("notes");
    if (notes == null) {
        notesObj = [];
    }
    else {
        notesObj = JSON.parse(notes);
        // console.log(notesObj);
    }

    notesObj.splice(index, 1); //To remove items from an array
    localStorage.setItem("notes", JSON.stringify(notesObj));//again setting an item after deleting one member
    showNotes();
}


//to show search
let search = document.getElementById("search");
// console.log(search);

search.addEventListener("input", function () {

    var inputValue = search.value;
    //  console.log(search.value);
    let card = document.getElementsByClassName("noteCard");
    arrCard = Array.from(card); //Getting an array from html collection

    arrCard.forEach(function (element) {
        // console.log(element);
        let cardTitle = element.getElementsByTagName("h5")[0].innerText;
        // console.log(cardTitle);
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputValue) || cardTitle.includes(inputValue)) {
            element.style.display = "block"
        }
        else {
            element.style.display = "none"
        }
    })
});