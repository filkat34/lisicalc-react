import { useState } from 'react';
import AccordeonInfo from './AccordeonInfo';

export default function Header() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <header className="flex fixed top-0 left-0 w-full z-50 bg-white p-2 shadow">
        <div className="text-3xl text-blue-600 hover:text-blue-500">LisiCalc</div>
        <div className="flex-1" />
        <button
          className="bg-blue-600 border-neutral-300 hover:bg-blue-500 text-white rounded-full w-7 h-7 flex items-center justify-center mb-2 shadow-md border-2 transition-colors cursor-pointer aspect-square p-0"
          onClick={() => setOpen(true)}
        >
          <span className="text-xl font-bold">?</span>
        </button>
      </header>
      
      {open && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="bg-white rounded-xl shadow-lg p-6 max-w-lg w-full relative">
            <button
              className="absolute top-2 right-2 text-3xl hover:text-blue-500"
              onClick={() => setOpen(false)}
              aria-label="Fermer"
            >
              &times;
            </button>
            <AccordeonInfo />
          </div>
        </div>
      )}
    </>
  );
}