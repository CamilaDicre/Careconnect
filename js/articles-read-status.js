/**
 * Applies "read" visual state to article cards on the listing page.
 */
(function () {
    const STORAGE_KEY = 'careconnect-read-articles';

    function getReadArticles() {
        try {
            return JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]');
        } catch {
            return [];
        }
    }

    function slugFromHref(href) {
        if (!href) return '';
        const parts = href.split('/');
        return parts[parts.length - 1].replace('.html', '');
    }

    document.addEventListener('DOMContentLoaded', function () {
        const readArticles = getReadArticles();

        document.querySelectorAll('.article-card').forEach(function (card) {
            const link = card.querySelector('.read-more-btn');
            if (!link) return;

            const articleId = card.dataset.articleId || slugFromHref(link.getAttribute('href'));
            if (!articleId || !readArticles.includes(articleId)) return;

            card.classList.add('is-read');

            const badge = document.createElement('span');
            badge.className = 'article-read-label';
            badge.innerHTML = '<i class="bi bi-check-circle-fill"></i> Leído';
            card.querySelector('.article-content')?.prepend(badge);

            link.textContent = '✓ Leído — Ver de nuevo';
            link.classList.add('read-more-btn--completed');
        });
    });
})();
