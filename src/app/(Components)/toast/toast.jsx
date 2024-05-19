import { useState, useEffect } from 'react';
import './toast.css';

const Toast = ({ message, duration = 3000 }) => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    setIsVisible(true);

    const timer = setTimeout(() => {
      setIsVisible(false);
    }, duration);

    return () => clearTimeout(timer);
  }, [duration]);

  return (
    <div className={`toast ${isVisible ? 'show' : ''}`}>
      {message}
    </div>
  );
};

export default Toast;
