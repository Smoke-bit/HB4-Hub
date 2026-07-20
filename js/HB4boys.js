let products = JSON.parse(localStorage.getItem("products"));

if (!products || products.length === 0) {

    products = [

        {
            id: 1,
            name: "Chicken Burger",
            price: 80,
            category: "Food",
            seller: "@SnackDealer",
            hostel: "HB4",
            room: "318",
            description: "Freshly made chicken burger.",
            createdAt: Date.now(),
            images: []
        },

        {
            id: 2,
            name: "Football",
            price: 450,
            category: "Sports",
            seller: "Rahul",
            hostel: "HB4",
            room: "212",
            description: "Kipsta Size 5.",
            createdAt: Date.now(),
            images: []
        }

    ];

    localStorage.setItem(
        "products",
        JSON.stringify(products)
    );

}
/* ===================================
   ELEMENTS
=================================== */

const productsGrid = document.getElementById("productsGrid");

const buyModal = document.getElementById("buyModal");

const closeModal = document.getElementById("closeModal");
const modalImage = document.getElementById("modalImage");

const modalCategory = document.getElementById("modalCategory");

const modalName = document.getElementById("modalName");

const modalPrice = document.getElementById("modalPrice");

const modalDescription = document.getElementById("modalDescription");

const modalSeller = document.getElementById("modalSeller");

const modalRoom = document.getElementById("modalRoom");
/* ===================================
   TIME AGO
=================================== */

function getTimeAgo(timestamp){

    const seconds = Math.floor((Date.now() - timestamp) / 1000);

    if(seconds < 60) return "Just now";

    const minutes = Math.floor(seconds / 60);

    if(minutes < 60) return `${minutes} min ago`;

    const hours = Math.floor(minutes / 60);

    if(hours < 24) return `${hours} hr ago`;

    const days = Math.floor(hours / 24);

    return `${days} day ago`;

}
/* ===================================
   RENDER PRODUCTS
=================================== */

function renderProducts() {

    productsGrid.innerHTML = "";

    products.forEach(product => {

        productsGrid.innerHTML += `

        <article class="product-card">

            <div class="product-image">

    ${
        product.images.length
        ?
        `<img src="${product.images[0]}">`
        :
        `<i class="fa-regular fa-image"></i>`
    }

</div>

            <div class="product-content">

                <span class="category-tag ${product.category.toLowerCase()}">
                    ${product.category}
                </span>

                <h3>${product.name}</h3>

                <p class="price">₹${product.price}</p>

                <p class="description">
                    ${product.description}
                </p>

                <div class="card-meta">

                    <span>
                        <i class="fa-regular fa-clock"></i>
                        ${getTimeAgo(product.createdAt)}
                    </span>

                    <span>
                        <i class="fa-solid fa-location-dot"></i>
                        ${product.hostel}
                    </span>

                </div>

                <div class="seller">

                    <i class="fa-regular fa-user"></i>

                    ${product.seller}

                </div>

                <button class="buy-btn" data-id="${product.id}">
                    Buy Now
                </button>

            </div>

        </article>

        `;

    });

}
renderProducts();
/* ===================================
   OPEN BUY MODAL
=================================== */

function openBuyModal(product){

    modalCategory.textContent = product.category;

    modalName.textContent = product.name;

    modalPrice.textContent = `₹${product.price}`;

    modalDescription.textContent = product.description;

    modalSeller.textContent = product.seller;

    modalRoom.textContent = product.room;

    if(product.images && product.images.length){

        modalImage.src = product.images[0];

    }

    else{

        modalImage.src = "";

    }

    buyModal.classList.add("show");

}
/* ===================================
   BUY BUTTON
=================================== */

document.addEventListener("click",function(e){

    if(e.target.classList.contains("buy-btn")){

        const id = Number(e.target.dataset.id);

        const product = products.find(p=>p.id===id);

        if(product){

            openBuyModal(product);

        }

    }

});
/* ===================================
   CLOSE MODAL
=================================== */

closeModal.addEventListener("click",()=>{

    buyModal.classList.remove("show");

});

buyModal.addEventListener("click",(e)=>{

    if(e.target===buyModal){

        buyModal.classList.remove("show");

    }

});