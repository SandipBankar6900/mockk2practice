let image = document.getElementById("image");
let Name = document.getElementById("name");
let Description = document.getElementById("description");
let date = document.getElementById("date");
let location = document.getElementById("location");
let category = document.getElementById("category")
let Price = document.getElementById("price");
let AddButton = document.getElementById("add-button")
let userAuthToken = localStorage.getItem("localAccessToken") || null;
let mainSection = document.getElementById("data-list-wrapper")

let updateId = document.getElementById("update-book-id");
let updateTitle = document.getElementById("update-book-title");
let updateImage = document.getElementById("update-book-image");
let updateLocation = document.getElementById("update-book-location");
let updateCategory = document.getElementById("update-book-category");
let updatePrice = document.getElementById("update-book-price");
let updateDesc = document.getElementById("update-book-desc");

let updateDate = document.getElementById("update-date");
let updateButton = document.getElementById("update-book");


let API = "https://mock-api-template-a9e2.onrender.com/events"
let data ;
async function fetchData(url){
    try {
    let res = await fetch(url);
    let Data = await res.json()
    data = Data;
    DisplayData(data)
    } catch (error) {
       console.log(error); 
    }
}

fetchData(API);

function DisplayData(data) {

    mainSection.innerHTML = "";
    
    // Create a table element and set its class
    let table = document.createElement("table");
    table.className = "data-table";

    // Create the table header row
    let headerRow = table.insertRow(0);
    headerRow.className = "header-row";

    // Define the table header columns
    let headerColumns = ["Image", "Name", "Description", "Category", "Price", "Location", "Date", "Edit", "Delete"];
    
    for (let col of headerColumns) {
        let th = document.createElement("th");
        th.textContent = col;
        headerRow.appendChild(th);
    }

    // Create rows and cells for each data item
    data.forEach((element, index) => {
        let row = table.insertRow(-1);

        // Create a cell for the image
        let imgCell = row.insertCell(0);
        let img = document.createElement("img");
        img.src = element.poster;
        imgCell.appendChild(img);

        // Create cells for other data
        let nameCell = row.insertCell(1);
        nameCell.textContent = element.name;

        let descriptionCell = row.insertCell(2);
        descriptionCell.textContent = element.description;

        let categoryCell = row.insertCell(3);
        categoryCell.textContent = element.category;

        let priceCell = row.insertCell(4);
        priceCell.textContent = element.price + "$";

        let locationCell = row.insertCell(5);
        locationCell.textContent = element.location;

        let dateCell = row.insertCell(6);
        dateCell.textContent = element.date;

    // Create "Edit" button
    let editCell = row.insertCell(7);
    let editButton = document.createElement("button");
    editButton.textContent = "Edit";
    editButton.className = "edit-button"; // You can style this button with CSS
    editCell.appendChild(editButton);
     editButton.addEventListener("click" , () => {
      updateId.value = element.id;
      updateTitle.value = element.name;
      updateImage.value = element.poster;
      updateLocation.value = element.location
      updateCategory.value = element.category;
      updatePrice.value = element.price
      updateDate.value = element.date
      updateDesc.value = element.description;
     })

    // Create "Delete" button
    let deleteCell = row.insertCell(8);
    let deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.dataset.id = element.id;
    deleteButton.className = "delete-button"; // You can style this button with CSS
    deleteCell.appendChild(deleteButton);

    deleteButton.addEventListener("click", () => {
      deleteBook(element.id);
    })
    });

    // Append the table to the main section
    mainSection.appendChild(table);
}

console.log(updateId.value , "Hii")
///////////////delete data /////////////////


async function deleteBook(id) {
  const res = await fetch(`${API}/${id}`, {
    method: "DELETE",
  });
  let data = await res.json();
  fetchData(API);
}

///////////////////add Data/////////////////

AddButton.addEventListener("click" , addBooks)



async function addBooks(){
  try {
    let newData = {
      poster : image.value,
      name : Name.value,
      description : Description.value,
      date : date.value,
      location: location.value,
      category :category.value,
      price :Price.value,

    }
    let res = await fetch( API , {
       method : "POST",
       body:JSON.stringify(newData),
       headers : {
        "Content-type": "application/json",
         Authorization: `Bearer ${userAuthToken}`
    }
    })
    let data = await res.json()
    // console.log(data)
    fetchData(API)
  } catch (error) {
    console.log(error)
  }
}

///////////////////update Data /////////


updateButton.addEventListener("click" , updateData)
async function updateData(event){
  event.preventDefault()
  let body = {
    poster : updateImage.value,
    name : updateTitle.value,
    description : updateDesc.value,
    date :  updateDate.value,
    location: updateLocation.value,
    category : updateCategory.value,
    price : +updatePrice.value,
  }

  try {
    const res = await fetch(`${API}/${updateId.value}`, {
      method: "PUT",
      headers : {
        "Content-type": "application/json"
    },
    body: JSON.stringify(body)
    });
    let data = await res.json()
    console.log( "put data" , data)
    fetchData(API)
  } catch (error) {
    console.log(error)
  }
}