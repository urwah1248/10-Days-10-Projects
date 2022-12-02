const c1 = document.getElementById('c1')
const c2 = document.getElementById('c2')
const amount = document.getElementById('amount')
const result = document.getElementById('result')
const form = document.querySelector('form')
const rate = document.getElementById('rate')

function handleSubmit(e){
    e.preventDefault();
    swap();
}
function calculate(){
    fetch(`https://v6.exchangerate-api.com/v6/cfe1a6045a97105deac06d4f/pair/${c1.value}/${c2.value}`)
    .then(response => response.json())
    .then(data => {
        const exchangeRate = data.conversion_rate;
        rate.innerText = `1 ${c1.value} = ${exchangeRate.toFixed(2)} ${c2.value}`
        result.value = (amount.value * exchangeRate).toFixed(2);
    })
}
function swap(){
    const temp = c1.value;
    c1.value = c2.value;
    c2.value = temp;
    calculate();
}

calculate()


form.addEventListener('submit', handleSubmit)
form.addEventListener('input', calculate)
