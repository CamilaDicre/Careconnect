/**
 * Articles listing: topic styling, category filters, search, and pagination.
 */
(function () {
    document.addEventListener('DOMContentLoaded', init);

    function init() {
    const TOPICS = {
        diabetes: {
            label: 'Diabetes',
            icon: 'bi-droplet-half',
            color: '#2563eb',
            gradient: 'linear-gradient(135deg, #2563eb, #1d4ed8)',
            soft: '#eff6ff',
            border: '#93c5fd'
        },
        hypertension: {
            label: 'Blood Pressure',
            icon: 'bi-heart-pulse',
            color: '#dc2626',
            gradient: 'linear-gradient(135deg, #dc2626, #b91c1c)',
            soft: '#fef2f2',
            border: '#fca5a5'
        },
        medication: {
            label: 'Medications',
            icon: 'bi-capsule',
            color: '#7c3aed',
            gradient: 'linear-gradient(135deg, #7c3aed, #6d28d9)',
            soft: '#f5f3ff',
            border: '#c4b5fd'
        },
        exercise: {
            label: 'Exercise',
            icon: 'bi-person-walking',
            color: '#059669',
            gradient: 'linear-gradient(135deg, #059669, #047857)',
            soft: '#ecfdf5',
            border: '#6ee7b7'
        },
        nutrition: {
            label: 'Nutrition',
            icon: 'bi-egg-fried',
            color: '#d97706',
            gradient: 'linear-gradient(135deg, #d97706, #b45309)',
            soft: '#fffbeb',
            border: '#fcd34d'
        },
        caregiver: {
            label: 'Caregivers',
            icon: 'bi-person-heart',
            color: '#0891b2',
            gradient: 'linear-gradient(135deg, #0891b2, #0e7490)',
            soft: '#ecfeff',
            border: '#67e8f9'
        },
        heart: {
            label: 'Heart Health',
            icon: 'bi-heart-fill',
            color: '#e11d48',
            gradient: 'linear-gradient(135deg, #e11d48, #be123c)',
            soft: '#fff1f2',
            border: '#fda4af'
        },
        arthritis: {
            label: 'Arthritis',
            icon: 'bi-bandaid',
            color: '#9333ea',
            gradient: 'linear-gradient(135deg, #9333ea, #7e22ce)',
            soft: '#faf5ff',
            border: '#d8b4fe'
        },
        alzheimer: {
            label: 'Memory',
            icon: 'bi-lightbulb',
            color: '#4f46e5',
            gradient: 'linear-gradient(135deg, #4f46e5, #4338ca)',
            soft: '#eef2ff',
            border: '#a5b4fc'
        },
        osteoporosis: {
            label: 'Bone Health',
            icon: 'bi-shield-plus',
            color: '#64748b',
            gradient: 'linear-gradient(135deg, #64748b, #475569)',
            soft: '#f8fafc',
            border: '#cbd5e1'
        }
    };

    const searchInput = document.getElementById('searchInput');
    const searchBtn = document.getElementById('searchBtn');
    const categoryButtons = document.querySelectorAll('.category-btn');
    const articleItems = document.querySelectorAll('.article-item');
    const noResults = document.getElementById('noResults');
    const articlesContainer = document.getElementById('articlesContainer');
    const articleRows = document.querySelectorAll('#articlesContainer > .articles-row');
    const pageButtons = document.querySelectorAll('.page-number');
    const viewMoreBtn = document.getElementById('viewMoreBtn');
    const nextPageBtn = document.getElementById('nextPageBtn');
    const prevPageBtn = document.getElementById('prevPageBtn');

    if (!articlesContainer || !articleItems.length) return;

    let currentCategory = 'all';
    let currentSearch = '';
    let currentPage = 1;
    const totalPages = articleRows.length || 1;
    const isFiltered = () => currentCategory !== 'all' || currentSearch !== '';

    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            clearTimeout(timeout);
            timeout = setTimeout(() => func(...args), wait);
        };
    }

    function applyTopicStyles() {
        document.querySelectorAll('.article-card[data-topic]').forEach((card) => {
            const topic = card.dataset.topic;
            const config = TOPICS[topic];
            if (!config) return;

            card.style.setProperty('--topic-color', config.color);
            card.style.setProperty('--topic-gradient', config.gradient);
            card.style.setProperty('--topic-soft', config.soft);
            card.style.setProperty('--topic-border', config.border);

            const badge = card.querySelector('.article-category');
            if (badge && !badge.dataset.enhanced) {
                badge.dataset.enhanced = 'true';
                badge.innerHTML = `<i class="bi ${config.icon}"></i> ${config.label}`;
            }
        });
    }

    function getItemCategories(item) {
        return (item.getAttribute('data-categories') || '')
            .split(',')
            .map((value) => value.trim())
            .filter(Boolean);
    }

    function itemMatchesFilter(item) {
        const categories = getItemCategories(item);
        const title = item.querySelector('.article-title')?.textContent.toLowerCase() || '';
        const excerpt = item.querySelector('.article-excerpt')?.textContent.toLowerCase() || '';
        const content = `${title} ${excerpt}`;

        const matchesCategory =
            currentCategory === 'all' || categories.includes(currentCategory);
        const matchesSearch = currentSearch === '' || content.includes(currentSearch);

        return matchesCategory && matchesSearch;
    }

    function updatePaginationControls() {
        pageButtons.forEach((btn) => {
            const pageNum = parseInt(btn.dataset.page || btn.textContent, 10);
            btn.classList.toggle('active', pageNum === currentPage);
            btn.hidden = pageNum > totalPages;
        });

        if (prevPageBtn) {
            prevPageBtn.disabled = currentPage <= 1 || isFiltered();
        }
        if (nextPageBtn) {
            nextPageBtn.disabled = currentPage >= totalPages || isFiltered();
        }
        if (viewMoreBtn) {
            viewMoreBtn.disabled = currentPage >= totalPages || isFiltered();
        }
    }

    function showPage(pageNum) {
        currentPage = Math.max(1, Math.min(pageNum, totalPages));

        articleRows.forEach((row, index) => {
            row.style.display = index + 1 === currentPage ? 'flex' : 'none';
        });

        updatePaginationControls();
    }

    function filterArticles() {
        let visibleCount = 0;

        articleItems.forEach((item) => {
            const visible = itemMatchesFilter(item);
            item.style.display = visible ? '' : 'none';
            if (visible) visibleCount += 1;
        });

        if (visibleCount === 0) {
            noResults.style.display = 'block';
            articlesContainer.style.display = 'none';
        } else {
            noResults.style.display = 'none';
            articlesContainer.style.display = 'block';
        }

        if (isFiltered()) {
            articleRows.forEach((row) => {
                const hasVisible = Array.from(row.querySelectorAll('.article-item'))
                    .some((item) => item.style.display !== 'none');
                row.style.display = hasVisible ? 'flex' : 'none';
            });
        } else {
            showPage(currentPage);
        }

        updatePaginationControls();
    }

    function performSearch() {
        currentSearch = searchInput.value.toLowerCase().trim();
        filterArticles();
    }

    categoryButtons.forEach((button) => {
        button.addEventListener('click', function () {
            categoryButtons.forEach((btn) => btn.classList.remove('active'));
            this.classList.add('active');
            currentCategory = this.getAttribute('data-category') || 'all';
            filterArticles();
        });
    });

    if (searchInput) {
        searchInput.addEventListener('input', debounce(performSearch, 300));
        searchInput.addEventListener('keypress', (event) => {
            if (event.key === 'Enter') performSearch();
        });
    }
    searchBtn?.addEventListener('click', performSearch);

    pageButtons.forEach((button) => {
        button.addEventListener('click', () => {
            if (isFiltered()) return;
            const pageNum = parseInt(button.dataset.page || button.textContent, 10);
            showPage(pageNum);
            articlesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        });
    });

    viewMoreBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
            articlesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    nextPageBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage < totalPages) {
            showPage(currentPage + 1);
            articlesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    prevPageBtn?.addEventListener('click', (event) => {
        event.preventDefault();
        if (currentPage > 1) {
            showPage(currentPage - 1);
            articlesContainer.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });

    applyTopicStyles();
    showPage(1);
    filterArticles();
    }
})();
