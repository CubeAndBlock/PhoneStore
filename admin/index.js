$(document).ready(function () {
    // let products = JSON.parse(localStorage.getItem("products")) || []
    let products = []
    let selectedProduct = null;
    $.ajax("http://localhost:3000/products", {
        headers: {
            "Content-Type": "application/json"
        },
        METHOD: "GET"

    })
        .done(function (data) {
            products = [...data]
            renderProducts(products)
        })
    $("#btn-add-new").on("click", function (event) {
        $("#modal").addClass("active")
    })

    $("#modal").on("click", function (event) {
        if (event.target === this) {
            closeModal()
        }
    })

    $("#productImage").on("change", function (event) {
        $("#product-image").text(this.files[0].name)
    })

    $("#table").on("click", "#btn-edit-product", function (event) {
        $("#btn-submit-form").text("Chinh sua");
        $("#modal").addClass("active");
        const rowSelected = this.parentElement.parentElement;
        selectedProduct = products.find(
            (product) => String(product.id) === String(rowSelected.children[0].textContent)
        );

        console.log('selectedProduct', selectedProduct);

        $("#productName").val(selectedProduct.name);
        $("#productPrice").val(selectedProduct.price);
        $("#productRate").val(selectedProduct.ratingStar);
        $("#productQuantity").val(selectedProduct.quantity);
        $("#productSale").val(selectedProduct.sale);
        $("#productInstall").val(selectedProduct.install);
        $("#product-image").text(selectedProduct.image);
    })

    $("#table").on("click", "#btn-delete-product", function (event) {
        const rowSelected = this.parentElement.parentElement;
        selectedProduct = products.find(
            (product) => String(product.id) === String(rowSelected.children[0].textContent)
        );
        console.log("selectedProdeuct", selectedProduct);
        $.ajax(`http://localhost:3000/products/${String(selectedProduct.id)}`, {
            headers: {
                "Content-Type": "application/json"
            },
            method: "DELETE"
        })
    })

    $("#btn-search").on("click", function (event) {
        event.preventDefault();
        let searchProducts = $("#input-search").val().trim();
        console.log("name search: ", searchProducts);
    
        $.ajax(`http://localhost:3000/products?q=${searchProducts}`, {
            headers: {
                "Content-Type": "application/json",
            },
            method: "GET",
            dataType: "json",
        }).done(function (data) {
          products = [...data];
          renderProducts(products);
        });
    });

    $("#productName").keydown(function (event) {
        $("#name-error").empty()
    });
    $("#productPrice").keydown(function (event) {
        $("#price-error").empty()
    });
    $("#productRate").keydown(function (event) {
        $("#rate-error").empty()
    });
    $("#productQuantity").keydown(function (event) {
        $("#quantity-error").empty()
    });
    $("#productInstall").keydown(function () {
        $("#install-error").empty()
    });
    $("#product-image").keydown(function () {
        $("#image-error").empty()
    });

    $("#btn-submit-form").on("click", function (event) {
        event.preventDefault()

        const name = $("#productName").val();
        const price = $("#productPrice").val();
        const ratingStar = $("#productRate").val();
        const quantity = $("#productQuantity").val();
        const sale = $("#productSale").val();
        const install = $("#productInstall").val();
        const image = $("#product-image").text();

        if (name.trim().length === 0) {
            $("#name-error").text("Vui lòng nhập tên sản phẩm")
        }
        if (price.trim().length === 0) {
            $("#price-error").text("Vui lòng nhập giá bán sản phẩm")
        }
        if (ratingStar.trim().length === 0) {
            $("#rate-error").text("Vui lòng đánh giá sản phẩm")
        }
        if (quantity.trim().length === 0) {
            $("#quantity-error").text("Vui lòng nhập số lượng sản phẩm")
        }
        if (install.length === 0) {
            $("#install-error").text("Vui lòng chọn lãi xuất trả góp")
        }
        if (image.length === 0) {
            $("#image-error").text("Vui lòng chọn ảnh sản phẩm")
        }
        if (name.trim().length && price.trim().length && ratingStar.trim().length && quantity.trim().length && install.length && image.length) {
            if (!selectedProduct) {
                const productNew = {
                    name: name,
                    price: price,
                    ratingStar: ratingStar,
                    quantity: quantity,
                    sale: sale,
                    install: install,
                    image: image,
                }

                $.ajax("http://localhost:3000/products", {
                    headers: {
                        "Content-Type": "application/json"
                    },
                    method: "POST",
                    data: JSON.stringify(productNew)
                })
                closeModal();
                clearError();
            }
            else {
                const editedproduct = {
                    name: $("#productName").val(),
                    price: $("#productPrice").val(),
                    ratingStar: $("#productRate").val(),
                    quantity: $("#productQuantity").val(),
                    sale: $("#productSale").val(),
                    install: $("#productInstall").val(),
                    image: $("#product-image").text(),
                };
    
                $.ajax(`http://localhost:3000/products/${String(selectedProduct.id)}`, {
                    headers: {
                        "Content-Type": "application/json",
                    },
                    method: "PUT",
                    data: JSON.stringify(editedproduct)
                });
                closeModal();
                clearError();
            }
        } 
    })
})

function resetFormModal() {
    $("#productName").val("");
    $("#productPrice").val("");
    $("#productRate").val("");
    $("#productQuantity").val("");
    $("#productSale").val("7.5");
    $("#productInstall").val("");
    $("#product-image").text("");
}

function closeModal() {
    $("#modal").removeClass("active");
    resetFormModal()
    $("#btn-submit-form").text("Thêm mới")
    selectedProduct = null
}

function clearError() {
    $("#name-error").text("")
    $("#price-error").text("")
    $("#rate-error").text("")
    $("#quantity-error").text("")
    $("#install-error").text("")
    $("#image-error").text("")
}

function renderProducts(products) {
    $("#table").empty();
    for (let index = 0; index < products.length; index++) {
        $("#table").append(`
            <tr>
                <td>${products[index].id}</td>
                <td>${products[index].name}</td>
                <td>${products[index].price}</td>
                <td>${products[index].ratingStar}</td>
                <td>${products[index].quantity}</td>
                <td>${products[index].sale}</td>
                <td>${products[index].install}</td>
                <td>${products[index].image}</td>
                <td>
                    <button class="btn btn-edit-product" id="btn-edit-product">Sửa sp</button>
                </td>
                <td>
                    <button class="btn btn-delete-product" id="btn-delete-product">Xóa sp</button>
                </td>
            </tr>
        `);
    }
}

