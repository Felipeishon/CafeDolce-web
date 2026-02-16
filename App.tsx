
import React, { useState } from 'react';
import { Menu as MenuIcon, MessageSquare, ShoppingBag, Coffee } from 'lucide-react';
import HomeView from './views/HomeView';
import MenuView from './views/MenuView';
import ContactView from './views/ContactView';
import ProfileView from './views/ProfileView';
import Logo from './components/Logo';
import { ViewType, Language, Product, CartItem } from './types';

const App: React.FC = () => {
  const [currentView, setCurrentView] = useState<ViewType>('home');
  const [lang, setLang] = useState<Language>('it');
  const [cart, setCart] = useState<CartItem[]>([]);

  const translations = {
    es: { home: 'Inicio', menu: 'Menú', contact: 'Contacto', cart: 'Mi Selección' },
    it: { home: 'Inizio', menu: 'Menù', contact: 'Contatti', cart: 'Selezione' },
    en: { home: 'Home', menu: 'Menu', contact: 'Contact', cart: 'Selection' }
  };

  const addToCart = (product: Product, preferences: string[]) => {
    const prefsKey = preferences.sort().join('|');
    const uniqueId = `${product.id}-${prefsKey}`;

    setCart(prev => {
      const existing = prev.find(item => item.uniqueCartId === uniqueId);
      if (existing) {
        return prev.map(item => 
          item.uniqueCartId === uniqueId ? { ...item, quantity: item.quantity + 1 } : item
        );
      }
      return [...prev, { ...product, quantity: 1, preferences, uniqueCartId: uniqueId }];
    });
  };

  const updateQuantity = (uniqueCartId: string, delta: number) => {
    setCart(prev => prev.map(item => {
      if (item.uniqueCartId === uniqueCartId) {
        const newQty = Math.max(0, item.quantity + delta);
        return { ...item, quantity: newQty };
      }
      return item;
    }).filter(item => item.quantity > 0));
  };

  const renderView = () => {
    switch (currentView) {
      case 'home':
        return <HomeView lang={lang} onNavigateToMenu={() => setCurrentView('menu')} />;
      case 'menu':
        return <MenuView lang={lang} onAddToCart={addToCart} />;
      case 'contact':
        return <ContactView lang={lang} />;
      case 'profile':
        return <ProfileView lang={lang} cart={cart} onUpdateQuantity={updateQuantity} />;
      default:
        return <HomeView lang={lang} onNavigateToMenu={() => setCurrentView('menu')} />;
    }
  };

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-col min-h-screen pb-20">
      <header className="sticky top-0 z-50 flex items-center bg-white/95 backdrop-blur-md px-6 py-3 border-b border-primary/5 justify-between shadow-sm">
        <div 
          className="flex items-center gap-3 cursor-pointer group" 
          onClick={() => setCurrentView('home')}
        >
          <Logo className="h-10 w-10 transition-transform group-hover:scale-110" variant="icon" mode="dark" />
          <span className="text-primary font-black italic tracking-tighter text-2xl">Caffédolce</span>
        </div>

        <div className="flex bg-secondary/5 p-1 rounded-full border border-secondary/10">
          {(['es', 'it', 'en'] as Language[]).map((l) => (
            <button
              key={l}
              onClick={() => setLang(l)}
              className={`px-3 py-1.5 rounded-full text-[10px] font-black uppercase transition-all ${
                lang === l ? 'bg-secondary text-white shadow-md' : 'text-secondary/40 hover:text-secondary'
              }`}
            >
              {l}
            </button>
          ))}
        </div>
      </header>

      <main className="flex-grow">
        {renderView()}
      </main>

      <nav className="fixed bottom-0 left-0 right-0 z-50 flex border-t border-primary/5 bg-white px-4 pb-4 pt-2 shadow-[0_-10px_40px_rgba(0,0,0,0.04)]">
        {[
          { id: 'home', icon: Coffee, label: translations[lang].home },
          { id: 'menu', icon: MenuIcon, label: translations[lang].menu },
          { id: 'contact', icon: MessageSquare, label: translations[lang].contact },
          { id: 'profile', icon: ShoppingBag, label: translations[lang].cart, badge: cartCount }
        ].map((item) => (
          <button 
            key={item.id}
            onClick={() => setCurrentView(item.id as ViewType)}
            className={`flex flex-1 flex-col items-center justify-center gap-1 transition-all relative ${
              currentView === item.id ? 'text-secondary scale-110' : 'text-zinc-300'
            }`}
          >
            <div className="relative">
              <item.icon size={22} className={currentView === item.id ? 'fill-secondary/10' : ''} strokeWidth={currentView === item.id ? 2.5 : 2} />
              {item.badge > 0 && (
                <span className="absolute -top-2.5 -right-2.5 bg-secondary text-white text-[9px] font-black w-4.5 h-4.5 flex items-center justify-center rounded-full border-2 border-white shadow-sm">
                  {item.badge}
                </span>
              )}
            </div>
            <p className="text-[9px] uppercase tracking-widest font-black">{item.label}</p>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default App;
