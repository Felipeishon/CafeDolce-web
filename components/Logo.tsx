
import React from 'react';

interface LogoProps {
  className?: string;
  variant?: 'full' | 'icon' | 'text';
  mode?: 'dark' | 'light'; // dark = para fondos claros (usa marrón), light = para fondos oscuros (usa blanco)
}

const Logo: React.FC<LogoProps> = ({ className = "h-12", variant = 'full', mode = 'dark' }) => {
  // El círculo siempre es Cian, la taza siempre es Blanca
  const cyan = '#0097B2';
  const cupColor = '#FFFFFF';
  
  // Lo que cambia según el modo es el color de los ornamentos y el texto
  const detailColor = mode === 'light' ? '#FFFFFF' : '#6F3D2E';

  const IconPart = () => (
    <g className="logo-icon">
      {/* Círculo Cian con sombra para profundidad */}
      <circle cx="200" cy="100" r="75" fill={cyan} className="drop-shadow-lg" />
      
      {/* Taza Blanca - Siempre blanca sobre el cian */}
      <path 
        d="M165 105C165 120 175 130 195 130C215 130 225 120 225 105H165Z" 
        stroke={cupColor} 
        strokeWidth="6" 
        fill="none" 
      />
      <path 
        d="M225 105C235 105 242 110 242 118C242 125 235 128 225 126" 
        stroke={cupColor} 
        strokeWidth="5" 
        fill="none" 
      />
      
      {/* Humo - Blanco sutil */}
      <path d="M190 85Q195 75 200 85T210 85" stroke={cupColor} strokeWidth="3" fill="none" opacity="0.8" />
      <path d="M195 75Q200 65 205 75" stroke={cupColor} strokeWidth="2" fill="none" opacity="0.6" />

      {/* Ornamentos - Cambian según el modo (Blanco o Marrón) */}
      <path 
        d="M130 130Q80 110 50 160Q30 210 70 210Q100 210 110 170" 
        stroke={detailColor} 
        strokeWidth="7" 
        fill="none" 
        strokeLinecap="round" 
      />
      <path 
        d="M270 130Q320 110 350 160Q370 210 330 210Q300 210 290 170" 
        stroke={detailColor} 
        strokeWidth="7" 
        fill="none" 
        strokeLinecap="round" 
      />
    </g>
  );

  const TextPart = () => (
    <text 
      x="200" 
      y="265" 
      textAnchor="middle" 
      fill={detailColor} 
      style={{ 
        fontFamily: 'serif', 
        fontWeight: '900', 
        fontSize: '72px', 
        fontStyle: 'italic', 
        letterSpacing: '-3px' 
      }}
    >
      Caffédolce
    </text>
  );

  return (
    <div className={`flex flex-col items-center justify-center ${className}`}>
      <svg viewBox="0 0 400 300" className="w-full h-full" fill="none" xmlns="http://www.w3.org/2000/svg">
        {(variant === 'full' || variant === 'icon') && <IconPart />}
        {(variant === 'full' || variant === 'text') && <TextPart />}
      </svg>
    </div>
  );
};

export default Logo;
