const jobsList = document.getElementById('jobsList');
const emptyState = document.getElementById('emptyState');
const totalCountEl = document.getElementById('totalCount');
const interviewCountEl = document.getElementById('interviewCount');
const rejectedCountEl = document.getElementById('rejectedCount');
const jobsCountEl = document.getElementById('jobsCount');
const tabBtns = document.querySelectorAll('.tab-btn');

let currentTab = 'all';
const deleteIcon = '<svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><polyline points="3 6 5 6 21 6"/><path d="M19 6l-1 14a2 2 0 01-2 2H8a2 2 0 01-2-2L5 6"/><path d="M10 11v6"/><path d="M14 11v6"/><path d="M9 6V4a1 1 0 011-1h4a1 1 0 011 1v2"/></svg>';


function getStatusLabel(status) {
    if (status === 'interview') {
        return '<span>Interview</span>';
    }
    if (status === 'rejected') {
        return '<span>Rejected</span>';
    }
    return '<span>Not Applied</span>';
}
function createJobCard(job) {
    const card = document.createElement('div');
    card.setAttribute('data-id', job.id);

    card.innerHTML = `
        <div>
            <h3>${job.companyName}</h3>
            <button data-action="delete" data-id="${job.id}" title="Delete job">
                ${deleteIcon}
            </button>
        </div>
        <p>${job.position}</p>
        <p>${job.location} &bull; ${job.type} &bull; ${job.salary}</p>
        ${getStatusLabel(job.status)}
        <p>${job.description}</p>
        <div>
            <button class="btn--interview ${job.status === 'interview' ? 'active' : ''}" data-action="interview" data-id="${job.id}">Interview</button>
            <button class="btn--rejected ${job.status === 'rejected' ? 'active' : ''}" data-action="rejected" data-id="${job.id}">Rejected</button>
        </div>
    `;

    return card;
}
function getFilteredJobs() {
    if (currentTab === 'all') {
        return jobsData;
    }
    return jobsData.filter(function (job) {
        return job.status === currentTab;
    });
}
function renderJobs() {
    const filtered = getFilteredJobs();
    jobsList.innerHTML = '';

    if (filtered.length === 0) {
        jobsList.classList.add('hidden');
        emptyState.classList.remove('hidden');
        emptyState.classList.add('flex');
    } else {
        jobsList.classList.remove('hidden');
        emptyState.classList.add('hidden');
        emptyState.classList.remove('flex');
        filtered.forEach(function (job) {
            jobsList.appendChild(createJobCard(job));
        });
    }

    updateCounts();
}

function updateCounts() {
    const interviewJobs = jobsData.filter(function (j) {
        return j.status === 'interview';
    });
    const rejectedJobs = jobsData.filter(function (j) {
        return j.status === 'rejected';
    });
    totalCountEl.textContent = jobsData.length;
    interviewCountEl.textContent = interviewJobs.length;
    rejectedCountEl.textContent = rejectedJobs.length;
    const filtered = getFilteredJobs();
    jobsCountEl.textContent = filtered.length + ' Jobs';
}

