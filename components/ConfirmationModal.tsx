import React from 'react';

interface ConfirmationModalProps {
   isOpen: boolean;
   title: string;
   message: string;
   onConfirm: () => void;
   onCancel: () => void;
   danger?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({ isOpen, title, message, onConfirm, onCancel, danger = false }) => {
   if (!isOpen) return null;
   return (
      <div className="fixed inset-0 z-[300] bg-background-dark/95 backdrop-blur-md flex items-center justify-center p-6 animate-fade-in">
         <div className="bg-card-dark border border-slate-700 rounded-2xl w-full max-w-md p-8 shadow-2xl relative overflow-hidden">
            <div className={`absolute top-0 left-0 w-full h-1 ${danger ? 'bg-red-500' : 'bg-primary'}`} />
            
            <div className="flex items-center gap-4 mb-6">
               <div className={`w-12 h-12 rounded-xl flex items-center justify-center ${danger ? 'bg-red-500/10 text-red-500' : 'bg-primary/10 text-primary'}`}>
                  <span className="material-symbols-outlined text-3xl">{danger ? 'warning' : 'help'}</span>
               </div>
               <div>
                  <h3 className="text-xl font-black tracking-widest text-white uppercase">{title}</h3>
                  <p className="text-[10px] text-slate-500 font-bold tracking-widest uppercase">System Confirmation Required</p>
               </div>
            </div>

            <p className="text-slate-300 text-sm leading-relaxed mb-8">
               {message}
            </p>

            <div className="flex gap-4">
               <button 
                  onClick={onCancel}
                  className="flex-1 px-6 py-3 bg-white/5 hover:bg-white/10 text-slate-400 hover:text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all border border-white/5"
               >
                  Cancel
               </button>
               <button 
                  onClick={() => { onConfirm(); onCancel(); }}
                  className={`flex-1 px-6 py-3 ${danger ? 'bg-red-600 hover:bg-red-700' : 'bg-primary hover:bg-primary-dark'} text-white rounded-xl text-[11px] font-black uppercase tracking-widest transition-all shadow-xl`}
               >
                  Confirm
               </button>
            </div>
         </div>
      </div>
   );
};

export default ConfirmationModal;
