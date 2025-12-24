import { ChevronDown } from 'lucide-react';

export default function ScrollCue() {
  const scrollToNext = () => {
    const essenceSection = document.getElementById('essence');
    if (essenceSection) {
      essenceSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <button
      onClick={scrollToNext}
      className="absolute bottom-12 left-1/2 -translate-x-1/2 animate-bounce cursor-pointer hover:text-gold transition-colors"
      aria-label="Scroll to next section"
    >
      <ChevronDown className="h-8 w-8 text-gold" strokeWidth={1} />
    </button>
  );
}
