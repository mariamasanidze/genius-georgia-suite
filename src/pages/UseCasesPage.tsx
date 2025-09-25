import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  UtensilsCrossed,
  ShoppingBag,
  Wrench,
  Camera,
  Palette,
  Building,
  ArrowRight
} from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const UseCasesPage: React.FC = () => {
  const { language } = useLanguage();

  const useCases = [
    {
      icon: UtensilsCrossed,
      title: language === 'ka' ? 'რესტორნები და კაფეები' : 'Restaurants & Cafes',
      description: language === 'ka' 
        ? 'ყოველდღიური მენიუ, სპეციალური შეთავაზებები, კლიენტების მიმოხილვები'
        : 'Daily menus, special offers, customer reviews',
      examples: [
        language === 'ka' ? '🥟 "დღეს ჩვენს რესტორანში ახალი ხაჭაპური!"' : '🥟 "Fresh khachapuri at our restaurant today!"',
        language === 'ka' ? '🍷 "ქართული ღვინის დეგუსტაცია ყოველ პარასკევს"' : '🍷 "Georgian wine tasting every Friday"',
        language === 'ka' ? '⭐ "მადლობა ნინოს შესანიშნავი მიმოხილვისთვის!"' : '⭐ "Thank you Nino for the amazing review!"'
      ],
      stats: {
        timesSaved: '4 საათიდან 15 წუთამდე',
        engagement: '+150%',
        followers: '+300/თვე'
      }
    },
    {
      icon: ShoppingBag,
      title: language === 'ka' ? 'საცალო ვაჭრობა' : 'Retail Business',
      description: language === 'ka'
        ? 'პროდუქტების წარდგენა, სეზონური გაყიდვები, ინვენტარის განახლება'
        : 'Product showcases, seasonal sales, inventory updates',
      examples: [
        language === 'ka' ? '👗 "ზაფხულის კოლექცია -30% ფასდაკლებით"' : '👗 "Summer collection -30% discount"',
        language === 'ka' ? '📦 "ახალი მოსვლა: იტალიური ფეხსაცმელები"' : '📦 "New arrival: Italian footwear"',
        language === 'ka' ? '🎁 "დღეს მყიდველებისთვის საჩუქარი"' : '🎁 "Free gift for today\'s customers"'
      ],
      stats: {
        timesSaved: '3 საათიდან 20 წუთამდე',
        engagement: '+200%',
        sales: '+45%'
      }
    },
    {
      icon: Wrench,
      title: language === 'ka' ? 'სერვისები' : 'Service Providers',
      description: language === 'ka'
        ? 'სამუშაოს before/after, კლიენტების მიმოხილვები, ჯავშნები'
        : 'Before/after work, client testimonials, bookings',
      examples: [
        language === 'ka' ? '🏠 "სახლის რემონტი: იყო → გახდა"' : '🏠 "Home renovation: Before → After"',
        language === 'ka' ? '✅ "კმაყოფილი კლიენტი - ჩვენი მთავარი მიზანი"' : '✅ "Satisfied client - our main goal"',
        language === 'ka' ? '📅 "ავგუსტში ელექტრიკული სამუშაოების ჯავშანი"' : '📅 "August electrical work bookings open"'
      ],
      stats: {
        timesSaved: '2 საათიდან 10 წუთამდე',
        bookings: '+80%',
        trust: '+95%'
      }
    },
    {
      icon: Camera,
      title: language === 'ka' ? 'ტურიზმი' : 'Tourism',
      description: language === 'ka'
        ? 'ქართული ღირშესანიშნაობები, კულტურული ტურები, მოგზაურობის პაკეტები'
        : 'Georgian landmarks, cultural tours, travel packages',
      examples: [
        language === 'ka' ? '🏔️ "სვანეთის ულამაზესი ხედები"' : '🏔️ "Beautiful views of Svaneti"',
        language === 'ka' ? '🍇 "კახეთში ღვინის ტური - იოქტომბერი"' : '🍇 "Wine tour in Kakheti - October"',
        language === 'ka' ? '🏰 "მცხეთა - საქართველოს კულტურული მემკვიდრეობა"' : '🏰 "Mtskheta - Georgian cultural heritage"'
      ],
      stats: {
        timesSaved: '5 საათიდან 30 წუთამდე',
        bookings: '+120%',
        reach: '+400%'
      }
    },
    {
      icon: Palette,
      title: language === 'ka' ? 'ფრილანსერები' : 'Freelancers',
      description: language === 'ka'
        ? 'პორტფოლიოს ნაწილები, კლიენტების მიმოხილვები, ექსპერტიზის კონტენტი'
        : 'Portfolio pieces, client testimonials, expertise content',
      examples: [
        language === 'ka' ? '🎨 "ახალი ლოგოს დიზაინი ლოკალური ბრენდისთვის"' : '🎨 "New logo design for local brand"',
        language === 'ka' ? '💼 "კმაყოფილი კლიენტის მიმოხილვა"' : '💼 "Satisfied client testimonial"',
        language === 'ka' ? '📚 "როგორ შევქმნათ ეფექტური ბრენდინგი"' : '📚 "How to create effective branding"'
      ],
      stats: {
        timesSaved: '3 საათიდან 15 წუთამდე',
        clients: '+60%',
        income: '+35%'
      }
    },
    {
      icon: Building,
      title: language === 'ka' ? 'კორპორაციები' : 'Corporations',
      description: language === 'ka'
        ? 'კომპანიის სიახლეები, თანამშრომლების მონაწილეობა, კორპორაციული ღონისძიებები'
        : 'Company news, employee engagement, corporate events',
      examples: [
        language === 'ka' ? '🏢 "ჩვენი კომპანია 10 წლისაა!"' : '🏢 "Our company is 10 years old!"',
        language === 'ka' ? '👥 "ახალი თანამშრომლების მიღება"' : '👥 "Welcoming new team members"',
        language === 'ka' ? '🎯 "წლის შედეგები და ახალი მიზნები"' : '🎯 "Year results and new goals"'
      ],
      stats: {
        timesSaved: '8 საათიდან 1 საათამდე',
        engagement: '+85%',
        reach: '+250%'
      }
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative bg-hero py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-white mb-6">
            {language === 'ka' ? 'გამოყენების შემთხვევები' : 'Use Cases'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'ka'
              ? 'იხილეთ როგორ იყენებენ SocialGenius-ს სხვადასხვა ბიზნესები'
              : 'See how different businesses use SocialGenius'
            }
          </p>
        </div>
      </section>

      {/* Use Cases */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="space-y-20">
            {useCases.map((useCase, index) => {
              const Icon = useCase.icon;
              const isEven = index % 2 === 0;
              
              return (
                <div key={index} className={`grid grid-cols-1 lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}>
                  {/* Content */}
                  <div className={isEven ? '' : 'lg:col-start-2'}>
                    <div className="flex items-center space-x-4 mb-6">
                      <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center">
                        <Icon className="w-8 h-8 text-white" />
                      </div>
                      <div>
                        <h2 className="text-2xl font-jakarta font-bold text-foreground">
                          {useCase.title}
                        </h2>
                        <p className="text-foreground-muted">
                          {useCase.description}
                        </p>
                      </div>
                    </div>

                    {/* Examples */}
                    <div className="space-y-3 mb-8">
                      <h3 className="font-semibold text-foreground mb-4">
                        {language === 'ka' ? 'მაგალითები:' : 'Examples:'}
                      </h3>
                      {useCase.examples.map((example, i) => (
                        <div key={i} className="bg-background-card rounded-lg p-4 border border-border">
                          <p className="text-foreground-muted text-sm">
                            {example}
                          </p>
                        </div>
                      ))}
                    </div>

                    {/* Stats */}
                    <div className="grid grid-cols-3 gap-4">
                      {Object.entries(useCase.stats).map(([key, value], i) => (
                        <div key={i} className="text-center">
                          <div className="text-lg font-bold text-gradient-hero">
                            {value}
                          </div>
                          <div className="text-xs text-foreground-subtle">
                            {key === 'timesSaved' && (language === 'ka' ? 'დროის დაზოგვა' : 'Time Saved')}
                            {key === 'engagement' && (language === 'ka' ? 'ჩართულობა' : 'Engagement')}
                            {key === 'followers' && (language === 'ka' ? 'მიმდევრები' : 'Followers')}
                            {key === 'sales' && (language === 'ka' ? 'გაყიდვები' : 'Sales')}
                            {key === 'bookings' && (language === 'ka' ? 'ჯავშნები' : 'Bookings')}
                            {key === 'trust' && (language === 'ka' ? 'ნდობა' : 'Trust')}
                            {key === 'reach' && (language === 'ka' ? 'რეაჩი' : 'Reach')}
                            {key === 'clients' && (language === 'ka' ? 'კლიენტები' : 'Clients')}
                            {key === 'income' && (language === 'ka' ? 'შემოსავალი' : 'Income')}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Visual/Mockup */}
                  <div className={`${isEven ? '' : 'lg:col-start-1'}`}>
                    <div className="card-gradient p-8">
                      <div className="space-y-4">
                        <div className="flex items-center space-x-3 mb-4">
                          <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                            <Icon className="w-4 h-4 text-white" />
                          </div>
                          <span className="font-medium text-foreground">
                            {useCase.title}
                          </span>
                        </div>
                        
                        {/* Mock Social Media Posts */}
                        <div className="space-y-3">
                          {useCase.examples.slice(0, 2).map((example, i) => (
                            <div key={i} className="bg-background rounded-lg p-4 border border-border shadow-sm">
                              <div className="flex items-start space-x-3">
                                <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0">
                                  <Icon className="w-4 h-4 text-white" />
                                </div>
                                <div className="flex-1">
                                  <p className="text-sm text-foreground">
                                    {example}
                                  </p>
                                  <div className="flex items-center space-x-4 mt-2 text-xs text-foreground-subtle">
                                    <span>♥ 12</span>
                                    <span>💬 3</span>
                                    <span>📤 5</span>
                                  </div>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-hero relative overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-40" />
        
        <div className="relative max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl md:text-4xl font-jakarta font-bold text-white mb-6">
            {language === 'ka' 
              ? 'მზად ხარ თქვენი ბიზნესისთვის?' 
              : 'Ready for Your Business?'
            }
          </h2>
          <p className="text-xl text-white/90 mb-8">
            {language === 'ka'
              ? 'დაიწყეთ უფასო ტესტით და გაიგეთ როგორ შეუძლია SocialGenius-ს თქვენი ბიზნესის ზრდა'
              : 'Start with a free trial and see how SocialGenius can grow your business'
            }
          </p>
          
          <Link to="/register">
            <Button className="btn-hero text-lg px-8 py-4">
              {language === 'ka' ? 'დაიწყე უფასოდ' : 'Start Free Trial'}
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default UseCasesPage;