import { getCurrencySymbol, extractFormData} from "./utils";
import { jobTemplate } from "./templates";
import { CountryMap, SupportedCountries, JobLabelTagMap } from "./countriesandjobtags";

export class JobSearch {
    constructor (
        searchFormSelector,
        resultsContainerSelector,
        loadingElementSelector,
        cityElementSelector,
        NotSupportedElementSelector,
        WrongInputElementSelector
    ) {
        this.searchForm = document.querySelector(searchFormSelector);
        this.resultsContainer = document.querySelector(resultsContainerSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
        this.citySelector = document.querySelector(cityElementSelector);
        this.NotSupportedSelector = document.querySelector(NotSupportedElementSelector);
        this.WrongInputSelector = document.querySelector(WrongInputElementSelector);
    }

    setCountryCode(country) {
        this.countryCodes = CountryMap[country];
        this.setCurrencyCode();
    }

    setCurrencyCode() {
        this.currencySymbol = getCurrencySymbol(this.countryCodes);
    }

    configureFormListener(){
        this.searchForm.addEventListener("submit",(e) =>{
            e.preventDefault();
            this.resultsContainer.innerHTML = "";
            const {search, category, location, country} = extractFormData(this.searchForm);
            
            this.setCountryCode(country);

            this.loadingElement.style.display = "flex";
            this.NotSupportedSelector.style.display = "none";

            this.jobCategory = JobLabelTagMap[category];
            if(this.jobCategory === undefined) {
                this.WrongInputSelector.style.display = "flex";
                return;
            }
            
            const city = this.citySelector.value;

            const endpoint = `https://api.api-ninjas.com/v1/country?name=${city}`;
            const headers = {
                'X-Api-Key': '7UbqgI2qdeOQQB6stFq5bA==L7XPu56NDebo0R4u',
            };
            
            
            fetch(endpoint, {headers})
            .then(response => response.json())
            .then(data => {
                if(data && data.length > 0) {
                    let locationCountryCode = data[0].iso2.toLowerCase();
                    if(locationCountryCode === this.countryCodes && SupportedCountries.includes(locationCountryCode)) {

                        fetch(`https://troubled-outerwear-mite.cyclic.app/?search=${search}&location=${location}&country=${this.countryCodes}&category=${this.jobCategory}`)
                        .then(response => response.json())
                        .then(({results}) => {
                            if (results.length === 0) {
                                this.NotSupportedSelector.style.display = "flex";
                            }
                            return results.map(job => jobTemplate(job,this.currencySymbol)).join('');
                        })                     
                        .then(jobs => this.resultsContainer.innerHTML = jobs);
                    }
                    else if(locationCountryCode != this.countryCodes) {
                        this.WrongInputSelector.style.display = "flex";
                    }
                    else {
                        this.NotSupportedSelector.style.display = "flex";
                    }    
               }
               else {

               }
            })
            .catch(error => console.error(error))
            .finally(() => {
                this.loadingElement.style.display = "none";
            });
    
        });
    }
}