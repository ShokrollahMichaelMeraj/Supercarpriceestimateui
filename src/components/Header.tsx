interface HeaderProps {
  onNavigate?: (page: string) => void;
}

export function Header({ onNavigate }: HeaderProps) {
  return (
    <header className="fixed top-0 left-0 right-0 z-50 px-6 py-4">
      <div className="flex items-start justify-between">
        {/* Logo */}
        <button 
          onClick={() => onNavigate?.('home')}
          className="flex items-center gap-2 hover:opacity-80 transition-opacity"
        >
          <div className="w-10 h-10 bg-gradient-to-br from-red-600 to-orange-600 rounded-lg flex items-center justify-center">
            <span className="text-white">SC</span>
          </div>
          <div className="hidden md:block">
            <div className="text-gray-900">SuperCar</div>
            <div className="text-xs text-gray-600">Price Estimator</div>
          </div>
        </button>
      </div>
    </header>
  );
}
