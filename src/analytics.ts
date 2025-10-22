// src/analytics.ts
export const sendPageView = (url: string) => {
  window.gtag?.('event', 'page_view', {
    page_title: document.title,
    page_location: window.location.href,
    page_path: url,
  });
};
