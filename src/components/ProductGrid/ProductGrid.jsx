import React from 'react';
import { useShop } from '../../context/ShopContext';
import { ProductCard } from '../ProductCard/ProductCard';
import './ProductGrid.css';

export const ProductGrid = () => {
  const { filteredProducts, activeCategory, setActiveCategory } = useShop();

  // If user filtered by specific category or searched
  if (activeCategory !== 'all') {
    return (
      <section id="products-section" className="py-4 py-md-5">
        <div className="container">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <div>
              <h2 className="section-heading text-uppercase mb-1">
                {activeCategory === 'packs' ? 'Outfit Setup Packs' : 
                 activeCategory === 'tees' ? 'Oversized Tees (240+ GSM)' :
                 activeCategory === 'hoodies' ? 'Heavyweight Hoodies' : 
                 activeCategory === 'cargos' ? 'Tactical Cargos & Bottoms' : 'Mix & Match Combos'}
              </h2>
              <p className="section-sub mb-0 text-muted">
                Showing {filteredProducts.length} premium crafted items
              </p>
            </div>
            <button 
              className="btn btn-sm btn-outline-dark rounded-pill px-3"
              onClick={() => setActiveCategory('all')}
            >
              Clear Filter
            </button>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4">
            {filteredProducts.map(product => (
              <div key={product.id} className="col">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  // All collections view structured exactly like Posterized.in
  const packs = filteredProducts.filter(p => p.category === 'packs');
  const tees = filteredProducts.filter(p => p.category === 'tees');
  const otherDrops = filteredProducts.filter(p => p.category === 'hoodies' || p.category === 'cargos' || p.category === 'combos');

  return (
    <div id="products-section">
      {/* SECTION 1: OUTFIT SETUP PACKS (Like Wall Setup Packs) */}
      <section className="collection-section py-4 py-md-5">
        <div className="container">
          <div className="section-header-row d-flex justify-content-between align-items-end mb-3">
            <div>
              <span className="section-kicker">CURATED COMPLETE LOOKS</span>
              <h2 className="section-heading text-uppercase mb-0">OUTFIT SETUP PACKS</h2>
            </div>
            <button 
              className="section-link-btn"
              onClick={() => setActiveCategory('packs')}
            >
              View all packs <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4">
            {packs.map(product => (
              <div key={product.id} className="col">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 2: OVERSIZED GRAPHIC TEES */}
      <section className="collection-section py-4 py-md-5 bg-white border-top border-bottom">
        <div className="container">
          <div className="section-header-row d-flex justify-content-between align-items-end mb-3">
            <div>
              <span className="section-kicker">HEAVYWEIGHT 240+ GSM COMBED COTTON</span>
              <h2 className="section-heading text-uppercase mb-0">MIX & MATCH OVERSIZED TEES</h2>
            </div>
            <button 
              className="section-link-btn"
              onClick={() => setActiveCategory('tees')}
            >
              View all tees <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4">
            {tees.map(product => (
              <div key={product.id} className="col">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SECTION 3: WINTER HOODIES & BOTTOMS */}
      <section className="collection-section py-4 py-md-5">
        <div className="container">
          <div className="section-header-row d-flex justify-content-between align-items-end mb-3">
            <div>
              <span className="section-kicker">FLEECE & TACTICAL UTILITY</span>
              <h2 className="section-heading text-uppercase mb-0">SHOP BY DROP & CATEGORY</h2>
            </div>
            <button 
              className="section-link-btn"
              onClick={() => setActiveCategory('hoodies')}
            >
              Explore all <i className="bi bi-arrow-right ms-1"></i>
            </button>
          </div>

          <div className="row row-cols-1 row-cols-sm-2 row-cols-md-3 row-cols-lg-4 g-3 g-md-4">
            {otherDrops.map(product => (
              <div key={product.id} className="col">
                <ProductCard product={product} />
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
