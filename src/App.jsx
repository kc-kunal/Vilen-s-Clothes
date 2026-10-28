import React from 'react';
import { ShopProvider, useShop } from './context/ShopContext';
import { AnnouncementBar } from './components/AnnouncementBar/AnnouncementBar';
import { Navbar } from './components/Navbar/Navbar';
import { HangerShowroom } from './components/HangerShowroom/HangerShowroom';
import { CategoryFilter } from './components/CategoryFilter/CategoryFilter';
import { ProductGrid } from './components/ProductGrid/ProductGrid';
import { BundleBuilder } from './components/BundleBuilder/BundleBuilder';
import { WhyUs } from './components/WhyUs/WhyUs';
import { ReviewsReel } from './components/ReviewsReel/ReviewsReel';
import { FAQAccordion } from './components/FAQAccordion/FAQAccordion';
import { Footer } from './components/Footer/Footer';
import { ProductDetailPage } from './components/ProductDetailPage/ProductDetailPage';
import { CartDrawer } from './components/CartDrawer/CartDrawer';
import { CheckoutModal } from './components/CheckoutModal/CheckoutModal';
import { SizeGuideModal } from './components/SizeGuideModal/SizeGuideModal';
import { OrderSuccessModal } from './components/OrderSuccessModal/OrderSuccessModal';
import { TrackOrderModal } from './components/TrackOrderModal/TrackOrderModal';
import { LiveToast } from './components/LiveToast/LiveToast';
import { AuthModal } from './components/AuthModal/AuthModal';
import './App.css';

function MainAppContent() {
  const { currentView } = useShop();

  return (
    <div className="vilen-app">
      <AnnouncementBar />
      <Navbar />

      <main>
        {currentView === 'home' ? (
          <>
            {/* 3D T-Shirt Hanger Showroom Section (With Hero Headline, 3D Rack, CTAs & Trust Bar) */}
            <HangerShowroom />
            <CategoryFilter />
            <ProductGrid />
            <BundleBuilder />
            <WhyUs />
            <ReviewsReel />
            <FAQAccordion />
          </>
        ) : (
          /* Full Single Product Page (Not a popup/modal!) */
          <ProductDetailPage />
        )}
      </main>

      <Footer />

      {/* Global Drawers & Overlays (Only Cart Drawer, Checkout, Size Guide & Track Order) */}
      <CartDrawer />
      <CheckoutModal />
      <SizeGuideModal />
      <OrderSuccessModal />
      <TrackOrderModal />
      <AuthModal />
      <LiveToast />
    </div>
  );
}

export default function App() {
  return (
    <ShopProvider>
      <MainAppContent />
    </ShopProvider>
  );
}
