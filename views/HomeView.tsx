
import React from 'react';
import { Instagram, Facebook, ArrowRight } from 'lucide-react';
import Logo from '../components/Logo';
import { Product, Language } from '../types';

const featuredProducts: Product[] = [
  {
    id: '1',
    name: { es: 'Espresso Ristretto', it: 'Espresso Ristretto', en: 'Espresso Ristretto' },
    description: {
      es: 'La esencia pura del café: corto e intenso con el alma de Caffédolce.',
      it: 'L\'essenza pura del caffè: corto e intenso con l\'anima di Caffédolce.',
      en: 'The pure essence of coffee: short and intense with the soul of Caffédolce.'
    },
    price: 2.10,
    image: 'https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?q=80&w=800&auto=format&fit=crop',
    category: 'coffee'
  },
  {
    id: '2',
    name: { es: 'Cannolo Siciliano', it: 'Cannolo Siciliano', en: 'Sicilian Cannolo' },
    description: {
      es: 'Dulce tradicional relleno de ricotta y pistacho.',
      it: 'Tradizione dolce con ricotta fresca e pistacchio.',
      en: 'Traditional sweet with fresh ricotta and pistachio.'
    },
    price: 4.20,
    image: 'https://images.unsplash.com/photo-1551024601-bec78aea704b?q=80&w=800&auto=format&fit=crop',
    category: 'bakery'
  }
];

const homeI18n = {
  es: {
    hero: "Il Rituale",
    heroSub: "Tradición italiana y diseño moderno.",
    btn: "ORDENAR AHORA",
    passion: "Nuestra Pasión",
    passionText: "Seleccionamos los mejores granos para crear una experiencia única, fiel a la torrefazione italiana original.",
    featured: "I Nostri Preferiti",
  },
  it: {
    hero: "Il Rituale",
    heroSub: "Tradizione italiana e design moderno.",
    btn: "ORDINA ORA",
    passion: "La Nostra Passione",
    passionText: "Selezioniamo i migliori chicchi per creare un'esperienza unica, fedele alla torrefazione originale.",
    featured: "I Nostri Preferiti",
  },
  en: {
    hero: "The Ritual",
    heroSub: "Italian tradition and modern design.",
    btn: "ORDER NOW",
    passion: "Our Passion",
    passionText: "We select the finest beans to create a unique experience, faithful to the original Italian roasting.",
    featured: "Our Favorites",
  }
};

interface HomeViewProps {
  onNavigateToMenu: () => void;
  lang: Language;
}

const HomeView: React.FC<HomeViewProps> = ({ onNavigateToMenu, lang }) => {
  const t = homeI18n[lang];

  return (
    <div className="animate-in fade-in duration-700">
      {/* Hero Section */}
      <section className="relative h-[90vh] w-full flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center transition-transform duration-[10s] hover:scale-110" 
          style={{ 
            backgroundImage: `url("https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=1200&auto=format&fit=crop")` 
          }}
        >
          {/* Overlay gradiente para mejorar legibilidad */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-black/60 backdrop-brightness-90" />
        </div>
        
        {/* Contenedor de Marca (Modo LIGHT para fondo oscuro) */}
        <div className="relative z-10 flex flex-col items-center max-w-sm w-[90%] p-12 rounded-[5rem] bg-white/5 backdrop-blur-md border border-white/10 shadow-2xl animate-in zoom-in-95 duration-1000">
          <Logo className="w-full h-auto mb-4" variant="full" mode="light" />
          
          <div className="text-center space-y-2 mb-10">
            <h1 className="text-white text-3xl font-black italic tracking-tighter uppercase">{t.hero}</h1>
            <p className="text-white/70 text-sm font-bold tracking-widest">{t.heroSub}</p>
          </div>

          <button 
            onClick={onNavigateToMenu} 
            className="w-full bg-secondary text-white h-20 rounded-[2.5rem] font-black tracking-widest shadow-2xl hover:bg-white hover:text-secondary transition-all active:scale-95 flex items-center justify-center gap-3 group"
          >
            {t.btn}
            <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
          </button>
        </div>
      </section>

      {/* Passion Section */}
      <section className="px-6 py-28 bg-white text-center">
        <div className="max-w-xl mx-auto">
          <h2 className="text-primary text-4xl font-black italic uppercase mb-8 tracking-tighter">{t.passion}</h2>
          <div className="w-24 h-1.5 bg-secondary mx-auto mb-10 rounded-full" />
          <p className="text-zinc-500 text-xl leading-relaxed font-medium">{t.passionText}</p>
        </div>
      </section>

      {/* Featured Products */}
      <section className="px-6 py-20 bg-bg-soft">
        <h2 className="text-3xl font-black italic uppercase text-primary mb-16 text-center tracking-tighter">{t.featured}</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 max-w-5xl mx-auto">
          {featuredProducts.map((p) => (
            <div key={p.id} className="bg-white rounded-[3.5rem] overflow-hidden shadow-xl border border-primary/5 group">
              <div className="h-80 overflow-hidden relative">
                <img src={p.image} alt={p.name[lang]} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-1000" />
                <div className="absolute top-6 right-6 bg-secondary text-white px-6 py-2 rounded-full font-black text-sm shadow-lg">€{p.price.toFixed(2)}</div>
              </div>
              <div className="p-12 text-center">
                <h3 className="text-primary font-black text-3xl italic mb-4 tracking-tighter">{p.name[lang]}</h3>
                <p className="text-zinc-500 mb-10 text-base font-medium leading-relaxed">{p.description[lang]}</p>
                <button 
                  onClick={onNavigateToMenu}
                  className="w-full bg-primary text-white py-6 rounded-[2rem] font-black tracking-widest hover:bg-secondary transition-all shadow-lg"
                >
                  ORDINA ORA
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-28 bg-primary text-white flex flex-col items-center">
          <Logo className="h-40 mb-12" variant="icon" mode="light" />
          <div className="flex gap-16 mb-16">
              <Instagram size={32} className="hover:text-secondary transition-all cursor-pointer hover:scale-125" />
              <Facebook size={32} className="hover:text-secondary transition-all cursor-pointer hover:scale-125" />
          </div>
          <p className="text-center opacity-30 text-[10px] font-black tracking-[0.3em] uppercase">© 2024 Caffédolce Torrefazione Italiana.</p>
      </footer>
    </div>
  );
};

export default HomeView;
