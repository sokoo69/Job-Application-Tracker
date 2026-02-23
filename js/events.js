tabBtns.forEach(function (btn) {
    btn.addEventListener('click', function () {
        tabBtns.forEach(function (b) {
            b.classList.remove('active');
        });
        btn.classList.add('active');
        currentTab = btn.getAttribute('data-tab');
        renderJobs();
    });
});
jobsList.addEventListener('click', function (e) {
    const target = e.target.closest('[data-action]');
    if (!target) return;

    const action = target.getAttribute('data-action');
    const id = parseInt(target.getAttribute('data-id'));
    const job = jobsData.find(function (j) {
        return j.id === id;
    });
    if (!job) return;
    if (action === 'interview') {
        if (job.status === 'interview') {
            job.status = null;
        } else {
            job.status = 'interview';
        }
        renderJobs();
    }
    if (action === 'rejected') {
        if (job.status === 'rejected') {
            job.status = null;
        } else {
            job.status = 'rejected';
        }
        renderJobs();
    }
    if (action === 'delete') {
        const index = jobsData.findIndex(function (j) {
            return j.id === id;
        });
        if (index !== -1) {
            jobsData.splice(index, 1);
            renderJobs();
        }
    }
});
renderJobs();
