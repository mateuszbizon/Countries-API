const apiUrl = "https://restcountries.com/v3.1/all";
const countriesContainer = document.querySelector('.main');
const inputFilter = document.querySelector('#input-filter');
const selectFilter = document.querySelector('#select-filter');

let countries = [];
let filteredByRegionCountries = [];
let filteredByNameCountries = [];

function fetchCountriesData() {
    fetch(apiUrl)
    .then(res => res.json())
    .then(data => {
        countries = data.map(country => {
            return {
                name: country.name.common,
                population: country.population.toLocaleString(),
                region: country.region,
                capital: country.capital && country.capital[0],
                img: country.flags.png,
                imgAlt: country.flags.alt,
                code: country.cca3,
            }
        })
        fillAllCountries(countries);
        // console.log(data);
        // console.log(countries[0]);
        // console.log(countries);
    })
}

function fillAllCountries(countries) {
    countriesContainer.textContent = "";

    countries.forEach(country => {
        const newCountry = document.createElement('div');
        newCountry.setAttribute('onClick', `showCountryDetails("${country.code}")`);
        newCountry.classList.add('main__country');

        newCountry.innerHTML = `
            <img src="${country.img}" alt="${country.imgAlt}" class="main__country-img">
            <div class="main__country-body">
                <h2 class="main__country-name">${country.name}</h2>
                <div class="main__country-text-side">
                    <p class="main__country-text-title">Population: <span class="main__country-text population">${country.population}</span></p>
                    <p class="main__country-text-title">Region: <span class="main__country-text region">${country.region}</span></p>
                    <p class="main__country-text-title">Capital: <span class="main__country-text capital">${country.capital}</span></p>
                </div>
            </div>`

        countriesContainer.appendChild(newCountry);
    })
}

function showCountryDetails(countryCode) {
    window.location.href= `country-details.html?country=${countryCode}`
}

function setDefaultSelectValue() {
    selectFilter.selectedIndex = 0;
}

function filterByName(inputValue) {
    if (filteredByRegionCountries.length == 0) {
        filteredByNameCountries = countries.filter(country => country.name.toLowerCase().includes(inputValue.toLowerCase()));
    } else {
        filteredByNameCountries = filteredByRegionCountries.filter(country => country.name.toLowerCase().includes(inputValue.toLowerCase()));
    }

    fillAllCountries(filteredByNameCountries);
}

function filterByRegion(selectValue) {
    filteredByRegionCountries = countries.filter(country => country.region == selectValue);

    fillAllCountries(filteredByRegionCountries);
}

setDefaultSelectValue();

fetchCountriesData();

inputFilter.addEventListener('input', () => {
    filterByName(inputFilter.value);
})

selectFilter.addEventListener('change', () => {
    filterByRegion(selectFilter.value);
})