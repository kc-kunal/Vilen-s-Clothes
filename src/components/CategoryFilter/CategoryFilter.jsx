import React from 'react';
import { useShop } from '../../context/ShopContext';
import './CategoryFilter.css';

const CATEGORIES = [
  { id: 'all', label: 'All Collections', icon: 'bi-grid-fill' },
  { id: 'packs', label: 'Outfit Setup Packs', icon: 'bi-box-seam-fill', isHot: true },
  { id: 'tees', label: 'Oversized Tees', icon: 'bi-layers-fill' },
  { id: 'hoodies', label: 'Hoodies & Fleece', icon: 'bi-cloud-sun-fill' },
  { id: 'cargos', label: 'Tactical Cargos', icon: 'bi-bag-check-fill' },
  { id: 'combos', label: 'Mix & Match Combos', icon: 'bi-stars' }
];

export const CategoryFilter = () => {
  const { activeCategory, setActiveCategory } = useShop();

  return (
    <div className="category-filter-wrapper py-3">
      <div className="container">
        <div className="category-scroll-container d-flex gap-2 pb-1">
          {CATEGORIES.map(cat => (
            <button
              key={cat.id}
              className={`cat-chip-btn ${activeCategory === cat.id ? 'active' : ''}`}
              onClick={() => setActiveCategory(cat.id)}
            >
              <i className={`bi ${cat.icon} me-2`}></i>
              <span>{cat.label}</span>
              {cat.isHot && <span className="chip-hot-tag">HOT</span>}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};
