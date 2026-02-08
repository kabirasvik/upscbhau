/*
 * =============================================
 *  MONTH NAVIGATION — SINGLE SOURCE OF TRUTH
 *  Edit ONLY this file when adding new months
 * =============================================
 */

const monthsConfig = {
    2025: {
        jan: { status: 'disabled' },
        feb: { status: 'disabled' },
        mar: { status: 'disabled' },
        apr: { status: 'disabled' },
        may: { status: 'disabled' },
        jun: { status: 'disabled' },
        jul: { status: 'disabled' },
        aug: { status: 'disabled' },
        sep: { status: 'disabled' },
        oct: { status: 'disabled' },
        nov: { status: 'disabled' },
        dec: { status: 'live', file: 'december.html' }
    },
    2026: {
        jan: { status: 'live', file: 'january.html' },
        feb: { status: 'disabled' },
        mar: { status: 'disabled' },
        apr: { status: 'disabled' },
        may: { status: 'disabled' },
        jun: { status: 'disabled' },
        jul: { status: 'disabled' },
        aug: { status: 'disabled' },
        sep: { status: 'disabled' },
        oct: { status: 'disabled' },
        nov: { status: 'disabled' },
        dec: { status: 'disabled' }
    }
};

const monthNames = {
    jan: 'Jan', feb: 'Feb', mar: 'Mar', apr: 'Apr',
    may: 'May', jun: 'Jun', jul: 'Jul', aug: 'Aug',
    sep: 'Sep', oct: 'Oct', nov: 'Nov', dec: 'Dec'
};

// Detect current page
function getCurrentPage() {
    const path = window.location.pathname;
    const file = path.split('/').pop();
    return file || 'index.html';
}

// Find which year the current page belongs to
function getDefaultYear() {
    const current = getCurrentPage();
    const years = Object.keys(monthsConfig).sort();

    // Check if current page matches any month file
    for (const year of years) {
        for (const m in monthsConfig[year]) {
            if (monthsConfig[year][m].file === current) {
                return year;
            }
        }
    }

    // Default: latest year with a live/done month
    for (let i = years.length - 1; i >= 0; i--) {
        for (const m in monthsConfig[years[i]]) {
            const s = monthsConfig[years[i]][m].status;
            if (s === 'live' || s === 'done') return years[i];
        }
    }

    return years[years.length - 1];
}

// Build month navigation HTML
function buildMonthNav(containerId) {
    const container = document.getElementById(containerId);
    if (!container) return;

    const currentPage = getCurrentPage();
    const years = Object.keys(monthsConfig).sort();
    const defaultYear = getDefaultYear();

    let html = '<div class="month-nav-label">📅 Select Month</div>';

    // Year buttons
    html += '<div class="year-selector">';
    years.forEach(year => {
        const active = year === defaultYear ? ' active' : '';
        html += '<button class="year-btn' + active + '" onclick="switchYear(\'' + year + '\')">' + year + '</button>';
    });
    html += '</div>';

    // Month panels
    years.forEach(year => {
        const visible = year === defaultYear ? ' visible' : '';
        html += '<div class="year-panel' + visible + '" id="year-' + year + '"><div class="month-grid">';

        for (const key in monthsConfig[year]) {
            const m = monthsConfig[year][key];
            const isCurrent = (m.file === currentPage);

            if (m.status === 'disabled') {
                html += '<span class="month-btn disabled">';
                html += '<span class="m-name">' + monthNames[key] + '</span>';
                html += '<span class="m-status">Soon</span>';
                html += '</span>';
            } else {
                let cls = 'month-btn';
                let label = '';

                if (isCurrent) {
                    cls += ' active';
                    label = '● Live';
                } else {
                    cls += ' done';
                    label = '✓ Done';
                }

                html += '<a href="' + m.file + '" class="' + cls + '">';
                html += '<span class="m-name">' + monthNames[key] + '</span>';
                html += '<span class="m-status">' + label + '</span>';
                html += '</a>';
            }
        }

        html += '</div></div>';
    });

    container.innerHTML = html;
}

// Year switcher
function switchYear(year) {
    document.querySelectorAll('.year-panel').forEach(function (p) {
        p.classList.remove('visible');
    });
    document.querySelectorAll('.year-btn').forEach(function (b) {
        b.classList.remove('active');
    });
    document.getElementById('year-' + year).classList.add('visible');
    event.target.classList.add('active');
}

// Auto-build on page load
document.addEventListener('DOMContentLoaded', function () {
    buildMonthNav('monthNavContainer');
    buildMonthNav('pibMonthNav');
});