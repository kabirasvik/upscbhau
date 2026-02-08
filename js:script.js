// Theme Toggle
function toggleTheme() {
    const html = document.documentElement;
    const next = html.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
    html.setAttribute('data-theme', next);
    localStorage.setItem('pib-theme', next);
}

// Load saved theme
(function () {
    const saved = localStorage.getItem('pib-theme');
    if (saved) document.documentElement.setAttribute('data-theme', saved);
})();

// Toggle Topic Card
function toggleCard(header) {
    const card = header.closest('.topic-card');
    const content = card.querySelector('.topic-content');

    if (card.classList.contains('open')) {
        content.style.maxHeight = null;
        card.classList.remove('open');
        card.querySelectorAll('.subtopic.open').forEach(sub => {
            sub.classList.remove('open');
            sub.querySelector('.subtopic-content').style.maxHeight = null;
        });
    } else {
        content.style.maxHeight = 'none';
        card.classList.add('open');
    }
}

// Toggle Subtopic
function toggleSubtopic(header) {
    const sub = header.closest('.subtopic');
    const content = sub.querySelector('.subtopic-content');

    if (sub.classList.contains('open')) {
        content.style.maxHeight = null;
        sub.classList.remove('open');
    } else {
        content.style.maxHeight = content.scrollHeight + 'px';
        sub.classList.add('open');
    }

    let parent = sub.closest('.topic-content');
    if (parent) {
        setTimeout(() => {
            parent.style.maxHeight = 'none';
        }, 10);
    }
}

// Expand/Collapse All
let allExpanded = false;
function toggleAll() {
    const cards = document.querySelectorAll('.topic-card');
    const btn = document.getElementById('expandAllBtn');

    allExpanded = !allExpanded;

    cards.forEach(card => {
        const content = card.querySelector('.topic-content');
        if (allExpanded) {
            card.classList.add('open');
            content.style.maxHeight = 'none';
        } else {
            card.classList.remove('open');
            content.style.maxHeight = null;
            card.querySelectorAll('.subtopic.open').forEach(sub => {
                sub.classList.remove('open');
                sub.querySelector('.subtopic-content').style.maxHeight = null;
            });
        }
    });

    btn.textContent = allExpanded ? 'Collapse All' : 'Expand All';
}

// Search
function searchTopics() {
    const query = document.getElementById('searchInput').value.toLowerCase().trim();
    const cards = document.querySelectorAll('.topic-card');

    cards.forEach(card => {
        const text = card.textContent.toLowerCase();
        if (query === '' || text.includes(query)) {
            card.classList.remove('hidden');
            card.style.display = '';
        } else {
            card.classList.add('hidden');
            card.style.display = 'none';
        }
    });
}