document.addEventListener('DOMContentLoaded', () => {
    const scheduleContainer = document.getElementById('schedule-container');
    const categoryFilter = document.getElementById('category-filter');

    // This eventSchedule will be injected by the build script
    // const eventSchedule = [...];

    function renderSchedule(scheduleData) {
        scheduleContainer.innerHTML = ''; // Clear previous schedule

        scheduleData.forEach(item => {
            if (item.type === 'talk') {
                const talkElement = document.createElement('div');
                talkElement.classList.add('talk');
                talkElement.innerHTML = `
                    <div class="talk-time">${item.time}</div>
                    <h3>${item.title}</h3>
                    <div class="talk-speakers">Speakers: ${item.speakers.join(', ')}</div>
                    <div class="talk-category">Categories: ${item.category.join(', ')}</div>
                    <div class="talk-description">${item.description}</div>
                `;
                scheduleContainer.appendChild(talkElement);
            } else if (item.type === 'break') {
                const breakElement = document.createElement('div');
                breakElement.classList.add('break');
                breakElement.innerHTML = `
                    <div class="break-time">${item.time}</div>
                    <h3>${item.title}</h3>
                `;
                scheduleContainer.appendChild(breakElement);
            }
        });
    }

    function populateCategories() {
        const allCategories = new Set();
        eventSchedule.forEach(item => {
            if (item.type === 'talk' && item.category) {
                item.category.forEach(cat => allCategories.add(cat));
            }
        });

        categoryFilter.innerHTML = '<option value="all">All Categories</option>'; // Reset
        allCategories.forEach(cat => {
            const option = document.createElement('option');
            option.value = cat;
            option.textContent = cat;
            categoryFilter.appendChild(option);
        });
    }

    function filterSchedule() {
        const selectedCategory = categoryFilter.value;
        if (selectedCategory === 'all') {
            renderSchedule(eventSchedule);
        } else {
            const filteredData = eventSchedule.filter(item => {
                return item.type === 'break' || (item.type === 'talk' && item.category.includes(selectedCategory));
            });
            renderSchedule(filteredData);
        }
    }

    // Initial render and setup
    if (typeof eventSchedule !== 'undefined' && eventSchedule.length > 0) {
        populateCategories();
        renderSchedule(eventSchedule);
    }

    categoryFilter.addEventListener('change', filterSchedule);
});
