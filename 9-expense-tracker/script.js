const balance = document.getElementById('balance')
const money_plus = document.getElementById('income')
const money_minus = document.getElementById('expense')
const list = document.getElementById('transactions')
const title = document.getElementById('detail')
const amount = document.getElementById('amount')
const form = document.querySelector('form')

form.addEventListener('submit', e => {
    e.preventDefault()
    handleSubmit(title.value, amount.value, true)
})

const transactions = localStorage.getItem('transactions')

function updateLocalStorage(){
    localStorage.setItem('transactions', JSON.stringify(transactions))
}

function updateSums() {
    // Create array of transaction amounts from transactions array
    const amounts = transactions.map( transaction => transaction.amount );
    console.log(amounts);
    
    // Calculate total value for balance
    const total = amounts
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    
    // Calculate total income
    const income = amounts
                    .filter( amount => amount > 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);

    // Calculate total expense
    const expense = -amounts
                    .filter( amount => amount < 0 )
                    .reduce( (acc, amount) => ( acc += amount ), 0 )
                    .toFixed(2);
    
    // Update Balance in DOM
    balance.innerText = `$ ${total}`

    // Update Income in DOM
    money_plus.innerText = `$ ${income}`

    // Update Expense in DOM
    money_minus.innerText = `$ ${expense}`

    updateLocalStorage()
}

function init() {
    list.innerHTML = '';

    transactions.forEach(item => {
        handleSubmit(item.description, item.amount, false)
    });
    updateSums();
}
init() 
function handleSubmit(title, amount, newValue){
    if(amount==0){
        alert('Amount should be higher or lower than 0')
        return
    }
    else if(amount>0){
        addIncome(title, amount, newValue)
    }
    else if(amount<0){
        addExpense(title, amount, newValue)
    }
    form.reset()
}

function addIncome(title, value, newValue){
    list.innerHTML += `
         <li class="transaction income">
             <span>${title}</span>
             <span>${value}</span>
         </li>
    `;
    if(newValue){
        transactions.push({
            id:transactions.length +1,
            description: title,
            amount: value
        })
    }
    else{
        return
    }
    updateSums()
}
function addExpense(title, value, newValue){
    list.innerHTML += `
        <li class="transaction expense">
            <span>${title}</span>
            <span>${value}</span>
        </li>
    `
    if(newValue){
        transactions.push({
            id:transactions.length +1,
            description: title,
            amount: value
        })
    }
    updateSums()
}