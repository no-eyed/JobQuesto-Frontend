// const { getCurrencySymbol, extractFormData} = require("./utils");
import { getCurrencySymbol, extractFormData} from "./utils";
import { jobTemplate } from "./templates";

const SupportedCountries = ["at", "au", "be", "br", "ca", "ch", "de", "es", "fr", "gb", "in", "it", "mx", "nl", "nz", "pl", "ru", "sg", "us", "za"];

export class JobSearch {
    constructor (
        searchFormSelector,
        resultsContainerSelector,
        loadingElementSelector,
        cityElementSelector,
        NotSupportedElementSelector
    ) {
        this.searchForm = document.querySelector(searchFormSelector);
        this.resultsContainer = document.querySelector(resultsContainerSelector);
        this.loadingElement = document.querySelector(loadingElementSelector);
        this.citySelector = document.querySelector(cityElementSelector);
        this.NotSupportedSelector = document.querySelector(NotSupportedElementSelector);
    }

    setCountryCode() {
        this.countryCodes = 'in';
        //this.setCurrencyCode();

        const city = this.citySelector.value;
        //const username = 'arjyo';

        const endpoint = `https://api.api-ninjas.com/v1/country?name=${city}`;
        const headers = {
            'X-Api-Key': '7UbqgI2qdeOQQB6stFq5bA==L7XPu56NDebo0R4u',
        };

        fetch(endpoint, {headers})
        .then(response => response.json())
        .then(data => {
            if(data && data.length > 0) {
                console.log(data);

                this.countryCodes = data[0].iso2.toLowerCase()
                console.log("setCountryCode wala", this.countryCodes);
                this.setCurrencyCode();
            }
        })
        .catch(error => {
            console.log(error);
        });

        // fetch(`http://api.geonames.org/searchJSON?q=${city}&maxRows=1&username=${username}`)
        //     .then(response => response.json())
        //     .then(data => {
        //         const result = data.geonames[0];
        //         this.countryCodes = result.countryCode.toLowerCase();
        //         this.setCurrencyCode();
        //     });
    }

    setCurrencyCode() {
        this.currencySymbol = getCurrencySymbol(this.countryCodes);
    }

    configureFormListener(){
        this.searchForm.addEventListener("submit",(e) =>{
            e.preventDefault();
            this.resultsContainer.innerHTML = "";
            const {search, location} = extractFormData(this.searchForm);
            
            this.setCountryCode();
            console.log(search,location,this.countryCodes);

            const endpoint = `https://api.api-ninjas.com/v1/country?name=${location}`;
            const headers = {
                'X-Api-Key': '7UbqgI2qdeOQQB6stFq5bA==L7XPu56NDebo0R4u',
            };

            fetch(endpoint, {headers})
            .then(response => response.json())
            .then(data => {
                if(data && data.length > 0) {
                    this.countryCodes = data[0].iso2.toLowerCase();
                    if(SupportedCountries.includes(this.countryCodes)) {
                        //this.setCurrencyCode();
                        this.NotSupportedSelector.style.display = "none";
                        

                        fetch(`https://troubled-outerwear-mite.cyclic.app/?search=${search}&location=${location}&country=${this.countryCodes}`).then(response=> response.json()).then(({results})=>{
                            return results.map(job => jobTemplate(job,this.currencySymbol)).join('');
                        })
                        .then(jobs => this.resultsContainer.innerHTML = jobs);
                    }
                    else {
                        this.NotSupportedSelector.innerHTML = "<p>No Jobs available in this region</p>"; 
                        this.NotSupportedSelector.style.display = "flex";

                        // this.NotSupportedSelector.appendChild(element);
                        console.log(this.NotSupportedSelector);
                    }
                    
                }
            })
            .catch(error => console.error(error));
    
        });
    }
}