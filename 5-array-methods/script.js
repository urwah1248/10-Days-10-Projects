const list = document.getElementById('list')
const doubleBtn = document.getElementById('double')
const sortBtn = document.getElementById('sort')
const filterBtn = document.getElementById('filter')
const reduceBtn = document.getElementById('reduce')
const total = document.getElementById('total')
const addUser = document.getElementById('add-user')

let array = []

function generateUser(){
    fetch('https://randomuser.me/api/')
    .then(result => result.json())
    .then(data => {
        let user = data.results[0]
        array.push({name: `${user.name.title,user.name.first,user.name.last}`, wealth: Math.round(Math.random()*1000000)})  
        updateList()
    })
}
function updateList(){
    list.innerHTML = `<li id="first-line"><span>User</span><span>Wealth</span></li>`;
    array.forEach(user => {
        list.innerHTML += `<li><span>${user.name}</span><span>$${formatCurrency(user.wealth)}</span></li>`
    })
}
function doubleWealth(){
    array = array.map(user => {
        return { ...user, wealth: user.wealth * 2 }
    })
    updateList()
}
function sort(){
    array.sort((a,b) => b.wealth - a.wealth)
    updateList()
}
function filter(){
    array = array.filter(millionaire => millionaire.wealth>999999)
    updateList()
}
function reduce(){
    let totalWorth = 0;
    totalWorth = array.reduce(
        (acc, item) => (acc += item.wealth), 0
    );
    total.className = ""
    total.innerHTML = `Total Wealth of the users is $${formatCurrency(totalWorth)}`
}
function formatCurrency(num) {
    return (num).toFixed(2).replace(/\d(?=(\d{3})+\.)/g, '$&,');
}

doubleBtn.addEventListener('click', doubleWealth)
sortBtn.addEventListener('click', sort)
filterBtn.addEventListener('click', filter)
reduceBtn.addEventListener('click', reduce)
addUser.addEventListener('click', generateUser)
generateUser()
generateUser()
generateUser()
