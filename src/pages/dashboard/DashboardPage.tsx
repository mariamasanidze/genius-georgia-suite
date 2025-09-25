import React from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { useLanguage } from '@/contexts/LanguageContext';
import { BarChart3, Users, TrendingUp, Calendar, Plus, Eye } from 'lucide-react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';

const DashboardPage: React.FC = () => {
  const { user } = useAuth();
  const { language, t } = useLanguage();

  const stats = [
    { 
      title: language === 'ka' ? 'პოსტები ამ თვეში' : 'Posts This Month',
      value: '23',
      change: '+12%',
      icon: Calendar
    },
    { 
      title: language === 'ka' ? 'ჩართულობის მაჩვენებელი' : 'Engagement Rate',
      value: '4.2%',
      change: '+0.5%',
      icon: TrendingUp
    },
    { 
      title: language === 'ka' ? 'მიმდევრების ზრდა' : 'Followers Growth',
      value: '+156',
      change: '+23%',
      icon: Users
    },
    { 
      title: language === 'ka' ? 'მოწმება' : 'Reach',
      value: '12.5K',
      change: '+18%',
      icon: BarChart3
    }
  ];

  const recentPosts = [
    { 
      content: language === 'ka' ? 'დღეს ჩვენს რესტორანში ახალი ხაჭაპური!' : 'Fresh khachapuri at our restaurant today!',
      platform: 'Facebook',
      engagement: '45 likes, 12 comments',
      time: '2 hours ago'
    },
    { 
      content: language === 'ka' ? 'კვირის სპეციალური შეთავაზება - 20% ფასდაკლება' : 'Weekly special offer - 20% discount',
      platform: 'Instagram', 
      engagement: '78 likes, 5 comments',
      time: '5 hours ago'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-jakarta font-bold text-foreground">
            {t('dashboard.welcome')}, {user?.name}!
          </h1>
          <p className="text-foreground-muted mt-2">
            {language === 'ka' ? 'აქ არის თქვენი დღევანდელი მიმოხილვა' : 'Here\'s your overview for today'}
          </p>
        </div>
        <Link to="/content/generator">
          <Button className="btn-hero">
            <Plus className="w-4 h-4 mr-2" />
            {language === 'ka' ? 'ახალი პოსტი' : 'Create Post'}
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <div key={index} className="stat-card">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-foreground-muted mb-1">{stat.title}</p>
                  <p className="text-2xl font-bold text-foreground">{stat.value}</p>
                  <p className="text-xs text-primary-light">{stat.change}</p>
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
            {language === 'ka' ? 'ბოლო აქტივობა' : 'Recent Activity'}
          </h2>
          <div className="space-y-4">
            {recentPosts.map((post, index) => (
              <div key={index} className="p-4 bg-background-light rounded-lg border border-border">
                <p className="text-sm text-foreground mb-2">{post.content}</p>
                <div className="flex items-center justify-between text-xs text-foreground-muted">
                  <span>{post.platform}</span>
                  <span>{post.engagement}</span>
                  <span>{post.time}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="dashboard-card">
          <h2 className="text-xl font-semibold text-foreground mb-4">
            {language === 'ka' ? 'სწრაფი ქმედებები' : 'Quick Actions'}
          </h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/content/generator" className="card-feature text-center hover:scale-105 transition-transform">
              <Plus className="w-8 h-8 text-primary-light mx-auto mb-2" />
              <p className="text-sm font-medium">{language === 'ka' ? 'ახალი პოსტი' : 'New Post'}</p>
            </Link>
            <Link to="/content/calendar" className="card-feature text-center hover:scale-105 transition-transform">
              <Calendar className="w-8 h-8 text-primary-light mx-auto mb-2" />
              <p className="text-sm font-medium">{language === 'ka' ? 'კალენდარი' : 'Calendar'}</p>
            </Link>
            <Link to="/analytics" className="card-feature text-center hover:scale-105 transition-transform">
              <BarChart3 className="w-8 h-8 text-primary-light mx-auto mb-2" />
              <p className="text-sm font-medium">{language === 'ka' ? 'ანალიტიკა' : 'Analytics'}</p>
            </Link>
            <Link to="/community" className="card-feature text-center hover:scale-105 transition-transform">
              <Users className="w-8 h-8 text-primary-light mx-auto mb-2" />
              <p className="text-sm font-medium">{language === 'ka' ? 'საზოგადოება' : 'Community'}</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;