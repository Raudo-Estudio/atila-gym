declare global {
  interface Window {
    dataLayer?: unknown[];
  }
}

export type ClickEvent = 'whatsapp_click' | 'call_click' | 'directions_click';

export function eventForHref(href: string): ClickEvent | null {
  if (href.startsWith('https://wa.me/')) return 'whatsapp_click';
  if (href.startsWith('tel:')) return 'call_click';
  if (href.startsWith('https://www.google.com/maps/dir/')) return 'directions_click';
  return null;
}

// shortcut: only pushes to dataLayer; nothing reads it until GA4 or GTM is added to the head.
export function trackClicks() {
  document.addEventListener('click', (event) => {
    const link = event.target instanceof Element ? event.target.closest('a[href]') : null;
    const name = link && eventForHref(link.getAttribute('href') ?? '');
    if (!name) return;
    (window.dataLayer ??= []).push({ event: name, link_url: link.getAttribute('href') });
  });
}
