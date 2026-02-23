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
        return '<span class="inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-green-100 text-green-700">Interview</span>';
    }
    if (status === 'rejected') {
        return '<span class="inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-red-100 text-red-700">Rejected</span>';
    }
    return '<span class="inline-block mt-2 px-2.5 py-0.5 rounded text-[11px] font-bold uppercase tracking-wide bg-[#EEF4FF] text-[#2563EB]">Not Applied</span>';
}
function createJobCard(job) {
    const card = document.createElement('div');
    card.className = 'bg-white border border-gray-200 rounded-lg p-5';
    card.setAttribute('data-id', job.id);

    card.innerHTML = `
        <div class="flex justify-between items-start">
            <h3 class="text-[16px] font-bold text-[#1E1E1E]">${job.companyName}</h3>
            <button class="text-gray-400 hover:text-red-500 transition p-0.5 cursor-pointer" data-action="delete" data-id="${job.id}" title="Delete job">
                ${deleteIcon}
            </button>
        </div>
        <p class="text-[14px] font-medium text-[#4B5563] mt-0.5">${job.position}</p>
        <p class="text-[14px] text-[#9CA3AF] mt-2">${job.location} &bull; ${job.type} &bull; ${job.salary}</p>
        ${getStatusLabel(job.status)}
        <p class="text-[14px] text-[#4B5563] opacity-80 leading-relaxed mt-2.5">${job.description}</p>
        <div class="flex gap-2 mt-3.5">
            <button class="btn--interview px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide bg-green-500 text-white hover:bg-green-600 transition cursor-pointer ${job.status === 'interview' ? 'active' : ''}" data-action="interview" data-id="${job.id}">Interview</button>
            <button class="btn--rejected px-4 py-1.5 rounded-md text-xs font-bold uppercase tracking-wide bg-red-500 text-white hover:bg-red-600 transition cursor-pointer ${job.status === 'rejected' ? 'active' : ''}" data-action="rejected" data-id="${job.id}">Rejected</button>
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

