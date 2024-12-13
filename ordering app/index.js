import { menuArray } from "/data.js"

const menuList = document.getElementById('menu-list')
const basketList = document.getElementById('basket-list')
const priceDisplay = document.getElementById('price-display')
const basket = document.getElementById('basket')
const moveToPayBtn = document.getElementById('move-to-pay-btn')
const cardSection = document.getElementById('card-section')
const closeCardSectionBtn = document.getElementById('close-card-section-btn')
const cardSubmitBtn = document.getElementById('card-submit-btn')
const nameOnCard = document.getElementById('name-on-card')
const cardNumber = document.getElementById('card-number')
const cvv = document.getElementById('cvv')
const basketItems = []
let totalPrice = 0
let isCardMenuActive = false

//<footer>
//<p class="footer-text">Thanks, James! Your order is on its way!</p>
//</footer>
document.addEventListener('click', function(e){
    if (e.target.dataset.type){
        handleAddButtonClick(e.target.dataset.type)
    }
    else if (e.target.dataset.remove) {
        handleRemoveButtonClick(e.target.dataset.remove)
    }
})

moveToPayBtn.addEventListener('click', function(){
    handleDisplayPay()
})

closeCardSectionBtn.addEventListener('click', function(){
    handleDisplayPay()
})

cardSubmitBtn.addEventListener('click', function(){
    if(nameOnCard.value && cardNumber.value && cvv.value){
    let name = nameOnCard.value
    console.log(name)
    basket.innerHTML = `<footer>
<p class="footer-text">Thanks, ${name}! Your order is on its way!</p>
</footer>`
handleDisplayPay()}
})

function handleAddButtonClick(id) {
        handleBasketDisplay()
    
        if (!basketItems.filter(function(e){
            return e.name === menuArray[id].name
        })[0]) {
        basketItems.push({name:menuArray[id].name, price:menuArray[id].price, amount:1})
        }
        else {
            basketItems.forEach((item)=>{
                if (item.name === menuArray[id].name) item.amount++
            })
        }
        totalPrice += menuArray[id].price
        renderBasket()
    }
       

function handleRemoveButtonClick(name) {
    if (!isCardMenuActive){
    for (let i=0;i<basketItems.length;i++){
        if(basketItems[i].name === name){
            totalPrice = totalPrice - basketItems[i].price
            if(basketItems[i].amount>1){
                basketItems[i].amount--
            }
            else {
                basketItems.splice(i,1)
            }
        }
    }
    handleBasketDisplay()
    renderBasket()
}
}

function handleBasketDisplay(){
    if (basketItems[0]) {
        basket.style.display = 'block'
    }
    else {
        basket.style.display = 'none'
    }
}

function renderBasket(){
    let basketHtml = ``
     basketItems.forEach(function(item){
            let amountString = ``
               if (item.amount > 1)  amountString  = `X ${item.amount}`
                basketHtml+=`<div class="basket-item">
              <h4>${item.name} ${amountString}</h4>
              <button class="remove-button" data-remove=${item.name}>remove</button>
              <p class="menu-item-price">$${item.price*item.amount}</p>
            </div>`
        })

        if (basketItems[0]) {
            basket.style.display = 'block'
        }
        basketList.innerHTML = basketHtml
        priceDisplay.innerHTML = `$${totalPrice}`
}

function handleDisplayPay(){
    if (isCardMenuActive){
        cardSection.style.display = 'none' 
    }
    else {
        cardSection.style.display = 'block'
    }
    isCardMenuActive = !isCardMenuActive
}
function renderMenu() {
    let menuHtml = ``
    menuArray.forEach(function(item){
        menuHtml += `
        <div class="menu-list">
          <div class="menu-item">
            <div class="food-icon">${item.emoji}</div>
            <div class="food-description">
              <h2>${item.name}</h2>
              <p class="food-ingrediant">${item.ingredients}</p>
              <p class="menu-item-price">$${item.price}</p>
            </div>
            <button class="order-button" data-type="${item.id}">+</button>
          </div>
        `
    })
    menuList.innerHTML = menuHtml
}

renderMenu()