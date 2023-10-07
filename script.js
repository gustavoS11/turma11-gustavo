import { data } from "./ecommerce/database.js"

const btns = document.querySelectorAll("button")
btns.forEach((btn)=>{
    btn.addEventListener("click",()=>{
        separaCategorias(btn.innerText)
    })
})

function separaCategorias(categoria) {
    if(categoria != "Todos"){
        const filterArray = data.filter((item)=>{
            return item.tag[0] == categoria
        })
        renderProducts(filterArray)
    }else{
        renderProducts(data)
    }
}

function renderProducts (list = []) {
    const ul = document.querySelector("#products")
    ul.innerHTML = ""
    list.forEach((item) => {
        ul.insertAdjacentHTML("beforeend", `
            <li>
                <img id="li-img"src="${item.img}">
                <p id="p-tag">${item.tag}</p>
                <h3 id="h3-nameItem">${item.nameItem}</h5>
                <p id="p-description">${item.description}</p>
                <p id="p-value">R$ ${item.value}</p>
                <button id=${item.id} class="btn-add">Adicionar</button>
            </li>
        `)
    })
}
renderProducts(data)
const btnAdd = document.querySelectorAll(".btn-add")
btnAdd.forEach((item)=>{
    item.addEventListener("click", () => {
        for(let i = 1;i<7;i++) {
            if (item.id == i) {
                addToCart(i)
            }
            else {
                
            }
        }
    })
})

let cartList = []
function addToCart(item){
    let varItem = data.find((produto)=>{
        return produto.id = item
    })
    console.log(data)
    const newItem = {...varItem}
    if(cartList.length==0){
        varItem.id = 1
    }else{
        varItem.id = parseInt(cartList[cartList.length-1].id) +1
    }

    cartList.push(varItem)
    const jsonCart = JSON.stringify(cartList)
    localStorage.setItem("@cart-local",jsonCart)
    renderCart(cartList)
}
function renderCart(list=[]){
    const ulCart = document.querySelector("#cart")
    ulCart.innerHTML = ""
    list.forEach((item)=>{
        ulCart.insertAdjacentHTML("afterbegin",`
            <li>
                <img id="li-img"src="${item.img}">
                <div>
                <h3 id="h5-nameItem">${item.nameItem}</h5>
                <p id="p-value">R$ ${item.value}</p>
                <button class="btn-remove">Remover produto</button>
                </div>
            </li>
    `)
    const btnRemove = document.querySelector(".btn-remove")
    btnRemove.addEventListener("click",()=>{
        removeToCart(item)
    })
    })
}
function removeToCart(item){
    const index = cartList.findIndex((cart)=>cart.id == item.id)
        cartList.splice(index,1)
        const jsonCart = JSON.stringify(cartList)
        localStorage.setItem("@cart-local",jsonCart)
    renderCart(cartList)
}

const localCart = localStorage.getItem("@cart-local")
if(localCart){
    const objCartLocal = JSON.parse(localCart)
    cartList = objCartLocal
    renderCart(cartList)
}

const input = document.querySelector("input")
input.addEventListener("input",(event)=>{
        const filter = data.filter((item)=>{
        return item.name.includes(event.target.value)
    })
    renderProducts(filter)
})
function quantity(){
}