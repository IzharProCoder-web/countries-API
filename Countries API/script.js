"use strict";
const countriesContainer = document.querySelector(".countries-container");
const filterByRegion = document.querySelector(".filter-by-region");
const searchContainer = document.querySelector(".search-container input");
const darkMode = document.querySelector(".dark-mode")
const body = document.querySelector("body")


let allCountriesData;

fetch("https://restcountries.com/v3.1/all")
  .then((res) => res.json())
  .then((data) => {
    rendercountries(data);
    allCountriesData = data;
  });

filterByRegion.addEventListener("change", (e) => {
  fetch(`https://restcountries.com/v3.1/region/${filterByRegion.value}`)
    .then((res) => res.json())
    .then((data) => {
      rendercountries(data);
    });
});

function rendercountries(data) {
  countriesContainer.innerHTML = "";
  data.forEach((country) => {
    // console.log(country.flags.svg);

    const countryCard = document.createElement("a");
    countryCard.classList.add("country-card");
    countryCard.href = `/country.html?name=${country.name.common}`;
    const cardHtml = `  <img src="${country.flags.svg}" alt="${country.name.common}" />
        <div class="card-text">
          <h3 class="card-header">${country.name.common}</h3>
          <p><b>population: </b>${country.population}</p>
          <p><b>region: </b>${country.region}</p>
          <p><b>capital: </b>${country.capital}</p>`;

    countryCard.innerHTML = cardHtml;

    countriesContainer.append(countryCard);
  });
}

searchContainer.addEventListener("input", (e) => {
  const searchTerm = e.target.value.toLowerCase();
  const filteredCountry = allCountriesData.filter((country) => 
    country.name.common.toLowerCase().includes(searchTerm) 
  );
  rendercountries(filteredCountry)
});


darkMode.addEventListener('click', () => {
  body.classList.toggle('dark');
})