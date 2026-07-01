/**
 * Article reading progress & "mark as read" tracking (localStorage).
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

    function markArticleRead(articleId) {
        if (!articleId) return;
        const read = getReadArticles();
        if (!read.includes(articleId)) {
            read.push(articleId);
            localStorage.setItem(STORAGE_KEY, JSON.stringify(read));
        }
    }

    function isArticleRead(articleId) {
        return getReadArticles().includes(articleId);
    }

    function getArticleId() {
        return document.body.dataset.articleId ||
            window.location.pathname.split('/').pop().replace('.html', '');
    }

    function initProgressBar() {
        const progressRoot = document.querySelector('.article-reading-progress__bar');
        if (!progressRoot) return;

        function updateProgress() {
            const scrollTop = window.scrollY;
            const docHeight = document.documentElement.scrollHeight - window.innerHeight;
            const percent = docHeight > 0 ? Math.min(100, (scrollTop / docHeight) * 100) : 0;
            progressRoot.style.width = percent + '%';
        }

        window.addEventListener('scroll', updateProgress, { passive: true });
        updateProgress();
    }

    function applyReadState(finishSection, articleId) {
        finishSection.classList.add('is-read');
        const title = finishSection.querySelector('[data-finish-title]');
        if (title) {
            title.textContent = '✓ Has terminado de leer este artículo';
        }
    }

    function initReadTracking(articleId) {
        const finishSection = document.querySelector('.article-finish-section');
        if (!finishSection) return;

        if (isArticleRead(articleId)) {
            applyReadState(finishSection, articleId);
        }

        let marked = isArticleRead(articleId);

        function tryMarkRead() {
            if (marked) return;
            marked = true;
            markArticleRead(articleId);
            applyReadState(finishSection, articleId);
        }

        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting && entry.intersectionRatio >= 0.4) {
                        tryMarkRead();
                    }
                });
            },
            { threshold: [0.4, 0.6] }
        );

        observer.observe(finishSection);

        const finishBtn = finishSection.querySelector('[data-mark-read]');
        if (finishBtn) {
            finishBtn.addEventListener('click', tryMarkRead);
        }
    }

    document.addEventListener('DOMContentLoaded', function () {
        const articleId = getArticleId();
        initProgressBar();
        initReadTracking(articleId);
    });

    window.CareconnectArticles = {
        getReadArticles,
        isArticleRead,
        markArticleRead
    };
})();
