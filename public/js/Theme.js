'use strict';

// G4Theme: tiny global light/dark/system theme toggle used site-wide.
// Sets documentElement.dataset.theme to match Root.css's
// :root[data-theme='light'|'dark'] rules (absent = follow prefers-color-scheme).
window.G4Theme = {
    KEY: 'g4_appearance', // distinct from Room.js's 'theme' key (in-room color presets) — do not touch that one.
    MODES: ['system', 'light', 'dark'],

    get() {
        try {
            const stored = localStorage.getItem(this.KEY);
            return this.MODES.includes(stored) ? stored : 'system';
        } catch (e) {
            return 'system';
        }
    },

    apply(mode) {
        if (mode === 'light' || mode === 'dark') {
            document.documentElement.dataset.theme = mode;
        } else {
            delete document.documentElement.dataset.theme;
        }
        this._updateToggles(mode);
    },

    set(mode) {
        if (!this.MODES.includes(mode)) mode = 'system';
        try {
            localStorage.setItem(this.KEY, mode);
        } catch (e) {
            // ignore (private mode / storage disabled)
        }
        this.apply(mode);
    },

    toggle() {
        const next = this.MODES[(this.MODES.indexOf(this.get()) + 1) % this.MODES.length];
        this.set(next);
    },

    _updateToggles(mode) {
        document.querySelectorAll('[data-theme-toggle]').forEach((el) => {
            el.setAttribute('aria-pressed', mode === 'dark');
            const icon = el.hasAttribute('data-theme-icon') ? el : el.querySelector('[data-theme-icon]');
            if (icon) icon.textContent = mode === 'light' ? '☀️' : mode === 'dark' ? '🌙' : '🖥️';
        });
    },

    init() {
        this.apply(this.get());

        document.addEventListener('click', (e) => {
            const toggle = e.target.closest('[data-theme-toggle]');
            if (toggle) this.toggle();
        });

        try {
            window.matchMedia('(prefers-color-scheme: light)').addEventListener('change', () => {
                if (this.get() === 'system') this.apply('system');
            });
        } catch (e) {
            // matchMedia/addEventListener not supported — ignore, system default still applies on load
        }
    },
};

document.addEventListener('DOMContentLoaded', () => window.G4Theme.init());
