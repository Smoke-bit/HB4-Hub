/* ===================================
   ELEMENTS
=================================== */

const sellForm = document.getElementById("sellForm");

const cameraInput = document.getElementById("cameraInput");
const galleryInput = document.getElementById("galleryInput");

const imagePreview = document.getElementById("imagePreview");

const productName = document.getElementById("productName");
const price = document.getElementById("price");
const category = document.getElementById("category");
const description = document.getElementById("description");

let selectedImages = [];
let imageData = [];

/* ===================================
   IMAGE PREVIEW
=================================== */

/* ===================================
   IMAGE PREVIEW
=================================== */

function previewImages(files){

    imagePreview.innerHTML = "";

    selectedImages = [...files];

    imageData = [];

    selectedImages.forEach(file=>{

        const reader = new FileReader();

        reader.onload = function(e){

            imageData.push(e.target.result);

            const img = document.createElement("img");

            img.src = e.target.result;

            img.className = "preview-image";

            imagePreview.appendChild(img);

        };

        reader.readAsDataURL(file);

    });

}
cameraInput.addEventListener("change", handleImageSelection);

galleryInput.addEventListener("change", handleImageSelection);

function handleImageSelection(e){

    if(e.target.files.length){

        previewImages(e.target.files);

    }

}


/* ===================================
   POST PRODUCT
=================================== */

sellForm.addEventListener("submit",(e)=>{

    e.preventDefault();

    if(
        productName.value.trim()==="" ||
        price.value.trim()==="" ||
        category.value===""
    ){

        alert("Please fill all required fields.");

        return;

    }

    const displayType = document.querySelector(
        'input[name="displayType"]:checked'
    ).value;


    const newProduct = {

    id: Date.now(),

    name: productName.value,

    price: Number(price.value),

    category: category.value,

    description: description.value,

    seller:
        displayType==="real"
        ? "Utkarsh Sharma"
        : "@SnackDealer",

    hostel:"HB4",

    room:"318",

    time:"Just now",
    createdAt: Date.now(),
    images:imageData
    

};

    let products =
        JSON.parse(localStorage.getItem("products")) || [];

    products.unshift(newProduct);

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

    alert("Listing posted successfully!");

    window.location.href="HB4boys.html";

});