import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Calendar, ChevronLeft, ChevronRight, Clock, Facebook, Instagram, Twitter } from 'lucide-react';

const ContentCalendar: React.FC = () => {
  const { language } = useLanguage();
  const [currentDate, setCurrentDate] = useState(new Date());

  const scheduledPosts = [
    {
      id: 1,
      date: '2024-01-15',
      time: '10:00',
      content: language === 'ka' ? 'დღეს ჩვენს რესტორანში ახალი ხაჭაპური!' : 'Fresh khachapuri at our restaurant today!',
      platforms: ['facebook', 'instagram'],
      status: 'scheduled'
    },
    {
      id: 2,
      date: '2024-01-16',
      time: '14:30',
      content: language === 'ka' ? 'კვირის სპეციალური შეთავაზება - 20% ფასდაკლება' : 'Weekly special offer - 20% discount',
      platforms: ['instagram', 'twitter'],
      status: 'scheduled'
    }
  ];

  const platformIcons = {
    facebook: Facebook,
    instagram: Instagram,
    twitter: Twitter
  };

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add all days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(day);
    }
    
    return days;
  };

  const getPostsForDay = (day: number) => {
    const dateStr = `${currentDate.getFullYear()}-${String(currentDate.getMonth() + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return scheduledPosts.filter(post => post.date === dateStr);
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    setCurrentDate(prev => {
      const newDate = new Date(prev);
      newDate.setMonth(prev.getMonth() + (direction === 'next' ? 1 : -1));
      return newDate;
    });
  };

  const monthNames = language === 'ka' 
    ? ['იანვარი', 'თებერვალი', 'მარტი', 'აპრილი', 'მაისი', 'ივნისი', 'ივლისი', 'აგვისტო', 'სექტემბერი', 'ოქტომბერი', 'ნოემბერი', 'დეკემბერი']
    : ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];

  const dayNames = language === 'ka' 
    ? ['კვი', 'ორშ', 'სამ', 'ოთხ', 'ხუთ', 'პარ', 'შაბ']
    : ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

  return (
    <div className="p-6 space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-jakarta font-bold text-foreground">
            {language === 'ka' ? 'კონტენტის კალენდარი' : 'Content Calendar'}
          </h1>
          <p className="text-foreground-muted mt-2">
            {language === 'ka' ? 'დაგეგმეთ და მართეთ თქვენი პოსტები' : 'Schedule and manage your posts'}
          </p>
        </div>
      </div>

      <div className="card-gradient">
        {/* Calendar Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('prev')}
          >
            <ChevronLeft className="w-4 h-4" />
          </Button>
          
          <h2 className="text-xl font-semibold text-foreground">
            {monthNames[currentDate.getMonth()]} {currentDate.getFullYear()}
          </h2>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigateMonth('next')}
          >
            <ChevronRight className="w-4 h-4" />
          </Button>
        </div>

        {/* Calendar Grid */}
        <div className="p-4">
          {/* Day headers */}
          <div className="grid grid-cols-7 gap-2 mb-4">
            {dayNames.map((day) => (
              <div key={day} className="text-center text-sm font-medium text-foreground-muted p-2">
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-2">
            {getDaysInMonth(currentDate).map((day, index) => {
              const posts = day ? getPostsForDay(day) : [];
              
              return (
                <div
                  key={index}
                  className={`min-h-[100px] p-2 rounded-lg border transition-colors ${
                    day 
                      ? 'border-border hover:border-primary-light bg-background cursor-pointer' 
                      : 'border-transparent'
                  }`}
                >
                  {day && (
                    <>
                      <div className="text-sm font-medium text-foreground mb-2">
                        {day}
                      </div>
                      
                      <div className="space-y-1">
                        {posts.map((post) => (
                          <div
                            key={post.id}
                            className="text-xs p-2 rounded bg-primary-light/10 border border-primary-light/20"
                          >
                            <div className="flex items-center space-x-1 mb-1">
                              <Clock className="w-3 h-3 text-primary-light" />
                              <span className="text-primary-light font-medium">
                                {post.time}
                              </span>
                            </div>
                            <div className="text-foreground-muted truncate">
                              {post.content.substring(0, 30)}...
                            </div>
                            <div className="flex space-x-1 mt-1">
                              {post.platforms.map((platform) => {
                                const Icon = platformIcons[platform as keyof typeof platformIcons];
                                return (
                                  <Icon key={platform} className="w-3 h-3 text-foreground-subtle" />
                                );
                              })}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Scheduled Posts List */}
      <div className="card-gradient">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {language === 'ka' ? 'დაგეგმილი პოსტები' : 'Scheduled Posts'}
        </h2>
        
        <div className="space-y-4">
          {scheduledPosts.map((post) => (
            <div key={post.id} className="p-4 bg-background-light rounded-lg border border-border">
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <div className="flex items-center space-x-3 mb-2">
                    <Calendar className="w-4 h-4 text-primary-light" />
                    <span className="text-sm font-medium text-foreground">
                      {post.date} at {post.time}
                    </span>
                    <div className="flex space-x-1">
                      {post.platforms.map((platform) => {
                        const Icon = platformIcons[platform as keyof typeof platformIcons];
                        return (
                          <Icon key={platform} className="w-4 h-4 text-foreground-subtle" />
                        );
                      })}
                    </div>
                  </div>
                  <p className="text-foreground-muted text-sm">
                    {post.content}
                  </p>
                </div>
                
                <div className="flex space-x-2">
                  <Button variant="ghost" size="sm">
                    {language === 'ka' ? 'რედაქტირება' : 'Edit'}
                  </Button>
                  <Button variant="ghost" size="sm" className="text-destructive">
                    {language === 'ka' ? 'წაშლა' : 'Delete'}
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ContentCalendar;