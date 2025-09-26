import React, { useState } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';

const LoginPage: React.FC = () => {
  const { login, isLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);

  const from = (location.state as any)?.from?.pathname || '/dashboard';

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      await login(formData.email, formData.password);
      toast.success(
        language === 'ka' 
          ? 'წარმატებით შეხვედით!' 
          : 'Successfully logged in!'
      );
      navigate(from, { replace: true });
    } catch (error) {
      toast.error(
        language === 'ka' 
          ? 'მონაცემები არასწორია' 
          : 'Invalid credentials'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-jakarta font-bold text-foreground mb-2">
          {language === 'ka' ? 'შესვლა' : 'Welcome Back'}
        </h1>
        <p className="text-foreground-muted">
          {language === 'ka' 
            ? 'შედით თქვენს ანგარიშში' 
            : 'Sign in to your account'
          }
        </p>
      </div>

      {/* Demo Credentials */}
      <div className="bg-primary/10 border border-primary/20 rounded-lg p-3 text-center">
        <p className="text-xs text-foreground mb-1">
          {language === 'ka' ? 'დემო მონაცემები:' : 'Demo credentials:'}
        </p>
        <p className="text-xs text-foreground-muted">
          demo@socialgenius.ge / demo123
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <Label htmlFor="email" className="text-foreground">
            {language === 'ka' ? 'ელ. ფოსტა' : 'Email'}
          </Label>
          <div className="relative mt-1">
            <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
            <Input
              id="email"
              name="email"
              type="email"
              required
              value={formData.email}
              onChange={handleChange}
              className="input-elegant pl-10"
              placeholder={language === 'ka' ? 'შეიყვანეთ ელ. ფოსტა' : 'Enter your email'}
            />
          </div>
        </div>

        <div>
          <Label htmlFor="password" className="text-foreground">
            {language === 'ka' ? 'პაროლი' : 'Password'}
          </Label>
          <div className="relative mt-1">
            <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
            <Input
              id="password"
              name="password"
              type={showPassword ? 'text' : 'password'}
              required
              value={formData.password}
              onChange={handleChange}
              className="input-elegant pl-10 pr-10"
              placeholder={language === 'ka' ? 'შეიყვანეთ პაროლი' : 'Enter your password'}
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-subtle hover:text-foreground"
            >
              {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
            </button>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <input
              id="remember-me"
              name="remember-me"
              type="checkbox"
              className="h-4 w-4 text-primary-light focus:ring-primary-light border-border rounded"
            />
            <Label htmlFor="remember-me" className="ml-2 text-sm text-foreground-muted">
              {language === 'ka' ? 'დამახსოვრება' : 'Remember me'}
            </Label>
          </div>

          <Link
            to="/forgot-password"
            className="text-sm text-primary-light hover:text-accent transition-colors"
          >
            {language === 'ka' ? 'დაგავიწყდა პაროლი?' : 'Forgot password?'}
          </Link>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full btn-hero"
        >
          {isLoading 
            ? (language === 'ka' ? 'შესვლა...' : 'Signing in...') 
            : (language === 'ka' ? 'შესვლა' : 'Sign In')
          }
        </Button>
      </form>

      <div className="text-center">
        <p className="text-foreground-muted">
          {language === 'ka' ? 'არ გაქვთ ანგარიში?' : "Don't have an account?"}{' '}
          <Link
            to="/register"
            className="text-primary-light hover:text-accent font-medium transition-colors"
          >
            {language === 'ka' ? 'რეგისტრაცია' : 'Sign up'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;