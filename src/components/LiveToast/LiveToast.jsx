import React, { useState, useEffect } from 'react';
import './LiveToast.css';

const NOTIFICATIONS = [
  { name: 'Kunal from Jaipur', item: 'The Tokyo Cyberpunk 3-Piece Pack', time: '2m ago' },
  { name: 'Aarav from Delhi', item: '3-Tee Essential Combo Pack', time: '4m ago' },
  { name: 'Pooja from Mumbai', item: 'Heavyweight French Terry Boxy Hoodie', time: 'Just now' },
  { name: 'Vikram from Bangalore', item: '8-Pocket Parachute Cargos', time: '6m ago' }
];

export const LiveToast = () => {
  const [current, setCurrent] = useState(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      setCurrent(NOTIFICATIONS[index % NOTIFICATIONS.length]);
      setVisible(true);
      index++;

      setTimeout(() => {
        setVisible(false);
      }, 4500);
    }, 14000);

    return () => clearInterval(interval);
  }, []);

  if (!current || !visible) return null;

  return (
    <div className="live-toast-wrapper">
      <div className="live-toast-inner d-flex align-items-center">
        <div className="pulse-dot me-2"></div>
        <div>
          <div className="toast-title">
            <strong>{current.name}</strong> just ordered
          </div>
          <div className="toast-item-name text-truncate">
            {current.item}
          </div>
          <span className="toast-time">{current.time}</span>
        </div>
        <button className="btn-close btn-close-white btn-sm ms-2" onClick={() => setVisible(false)}></button>
      </div>
    </div>
  );
};
