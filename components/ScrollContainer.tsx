import React, { useRef } from 'react';

const ScrollContainer: React.FC<{ children: React.ReactNode, className?: string }> = ({ children, className }) => {
   const scrollRef = useRef<HTMLDivElement>(null);
   const scroll = (amount: number) => {
      if (scrollRef.current) {
         scrollRef.current.scrollBy({ top: amount, behavior: 'smooth' });
      }
   };

   return (
      <div className={`relative flex flex-col overflow-hidden group/scroll ${className || ''}`}>
         <button
            onClick={() => scroll(-150)}
            className="absolute top-2 left-1/2 -translate-x-1/2 z-20 w-8 h-8 bg-slate-800/90 border border-slate-700 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 hover:bg-primary/20 hover:text-primary hover:border-primary transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-none group-hover/scroll:pointer-events-auto backdrop-blur-md"
         >
            <span className="material-symbols-outlined leading-none">keyboard_arrow_up</span>
         </button>

         <div ref={scrollRef} className="flex-1 overflow-y-auto no-scrollbar scroll-smooth pb-4 px-1">
            {children}
         </div>

         <button
            onClick={() => scroll(150)}
            className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 w-8 h-8 bg-slate-800/90 border border-slate-700 text-slate-400 rounded-full flex items-center justify-center opacity-0 group-hover/scroll:opacity-100 hover:bg-primary/20 hover:text-primary hover:border-primary transition-all shadow-[0_0_15px_rgba(0,0,0,0.8)] pointer-events-none group-hover/scroll:pointer-events-auto backdrop-blur-md"
         >
            <span className="material-symbols-outlined leading-none">keyboard_arrow_down</span>
         </button>
      </div>
   );
};

export default ScrollContainer;
