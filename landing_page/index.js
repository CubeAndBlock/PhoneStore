$(document).ready(function () {

    let products = []
    
    $.ajax("http://localhost:3000/products",{
        headers: {
            "Content-Type": "application/json"
        },
        method: "GET"
    })
    .done(function(data){
        products = [...data]
        renderProducts(products);
    })
});

function renderProducts(products) {
    console.log(products);
    const baseUrl = "../assets/landing-page/";
  
    if (!products || products.length === 0) {
      $("#products__empty").css({
        display: "block",
        
      });
    } else {
      $("#products__empty").css({
        display: "none",
      });
     
  
      for (let index = 0; index < products.length; index++) {
        $("#products__list").append(`
            <div class="products__item">
                  <small class="products__sale">Trả góp ${products[index].install}%</small>
                  <div class="products__img">
                    <a href="#">
                      <img src=${baseUrl + products[index].image} alt="" />
                    </a>
                  </div>
                  <h5 class="products__title">
                    <a href="#">${products[index].name}</a>
                  </h5>
                  <p class="products__price">
                    <span>${products[index].price}₫</span>
                    <span>-${products[index].sale}%</span>
                  </p>
                  <p class="products__rate">
                    <span>${products[index].ratingStar}</span>
                    <span>
                      <i class="fa-solid fa-star" style="color: #fb6e2e"></i>
                    </span>
                    <span>(${products[index].quantity})</span>
                  </p>
                </div>
        `);
      }
    }
  }