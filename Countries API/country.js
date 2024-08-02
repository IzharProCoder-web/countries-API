"use strict";
const countryName = new URLSearchParams(window.location.search).get("name");
const flagsImage = document.querySelector(".country-details img");
const countryNameH1 = document.querySelector(".country-details h1");
const nativeName = document.querySelector(".native-name");
const population = document.querySelector(".population");
const region = document.querySelector(".region");
const subRegion = document.querySelector(".sub-region");
const capital = document.querySelector(".capital");
const topLevelDomain = document.querySelector(".top-level-domain");
const currency = document.querySelector(".currency");
const language = document.querySelector(".languages");
const borderCountries = document.querySelector(".border-countries");
const backButton = document.querySelector('.back-button')
const darkMode = document.querySelector(".dark-mode")
const body = document.querySelector("body")

fetch(`https://restcountries.com/v3.1/name/${countryName}?fullText=true`)
  .then((res) => res.json())
  .then(([country]) => {
    console.log(country);
    // console.log(Object.values(country.name.nativeName)[0].common)
    flagsImage.src = country.flags.svg;
    countryNameH1.innerText = country.name.common;
    population.innerText = country.population;
    region.innerText = country.region;
    subRegion.textContent = country.subregion;
    capital.textContent = country.capital;
    topLevelDomain.textContent = country.tld.join(" , ");
    if (country.currencies) {
      currency.innerText = Object.values(country.currencies)
        .map((currency) => currency.name)
        .join(" , ");
    }

    if (country.languages) {
      language.innerText = Object.values(country.languages).join(" , ");
    }
    if (country.name.nativeName) {
      nativeName.innerHTML = Object.values(country.name.nativeName)[0].common;
    } else {
      nativeName.innerText = country.name.common;
    }

    if (country.borders) {
      country.borders.forEach((border) => {
        fetch(`https://restcountries.com/v3.1/alpha/${border}`)
          .then((res) => res.json())
          .then(([borderCountry]) => {
            // console.log(borderCountry);
            const borderCountryTag = document.createElement("a");
            borderCountryTag.innerText = borderCountry.name.common;
            borderCountryTag.href = `country.html?name=${borderCountry.name.common}`;
            console.log(borderCountryTag);
            borderCountries.append(borderCountryTag)
          });
      });
    }
  });

  
darkMode.addEventListener('click', () => {
  body.classList.toggle('dark');
})

