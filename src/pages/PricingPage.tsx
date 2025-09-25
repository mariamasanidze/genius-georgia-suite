import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  Check, 
  X, 
  ArrowRight,
  Smartphone,
  Zap,
  Building,
  Star
} from 'lucide-react';

const PricingPage: React.FC = () => {
  const { language } = useLanguage();

  const plans = [
    {
      name: language === 'ka' ? 'სტარტერი' : 'Starter',
      price: '49₾',
      period: language === 'ka' ? 'თვეში' : '/month',
      description: language === 'ka' 
        ? 'პატარა ბიზნესებისთვის' 
        : 'For small businesses',
      icon: Smartphone,
      popular: false,
      features: [
        { name: language === 'ka' ? '50 პოსტი თვეში' : '50 posts per month', included: true },
        { name: language === 'ka' ? '2 სოციალური აკაუნტი' : '2 social accounts', included: true },
        { name: language === 'ka' ? 'ბაზისური ანალიტიკა' : 'Basic analytics', included: true },
        { name: language === 'ka' ? 'ქართული/ინგლისური კონტენტი' : 'Georgian/English content', included: true },
        { name: language === 'ka' ? 'ელ.ფოსტა მხარდაჭერა' : 'Email support', included: true },
        { name: language === 'ka' ? 'ვიზუალური კონტენტი' : 'Visual content creator', included: false },
        { name: language === 'ka' ? 'პრიორიტეტული მხარდაჭერა' : 'Priority support', included: false },
        { name: language === 'ka' ? 'API წვდომა' : 'API access', included: false }
      ]
    },
    {
      name: language === 'ka' ? 'პროფესიონალი' : 'Professional',
      price: '99₾',
      period: language === 'ka' ? 'თვეში' : '/month',
      description: language === 'ka' 
        ? 'რბილი ბიზნესებისთვის' 
        : 'For growing businesses',
      icon: Zap,
      popular: true,
      features: [
        { name: language === 'ka' ? '200 პოსტი თვეში' : '200 posts per month', included: true },
        { name: language === 'ka' ? '5 სოციალური აკაუნტი' : '5 social accounts', included: true },
        { name: language === 'ka' ? 'დამატებითი ანალიტიკა' : 'Advanced analytics', included: true },
        { name: language === 'ka' ? 'ვიზუალური კონტენტის შემქმნელი' : 'Visual content creator', included: true },
        { name: language === 'ka' ? 'პრიორიტეტული მხარდაჭერა' : 'Priority support', included: true },
        { name: language === 'ka' ? 'თიმის კოლაბორაცია' : 'Team collaboration', included: true },
        { name: language === 'ka' ? 'ბრენდინგის მორგება' : 'Custom branding', included: false },
        { name: language === 'ka' ? 'API წვდომა' : 'API access', included: false }
      ]
    },
    {
      name: language === 'ka' ? 'ენტერპრაიზი' : 'Enterprise',
      price: '199₾',
      period: language === 'ka' ? 'თვეში' : '/month',
      description: language === 'ka' 
        ? 'დიდი კომპანიებისთვის' 
        : 'For large companies',
      icon: Building,
      popular: false,
      features: [
        { name: language === 'ka' ? 'ულიმიტო პოსტები' : 'Unlimited posts', included: true },
        { name: language === 'ka' ? '10+ სოციალური აკაუნტი' : '10+ social accounts', included: true },
        { name: language === 'ka' ? 'ბრენდინგის მორგება' : 'Custom branding', included: true },
        { name: language === 'ka' ? 'მოწინავე ანალიტიკა' : 'Enterprise analytics', included: true },
        { name: language === 'ka' ? 'დედიკირებული მენეჯერი' : 'Dedicated manager', included: true },
        { name: language === 'ka' ? 'API წვდომა' : 'API access', included: true },
        { name: language === 'ka' ? 'თეთრი ლეიბლი' : 'White label solution', included: true },
        { name: language === 'ka' ? '24/7 მხარდაჭერა' : '24/7 support', included: true }
      ]
    }
  ];

  const faqs = [
    {
      question: language === 'ka' ? 'შეიძლება თუ არა გეგმის შეცვლა?' : 'Can I change my plan?',
      answer: language === 'ka' 
        ? 'დიახ, შეგიძლიათ ნებისმიერ დროს გეგმის ამაღლება ან დაწევა. ცვლილებები ძალაში შედის მომდევნო საბილინგო ციკლიდან.'
        : 'Yes, you can upgrade or downgrade your plan at any time. Changes take effect from the next billing cycle.'
    },
    {
      question: language === 'ka' ? 'არის თუ არა უფასო ტესტი?' : 'Is there a free trial?',
      answer: language === 'ka'
        ? 'დიახ, ყველა გეგმისთვის ვთავაზობთ 14-დღიან უფასო ტესტს. ბარათის დეტალები არ არის საჭირო.'
        : 'Yes, we offer a 14-day free trial for all plans. No credit card details required.'
    },
    {
      question: language === 'ka' ? 'რა ხდება ჩემს მონაცემებთან გაუქმების შემთხვევაში?' : 'What happens to my data if I cancel?',
      answer: language === 'ka'
        ? 'გაუქმების შემდეგ თქვენი მონაცემები 30 დღის განმავლობაში ინახება. ამ პერიოდში შეგიძლიათ ანგარიშის აღდგენა.'
        : 'After cancellation, your data is kept for 30 days. You can restore your account during this period.'
    },
    {
      question: language === 'ka' ? 'რამდენ ენაზე მუშაობს პლატფორმა?' : 'How many languages does the platform support?',
      answer: language === 'ka'
        ? 'პლატფორმა მხარს უჭერს ქართულ და ინგლისურ ენებს. AI ასევე იგენერირებს კონტენტს ორივე ენაზე.'
        : 'The platform supports Georgian and English languages. AI also generates content in both languages.'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative bg-hero py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-white mb-6">
            {language === 'ka' ? 'მარტივი ფასები' : 'Simple Pricing'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            {language === 'ka'
              ? 'აირჩიეთ გეგმა რომელიც ყველაზე ზუსტად შეესაბამება თქვენს ბიზნესს'
              : 'Choose the plan that best fits your business needs'
            }
          </p>
          
          {/* Toggle between monthly/yearly */}
          <div className="flex items-center justify-center space-x-4 mb-12">
            <span className="text-white/80">
              {language === 'ka' ? 'ყოველთვიური' : 'Monthly'}
            </span>
            <div className="bg-white/10 rounded-full p-1 backdrop-blur-sm border border-white/20">
              <div className="bg-white rounded-full px-4 py-2 text-sm font-medium text-primary">
                {language === 'ka' ? 'ყოველთვიური' : 'Monthly'}
              </div>
            </div>
            <span className="text-white/60">
              {language === 'ka' ? 'ყოველწლიური' : 'Yearly'}
              <span className="ml-1 text-xs bg-georgian-accent px-2 py-1 rounded-full">
                -20%
              </span>
            </span>
          </div>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => {
              const Icon = plan.icon;
              return (
                <div 
                  key={index} 
                  className={`relative card-feature ${plan.popular ? 'ring-2 ring-primary-light scale-105' : ''}`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-primary text-white px-4 py-1 rounded-full text-sm font-medium flex items-center">
                        <Star className="w-3 h-3 mr-1" />
                        {language === 'ka' ? 'პოპულარული' : 'Popular'}
                      </div>
                    </div>
                  )}
                  
                  <div className="text-center mb-8">
                    <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-4">
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <h3 className="text-2xl font-jakarta font-bold text-foreground mb-2">
                      {plan.name}
                    </h3>
                    <p className="text-foreground-muted mb-4">
                      {plan.description}
                    </p>
                    <div className="flex items-baseline justify-center">
                      <span className="text-4xl font-bold text-gradient-hero">
                        {plan.price}
                      </span>
                      <span className="text-foreground-muted ml-1">
                        {plan.period}
                      </span>
                    </div>
                  </div>

                  <div className="space-y-4 mb-8">
                    {plan.features.map((feature, i) => (
                      <div key={i} className="flex items-center">
                        {feature.included ? (
                          <Check className="w-5 h-5 text-primary-light mr-3 flex-shrink-0" />
                        ) : (
                          <X className="w-5 h-5 text-foreground-subtle mr-3 flex-shrink-0" />
                        )}
                        <span className={`text-sm ${feature.included ? 'text-foreground' : 'text-foreground-subtle'}`}>
                          {feature.name}
                        </span>
                      </div>
                    ))}
                  </div>

                  <Link to="/register" className="block">
                    <Button 
                      className={`w-full ${plan.popular ? 'btn-hero' : 'btn-outline-hero'}`}
                    >
                      {language === 'ka' ? 'დაიწყე' : 'Get Started'}
                      <ArrowRight className="ml-2 w-4 h-4" />
                    </Button>
                  </Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Features Comparison */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-gradient-hero mb-4">
              {language === 'ka' ? 'რატომ SocialGenius?' : 'Why SocialGenius?'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="stat-card text-center">
              <div className="text-3xl font-bold text-gradient-hero mb-2">
                85%
              </div>
              <div className="text-foreground-muted">
                {language === 'ka' ? 'დროის დაზოგვა' : 'Time Saved'}
              </div>
            </div>
            <div className="stat-card text-center">
              <div className="text-3xl font-bold text-gradient-hero mb-2">
                +150%
              </div>
              <div className="text-foreground-muted">
                {language === 'ka' ? 'ჩართულობის ზრდა' : 'Engagement Growth'}
              </div>
            </div>
            <div className="stat-card text-center">
              <div className="text-3xl font-bold text-gradient-hero mb-2">
                24/7
              </div>
              <div className="text-foreground-muted">
                {language === 'ka' ? 'მხარდაჭერა' : 'Support'}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-gradient-hero mb-4">
              {language === 'ka' ? 'ხშირად დასმული კითხვები' : 'Frequently Asked Questions'}
            </h2>
          </div>

          <div className="space-y-6">
            {faqs.map((faq, index) => (
              <div key={index} className="card-feature">
                <h3 className="text-lg font-semibold text-foreground mb-3">
                  {faq.question}
                </h3>
                <p className="text-foreground-muted">
                  {faq.answer}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-white mb-6">
            {language === 'ka' 
              ? 'მზად ხარ დასაწყებად?' 
              : 'Ready to Get Started?'
            }
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {language === 'ka'
              ? 'შეუერთდი ათასობით ქართულ ბიზნესს რომლებიც ზოგავენ დროს AI-ით'
              : 'Join thousands of Georgian businesses saving time with AI'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="btn-hero text-lg px-8 py-4">
                {language === 'ka' ? 'დაიწყე უფასო ტესტი' : 'Start Free Trial'}
                <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
            <Link to="/contact">
              <Button variant="outline" className="btn-outline-hero text-lg px-8 py-4">
                {language === 'ka' ? 'დაგვიკავშირდი' : 'Contact Sales'}
              </Button>
            </Link>
          </div>

          <div className="mt-8 text-white/70 text-sm">
            {language === 'ka' 
              ? '✓ უფასო 14-დღიანი ტესტი • ✓ ბარათის გარეშე • ✓ ყველა ფუნქცია'
              : '✓ Free 14-day trial • ✓ No credit card • ✓ All features included'
            }
          </div>
        </div>
      </section>
    </div>
  );
};

export default PricingPage;