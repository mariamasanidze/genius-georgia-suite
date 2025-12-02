import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';

interface AuthLayoutProps {
  children: React.ReactNode;
}

const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  const { language, setLanguage } = useLanguage();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const arrayChildren = React.Children.toArray(children);

 
  const title = arrayChildren.find(
    (c: any) => c.type === "h1"
  );


  const content = arrayChildren.filter(
    (c: any) => c !== title
  );

  return (
    <div className="min-h-screen bg-hero relative">

      {/* NAV */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-black border-b border-border">
        <div className="max-w-7xl mx-auto px-4">
          <div className="h-16 flex items-center justify-between">

            <Link to="/" className="text-2xl font-jakarta font-bold text-gradient-hero">
              SocialGenius
            </Link>

            <Button
              variant="ghost"
              size="sm"
              onClick={() => setLanguage(language === 'ka' ? 'en' : 'ka')}
            >
              <Globe className="w-4 h-4" />
              <span className="ml-1 text-xs">{language === 'ka' ? 'ქარ' : 'ENG'}</span>
            </Button>

            <Button
              variant="ghost"
              size="sm"
              className="md:hidden"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X /> : <Menu />}
            </Button>

          </div>
        </div>
      </header>

      {/* PAGE */}
      <main className="pt-24 px-4 flex justify-center relative z-10">

        <div className="w-full max-w-md">

          {/* Back + Title */}
          <div className="flex items-center gap-3 mb-4">
  
         <Link 
            to="/" 
               className="px-3 py-1.5 rounded-md bg-white/10 hover:bg-white/20 text-white text-sm border border-white/20 flex items-center gap-2"
            >
              ← Back
          </Link>


            <div className="flex-1 text-center text-xl font-bold text-foreground">
              {title}
            </div>
          </div>

          {/* Card */}
          <div className="card-gradient p-8 shadow-elegant">
            {content}
          </div>

        </div>

      </main>
    </div>
  );
};

export default AuthLayout;
