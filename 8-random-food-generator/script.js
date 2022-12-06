const searchPage = document.getElementById('search-result')
const dishPage = document.getElementById('dish-page')
const searchInput = document.getElementById('search')
const searchBtn = document.getElementById('search-btn')
const randomBtn = document.getElementById('random-btn')
const form = document.querySelector('form')

form.addEventListener('submit', handleSubmit)

randomBtn.addEventListener('click', random)

searchPage.addEventListener('click', e => {
    const mealInfo = e.path.find( item => {
        if(item.classList) {
            return item.classList.contains('meal-info');
        } else {
            return false
        }
    });

    if(mealInfo) {
        const mealID = mealInfo.getAttribute('data-mealid');
        getMealById(mealID);
    }

});

function getMealById(id){
    searchPage.classList.add('hidden')
    console.log('called');

    fetch('https://www.themealdb.com/api/json/v1/1/lookup.php?i=52772')
    .then(result => result.json())
    .then(data => {
        console.log(data.meals[0]);
        
        let dish = data.meals[0];
        dishPage.innerHTML = `
            <h1>${dish.strMeal}</h1>
            <img class="dish-cover" src="${dish.strMealThumb}">
            
            <ul class="tags">
                <li>${dish.strArea}</li>
                <li>${dish.strCategory}</li>
            </ul>

            <p class="description">
                ${dish.strInstructions}
            </p>

            <ul class="ingredients">
                <h3>Ingredients</h3>
                <li>
                    <span>${dish.strIngredient1}</span>
                    <span>${dish.strMeasure1}</span>
                </li>
                <li>
                    <span>${dish.strIngredient2}</span>
                    <span>${dish.strMeasure2}</span>
                </li>
                <li>
                    <span>${dish.strIngredient3}</span>
                    <span>${dish.strMeasure3}</span>
                </li>
                <li>
                    <span>${dish.strIngredient4}</span>
                    <span>${dish.strMeasure4}</span>
                </li>
                <li>
                    <span>${dish.strIngredient5}</span>
                    <span>${dish.strMeasure5}</span>
                </li>
            </ul>`
    })
    dishPage.classList.remove('hidden')
}

function handleSubmit(e){
    e.preventDefault();
    search()
}

function search(){
    dishPage.classList.add('hidden')
    searchPage.innerHTML = ''

    const searchText = searchInput.value;
    if(searchText.trim()){
        fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText.replace(/\s+/g, '-')}`)
        .then(result => result.json())
        .then(data => {
            console.log(data.meals);
            searchPage.innerHTML = data.meals.map( meal => `
                <div class="dish">
                    <img src="${meal.strMealThumb}" alt="${meal.strMeal}" />
                    <div class="meal-info" data-mealID="${meal.idMeal}">
                        <h3>${meal.strMeal}</h3>
                    </div>
                </div>
        `)
        .join('')
        })
    }
    else{
        alert('Enter Valid Search term')
    }
    
        
    searchPage.classList.remove('hidden')
}

function random(){
    searchPage.classList.add('hidden')

    fetch('https://www.themealdb.com/api/json/v1/1/random.php')
    .then(result => result.json())
    .then(data => {
        console.log(data.meals[0]);
        
        let dish = data.meals[0];
        dishPage.innerHTML = `
            <h1>${dish.strMeal}</h1>
            <img class="dish-cover" src="${dish.strMealThumb}">
            
            <ul class="tags">
                <li>${dish.strArea}</li>
                <li>${dish.strCategory}</li>
            </ul>

            <p class="description">
                ${dish.strInstructions}
            </p>

            <ul class="ingredients">
                <h3>Ingredients</h3>
                <li>
                    <span>${dish.strIngredient1}</span>
                    <span>${dish.strMeasure1}</span>
                </li>
                <li>
                    <span>${dish.strIngredient2}</span>
                    <span>${dish.strMeasure2}</span>
                </li>
                <li>
                    <span>${dish.strIngredient3}</span>
                    <span>${dish.strMeasure3}</span>
                </li>
                <li>
                    <span>${dish.strIngredient4}</span>
                    <span>${dish.strMeasure4}</span>
                </li>
                <li>
                    <span>${dish.strIngredient5}</span>
                    <span>${dish.strMeasure5}</span>
                </li>
            </ul>`
    })
    dishPage.classList.remove('hidden')


}

