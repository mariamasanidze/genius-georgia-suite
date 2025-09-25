import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, TrendingUp, Users, Eye, Heart, MessageCircle } from 'lucide-react';

const AnalyticsPage: React.FC = () => {
  const { language } = useLanguage();

  const metrics = [
    { 
      title: language === 'ka' ? 'ჯამური მოწმება' : 'Total Reach',
      value: '15.2K',
      change: '+12.5%',
      icon: Eye,
      color: 'text-blue-500'
    },
    { 
      title: language === 'ka' ? 'ჩართულობა' : 'Engagement',
      value: '1.8K',
      change: '+8.3%',
      icon: Heart,
      color: 'text-red-500'
    },
    { 
      title: language === 'ka' ? 'ახალი მიმდევრები' : 'New Followers',
      value: '234',
      change: '+15.7%',
      icon: Users,
      color: 'text-green-500'
    },
    { 
      title: language === 'ka' ? 'კომენტარები' : 'Comments',
      value: '89',
      change: '+6.2%',
      icon: MessageCircle,
      color: 'text-purple-500'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-jakarta font-bold text-foreground">
          {language === 'ka' ? 'ანალიტიკა' : 'Analytics'}
        </h1>
        <p className="text-foreground-muted mt-2">
          {language === 'ka' ? 'თქვენი სოციალური მედიის შესრულების მიმოხილვა' : 'Overview of your social media performance'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {metrics.map((metric, index) => {
          const Icon = metric.icon;
          return (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-muted mb-1">{metric.title}</p>
                  <p className="text-2xl font-bold text-foreground">{metric.value}</p>
                  <p className="text-xs text-primary-light flex items-center mt-1">
                    <TrendingUp className="w-3 h-3 mr-1" />
                    {metric.change}
                  </p>
                </div>
                <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center">
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="dashboard-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {language === 'ka' ? 'საუკეთესო პოსტები' : 'Top Performing Posts'}
          </h2>
          <div className="space-y-4">
            {[
              { content: language === 'ka' ? 'ახალი ხაჭაპური მენიუში' : 'New khachapuri on menu', engagement: '234 likes' },
              { content: language === 'ka' ? 'კვირის სპეციალური შეთავაზება' : 'Weekly special offer', engagement: '187 likes' },
              { content: language === 'ka' ? 'კლიენტების მიმოხილვები' : 'Customer reviews', engagement: '156 likes' }
            ].map((post, index) => (
              <div key={index} className="p-4 bg-background-light rounded-lg">
                <p className="text-foreground font-medium mb-2">{post.content}</p>
                <p className="text-sm text-foreground-muted">{post.engagement}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {language === 'ka' ? 'პლატფორმების შედარება' : 'Platform Comparison'}
          </h2>
          <div className="space-y-4">
            {[
              { platform: 'Facebook', reach: '8.5K', color: 'bg-blue-500' },
              { platform: 'Instagram', reach: '4.2K', color: 'bg-pink-500' },
              { platform: 'Twitter', reach: '2.5K', color: 'bg-blue-400' }
            ].map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <div className={`w-4 h-4 rounded-full ${item.color}`}></div>
                  <span className="text-foreground">{item.platform}</span>
                </div>
                <span className="font-medium text-foreground">{item.reach}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;