const totalNoOfCountries = document.getElementById("desc");
const btnSearchByStartingWord = document.getElementById("btn-starting-word");
const btnSearchByAnyWord = document.getElementById("btn-any-word");
const btnSort = document.getElementById("btn-sort");
const countriesSec = document.getElementById("countries-sec");
const searchInput = document.getElementById("search-input");
const filterResult = document.getElementById("result");
let countries = [];
let isSorted = false;
let currentFilter = "";
let filteredCountries = [];

fetch("https://restcountries.com/v3.1/all")
  .then((response) => response.json())
  .then((data) => {
    countries = data;
    displayCountries(countries);
    numberOfCountries(data);
    btnSort.addEventListener("click", () => sortFunc(data));
  });

const numberOfCountries = (data) => {
  totalNoOfCountries.innerText = `Total Number of countries : ${data.length}`;
};
const displayCountries = (data) => {
  countriesSec.innerHTML = "";
  data.map((data) => {
    const countryContainer = document.createElement("div");
    countryContainer.className = "country-container";
    const countryName = document.createElement("p");
    countryName.className = "country-name";
    countryName.innerText = data.name.common;
    countryContainer.appendChild(countryName);
    countriesSec.appendChild(countryContainer);
  });
};

const sortFunc = (data) => {
  if (isSorted) {
    data.sort((a, b) => b.name.common.localeCompare(a.name.common));
  } else {
    data.sort((a, b) => a.name.common.localeCompare(b.name.common));
  }
  isSorted = !isSorted;
  countriesSec.innerHTML = "";
  displayCountries(data);
};

btnSearchByStartingWord.addEventListener("click", () => {
  if (currentFilter !== "starting") {
    currentFilter = "starting";
    btnSearchByStartingWord.classList.add("active");
    btnSearchByAnyWord.classList.remove("active");
    console.log(currentFilter);
  }
});
btnSearchByAnyWord.addEventListener("click", () => {
  if (currentFilter !== "any") {
    currentFilter = "any";
    btnSearchByAnyWord.classList.add("active");
    btnSearchByStartingWord.classList.remove("active");
    console.log(currentFilter);
  }
});

searchInput.addEventListener("input", () => {
  handleFilteredCountries();
});

const handleFilteredCountries = () => {
  const searchText = searchInput.value.trim().toLowerCase();
  countries.filter((country) => {
    if (currentFilter === "starting") {
      filteredCountries = countries.filter((country) =>
        country.name.common.trim().toLowerCase().startsWith(searchText)
      );
      return filteredCountries;
    } else if (currentFilter === "any") {
      filteredCountries = countries.filter((country) =>
        country.name.common.trim().toLowerCase().includes(searchText)
      );
      return filteredCountries;
    }
  });
  if (currentFilter === "starting") {
    filterResult.innerText = `The countries name starts with ${searchText} : ${filteredCountries.length}`;
  } else if (currentFilter === "any") {
    filterResult.innerText = `The countries name includes ${searchText} : ${filteredCountries.length}`;
  }
  displayCountries(filteredCountries);
};
