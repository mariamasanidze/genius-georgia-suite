import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { MessageCircle, Heart, Reply, MoreHorizontal } from 'lucide-react';
import { Button } from '@/components/ui/button';

const CommunityPage: React.FC = () => {
  const { language } = useLanguage();

  const interactions = [
    {
      id: 1,
      type: 'comment',
      user: 'ნინო გელაშვილი',
      content: language === 'ka' ? 'შესანიშნავი ხაჭაპური! ვიზიტის მომლოდინე!' : 'Excellent khachapuri! Looking forward to visiting!',
      platform: 'Facebook',
      time: '2 hours ago',
      sentiment: 'positive'
    },
    {
      id: 2,
      type: 'like',
      user: 'გიორგი მაისურაძე',
      content: language === 'ka' ? 'მოეწონებათ თქვენი პოსტი' : 'liked your post',
      platform: 'Instagram',
      time: '3 hours ago',
      sentiment: 'positive'
    },
    {
      id: 3,
      type: 'comment',
      user: 'ანა ძაგნიძე',
      content: language === 'ka' ? 'რა დროს ხართ ღია შაბათ-კვირას?' : 'What time are you open on weekends?',
      platform: 'Facebook',
      time: '5 hours ago',
      sentiment: 'neutral'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-jakarta font-bold text-foreground">
          {language === 'ka' ? 'საზოგადოების მართვა' : 'Community Management'}
        </h1>
        <p className="text-foreground-muted mt-2">
          {language === 'ka' ? 'მართეთ კომენტარები და ურთიერთობა აუდიტორიასთან' : 'Manage comments and interactions with your audience'}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-muted mb-1">
                {language === 'ka' ? 'ახალი კომენტარები' : 'New Comments'}
              </p>
              <p className="text-2xl font-bold text-foreground">12</p>
            </div>
            <MessageCircle className="w-8 h-8 text-primary-light" />
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-muted mb-1">
                {language === 'ka' ? 'პასუხგაუცემელი' : 'Pending Responses'}
              </p>
              <p className="text-2xl font-bold text-foreground">3</p>
            </div>
            <Reply className="w-8 h-8 text-warning" />
          </div>
        </div>

        <div className="stat-card">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-foreground-muted mb-1">
                {language === 'ka' ? 'პოზიტიური განწყობა' : 'Positive Sentiment'}
              </p>
              <p className="text-2xl font-bold text-foreground">85%</p>
            </div>
            <Heart className="w-8 h-8 text-success" />
          </div>
        </div>
      </div>

      <div className="dashboard-card">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          {language === 'ka' ? 'ბოლო ურთიერთობები' : 'Recent Interactions'}
        </h2>

        <div className="space-y-4">
          {interactions.map((interaction) => (
            <div key={interaction.id} className="p-4 bg-background-light rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <div className="w-8 h-8 bg-gradient-primary rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {interaction.user.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div>
                      <p className="font-medium text-foreground">{interaction.user}</p>
                      <div className="flex items-center space-x-2 text-xs text-foreground-muted">
                        <span>{interaction.platform}</span>
                        <span>•</span>
                        <span>{interaction.time}</span>
                        <span className={`px-2 py-1 rounded-full text-xs ${
                          interaction.sentiment === 'positive' 
                            ? 'bg-success/10 text-success' 
                            : interaction.sentiment === 'negative' 
                            ? 'bg-destructive/10 text-destructive' 
                            : 'bg-warning/10 text-warning'
                        }`}>
                          {interaction.sentiment}
                        </span>
                      </div>
                    </div>
                  </div>
                  <p className="text-foreground-muted mb-3">
                    {interaction.content}
                  </p>
                  <div className="flex space-x-2">
                    <Button size="sm" variant="ghost" className="text-primary-light">
                      <Reply className="w-4 h-4 mr-1" />
                      {language === 'ka' ? 'პასუხი' : 'Reply'}
                    </Button>
                    <Button size="sm" variant="ghost" className="text-primary-light">
                      <Heart className="w-4 h-4 mr-1" />
                      {language === 'ka' ? 'მოწონება' : 'Like'}
                    </Button>
                  </div>
                </div>
                <Button variant="ghost" size="sm">
                  <MoreHorizontal className="w-4 h-4" />
                </Button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CommunityPage;