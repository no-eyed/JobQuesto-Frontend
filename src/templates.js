export const jobTemplate = (job, currency) => `
<div class="card">
    <!-- <div class="card-body"> -->
    <h4 class="card-title">${job.title} up to ${currency} ${job.salary_max}</h4>
    <h5 class="card-subtitle">${job.location.display_name}</h5>
    <p class="card-text">${job.description}</p>
    <a class="job-link" href="${job.redirect_url}"><button class="view-job">View Job</button></a>
    <!-- </div> -->
</div>
`;