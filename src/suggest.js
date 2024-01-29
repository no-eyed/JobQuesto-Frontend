import { Countries, JobLabel } from "./countriesandjobtags.js";

const countrySuggest = document.querySelector("#country-suggestions");
for (const loc of Countries) {
    countrySuggest.innerHTML += `<option value="${loc}">${loc}</options>`;
}

const categorySuggest = document.querySelector("#category-suggestions");
for(const label of JobLabel) {
    categorySuggest.innerHTML += `<option value="${label}">${label}</options>`;
}