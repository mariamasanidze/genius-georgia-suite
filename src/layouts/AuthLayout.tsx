import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { language, setLanguage } = useLanguage();

  return (
    <div className="min-h-screen bg-hero flex items-center justify-center px-4 sm:px-6 lg:px-8 relative">
      {/* Background mesh */}
      <div className="absolute inset-0 bg-mesh opacity-50" />
      
      {/* Header */}
      <div className="absolute top-0 left-0 right-0 p-6">
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          <Link to="/" className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-white/20 backdrop-blur-sm rounded-lg flex items-center justify-center border border-white/30">
              <span className="text-white font-bold text-sm">SG</span>
            </div>
            <span className="text-xl font-jakarta font-bold text-white">
              SocialGenius
            </span>
          </Link>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => setLanguage(language === 'ka' ? 'en' : 'ka')}
            className="flex items-center space-x-1 text-white hover:bg-white/10"
          >
            <Globe className="w-4 h-4" />
            <span className="text-xs font-medium">
              {language === 'ka' ? 'ქარ' : 'ENG'}
            </span>
          </Button>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative w-full max-w-md">
        <div className="glassmorphism p-8 shadow-elegant">
          {children}
        </div>
        
        {/* Back to Home */}
        <div className="text-center mt-6">
          <Link 
            to="/" 
            className="text-white/80 hover:text-white text-sm transition-colors"
          >
            ← {language === 'ka' ? 'უკან მთავარ გვერდზე' : 'Back to Home'}
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;