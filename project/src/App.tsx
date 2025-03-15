import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';

const confirmationMessages = [
  "Are you sure you want to enter?",
  "Are you REALLY sure?",
  "Like, ACTUALLY sure?",
  "But are you DEFINITELY sure though?",
  "Come on, think about it again... Are you sure?",
  "Maybe you should reconsider... Still sure?",
  "This is a waste of time... Still want to continue?",
  "Seriously, don't you have better things to do?",
  "Your persistence is admirable, but... sure?",
  "This website is literally useless... Continue?",
  "You could be learning a new skill instead...",
  "Have you done your laundry today?",
  "Maybe call your mom instead?",
  "Did you drink water today? Stay hydrated!",
  "Fun fact: This website goes nowhere...",
  "Still clicking? Impressive dedication!",
  "Plot twist: There's nothing after this...",
  "Just checking: Still sure?",
  "Warning: More confirmations ahead...",
  "You're really committed to this, huh?"
];

const randomMessages = Array.from({ length: 980 }, () => {
  const baseMessage = confirmationMessages[Math.floor(Math.random() * confirmationMessages.length)];
  return `${baseMessage} (${Math.random().toString(36).substring(7)})`;
});

const allMessages = [...confirmationMessages, ...randomMessages];

function getRandomPosition(padding = 100) {
  return {
    left: `${Math.random() * (window.innerWidth - padding)}px`,
    top: `${Math.random() * (window.innerHeight - padding)}px`
  };
}

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [noCount, setNoCount] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dialogPosition, setDialogPosition] = useState({ left: '50%', top: '50%' });

  useEffect(() => {
    // Move dialog to random position when message changes
    setDialogPosition(getRandomPosition(400));
  }, [currentIndex]);

  const handleYesClick = () => {
    setCurrentIndex((prev) => (prev + 1) % allMessages.length);
  };

  const handleNoClick = () => {
    setNoCount((prev) => prev + 1);
    setCurrentIndex(Math.max(0, currentIndex - Math.floor(Math.random() * 5)));
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    setMousePosition({ x: e.clientX, y: e.clientY });
  };

  const getNoButtonPosition = () => {
    const distance = Math.sqrt(
      Math.pow(mousePosition.x - window.innerWidth / 2, 2) +
      Math.pow(mousePosition.y - window.innerHeight / 2, 2)
    );

    if (distance < 200) {
      const angle = Math.random() * Math.PI * 2;
      return {
        position: 'absolute',
        left: `${Math.max(0, Math.min(window.innerWidth - 100, window.innerWidth / 2 + Math.cos(angle) * 200))}px`,
        top: `${Math.max(0, Math.min(window.innerHeight - 40, window.innerHeight / 2 + Math.sin(angle) * 200))}px`,
      };
    }
    return {};
  };

  return (
    <div 
      className="min-h-screen bg-gradient-to-br from-purple-500 to-pink-500 overflow-hidden relative"
      onMouseMove={handleMouseMove}
    >
      <div 
        className="bg-white p-8 rounded-lg shadow-xl max-w-md w-full absolute transition-all duration-300 ease-in-out"
        style={{
          left: dialogPosition.left,
          top: dialogPosition.top,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <div className="flex items-center justify-center mb-6">
          <AlertCircle className="w-12 h-12 text-yellow-500 animate-pulse" />
        </div>
        
        <h2 className="text-2xl font-bold text-center mb-6">
          Confirmation #{currentIndex + 1}
        </h2>
        
        <p className="text-lg text-center mb-8">
          {allMessages[currentIndex]}
        </p>

        <div className="flex flex-col gap-4">
          <button
            onClick={handleYesClick}
            className="bg-blue-500 hover:bg-blue-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
          >
            Yes, I'm sure!
          </button>
          
          <button
            onClick={handleNoClick}
            style={getNoButtonPosition()}
            className="bg-red-500 hover:bg-red-600 text-white font-bold py-3 px-6 rounded-lg transition-all transform hover:scale-105"
          >
            No, go back! ({noCount} times)
          </button>
        </div>

        <p className="text-sm text-gray-500 mt-6 text-center">
          Progress: {((currentIndex / allMessages.length) * 100).toFixed(2)}% complete
          {currentIndex > 10 && " (not that it matters...)"}
        </p>
      </div>
    </div>
  );
}

export default App;