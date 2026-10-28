import React, { createContext, useContext, useState, useEffect } from 'react';
import { PRODUCTS, CROSS_SELL_ADDONS } from '../data/products';
import { 
  subscribeToAuth, 
  loginUser, 
  registerUser, 
  loginWithGoogle as firebaseGoogleLogin, 
  resetPassword as firebaseResetPassword, 
  logoutUser 
} from '../firebase/authService';

const ShopContext = createContext();

const CART_STORAGE_KEY = 'vilens_cart_items';
const FREE_GIFT_THRESHOLD = 1999;

export const ShopProvider = ({ children }) => {
  // Page Routing State ('home' or 'product')
  const [currentView, setCurrentView] = useState('home');
  const [selectedProduct, setSelectedProduct] = useState(null);

  // Cart state
  const [cart, setCart] = useState(() => {
    try {
      const saved = localStorage.getItem(CART_STORAGE_KEY);
      return saved ? JSON.parse(saved) : [];
    } catch {
      return [];
    }
  });

  // UI Modals state
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isSizeGuideOpen, setIsSizeGuideOpen] = useState(false);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isTrackOrderOpen, setIsTrackOrderOpen] = useState(false);
  const [isOrderSuccessOpen, setIsOrderSuccessOpen] = useState(false);
  const [lastPlacedOrder, setLastPlacedOrder] = useState(null);

  // Auth & Firebase State
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthOpen, setIsAuthOpen] = useState(false);
  const [authMode, setAuthMode] = useState('login'); // 'login' | 'register' | 'forgot'

  // Listen to Firebase Auth state
  useEffect(() => {
    const unsubscribe = subscribeToAuth((user) => {
      setCurrentUser(user);
    });
    return () => {
      if (typeof unsubscribe === 'function') unsubscribe();
    };
  }, []);

  const openAuth = (mode = 'login') => {
    setAuthMode(mode);
    setIsAuthOpen(false); // No popup modal!
    setCurrentView('auth');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const closeAuth = () => {
    setIsAuthOpen(false);
  };

  const login = async (email, password) => {
    const user = await loginUser(email, password);
    setCurrentUser(user);
    return user;
  };

  const register = async (name, email, password) => {
    const user = await registerUser(name, email, password);
    setCurrentUser(user);
    return user;
  };

  const loginWithGoogle = async () => {
    const user = await firebaseGoogleLogin();
    setCurrentUser(user);
    return user;
  };

  const sendPasswordReset = async (email) => {
    return await firebaseResetPassword(email);
  };

  const logout = async () => {
    await logoutUser();
    setCurrentUser(null);
  };

  // Filters & Search
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');

  // Discounts
  const [appliedCoupon, setAppliedCoupon] = useState('VILEN10');

  // Save cart to localStorage
  useEffect(() => {
    try {
      localStorage.setItem(CART_STORAGE_KEY, JSON.stringify(cart));
    } catch (e) {
      console.error('Failed to save cart:', e);
    }
  }, [cart]);

  // Navigate to single product PAGE
  const openProductDetail = (product) => {
    setSelectedProduct(product);
    setCurrentView('product');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const backToHome = () => {
    setCurrentView('home');
    setSelectedProduct(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Add product to cart
  const addToCart = (product, size = 'L', color = null, quantity = 1) => {
    const selectedColor = color || (product.colors && product.colors[0] ? product.colors[0].name : 'Default');
    const cartItemId = product.id + '-' + size + '-' + selectedColor;

    setCart(prev => {
      const existingIndex = prev.findIndex(item => item.cartItemId === cartItemId);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      } else {
        return [
          ...prev,
          {
            cartItemId,
            id: product.id,
            name: product.name,
            subtitle: product.subtitle || '',
            price: product.price,
            originalPrice: product.originalPrice,
            image: (product.images && product.images[0]) || product.image,
            size,
            color: selectedColor,
            quantity,
            isAddon: false
          }
        ];
      }
    });

    setIsCartOpen(true);
  };

  // Add cross-sell add-on
  const addCrossSell = (addon) => {
    const cartItemId = 'addon-' + addon.id;
    setCart(prev => {
      const existing = prev.find(item => item.cartItemId === cartItemId);
      if (existing) {
        return prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: item.quantity + 1 } : item);
      }
      return [
        ...prev,
        {
          cartItemId,
          id: addon.id,
          name: addon.name,
          subtitle: addon.desc,
          price: addon.price,
          originalPrice: addon.originalPrice,
          image: addon.image,
          size: 'Standard',
          color: 'Standard',
          quantity: 1,
          isAddon: true
        }
      ];
    });
  };

  const removeFromCart = (cartItemId) => {
    setCart(prev => prev.filter(item => item.cartItemId !== cartItemId));
  };

  const updateQuantity = (cartItemId, newQty) => {
    if (newQty <= 0) {
      removeFromCart(cartItemId);
      return;
    }
    setCart(prev =>
      prev.map(item => item.cartItemId === cartItemId ? { ...item, quantity: newQty } : item)
    );
  };

  const clearCart = () => {
    setCart([]);
  };

  // Calculations
  const cartSubtotal = cart.reduce((acc, item) => acc + (item.price * item.quantity), 0);
  const cartMRP = cart.reduce((acc, item) => acc + ((item.originalPrice || item.price * 1.5) * item.quantity), 0);
  
  // Coupon logic
  let discountAmount = 0;
  if (appliedCoupon === 'VILEN10') {
    discountAmount = Math.round(cartSubtotal * 0.10);
  } else if (appliedCoupon === 'VILEN500' && cartSubtotal >= 2499) {
    discountAmount = 500;
  }

  const shippingCharges = 0;
  const cartTotal = Math.max(0, cartSubtotal - discountAmount);
  const totalSavings = (cartMRP - cartTotal);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  // Free Gift Progress
  const amountUntilGift = Math.max(0, FREE_GIFT_THRESHOLD - cartSubtotal);
  const giftProgressPercent = Math.min(100, Math.round((cartSubtotal / FREE_GIFT_THRESHOLD) * 100));
  const hasUnlockedGift = cartSubtotal >= FREE_GIFT_THRESHOLD;

  // Filtered products
  const filteredProducts = PRODUCTS.filter(p => {
    const matchesCategory = activeCategory === 'all' || p.category === activeCategory;
    const matchesSearch = !searchQuery || 
      p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      p.subtitle.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (p.tags && p.tags.some(t => t.toLowerCase().includes(searchQuery.toLowerCase())));
    return matchesCategory && matchesSearch;
  });

  return (
    <ShopContext.Provider
      value={{
        PRODUCTS,
        CROSS_SELL_ADDONS,
        filteredProducts,
        cart,
        addToCart,
        addCrossSell,
        removeFromCart,
        updateQuantity,
        clearCart,
        cartSubtotal,
        cartMRP,
        cartTotal,
        discountAmount,
        totalSavings,
        cartCount,
        appliedCoupon,
        setAppliedCoupon,
        FREE_GIFT_THRESHOLD,
        amountUntilGift,
        giftProgressPercent,
        hasUnlockedGift,
        // Page Routing & Single Product Page
        currentView,
        setCurrentView,
        selectedProduct,
        openProductDetail,
        backToHome,
        // UI Modals
        isCartOpen,
        setIsCartOpen,
        openCart: () => setIsCartOpen(true),
        closeCart: () => setIsCartOpen(false),
        isSizeGuideOpen,
        openSizeGuide: () => setIsSizeGuideOpen(true),
        closeSizeGuide: () => setIsSizeGuideOpen(false),
        isCheckoutOpen,
        openCheckout: () => setIsCheckoutOpen(true),
        closeCheckout: () => setIsCheckoutOpen(false),
        isTrackOrderOpen,
        openTrackOrder: () => setIsTrackOrderOpen(true),
        closeTrackOrder: () => setIsTrackOrderOpen(false),
        isOrderSuccessOpen,
        lastPlacedOrder,
        openOrderSuccess: (order) => {
          setLastPlacedOrder(order);
          setIsOrderSuccessOpen(true);
        },
        closeOrderSuccess: () => setIsOrderSuccessOpen(false),
        // Auth & Firebase
        currentUser,
        isAuthOpen,
        authMode,
        setAuthMode,
        openAuth,
        closeAuth,
        login,
        register,
        loginWithGoogle,
        loginGoogle: loginWithGoogle,
        navigateToAuth: openAuth,
        sendPasswordReset,
        logout,
        // Filters & Search
        activeCategory,
        setActiveCategory,
        searchQuery,
        setSearchQuery
      }}
    >
      {children}
    </ShopContext.Provider>
  );
};

export const useShop = () => {
  const context = useContext(ShopContext);
  if (!context) {
    throw new Error('useShop must be used within a ShopProvider');
  }
  return context;
};
