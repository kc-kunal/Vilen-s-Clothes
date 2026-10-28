import React, { useState, useEffect } from 'react';
import './AnnouncementBar.css';

const announcements = [
  '⚡ LIMITED TIME DROP: Use code VILEN10 for extra 10% OFF on all orders!',
  '🚀 FREE Express Shipping on all Prepaid Orders across India · Dispatched in 24h',
  '🔥 BUY ANY 2 TEES, GET 1 FREE · Limited packs remaining!'
];

export const AnnouncementBar = () => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((prev) => (prev + 1) % announcements.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="announcement-bar py-1 px-3">
      <div className="container text-center d-flex justify-content-between align-items-center">
        <span className="announcement-badge d-none d-md-inline-block">OFFICIAL STORE</span>
        <div className="announcement-text text-truncate mx-auto">
          {announcements[index]}
        </div>
        <span className="announcement-code d-none d-md-inline-block">CODE: <strong>VILEN10</strong></span>
      </div>
    </div>
  );
};
