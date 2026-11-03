/**
 * Wires every [data-tabs] block: each [role="tab"] button shows the panel named in aria-controls,
 * and the arrow keys move between tabs. Without the script every panel stays visible.
 */
export function initTabs(root: ParentNode = document) {
  root.querySelectorAll<HTMLElement>('[data-tabs]').forEach((group) => {
    const tabs = [...group.querySelectorAll<HTMLButtonElement>('[role="tab"]')];
    const select = (selected: HTMLButtonElement) => {
      tabs.forEach((tab) => {
        const on = tab === selected;
        tab.setAttribute('aria-selected', String(on));
        tab.tabIndex = on ? 0 : -1;
        const panel = document.getElementById(tab.getAttribute('aria-controls') ?? '');
        if (panel) panel.hidden = !on;
      });
    };
    tabs.forEach((tab, index) => {
      tab.addEventListener('click', () => select(tab));
      tab.addEventListener('keydown', (event) => {
        if (event.key !== 'ArrowRight' && event.key !== 'ArrowLeft') return;
        const next = tabs[(index + (event.key === 'ArrowRight' ? 1 : -1) + tabs.length) % tabs.length];
        select(next);
        next.focus();
      });
    });
    group.classList.add('is-tabbed');
    if (tabs[0]) select(tabs[0]);
  });
}
