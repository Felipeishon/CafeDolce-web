
import React, { useState } from 'react';
import { PlusCircle, Search, X, ChevronRight } from 'lucide-react';
import Logo from '../components/Logo';
import { Product, Language } from '../types';

const allProducts: Product[] = [
  // CAFÉ CLÁSICO (Pág 5)
  { id: 'c1', name: { es: 'Espresso', it: 'Espresso', en: 'Espresso' }, description: { es: 'Café corto e intenso.', it: 'Caffè corto e intenso.', en: 'Short and intense coffee.' }, price: 2200, image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=400&auto=format&fit=crop', category: 'coffee' },
  { id: 'c2', name: { es: 'Cappuccino', it: 'Cappuccino', en: 'Cappuccino' }, description: { es: 'Espresso con espuma de leche cremosa.', it: 'Espresso con schiuma di latte cremosa.', en: 'Espresso with creamy milk foam.' }, price: 3200, image: 'https://images.unsplash.com/photo-1534778101976-62847782c213?q=80&w=400&auto=format&fit=crop', category: 'coffee' },
  { id: 'c3', name: { es: 'Afogato Vainilla', it: 'Affogato alla Vaniglia', en: 'Vanilla Affogato' }, description: { es: 'Espresso sobre helado de vainilla.', it: 'Espresso su gelato alla vaniglia.', en: 'Espresso over vanilla ice cream.' }, price: 3300, image: 'https://images.unsplash.com/photo-1594631252845-29fc4586c552?q=80&w=400&auto=format&fit=crop', category: 'coffee' },
  
  // ALMUERZOS (Pág 3)
  { id: 'l1', name: { es: 'Lasagna Tradicional', it: 'Lasagna Tradizionale', en: 'Traditional Lasagna' }, description: { es: 'Láminas sedosas, carne de res, pomodoro natural y quesos.', it: 'Pasta all\'uovo, carne di manzo, pomodoro e formaggio.', en: 'Silky pasta layers, beef, natural pomodoro and cheeses.' }, price: 9990, image: 'https://images.unsplash.com/photo-1551183053-bf91a1d81141?q=80&w=400&auto=format&fit=crop', category: 'lunch' },
  
  // SÁNDWICHES (Pág 8-9)
  { id: 's1', name: { es: 'Sándwich Vital Gourmet', it: 'Panino Vital Gourmet', en: 'Vital Gourmet Sandwich' }, description: { es: 'Croissant tibio con champiñones, hummus y rúcula.', it: 'Croissant caldo con funghi, hummus e rucola.', en: 'Warm croissant with mushrooms, hummus and arugula.' }, price: 7890, image: 'https://images.unsplash.com/photo-1525351484163-7529414344d8?q=80&w=400&auto=format&fit=crop', category: 'sandwiches' },
  { id: 's2', name: { es: 'Protein Caffédolce', it: 'Protein Caffédolce', en: 'Protein Caffédolce' }, description: { es: 'Ciabatta con láminas de Pastrami y lechuga fresca.', it: 'Pane ciabatta con fette di pastrami e lattuga.', en: 'Ciabatta with Pastrami slices and fresh lettuce.' }, price: 9790, image: 'https://images.unsplash.com/photo-1553909489-cd47e0907980?q=80&w=400&auto=format&fit=crop', category: 'sandwiches' },
  
  // PUNTO DULCE (Pág 7)
  { id: 'b1', name: { es: 'Torta Selva Negra', it: 'Torta Foresta Nera', en: 'Black Forest Cake' }, description: { es: 'Bizcocho de chocolate, crema chantilly y guinda.', it: 'Pan di Spagna al cioccolato, panna e amarena.', en: 'Chocolate cake, chantilly cream and cherry.' }, price: 4490, image: 'https://images.unsplash.com/photo-1606313564200-e75d5e30476c?q=80&w=400&auto=format&fit=crop', category: 'bakery' },
  { id: 'b2', name: { es: 'Pastel Amor Gourmet', it: 'Dolce Amor Gourmet', en: 'Amor Gourmet Pastry' }, description: { es: 'Hojarasca con corazón de frambuesa y manjar (Sin Azúcar).', it: 'Sfoglia con cuore di lampone e manjar.', en: 'Layered pastry with raspberry and caramel (Sugar Free).' }, price: 4390, image: 'https://images.unsplash.com/photo-1488477181946-6428a0291777?q=80&w=400&auto=format&fit=crop', category: 'bakery' },

  // BEBIDAS (Pág 6)
  { id: 'd1', name: { es: 'Limonada Menta Jengibre', it: 'Limonata Menta Zenzero', en: 'Ginger Mint Lemonade' }, description: { es: 'Refrescante y natural.', it: 'Rinfrescante e naturale.', en: 'Refreshing and natural.' }, price: 3690, image: 'https://images.unsplash.com/photo-1513558161293-cdaf765ed2fd?q=80&w=400&auto=format&fit=crop', category: 'drinks' },
];

const menuI18n = {
  es: { 
    title: 'Il Nostro Menú', search: '¿Qué se te antoja?', add: 'AÑADIR', 
    all: 'Todo', coffee: 'Café', bakery: 'Dulces', lunch: 'Almuerzos', sandwiches: 'Sándwiches', drinks: 'Refrescos'
  },
  it: { 
    title: 'Il Nostro Menù', search: 'Cosa desideri?', add: 'AGGIUNGI',
    all: 'Tutti', coffee: 'Caffè', bakery: 'Pasticceria', lunch: 'Pranzi', sandwiches: 'Panini', drinks: 'Bibite'
  },
  en: { 
    title: 'Our Menu', search: 'What are you craving?', add: 'ADD',
    all: 'All', coffee: 'Coffee', bakery: 'Sweets', lunch: 'Lunch', sandwiches: 'Sandwiches', drinks: 'Drinks'
  }
};

const customizationOptions = {
  coffee: [{ label: { es: 'Leche', it: 'Latte', en: 'Milk' }, options: ['Entera', 'Descremada', 'Soya', 'Avena'] }],
  bakery: [{ label: { es: 'Servicio', it: 'Servizio', en: 'Service' }, options: ['Frío', 'Tibio'] }],
  lunch: [{ label: { es: 'Pan extra', it: 'Pane extra', en: 'Extra bread' }, options: ['Normal', 'Integral', 'Sin Gluten'] }],
  sandwiches: [{ label: { es: 'Pan', it: 'Pane', en: 'Bread' }, options: ['Ciabatta', 'Croissant', 'Sin Gluten'] }],
  drinks: [{ label: { es: 'Hielo', it: 'Ghiaccio', en: 'Ice' }, options: ['Normal', 'Mucho Hielo', 'Sin Hielo'] }]
};

interface MenuViewProps {
  lang: Language;
  onAddToCart: (p: Product, prefs: string[]) => void;
}

const MenuView: React.FC<MenuViewProps> = ({ lang, onAddToCart }) => {
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [currentPrefs, setCurrentPrefs] = useState<Record<string, string>>({});
  const t = menuI18n[lang];

  const filteredProducts = allProducts.filter(p => 
    (activeCategory === 'all' || p.category === activeCategory) &&
    (p.name[lang].toLowerCase().includes(searchQuery.toLowerCase()))
  );

  return (
    <div className="p-6 pb-32 bg-bg-soft min-h-screen">
      <div className="mb-10 text-center">
        <Logo className="h-28 mb-4" variant="icon" />
        <h2 className="text-4xl font-black italic uppercase text-primary tracking-tighter">{t.title}</h2>
      </div>

      <div className="relative mb-10 max-w-xl mx-auto">
        <input 
          placeholder={t.search}
          className="w-full pl-8 pr-8 py-6 rounded-[2.5rem] bg-white shadow-xl text-lg font-medium ring-1 ring-primary/5 outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      <div className="flex gap-3 overflow-x-auto no-scrollbar pb-10">
        {['all', 'coffee', 'lunch', 'sandwiches', 'bakery', 'drinks'].map((catId) => (
          <button
            key={catId}
            onClick={() => setActiveCategory(catId)}
            className={`px-8 py-4 rounded-[1.8rem] font-black uppercase whitespace-nowrap text-[10px] tracking-widest transition-all ${
              activeCategory === catId ? 'bg-secondary text-white shadow-lg scale-105' : 'bg-white text-primary/40'
            }`}
          >
            {t[catId as keyof typeof t]}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredProducts.map((p) => (
          <div key={p.id} className="bg-white rounded-[3rem] shadow-sm overflow-hidden flex flex-col group border border-primary/5 hover:shadow-xl transition-all">
            <div className="h-60 overflow-hidden relative">
              <img src={p.image} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700" alt={p.name[lang]} />
              <div className="absolute bottom-4 left-4 bg-primary text-white px-5 py-2 rounded-2xl font-black italic text-sm">
                ${p.price.toLocaleString('es-CL')}
              </div>
            </div>
            <div className="p-10 flex flex-col flex-1">
              <h4 className="font-black text-2xl text-primary italic mb-3 tracking-tighter">{p.name[lang]}</h4>
              <p className="text-sm text-zinc-400 mb-8 leading-relaxed line-clamp-2">{p.description[lang]}</p>
              <button 
                onClick={() => {
                  setSelectedProduct(p);
                  const initial: Record<string, string> = {};
                  customizationOptions[p.category]?.forEach(opt => initial[opt.label[lang]] = opt.options[0]);
                  setCurrentPrefs(initial);
                }}
                className="mt-auto flex items-center justify-center gap-2 bg-secondary text-white py-5 rounded-[2rem] font-black text-xs hover:bg-primary transition-all shadow-md active:scale-95"
              >
                <PlusCircle size={18} /> {t.add}
              </button>
            </div>
          </div>
        ))}
      </div>

      {selectedProduct && (
        <div className="fixed inset-0 z-[100] flex items-end sm:items-center justify-center p-0 sm:p-6 animate-in fade-in">
          <div className="absolute inset-0 bg-primary/60 backdrop-blur-sm" onClick={() => setSelectedProduct(null)} />
          <div className="relative bg-white w-full max-w-lg rounded-t-[3.5rem] sm:rounded-[3.5rem] shadow-2xl overflow-hidden">
            <div className="h-56 relative">
              <img src={selectedProduct.image} className="w-full h-full object-cover" alt="" />
              <button onClick={() => setSelectedProduct(null)} className="absolute top-8 right-8 bg-white/30 backdrop-blur-md text-white p-3 rounded-full"><X size={20}/></button>
            </div>
            <div className="p-10">
              <h3 className="text-3xl font-black italic text-primary mb-10 tracking-tighter">{selectedProduct.name[lang]}</h3>
              <div className="space-y-8">
                {customizationOptions[selectedProduct.category]?.map((group) => (
                  <div key={group.label[lang]}>
                    <p className="text-[10px] font-black uppercase text-zinc-300 tracking-[0.2em] mb-4">{group.label[lang]}</p>
                    <div className="flex flex-wrap gap-2">
                      {group.options.map(opt => (
                        <button
                          key={opt}
                          onClick={() => setCurrentPrefs(prev => ({ ...prev, [group.label[lang]]: opt }))}
                          className={`px-6 py-3 rounded-2xl text-xs font-black transition-all border ${
                            currentPrefs[group.label[lang]] === opt ? 'bg-secondary text-white border-secondary' : 'bg-white text-primary border-primary/10'
                          }`}
                        >
                          {opt}
                        </button>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
              <button 
                onClick={() => { onAddToCart(selectedProduct, Object.values(currentPrefs)); setSelectedProduct(null); }}
                className="w-full mt-12 bg-primary text-white py-6 rounded-[2.5rem] font-black tracking-widest flex items-center justify-center gap-3 shadow-xl"
              >
                CONFIRMAR PEDIDO <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MenuView;
