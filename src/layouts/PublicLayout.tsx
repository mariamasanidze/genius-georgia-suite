import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Globe, Menu, X } from 'lucide-react';
import { useState } from 'react';

interface PublicLayoutProps {
  children: React.ReactNode;
}

const PublicLayout: React.FC<PublicLayoutProps> = ({ children }) => {
  const { language, setLanguage, t } = useLanguage();
  const location = useLocation();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navigation = [
    { name: t('nav.features'), href: '/features' },
    { name: t('nav.useCases'), href: '/use-cases' },
    { name: t('nav.pricing'), href: '/pricing' },
    { name: t('nav.about'), href: '/about' },
    { name: t('nav.contact'), href: '/contact' },
  ];

  const isActivePath = (path: string) => location.pathname === path;

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">SG</span>
              </div>
              <span className="text-xl font-jakarta font-bold text-gradient-hero">
                SocialGenius
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`text-sm font-medium transition-colors duration-200 ${
                    isActivePath(item.href)
                      ? 'text-primary-light'
                      : 'text-foreground-muted hover:text-foreground'
                  }`}
                >
                  {item.name}
                </Link>
              ))}
            </nav>

            {/* Desktop Actions */}
            <div className="hidden md:flex items-center space-x-4">
              {/* Language Toggle */}
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setLanguage(language === 'ka' ? 'en' : 'ka')}
                className="flex items-center space-x-1"
              >
                <Globe className="w-4 h-4" />
                <span className="text-xs font-medium">
                  {language === 'ka' ? 'ქარ' : 'ENG'}
                </span>
              </Button>

              <Link to="/login">
                <Button variant="ghost" size="sm">
                  {t('nav.login')}
                </Button>
              </Link>

              <Link to="/register">
                <Button className="btn-hero" size="sm">
                  {t('nav.register')}
                </Button>
              </Link>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="w-5 h-5" />
                ) : (
                  <Menu className="w-5 h-5" />
                )}
              </Button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden bg-background border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  to={item.href}
                  className={`block px-3 py-2 rounded-md text-base font-medium transition-colors duration-200 ${
                    isActivePath(item.href)
                      ? 'text-primary-light bg-secondary'
                      : 'text-foreground-muted hover:text-foreground hover:bg-secondary'
                  }`}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {item.name}
                </Link>
              ))}
              <div className="flex items-center justify-between pt-4 px-3">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => setLanguage(language === 'ka' ? 'en' : 'ka')}
                  className="flex items-center space-x-1"
                >
                  <Globe className="w-4 h-4" />
                  <span className="text-xs font-medium">
                    {language === 'ka' ? 'ქარ' : 'ENG'}
                  </span>
                </Button>
                <div className="flex space-x-2">
                  <Link to="/login">
                    <Button variant="ghost" size="sm">
                      {t('nav.login')}
                    </Button>
                  </Link>
                  <Link to="/register">
                    <Button className="btn-hero" size="sm">
                      {t('nav.register')}
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="pt-16">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-background-card border-t border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {/* Company Info */}
            <div className="col-span-1 md:col-span-2">
              <div className="flex items-center space-x-3 mb-4">
                <div className="w-8 h-8 bg-gradient-primary rounded-lg flex items-center justify-center">
                  <span className="text-white font-bold text-sm">SG</span>
                </div>
                <span className="text-xl font-jakarta font-bold text-gradient-hero">
                  SocialGenius
                </span>
              </div>
              <p className="text-foreground-muted mb-4 max-w-md">
                {language === 'ka' 
                  ? 'AI-ით შექმენი სოციალური მედია კონტენტი ქართული ბიზნესებისთვის. ავტომატური წარმოება, გეგმვა და ანალიტიკა.'
                  : 'Create social media content with AI for Georgian businesses. Automated creation, scheduling, and analytics.'
                }
              </p>
              <div className="text-sm text-foreground-subtle">
                © 2024 SocialGenius. All rights reserved.
              </div>
            </div>

            {/* Product Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                {language === 'ka' ? 'პროდუქტი' : 'Product'}
              </h3>
              <ul className="space-y-2">
                {navigation.map((item) => (
                  <li key={item.name}>
                    <Link
                      to={item.href}
                      className="text-foreground-muted hover:text-foreground transition-colors"
                    >
                      {item.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Support Links */}
            <div>
              <h3 className="font-semibold text-foreground mb-4">
                {language === 'ka' ? 'მხარდაჭერა' : 'Support'}
              </h3>
              <ul className="space-y-2">
                <li>
                  <Link to="/contact" className="text-foreground-muted hover:text-foreground transition-colors">
                    {language === 'ka' ? 'დახმარება' : 'Help Center'}
                  </Link>
                </li>
                <li>
                  <Link to="/contact" className="text-foreground-muted hover:text-foreground transition-colors">
                    {language === 'ka' ? 'კონტაქტი' : 'Contact Us'}
                  </Link>
                </li>
                <li>
                  <Link to="/about" className="text-foreground-muted hover:text-foreground transition-colors">
                    {language === 'ka' ? 'ჩვენს შესახებ' : 'About Us'}
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default PublicLayout;