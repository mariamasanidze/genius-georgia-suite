import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { 
  Users, 
  Target, 
  Heart, 
  Lightbulb,
  MapPin,
  Mail,
  Phone
} from 'lucide-react';

const AboutPage: React.FC = () => {
  const { language } = useLanguage();

  const team = [
    {
      name: 'ნიკა გელაშვილი',
      role: language === 'ka' ? 'დამფუძნებელი & CEO' : 'Founder & CEO',
      image: '/api/placeholder/300/300',
      bio: language === 'ka'
        ? 'ტექნოლოგიის ენთუზიასტი 10+ წლიანი გამოცდილებით. გაიარა სწავლა სტენფორდის უნივერსიტეტში.'
        : 'Technology enthusiast with 10+ years of experience. Stanford University graduate.'
    },
    {
      name: 'ანა ჩხეიძე',
      role: language === 'ka' ? 'AI და მონაცემების ანალიზის ხელმძღვანელი' : 'Head of AI & Data',
      image: '/api/placeholder/300/300',
      bio: language === 'ka'
        ? 'AI და მანქანური სწავლების ექსპერტი. PhD კომპიუტერულ მეცნიერებებში.'
        : 'AI and machine learning expert. PhD in Computer Science.'
    },
    {
      name: 'გიორგი მახარაძე',
      role: language === 'ka' ? 'CTO' : 'Chief Technology Officer',
      image: '/api/placeholder/300/300',
      bio: language === 'ka'
        ? 'სრულსტეკ დეველოპერი რომელსაც გამოცდილება აქვს მასშტაბურ პროექტებში.'
        : 'Full-stack developer with experience in scalable projects.'
    }
  ];

  const values = [
    {
      icon: Target,
      title: language === 'ka' ? 'ინოვაცია' : 'Innovation',
      description: language === 'ka'
        ? 'ყოველთვის ვეძებთ ახალ ტექნოლოგიებს და გადაწყვეტებს რომლებიც გააუმჯობესებს ჩვენი კლიენტების ბიზნესს'
        : 'We constantly seek new technologies and solutions that improve our clients\' businesses'
    },
    {
      icon: Heart,
      title: language === 'ka' ? 'ხარისხი' : 'Quality',
      description: language === 'ka'
        ? 'ჩვენი პროდუქტი და სერვისი ყოველთვის უნდა იყოს უმაღლესი ხარისხის და კლიენტზე ორიენტირებული'
        : 'Our products and services must always be of the highest quality and client-oriented'
    },
    {
      icon: Users,
      title: language === 'ka' ? 'თანამშრომლობა' : 'Collaboration',
      description: language === 'ka'
        ? 'ვმუშაობთ როგორც ერთი გუნდი და ვეხმარებით ერთმანეთს ყველა პროექტში'
        : 'We work as one team and help each other in every project'
    },
    {
      icon: Lightbulb,
      title: language === 'ka' ? 'შემოქმედებითობა' : 'Creativity',
      description: language === 'ka'
        ? 'ვშვებით შემოქმედებითი იდეები და არასტანდარტული მიდგომები პრობლემების გადაწყვეტისთვის'
        : 'We encourage creative ideas and non-standard approaches to problem solving'
    }
  ];

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative bg-hero py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-white mb-6">
            {language === 'ka' ? 'ჩვენს შესახებ' : 'About Us'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'ka'
              ? 'ჩვენ ვაქმნით AI ტექნოლოგიებს რომლებიც ეხმარება ქართულ ბიზნესებს სოციალურ მედიაში წარმატების მიღწევაში'
              : 'We create AI technologies that help Georgian businesses achieve success in social media'
            }
          </p>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl leading-tight font-jakarta font-bold text-gradient-hero mb-6">
                {language === 'ka' ? 'ჩვენი მისია' : 'Our Mission'}
              </h2>
              <div className="space-y-4 text-foreground-muted">
                <p>
                  {language === 'ka'
                    ? 'SocialGenius დაიბადა იმ იდეით, რომ ქართული ბიზნესები დაეხმარა სოციალური მედიის ეფექტურ გამოყენებაში. ჩვენ ვხედავდით, როგორ მუშაობდნენ მცირე და საშუალო ბიზნესები და რამდენ დროს ანდომებდნენ კონტენტის შექმნაში.'
                    : 'SocialGenius was born with the idea of helping Georgian businesses use social media effectively. We saw how small and medium businesses worked and how much time they spent creating content.'
                  }
                </p>
                <p>
                  {language === 'ka'
                    ? 'ჩვენმა გუნდმა შექმნა AI ალგორითმები, რომლებიც სპეციალურად არის მორგებული ქართული კულტურისა და ენის სპეციფიკაზე. ეს გვაძლევს საშუალებას ვქმნათ ისეთი კონტენტი, რომელიც რელევანტურია ადგილობრივი აუდიტორიისთვის.'
                    : 'Our team created AI algorithms that are specifically adapted to Georgian culture and language specifics. This allows us to create content that is relevant to the local audience.'
                  }
                </p>
              </div>
            </div>
            
            <div className="card-gradient p-8">
              <div className="grid grid-cols-2 gap-6">
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-hero mb-2">1000+</div>
                  <div className="text-sm text-foreground-muted">
                    {language === 'ka' ? 'კმაყოფილი კლიენტი' : 'Happy Clients'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-hero mb-2">50k+</div>
                  <div className="text-sm text-foreground-muted">
                    {language === 'ka' ? 'შექმნილი პოსტი' : 'Posts Created'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-hero mb-2">2022</div>
                  <div className="text-sm text-foreground-muted">
                    {language === 'ka' ? 'დაფუძნების წელი' : 'Founded'}
                  </div>
                </div>
                <div className="text-center">
                  <div className="text-3xl font-bold text-gradient-hero mb-2">15+</div>
                  <div className="text-sm text-foreground-muted">
                    {language === 'ka' ? 'გუნდის წევრი' : 'Team Members'}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl leading-tight font-jakarta font-bold text-gradient-hero mb-4">
              {language === 'ka' ? 'ჩვენი ღირებულებები' : 'Our Values'}
            </h2>
            <p className="text-xl text-foreground-muted">
              {language === 'ka' 
                ? 'ის პრინციპები რაზეც ვაშენებთ ჩვენს კომპანიას'
                : 'The principles on which we build our company'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div key={index} className="card-feature text-center">
                  <div className="w-16 h-16 bg-gradient-primary rounded-2xl flex items-center justify-center mx-auto mb-6">
                    <Icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-foreground mb-4">
                    {value.title}
                  </h3>
                  <p className="text-foreground-muted">
                    {value.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl leading-tight font-jakarta font-bold text-gradient-hero mb-4">
              {language === 'ka' ? 'ჩვენი გუნდი' : 'Our Team'}
            </h2>
            <p className="text-xl text-foreground-muted">
              {language === 'ka' 
                ? 'ექსპერტები რომლებიც მუშაობენ თქვენი წარმატებისთვის'
                : 'Experts working for your success'
              }
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div key={index} className="card-testimonial text-center">
                <div className="w-24 h-24 bg-gradient-primary rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-2xl font-bold text-white">
                    {member.name.split(' ').map(n => n[0]).join('')}
                  </span>
                </div>
                <h3 className="text-xl font-semibold text-foreground mb-2">
                  {member.name}
                </h3>
                <p className="text-primary-light font-medium mb-4">
                  {member.role}
                </p>
                <p className="text-foreground-muted text-sm">
                  {member.bio}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact Info */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl leading-tight font-jakarta font-bold text-gradient-hero mb-4">
              {language === 'ka' ? 'დაგვიკავშირდით' : 'Get in Touch'}
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="card-feature text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {language === 'ka' ? 'ოფისი' : 'Office'}
              </h3>
              <p className="text-foreground-muted text-sm">
                {language === 'ka' 
                  ? 'თბილისი, საქართველო\nრუსთაველის გამზირი 12'
                  : 'Tbilisi, Georgia\nRustaveli Avenue 12'
                }
              </p>
            </div>

            <div className="card-feature text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {language === 'ka' ? 'ელ. ფოსტა' : 'Email'}
              </h3>
              <p className="text-foreground-muted text-sm">
                hello@socialgenius.ge<br />
                support@socialgenius.ge
              </p>
            </div>

            <div className="card-feature text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {language === 'ka' ? 'ტელეფონი' : 'Phone'}
              </h3>
              <p className="text-foreground-muted text-sm">
                +995 555 123 456<br />
                +995 555 123 457
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default AboutPage;