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