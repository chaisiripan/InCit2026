/**
 * Visitor Counter - Session-based counter using localStorage
 * Increments count once per browser session (open/close = 1 visit)
 * Auto-hides when scrolling to avoid blocking content
 */
(function () {
    'use strict';

    var STORAGE_KEY = 'incit2026_visitor_count';
    var SESSION_KEY = 'incit2026_session_active';
    var MIN_DIGITS = 6;
    var scrollTimer = null;

    function getCount() {
        var stored = localStorage.getItem(STORAGE_KEY);
        return stored ? parseInt(stored, 10) : 0;
    }

    function incrementIfNewSession() {
        if (!sessionStorage.getItem(SESSION_KEY)) {
            var newCount = getCount() + 1;
            localStorage.setItem(STORAGE_KEY, newCount.toString());
            sessionStorage.setItem(SESSION_KEY, '1');
            return { count: newCount, isNew: true };
        }
        return { count: getCount(), isNew: false };
    }

    function padDigits(num, minLength) {
        return num.toString().padStart(minLength, '0');
    }

    function createCounterElement(count, isNewSession) {
        var counter = document.createElement('div');
        counter.className = 'visitor-counter';
        counter.id = 'visitorCounter';
        counter.setAttribute('aria-label', 'Visitor count: ' + count);

        var digits = padDigits(count, MIN_DIGITS);

        counter.innerHTML =
            '<div class="visitor-counter__icon">' +
            '    <i class="fas fa-eye"></i>' +
            '</div>' +
            '<div class="visitor-counter__content">' +
            '    <span class="visitor-counter__label">Visitors</span>' +
            '    <div class="visitor-counter__digits" id="counterDigits">' +
            digits.split('').map(function (d, i) {
                var delay = (i * 0.06 + 0.2).toFixed(2);
                var extraClass = isNewSession ? ' visitor-counter__digit--bump' : '';
                return '<span class="visitor-counter__digit' + extraClass + '" style="animation-delay:' + delay + 's">' + d + '</span>';
            }).join('') +
            '    </div>' +
            '</div>' +
            '<span class="visitor-counter__live-dot" title="Active"></span>';

        return counter;
    }

    function setupScrollHide(counter) {
        window.addEventListener('scroll', function () {
            counter.classList.add('is-scrolling');
            if (scrollTimer) clearTimeout(scrollTimer);
            scrollTimer = setTimeout(function () {
                counter.classList.remove('is-scrolling');
            }, 1000);
        }, { passive: true });
    }

    function init() {
        var result = incrementIfNewSession();
        var counter = createCounterElement(result.count, result.isNew);
        document.body.appendChild(counter);
        setupScrollHide(counter);
    }

    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
})();
