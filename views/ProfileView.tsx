
import React from 'react';
import { ShoppingBag, Plus, Minus, Trash2, ArrowRight } from 'lucide-react';
import { Language, CartItem } from '../types';
import Logo from '../components/Logo';

const cartI18n = {
  es: { title: 'Tu Selección', empty: 'Aún no has elegido nada...', total: 'Total Pedido', confirm: 'ENVIAR A COCINA', items: 'productos' },
  it: { title: 'La Tua Selezione', empty: 'Non hai ancora scelto nulla...', total: 'Totale Ordine', confirm: 'INVIA IN CUCINA', items: 'prodotti' },
  en: { title: 'Your Selection', empty: 'You haven\'t chosen anything yet...', total: 'Order Total', confirm: 'SEND TO KITCHEN', items: 'items' }
};

interface ProfileViewProps {
  lang: Language;
  cart: CartItem[];
  onUpdateQuantity: (uniqueCartId: string, delta: number) => void;
}

const ProfileView: React.FC<ProfileViewProps> = ({ lang, cart, onUpdateQuantity }) => {
  const t = cartI18n[lang];
  const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

  if (cart.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-6 text-center animate-in fade-in">
        <div className="w-32 h-32 bg-secondary/10 rounded-full flex items-center justify-center mb-6">
          <ShoppingBag size={48} className="text-secondary opacity-40" />
        </div>
        <h3 className="text-2xl font-black italic text-primary mb-2 tracking-tighter">{t.empty}</h3>
        <p className="text-zinc-400 font-medium">¡Explora nuestro menú y personaliza tu pedido!</p>
      </div>
    );
  }

  return (
    <div className="p-6 pb-32 animate-in slide-in-from-right-8 bg-bg-soft min-h-screen">
      <div className="mb-10 text-center">
        <Logo className="h-24 mb-2" variant="icon" />
        <h2 className="text-3xl font-black italic uppercase text-primary tracking-tighter">{t.title}</h2>
      </div>

      <div className="max-w-2xl mx-auto space-y-4">
        {cart.map((item) => (
          <div key={item.uniqueCartId} className="bg-white p-6 rounded-[2.5rem] shadow-sm border border-primary/5 flex flex-col gap-4">
            <div className="flex items-center gap-4">
              <img src={item.image} className="w-20 h-20 rounded-3xl object-cover shadow-md" alt={item.name[lang]} />
              <div className="flex-1">
                <h4 className="font-black italic text-primary tracking-tighter text-xl">{item.name[lang]}</h4>
                <p className="text-secondary font-bold text-sm">${item.price.toLocaleString('es-CL')}</p>
              </div>
              <div className="flex items-center bg-bg-soft rounded-2xl p-1 border border-primary/5">
                <button 
                  onClick={() => onUpdateQuantity(item.uniqueCartId, -1)}
                  className="w-8 h-8 flex items-center justify-center text-primary hover:bg-white rounded-xl transition-all"
                >
                  {item.quantity === 1 ? <Trash2 size={16} className="text-red-400" /> : <Minus size={16} />}
                </button>
                <span className="w-8 text-center font-black text-sm">{item.quantity}</span>
                <button 
                  onClick={() => onUpdateQuantity(item.uniqueCartId, 1)}
                  className="w-8 h-8 flex items-center justify-center text-primary hover:bg-white rounded-xl transition-all"
                >
                  <Plus size={16} />
                </button>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-2 pt-2 border-t border-primary/5">
              {item.preferences.map((pref, idx) => (
                <span key={idx} className="bg-secondary/5 text-secondary text-[10px] font-black uppercase tracking-widest px-3 py-1 rounded-lg border border-secondary/10">
                  {pref}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="max-w-2xl mx-auto mt-12 p-8 bg-primary rounded-[3rem] text-white shadow-2xl">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-white/60 text-[10px] font-black uppercase tracking-widest mb-1">{t.total}</p>
            <p className="text-3xl font-black italic tracking-tighter">${totalPrice.toLocaleString('es-CL')}</p>
          </div>
          <div className="text-right">
            <p className="text-white/60 text-xs font-black">{cart.reduce((s, i) => s + i.quantity, 0)} {t.items}</p>
          </div>
        </div>
        
        <button className="w-full bg-secondary text-white py-6 rounded-[2.5rem] font-black tracking-widest flex items-center justify-center gap-3 hover:bg-white hover:text-secondary transition-all shadow-xl active:scale-95">
          {t.confirm} <ArrowRight size={20} />
        </button>
      </div>
    </div>
  );
};

export default ProfileView;
