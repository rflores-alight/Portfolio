// src/analytics.ts
export const sendPageView = (url: string) => {
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: url,
  });
};

export const sendEvent = (name: string, params?: Record<string, unknown>) => {
  if (typeof window === 'undefined') return;
  if (typeof window.gtag === 'function') {
    window.gtag('event', name, params ?? {});
  } else if (Array.isArray(window.dataLayer)) {
    // queue like the GA snippet would
    // @ts-ignore
    window.dataLayer.push(['event', name, params ?? {}]);
  }
};