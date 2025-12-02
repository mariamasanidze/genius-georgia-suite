import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  PenTool, 
  Calendar, 
  BarChart3, 
  Zap,
  Globe,
  Users,
  Clock,
  Shield,
  Smartphone,
  Target,
  TrendingUp,
  CheckCircle
} from 'lucide-react';

const FeaturesPage: React.FC = () => {
  const { language } = useLanguage();

  const features = [
    {
      icon: PenTool,
      title: language === 'ka' ? 'AI კონტენტის გენერაცია' : 'AI Content Generation',
      description: language === 'ka' 
        ? 'ქართული კულტურისა და ენის სპეციფიკის გათვალისწინებით კონტენტის ავტომატური შექმნა'
        : 'Automatic content creation considering Georgian culture and language specifics',
      benefits: [
        language === 'ka' ? 'ქართული კონტექსტი' : 'Georgian context',
        language === 'ka' ? 'კულტურული რელევანტურობა' : 'Cultural relevance',
        language === 'ka' ? 'ენობრივი სიზუსტე' : 'Linguistic accuracy'
      ]
    },
    {
      icon: Calendar,
      title: language === 'ka' ? 'ავტომატური გამოქვეყნება' : 'Auto-Publishing',
      description: language === 'ka'
        ? 'შეგიძლიათ წინასწარ დაგეგმოთ და ავტომატურად გამოაქვეყნოთ კონტენტი ყველა პლატფორმაზე'
        : 'Schedule and automatically publish content across all platforms',
      benefits: [
        language === 'ka' ? 'Facebook, Instagram, TikTok' : 'Facebook, Instagram, TikTok',
        language === 'ka' ? 'ოპტიმალური დრო' : 'Optimal timing',
        language === 'ka' ? 'ავტომატური მართვა' : 'Automated management'
      ]
    },
    {
      icon: BarChart3,
      title: language === 'ka' ? 'ანალიტიკა და რეპორტები' : 'Analytics & Reports',
      description: language === 'ka'
        ? 'დეტალური ანალიტიკა თქვენი კონტენტის ეფექტურობისა და აუდიტორიის ქცევის შესახებ'
        : 'Detailed analytics on content performance and audience behavior',
      benefits: [
        language === 'ka' ? 'რიალ-ტაიმ მეტრიკები' : 'Real-time metrics',
        language === 'ka' ? 'აუდიტორიის ინსაიტები' : 'Audience insights',
        language === 'ka' ? 'ROI ანგარიშგება' : 'ROI reporting'
      ]
    },
    {
      icon: Globe,
      title: language === 'ka' ? 'მრავალენოვანი მხარდაჭერა' : 'Multi-language Support',
      description: language === 'ka'
        ? 'ქართული და ინგლისური ენების ერთდროული მხარდაჭერა ბიზნესისთვის'
        : 'Simultaneous support for Georgian and English languages for business',
      benefits: [
        language === 'ka' ? 'ორენოვანი კონტენტი' : 'Bilingual content',
        language === 'ka' ? 'ავტომატური თარგმანი' : 'Auto translation',
        language === 'ka' ? 'კულტურული ადაპტაცია' : 'Cultural adaptation'
      ]
    },
    {
      icon: Users,
      title: language === 'ka' ? 'საზოგადოების მართვა' : 'Community Management',
      description: language === 'ka'
        ? 'ყველა კომენტარისა და შეტყობინების ერთიან ადგილას მართვა'
        : 'Manage all comments and messages in one unified place',
      benefits: [
        language === 'ka' ? 'ერთიანი ინბოქსი' : 'Unified inbox',
        language === 'ka' ? 'სწრაფი პასუხები' : 'Quick responses',
        language === 'ka' ? 'სენტიმენტ ანალიზი' : 'Sentiment analysis'
      ]
    },
    {
      icon: Smartphone,
      title: language === 'ka' ? 'მობილური აპლიკაცია' : 'Mobile Application',
      description: language === 'ka'
        ? 'ნებისმიერ ადგილას, ნებისმიერ დროს მართეთ თქვენი სოციალური მედია'
        : 'Manage your social media anywhere, anytime',
      benefits: [
        language === 'ka' ? 'iOS და Android' : 'iOS and Android',
        language === 'ka' ? 'ოფლაინ რეჟიმი' : 'Offline mode',
        language === 'ka' ? 'Real-time ნოტიფიკაციები' : 'Real-time notifications'
      ]
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative bg-hero py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-white mb-6">
            {language === 'ka' ? 'ძლიერი ფუნქციონალი' : 'Powerful Features'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'ka'
              ? 'ყველაფერი რაც გჭირდება სოციალური მედიის მართვისთვის ერთ ადგილას'
              : 'Everything you need for social media management in one place'
            }
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-feature">
                  <div className="flex items-start space-x-6">
                    <div className="flex-shrink-0">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                    </div>
                    <div className="flex-1">
                      <h3 className="text-xl font-semibold text-foreground mb-3">
                        {feature.title}
                      </h3>
                      <p className="text-foreground-muted mb-4">
                        {feature.description}
                      </p>
                      <ul className="space-y-2">
                        {feature.benefits.map((benefit, i) => (
                          <li key={i} className="flex items-center text-sm text-foreground-muted">
                            <CheckCircle className="w-4 h-4 text-primary-light mr-2 flex-shrink-0" />
                            {benefit}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl leading-tight font-jakarta font-bold text-gradient-hero mb-4">
              {language === 'ka' ? 'ჩვენი პლატფორმის შედეგები' : 'Results from our platform'}
            </h2>
            
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              {
                number: '1,000+',
                label: language === 'ka' ? 'ბიზნესი' : 'Businesses',
                icon: Users
              },
              {
                number: '50,000+',
                label: language === 'ka' ? 'პოსტი' : 'Posts Created',
                icon: PenTool
              },
              {
                number: '85%',
                label: language === 'ka' ? 'დროის დაზოგვა' : 'Time Saved',
                icon: Clock
              },
              {
                number: '4.9/5',
                label: language === 'ka' ? 'კმაყოფილება' : 'Satisfaction',
                icon: Target
              }
            ].map((stat, index) => {
              const Icon = stat.icon;
              return (
                <div key={index} className="stat-card text-center">
                  <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-3xl font-bold text-gradient-hero mb-2">
                    {stat.number}
                  </div>
                  <div className="text-foreground-muted">
                    {stat.label}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Technical Features */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl leading-tight font-jakarta font-bold text-gradient-hero mb-4">
              {language === 'ka' ? 'ტექნიკური უპირატესობები' : 'Technical Advantages'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: language === 'ka' ? 'უსაფრთხოება' : 'Security',
                description: language === 'ka' 
                  ? 'თქვენი მონაცემები დაცულია SSL შიფრაციითა და GDPR სტანდარტებით'
                  : 'Your data is protected with SSL encryption and GDPR standards'
              },
              {
                icon: Zap,
                title: language === 'ka' ? 'სიჩქარე' : 'Speed',
                description: language === 'ka'
                  ? 'კონტენტის გენერაცია 30 წამში, გამოქვეყნება რეალ-ტაიმში'
                  : 'Content generation in 30 seconds, real-time publishing'
              },
              {
                icon: TrendingUp,
                title: language === 'ka' ? 'მასშტაბურობა' : 'Scalability',
                description: language === 'ka'
                  ? 'პატარა ბიზნესიდან დიდ კორპორაციამდე - ყველასთვის შესაფერისი'
                  : 'From small business to large corporation - suitable for everyone'
              }
            ].map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-feature text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {feature.title}
                  </h3>
                  <p className="text-foreground-muted">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </div>
  );
};

export default FeaturesPage;