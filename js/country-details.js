const apiUrl = "https://restcountries.com/v3.1/alpha";
const searchParams = new URLSearchParams(window.location.search);
const countryCode = searchParams.get('country');
const countryDetailsContainer = document.querySelector('.country-details');
const backBtn = document.querySelector('#back-btn');

let countryDetails = [];

function fetchCountryDetails() {
    if (!countryCode) {
        goBackToAllCountries();

        return;
    }

    fetch(`${apiUrl}/${countryCode}`)
    .then(res => res.json())
    .then(data => {
        countryDetails = data.map(country => {
            return {
                name: country.name.common,
                nativeName: Object.values(country.name.nativeName)[0].official,
                population: country.population.toLocaleString(),
                region: country.region,
                subRegion: country.subregion,
                capital: country.capital && country.capital[0],
                img: country.flags.png,
                imgAlt: country.flags.alt,
                code: country.cca3,
                topLevelDomain: country.tld && country.tld[0],
                currencies: Object.values(country.currencies).map(currency => currency.name).join(", "),
                languages: Object.values(country.languages).join(", "),
                borders: country.borders,
            }
        })
        fillCountryDetails(countryDetails[0]);
    })
    .catch(() => {
        goBackToAllCountries();
    })
}

function fillCountryDetails(currentCountry) {
    countryDetailsContainer.innerHTML = `
        <div class="country-details__img-side">
            <img src="${currentCountry.img}" alt="${currentCountry.imgAlt}" class="country-details__img">
        </div>
        <div class="country-details__text-side">
            <h2 class="country-details__country-name">${currentCountry.name}</h2>
            <div class="country-details__main-text">
                <div class="country-details__main-text-box">
                    <p class="country-details__text-title">Native Name: <span class="country-details__text">${currentCountry.nativeName}</span></p>
                    <p class="country-details__text-title">Population: <span class="country-details__text">${currentCountry.population}</span></p>
                    <p class="country-details__text-title">Region: <span class="country-details__text">${currentCountry.region}</span></p>
                    <p class="country-details__text-title">Sub Region: <span class="country-details__text">${currentCountry.subRegion}</span></p>
                    <p class="country-details__text-title">Capital: <span class="country-details__text">${currentCountry.capital}</span></p>
                </div>
                <div class="country-details__main-text-box">
                    <p class="country-details__text-title">Top Level Domain: <span class="country-details__text">${currentCountry.topLevelDomain}</span></p>
                    <p class="country-details__text-title">Currencies: <span class="country-details__text">${currentCountry.currencies}</span></p>
                    <p class="country-details__text-title">Languages: <span class="country-details__text">${currentCountry.languages}</span></p>
                </div>
            </div>
            <div class="country-details__border">
                <h3 class="country-details__border-title">Border Countries:</h3>
                <div class="country-details__border-box"></div>
            </div>
        </div>`

    fillBorderCountries(currentCountry.borders);
}

function fillBorderCountries(borderCountries) {
    const borderCountriesContainer = document.querySelector('.country-details__border-box');

    if (!borderCountries) return;

    borderCountries.forEach(country => {
        const newBorderCountry = document.createElement('a');

        newBorderCountry.classList.add('country-details__border-text');
        newBorderCountry.setAttribute('href', `country-details.html?country=${country}`);
        newBorderCountry.textContent = country;

        borderCountriesContainer.appendChild(newBorderCountry);
    })
}

function goBackToAllCountries() {
    window.location.href = 'index.html';
}

backBtn.addEventListener('click', goBackToAllCountries);

fetchCountryDetails();