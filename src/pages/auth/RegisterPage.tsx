import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Eye, EyeOff, Mail, Lock, User, Building } from 'lucide-react';

const RegisterPage: React.FC = () => {
  const { register, isLoading } = useAuth();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    businessName: '',
    businessType: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const businessTypes = [
    { value: 'restaurant', label: language === 'ka' ? 'რესტორანი/კაფე' : 'Restaurant/Cafe' },
    { value: 'retail', label: language === 'ka' ? 'საცალო ვაჭრობა' : 'Retail' },
    { value: 'services', label: language === 'ka' ? 'სერვისები' : 'Services' },
    { value: 'tourism', label: language === 'ka' ? 'ტურიზმი' : 'Tourism' },
    { value: 'freelancer', label: language === 'ka' ? 'ფრილანსერი' : 'Freelancer' },
    { value: 'other', label: language === 'ka' ? 'სხვა' : 'Other' }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (formData.password !== formData.confirmPassword) {
      toast.error(
        language === 'ka' 
          ? 'პაროლები არ ემთხვევა' 
          : 'Passwords do not match'
      );
      return;
    }

    if (formData.password.length < 6) {
      toast.error(
        language === 'ka' 
          ? 'პაროლი უნდა იყოს მინიმუმ 6 სიმბოლო' 
          : 'Password must be at least 6 characters'
      );
      return;
    }
    
    try {
      await register(formData);
      toast.success(
        language === 'ka' 
          ? 'წარმატებით დარეგისტრირდით!' 
          : 'Successfully registered!'
      );
      navigate('/dashboard');
    } catch (error) {
      toast.error(
        language === 'ka' 
          ? 'რეგისტრაციის შეცდომა' 
          : 'Registration failed'
      );
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleBusinessTypeChange = (value: string) => {
    setFormData({
      ...formData,
      businessType: value
    });
  };

  return (
    <div className="space-y-6">
      <div className="text-center">
        <h1 className="text-2xl font-jakarta font-bold text-foreground mb-2">
          {language === 'ka' ? 'რეგისტრაცია' : 'Create Account'}
        </h1>
        <p className="text-foreground-muted">
          {language === 'ka' 
            ? 'შექმენით თქვენი ანგარიში' 
            : 'Get started with SocialGenius'
          }
        </p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Label htmlFor="name" className="text-foreground">
              {language === 'ka' ? 'სახელი' : 'Full Name'}
            </Label>
            <div className="relative mt-1">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
              <Input
                id="name"
                name="name"
                type="text"
                required
                value={formData.name}
                onChange={handleChange}
                className="input-elegant pl-10"
                placeholder={language === 'ka' ? 'შეიყვანეთ სახელი' : 'Enter your name'}
              />
            </div>
          </div>

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
        </div>

        <div>
          <Label htmlFor="businessName" className="text-foreground">
            {language === 'ka' ? 'ბიზნესის სახელი' : 'Business Name'}
          </Label>
          <div className="relative mt-1">
            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
            <Input
              id="businessName"
              name="businessName"
              type="text"
              required
              value={formData.businessName}
              onChange={handleChange}
              className="input-elegant pl-10"
              placeholder={language === 'ka' ? 'შეიყვანეთ ბიზნესის სახელი' : 'Enter your business name'}
            />
          </div>
        </div>

        <div>
          <Label className="text-foreground">
            {language === 'ka' ? 'ბიზნესის ტიპი' : 'Business Type'}
          </Label>
          <Select onValueChange={handleBusinessTypeChange} required>
            <SelectTrigger className="mt-1">
              <SelectValue placeholder={language === 'ka' ? 'აირჩიეთ ბიზნესის ტიპი' : 'Select business type'} />
            </SelectTrigger>
            <SelectContent>
              {businessTypes.map((type) => (
                <SelectItem key={type.value} value={type.value}>
                  {type.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                placeholder={language === 'ka' ? 'შეიყვანეთ პაროლი' : 'Enter password'}
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

          <div>
            <Label htmlFor="confirmPassword" className="text-foreground">
              {language === 'ka' ? 'გაიმეორეთ პაროლი' : 'Confirm Password'}
            </Label>
            <div className="relative mt-1">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-foreground-subtle" />
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={formData.confirmPassword}
                onChange={handleChange}
                className="input-elegant pl-10 pr-10"
                placeholder={language === 'ka' ? 'გაიმეორეთ პაროლი' : 'Confirm password'}
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-foreground-subtle hover:text-foreground"
              >
                {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>
        </div>

        <div className="flex items-center">
          <input
            id="terms"
            name="terms"
            type="checkbox"
            required
            className="h-4 w-4 text-primary-light focus:ring-primary-light border-border rounded"
          />
          <Label htmlFor="terms" className="ml-2 text-sm text-foreground-muted">
            {language === 'ka' 
              ? 'ვეთანხმები ' 
              : 'I agree to the '
            }
            <Link to="/terms" className="text-primary-light hover:text-accent">
              {language === 'ka' ? 'წესებსა და პირობებს' : 'Terms and Conditions'}
            </Link>
          </Label>
        </div>

        <Button
          type="submit"
          disabled={isLoading}
          className="w-full btn-hero"
        >
          {isLoading 
            ? (language === 'ka' ? 'რეგისტრაცია...' : 'Creating account...') 
            : (language === 'ka' ? 'რეგისტრაცია' : 'Create Account')
          }
        </Button>
      </form>

      <div className="text-center">
        <p className="text-foreground-muted">
          {language === 'ka' ? 'უკვე გაქვთ ანგარიში?' : 'Already have an account?'}{' '}
          <Link
            to="/login"
            className="text-primary-light hover:text-accent font-medium transition-colors"
          >
            {language === 'ka' ? 'შესვლა' : 'Sign in'}
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;