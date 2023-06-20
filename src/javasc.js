import {JobSearch} from './JobSearch';

const jobSearch = new JobSearch('#Search-form', '.result-container', '.loading-element', '#location','.NotSupported');
// jobSearch.setCountryCode();
// jobSearch.configureFormListener();

strt.addEventListener("click",() => {
    jobSearch.setCountryCode();
    jobSearch.configureFormListener();
});