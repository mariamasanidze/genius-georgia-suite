import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { 
  PenTool, 
  Calendar, 
  BarChart3, 
  Zap,
  ArrowRight,
  Star,
  CheckCircle,
  Play
} from 'lucide-react';

const LandingPage: React.FC = () => {
  const { language, t } = useLanguage();

  const features = [
    {
      icon: PenTool,
      title: t('features.aiContent'),
      description: t('features.aiContentDesc'),
      gradient: 'from-primary to-primary-light'
    },
    {
      icon: Calendar,
      title: t('features.scheduling'),
      description: t('features.schedulingDesc'),
      gradient: 'from-primary-light to-accent'
    },
    {
      icon: BarChart3,
      title: t('features.analytics'),
      description: t('features.analyticsDesc'),
      gradient: 'from-accent to-primary'
    },
    {
      icon: Zap,
      title: t('features.multiPlatform'),
      description: t('features.multiPlatformDesc'),
      gradient: 'from-primary to-accent'
    }
  ];

  const testimonials = [
    {
      name: 'გიორგი ჯაფარიძე',
      business: 'კაფე ვარძია',
      rating: 5,
      text: language === 'ka' 
        ? 'SocialGenius-მა ჩვენი სოციალური მედიის მართვა სრულად შეცვალა. ახლა ერთ საათში ვქმნი კვირის კონტენტს!'
        : 'SocialGenius completely transformed our social media management. Now I create a week\'s content in one hour!'
    },
    {
      name: 'ნანუკა შავლიაშვილი',
      business: 'ნანუკას ბუტიკი',
      rating: 5,
      text: language === 'ka'
        ? 'AI ძალიან კარგად იცნობს ქართულ კულტურას. პოსტები ყოველთვის შესაფერისია ჩვენი ბიზნესისთვის.'
        : 'The AI understands Georgian culture very well. Posts are always appropriate for our business.'
    },
    {
      name: 'დავით ღვინიაშვილი',
      business: 'ქართული ვაინერი',
      rating: 5,
      text: language === 'ka'
        ? 'ღვინის კულტურაზე პოსტები ისეთი ხარისხიანია, როგორც ჩვენ თავად ვწერდით. დიდი დროის დაზოგვა!'
        : 'Wine culture posts are so high quality, as if we wrote them ourselves. Huge time savings!'
    }
  ];

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-screen bg-hero flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-60" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="animate-slide-up">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-jakarta font-bold text-white mb-6 leading-tight">
              {t('hero.title')}
            </h1>
            <p className="text-xl md:text-2xl text-white/90 mb-8 max-w-3xl mx-auto leading-relaxed">
              {t('hero.subtitle')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-12">
              <Link to="/register">
                <Button className="btn-hero text-lg px-8 py-4">
                  {t('hero.cta')}
                  <ArrowRight className="ml-2 w-5 h-5" />
                </Button>
              </Link>
              <Button 
                variant="outline" 
                className="btn-outline-hero text-lg px-8 py-4"
              >
                <Play className="mr-2 w-5 h-5" />
                {t('hero.cta.secondary')}
              </Button>
            </div>

            {/* Social Proof */}
            <div className="flex items-center justify-center space-x-6 text-white/80">
              <div className="text-center">
                <div className="text-2xl font-bold text-white">1000+</div>
                <div className="text-sm">
                  {language === 'ka' ? 'ბიზნესი' : 'Businesses'}
                </div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="text-center">
                <div className="text-2xl font-bold text-white">50k+</div>
                <div className="text-sm">
                  {language === 'ka' ? 'პოსტი' : 'Posts Created'}
                </div>
              </div>
              <div className="w-px h-8 bg-white/30" />
              <div className="flex items-center">
                <div className="flex text-yellow-400 mr-2">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <span className="font-semibold">4.9/5</span>
              </div>
            </div>
          </div>
        </div>

        {/* Floating Elements */}
        <div className="absolute top-20 left-10 animate-float">
          <div className="glassmorphism p-3 rounded-xl">
            <PenTool className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute top-40 right-20 animate-float" style={{ animationDelay: '2s' }}>
          <div className="glassmorphism p-3 rounded-xl">
            <BarChart3 className="w-6 h-6 text-white" />
          </div>
        </div>
        <div className="absolute bottom-40 left-20 animate-float" style={{ animationDelay: '4s' }}>
          <div className="glassmorphism p-3 rounded-xl">
            <Calendar className="w-6 h-6 text-white" />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-gradient-hero mb-4">
              {t('features.title')}
            </h2>
            <p className="text-xl text-foreground-muted">
              {t('features.subtitle')}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div key={index} className="card-feature group">
                  <div className={`w-12 h-12 bg-gradient-to-r ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <Icon className="w-6 h-6 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">
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

      {/* Testimonials Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-gradient-hero mb-4">
              {language === 'ka' ? 'რას ამბობენ ჩვენი კლიენტები' : 'What Our Clients Say'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="card-testimonial">
                <div className="flex text-yellow-400 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star key={i} className="w-4 h-4 fill-current" />
                  ))}
                </div>
                <p className="text-foreground-muted mb-4 italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <div className="font-semibold text-foreground">
                    {testimonial.name}
                  </div>
                  <div className="text-sm text-foreground-subtle">
                    {testimonial.business}
                  </div>
                </div>
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
              ? 'შეუერთდი ათასობით ქართულ ბიზნესს, რომლებიც ზოგავენ დროს AI-ით'
              : 'Join thousands of Georgian businesses saving time with AI'
            }
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button className="btn-hero text-lg px-8 py-4">
                {language === 'ka' ? 'დაიწყე უფასოდ' : 'Start Free Trial'}
                <ArrowRight className="ml-2 w-5 h-5" />
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

export default LandingPage;