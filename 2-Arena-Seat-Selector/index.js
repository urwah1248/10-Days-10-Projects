//Getting DOM Elements
const form = document.querySelector('form')
let seats = Array.prototype.slice.call(document.querySelectorAll('input[type=checkbox]:not(disabled)'))
let selectedSeats = document.getElementById('selected-seats')
let totalPrice = document.getElementById('total-price')
let selectedEvent = document.querySelector('select')
let ticketPrice = 0;

console.log(Array.prototype.slice.call(document.querySelectorAll('input[type=checkbox]')));

const changeEvent = () => {
    if(selectedEvent.value==1){
        ticketPrice = 10;
        
    } else if(selectedEvent.value==2){
        ticketPrice = 15;
    } else if(selectedEvent.value==3){
        ticketPrice = 20;
    }
}
const onInput = () =>{
    changeEvent();
    seats = Array.prototype.slice.call(document.querySelectorAll('input[type=checkbox]'))
    let realSeats = seats.filter(seat=>!seat.disabled).map(seat=> seat.checked);
    selectedSeats.innerText = realSeats.filter(seat => seat).length
    totalPrice.innerText = realSeats.filter(seat => seat).length * ticketPrice
}

form.addEventListener('input', onInput)

