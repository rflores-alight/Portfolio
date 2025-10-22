// src/RouteChangeTracker.tsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { sendPageView } from './analytics';

export default function RouteChangeTracker() {
  const { pathname, search } = useLocation();

  useEffect(() => {
    sendPageView(`${pathname}${search}`);
  }, [pathname, search]);

  return null;
}
