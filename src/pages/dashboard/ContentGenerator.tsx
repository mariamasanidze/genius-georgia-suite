import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { Facebook, Instagram, Twitter, Calendar, Send, Wand2, Image, Edit3 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const ContentGenerator: React.FC = () => {
  const { language } = useLanguage();
  const navigate = useNavigate();
  const [selectedPlatforms, setSelectedPlatforms] = useState<string[]>(['facebook']);
  const [topic, setTopic] = useState('');
  const [generatedContent, setGeneratedContent] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  const platforms = [
    { id: 'facebook', name: 'Facebook', icon: Facebook, color: 'text-blue-600' },
    { id: 'instagram', name: 'Instagram', icon: Instagram, color: 'text-pink-600' },
    { id: 'twitter', name: 'Twitter', icon: Twitter, color: 'text-blue-400' }
  ];

  const handlePlatformToggle = (platformId: string) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId) 
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
  };

  const generateContent = async () => {
    if (!topic.trim()) {
      toast.error(language === 'ka' ? 'გთხოვთ შეიყვანოთ თემა' : 'Please enter a topic');
      return;
    }

    setIsGenerating(true);
    try {
      // Mock AI generation
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockContent = language === 'ka' 
        ? `🌟 ${topic} - ახალი შესაძლებლობა ჩვენი ბიზნესისთვის!\n\nჩვენ ვამაყოვართ რომ შეგვიძლია მოგაწოდოთ საუკეთესო სერვისი. დღეს განსაკუთრებით გვინდა გაგიზიაროთ ${topic} შესახებ.\n\n#ქართული #ბიზნესი #${topic.replace(/\s/g, '')}`
        : `🌟 Exciting news about ${topic}!\n\nWe're proud to share something special with our community. Today we want to tell you more about ${topic} and how it can benefit you.\n\n#Business #Georgia #${topic.replace(/\s/g, '')}`;
      
      setGeneratedContent(mockContent);
      toast.success(language === 'ka' ? 'კონტენტი წარმატებით შეიქმნა!' : 'Content generated successfully!');
    } catch (error) {
      toast.error(language === 'ka' ? 'შეცდომა გენერაციისას' : 'Error generating content');
    } finally {
      setIsGenerating(false);
    }
  };

  const publishNow = () => {
    toast.success(language === 'ka' ? 'პოსტი გამოქვეყნდა!' : 'Post published!');
  };

  const schedulePost = () => {
    navigate('/content/calendar', { state: { content: generatedContent, platforms: selectedPlatforms } });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-8">
      <div className="text-center">
        <h1 className="text-3xl font-jakarta font-bold text-foreground mb-2">
          {language === 'ka' ? 'კონტენტის გენერატორი' : 'Content Generator'}
        </h1>
        <p className="text-foreground-muted">
          {language === 'ka' ? 'შექმენით AI-ით საუკეთესო სოციალური მედია კონტენტი' : 'Create the best social media content with AI'}
        </p>
      </div>

      {/* Platform Selection */}
      <div className="card-gradient">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {language === 'ka' ? 'აირჩიეთ პლატფორმები' : 'Select Platforms'}
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {platforms.map((platform) => {
            const Icon = platform.icon;
            const isSelected = selectedPlatforms.includes(platform.id);
            
            return (
              <button
                key={platform.id}
                onClick={() => handlePlatformToggle(platform.id)}
                className={`p-4 rounded-lg border-2 transition-all duration-200 ${
                  isSelected 
                    ? 'border-primary-light bg-primary-light/10' 
                    : 'border-border hover:border-primary-light/50'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <Icon className={`w-6 h-6 ${platform.color}`} />
                  <span className="font-medium text-foreground">{platform.name}</span>
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Content Input */}
      <div className="card-gradient">
        <h2 className="text-xl font-semibold text-foreground mb-4">
          {language === 'ka' ? 'თემა ან იდეა' : 'Topic or Idea'}
        </h2>
        <Textarea
          value={topic}
          onChange={(e) => setTopic(e.target.value)}
          placeholder={language === 'ka' 
            ? 'მაგ: ახალი მენიუ, სეზონური ფასდაკლება, ღონისძიება...'
            : 'e.g: New menu, seasonal discount, event...'
          }
          className="input-elegant resize-none"
          rows={3}
        />
        
        <Button 
          onClick={generateContent}
          disabled={isGenerating}
          className="btn-hero mt-4 w-full"
        >
          {isGenerating ? (
            <>
              <Wand2 className="w-4 h-4 mr-2 animate-spin" />
              {language === 'ka' ? 'იქმნება...' : 'Generating...'}
            </>
          ) : (
            <>
              <Wand2 className="w-4 h-4 mr-2" />
              {language === 'ka' ? 'კონტენტის გენერაცია' : 'Generate Content'}
            </>
          )}
        </Button>
      </div>

      {/* Generated Content */}
      {generatedContent && (
        <div className="card-gradient">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-semibold text-foreground">
              {language === 'ka' ? 'შექმნილი კონტენტი' : 'Generated Content'}
            </h2>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsEditing(!isEditing)}
              className="text-primary-light hover:text-primary"
            >
              <Edit3 className="w-4 h-4 mr-2" />
              {language === 'ka' ? 'რედაქტირება' : 'Edit'}
            </Button>
          </div>

          {/* Generated Image Preview */}
          <div className="mb-6 p-4 bg-background-light rounded-lg border border-border">
            <div className="flex items-center space-x-3 mb-3">
              <Image className="w-5 h-5 text-primary-light" />
              <span className="text-sm font-medium text-foreground">
                {language === 'ka' ? 'ავტომატურად გენერირებული სურათი' : 'Auto-generated Image'}
              </span>
            </div>
            <div className="w-full h-48 bg-gradient-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-medium">
                {language === 'ka' ? 'AI სურათი თემაზე: ' : 'AI Image for: '}{topic}
              </span>
            </div>
          </div>

          <div className="space-y-4">
            {isEditing ? (
              <Textarea
                value={generatedContent}
                onChange={(e) => setGeneratedContent(e.target.value)}
                className="input-elegant resize-none"
                rows={8}
              />
            ) : (
              <div className="p-4 bg-background-light rounded-lg border border-border">
                <pre className="whitespace-pre-wrap text-foreground font-sans">
                  {generatedContent}
                </pre>
              </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Button 
                onClick={publishNow}
                className="btn-hero"
              >
                <Send className="w-4 h-4 mr-2" />
                {language === 'ka' ? 'გამოქვეყნება ახლავე' : 'Post Now'}
              </Button>
              
              <Button 
                onClick={schedulePost}
                variant="outline"
                className="btn-outline-hero"
              >
                <Calendar className="w-4 h-4 mr-2" />
                {language === 'ka' ? 'დაგეგმვა' : 'Schedule'}
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ContentGenerator;