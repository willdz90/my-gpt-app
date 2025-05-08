// src/components/FocusHandler.jsx
import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

export default function FocusHandler() {
  const location = useLocation();

  useEffect(() => {
    if (document.activeElement instanceof HTMLElement) {
      document.activeElement.blur();
    }
  }, [location]);

  return null;
}
