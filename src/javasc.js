import {JobSearch} from './JobSearch';

const jobSearch = new JobSearch('#Search-form', '.result-container', '.loading-element', '#location','.not-supported', '.wrong-input');

strt.addEventListener("click",() => {
    jobSearch.setCountryCode();
    jobSearch.configureFormListener();
});