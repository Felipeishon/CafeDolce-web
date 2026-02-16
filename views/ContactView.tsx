
import React, { useState } from 'react';
import { Send, CheckCircle } from 'lucide-react';
import { Language } from '../types';

const contactI18n = {
  es: { title: '¿Preguntas?', sub: 'Escríbenos y te responderemos pronto.', name: 'Nombre', email: 'Correo', msg: 'Mensaje', btn: 'Enviar', success: '¡Enviado!' },
  it: { title: 'Domande?', sub: 'Scrivici e ti risponderemo presto.', name: 'Nome', email: 'Email', msg: 'Messaggio', btn: 'Invia', success: '¡Inviato!' },
  en: { title: 'Questions?', sub: 'Write to us and we will reply soon.', name: 'Name', email: 'Email', msg: 'Message', btn: 'Send', success: 'Sent!' }
};

interface ContactViewProps {
  lang: Language;
}

const ContactView: React.FC<ContactViewProps> = ({ lang }) => {
  const [submitted, setSubmitted] = useState(false);
  const t = contactI18n[lang];

  return (
    <div className="p-6 animate-in fade-in max-w-md mx-auto py-20">
      <h2 className="text-4xl font-black italic text-primary mb-2 uppercase tracking-tighter">{t.title}</h2>
      <p className="text-zinc-500 mb-10 text-lg">{t.sub}</p>
      
      {submitted ? (
        <div className="bg-green-50 p-10 rounded-[3rem] text-center">
          <CheckCircle className="text-green-500 mx-auto mb-4" size={56} />
          <h3 className="text-xl font-bold text-green-800">{t.success}</h3>
        </div>
      ) : (
        <form onSubmit={(e) => { e.preventDefault(); setSubmitted(true); }} className="space-y-6">
          <input className="w-full p-5 rounded-2xl bg-white ring-1 ring-primary/10" placeholder={t.name} required />
          <input className="w-full p-5 rounded-2xl bg-white ring-1 ring-primary/10" placeholder={t.email} type="email" required />
          <textarea className="w-full p-5 rounded-2xl bg-white ring-1 ring-primary/10 h-40" placeholder={t.msg} required />
          <button className="w-full bg-primary text-white p-5 rounded-[2rem] font-black tracking-widest flex items-center justify-center gap-2">
            {t.btn} <Send size={20} />
          </button>
        </form>
      )}
    </div>
  );
};

export default ContactView;
