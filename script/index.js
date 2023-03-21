
const productsList = document.getElementById('products-list');

function productCardList(productFilterCard){
    productsList.innerHTML = '';

    productFilterCard.forEach(data => {
        const produtoCard = document.createElement('li');
        produtoCard.classList.add('product-card');
    
        const tagAcesserios = document.createElement('p');
        tagAcesserios.textContent = data.tag;
        tagAcesserios.classList.add('tag');
    
        const titulo = document.createElement('h2');
        titulo.textContent = data.nameItem;
    
        const imagem = document.createElement('img');
        imagem.src = data.img;
        
        const description = document.createElement('p');
        description.textContent = data.description;
    
        const preco = document.createElement('span');
        preco.textContent = `R$ ${data.value.toFixed(2)}`;
    
        const buttonAdd = document.createElement('button');
        buttonAdd.textContent = 'Adicionar ao carrinho';
        buttonAdd.addEventListener('click', function() {
            adicionarAoCarrinho(data);
        }); 
    
        produtoCard.appendChild(imagem);
        produtoCard.appendChild(tagAcesserios);
        produtoCard.appendChild(titulo);
        produtoCard.appendChild(description);
        produtoCard.appendChild(preco);
        produtoCard.appendChild(buttonAdd);
    
        productsList.appendChild(produtoCard);
    
    });
}


const cartList = document.querySelector('.cart-list');
const emptyList = document.querySelector('.cart-empty');
const totalDisplay = document.querySelector('#total');

let cartItems = [];
let total = 0;

function renderCartProduct(){
    cartList.innerHTML = '';
    totalDisplay.textContent = `Total: R$ ${total.toFixed(2)}`;
    if(cartItems.length === 0){
        emptyList.style.display = 'flex';
        cartList.style.display = 'none';
    }else{
        emptyList.style.display = 'none';
        cartList.style.display = 'flex';
    }
    cartItems.forEach(item => {
        const cartItems = document.createElement('li');
        cartItems.classList.add('cart-item');

        const imgProduct = document.createElement('img');
        imgProduct.src = item.img;
        imgProduct.classList.add('imgProduct');

        const title = document.createElement('h2');
        title.textContent = item.nameItem;
        title.classList.add('title');

        const price = document.createElement('span');
        price.textContent = `R$ ${item.value.toFixed(2)}`;
        price.classList.add('price');

        const removeButton = document.createElement('button');
        removeButton.textContent = 'Remove produto';
        removeButton.classList.add('buttonRemove')
        removeButton.addEventListener('click', () => {
            removeDoCarrinho(item);

        });
        cartItems.appendChild(imgProduct)
        cartItems.appendChild(title);
        cartItems.appendChild(price);
        cartItems.appendChild(removeButton);
        cartList.appendChild(cartItems);
    });
    
}


let contador = 0;
const spanValue = document.querySelector('#contador');
console.log(spanValue);
function adicionarAoCarrinho(item){
    contador++;
    spanValue.innerHTML = contador;

    console.log(contador);
    cartItems.push(item);
    total += item.value;
    renderCartProduct();
}

function removeDoCarrinho(item){
    contador--;
    spanValue.innerHTML = contador;
    const index = cartItems.indexOf(item);
    if(index !== -1){
        cartItems.splice(index, 1);
        total -= item.value;
        renderCartProduct();
    }
}


const buttonsFilter = document.querySelectorAll('.buttonsFilter');

console.log(buttonsFilter);

function filterProducts(nameTag){
    if(nameTag === 'Acessórios'){
        return data;
    }

    let userFiltered = [];

    for(let i = 0; i < data.length; i++){
        if(data[i].tag === nameTag){
            userFiltered.push(data[i]);
            console.log(userFiltered);
        }
    }

    return userFiltered;
}


let productFilter = [];

for(let i = 0; i < buttonsFilter.length; i++){
    buttonsFilter[i].addEventListener('click', function() {
        const tagCategoria = buttonsFilter[i].innerText;
        productFilter = [];
        console.log(tagCategoria);
        for(let i = 0; i < data.length; i++){
            if(tagCategoria === 'Todos'){
                productFilter.push(data[i]);
                console.log(data);
            }
            if(data[i].tag[0] === tagCategoria){
                productFilter.push(data[i]);
            }
        }
        console.log(productFilter);
        productCardList(productFilter);
    });
};


const inputSearch = document.querySelector('.search-input');
const cards = document.querySelectorAll('.product-card');

inputSearch.addEventListener('input', filterCards);

function filterCards(){
   if(inputSearch.value !== ''){
    for(let card of cards){
        let title = card.querySelector('h2');
        title = title.textContent.toLowerCase();
        let filterText = inputSearch.value.toLowerCase();
        if(!title.includes(filterText)){

            card.style.display = 'none';
        }else{
            card.style.display = 'block';
        }
    }   
   }else{
    for(let card of cards){
        card.style.display = 'block';
    }
   }
}



