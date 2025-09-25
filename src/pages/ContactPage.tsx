import React, { useState } from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { toast } from 'sonner';
import { 
  Mail, 
  Phone, 
  MapPin, 
  Clock,
  Send,
  MessageCircle,
  HelpCircle,
  Users
} from 'lucide-react';

const ContactPage: React.FC = () => {
  const { language } = useLanguage();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    businessName: '',
    subject: '',
    message: '',
    inquiryType: ''
  });

  const inquiryTypes = [
    { value: 'support', label: language === 'ka' ? 'ტექნიკური მხარდაჭერა' : 'Technical Support' },
    { value: 'sales', label: language === 'ka' ? 'გაყიდვები' : 'Sales Inquiry' },
    { value: 'partnership', label: language === 'ka' ? 'პარტნიორობა' : 'Partnership' },
    { value: 'feedback', label: language === 'ka' ? 'უკუკავშირი' : 'Feedback' },
    { value: 'other', label: language === 'ka' ? 'სხვა' : 'Other' }
  ];

  const faqs = [
    {
      question: language === 'ka' ? 'როგორ დავიწყო SocialGenius-ის გამოყენება?' : 'How do I start using SocialGenius?',
      answer: language === 'ka'
        ? 'უბრალოდ დარეგისტრირდით ჩვენს ვებსაიტზე და მიიღეთ 14-დღიანი უფასო ტესტი. დავალება არ არის საჭირო რაიმე ფულადი ინფორმაცია.'
        : 'Simply register on our website and get a 14-day free trial. No credit card information required.'
    },
    {
      question: language === 'ka' ? 'მხარს უჭერს თუ არა ვაინებს ქართულ ენას?' : 'Does the AI support Georgian language?',
      answer: language === 'ka'
        ? 'დიახ, ჩვენი AI სპეციალურად არის მორგებული ქართული ენისა და კულტურის სპეციფიკაზე. ის ქმნის ბუნებრივ და რელევანტურ კონტენტს.'
        : 'Yes, our AI is specifically adapted to Georgian language and cultural specifics. It creates natural and relevant content.'
    },
    {
      question: language === 'ka' ? 'რომელ სოციალურ პლატფორმებს მხარს უჭერს?' : 'Which social platforms do you support?',
      answer: language === 'ka'
        ? 'ჩვენ მხარს ვუჭერთ Facebook, Instagram, TikTok, LinkedIn და Twitter-ს. მუდმივად ვამატებთ ახალ პლატფორმებს.'
        : 'We support Facebook, Instagram, TikTok, LinkedIn, and Twitter. We are constantly adding new platforms.'
    },
    {
      question: language === 'ka' ? 'შეიძლება თუ არა გუნდურ მუშაობა?' : 'Can I work with a team?',
      answer: language === 'ka'
        ? 'დიახ, Professional და Enterprise გეგმებში შესაძლებელია გუნდური მუშაობა. შეგიძლიათ მიაწოდოთ წვდომა თანამშრომლებს.'
        : 'Yes, team collaboration is possible in Professional and Enterprise plans. You can give access to team members.'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Mock form submission - replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      toast.success(
        language === 'ka' 
          ? 'შეტყობინება წარმატებით გაიგზავნა!' 
          : 'Message sent successfully!'
      );
      
      // Reset form
      setFormData({
        name: '',
        email: '',
        businessName: '',
        subject: '',
        message: '',
        inquiryType: ''
      });
    } catch (error) {
      toast.error(
        language === 'ka' 
          ? 'შეცდომა გაგზავნისას' 
          : 'Error sending message'
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectChange = (field: string, value: string) => {
    setFormData({
      ...formData,
      [field]: value
    });
  };

  return (
    <div className="min-h-screen py-20">
      {/* Hero Section */}
      <section className="relative bg-hero py-20 overflow-hidden">
        <div className="absolute inset-0 bg-mesh opacity-50" />
        
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl md:text-6xl font-jakarta font-bold text-white mb-6">
            {language === 'ka' ? 'დაგვიკავშირდით' : 'Contact Us'}
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto">
            {language === 'ka'
              ? 'გვყავს კითხვები? გვინდა განხილვა? ჩვენ ყოველთვის მზად ვართ დაგეხმაროთ!'
              : 'Have questions? Want to discuss? We are always ready to help you!'
            }
          </p>
        </div>
      </section>

      {/* Contact Methods */}
      <section className="py-20 bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-16">
            <div className="card-feature text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {language === 'ka' ? 'ელ. ფოსტა' : 'Email'}
              </h3>
              <p className="text-foreground-muted text-sm">
                hello@socialgenius.ge
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
                +995 555 123 456
              </p>
            </div>

            <div className="card-feature text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {language === 'ka' ? 'ოფისი' : 'Office'}
              </h3>
              <p className="text-foreground-muted text-sm">
                {language === 'ka' ? 'თბილისი, საქართველო' : 'Tbilisi, Georgia'}
              </p>
            </div>

            <div className="card-feature text-center">
              <div className="w-12 h-12 bg-gradient-primary rounded-xl flex items-center justify-center mx-auto mb-4">
                <Clock className="w-6 h-6 text-white" />
              </div>
              <h3 className="font-semibold text-foreground mb-2">
                {language === 'ka' ? 'მუშაობის საათები' : 'Working Hours'}
              </h3>
              <p className="text-foreground-muted text-sm">
                {language === 'ka' ? 'ორშ-პარ 9:00-18:00' : 'Mon-Fri 9:00-18:00'}
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Form & FAQ */}
      <section className="py-20 bg-background">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
            {/* Contact Form */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-jakarta font-bold text-gradient-hero mb-4">
                  {language === 'ka' ? 'გაგზავნეთ შეტყობინება' : 'Send us a Message'}
                </h2>
                <p className="text-foreground-muted">
                  {language === 'ka'
                    ? 'შეავსეთ ფორმა და ჩვენ მალე დაგიკავშირდებით'
                    : 'Fill out the form and we will contact you soon'
                  }
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-foreground-muted">
                      {language === 'ka' ? 'სახელი *' : 'Name *'}
                    </Label>
                    <Input
                      id="name"
                      name="name"
                      type="text"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="input-elegant mt-1"
                      placeholder={language === 'ka' ? 'შეიყვანეთ სახელი' : 'Enter your name'}
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-foreground-muted">
                      {language === 'ka' ? 'ელ. ფოსტა *' : 'Email *'}
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="input-elegant mt-1"
                      placeholder={language === 'ka' ? 'შეიყვანეთ ელ. ფოსტა' : 'Enter your email'}
                    />
                  </div>
                </div>

                <div>
                  <Label htmlFor="businessName" className="text-foreground-muted">
                    {language === 'ka' ? 'ბიზნესის სახელი' : 'Business Name'}
                  </Label>
                  <Input
                    id="businessName"
                    name="businessName"
                    type="text"
                    value={formData.businessName}
                    onChange={handleChange}
                    className="input-elegant mt-1"
                    placeholder={language === 'ka' ? 'შეიყვანეთ ბიზნესის სახელი' : 'Enter business name'}
                  />
                </div>

                <div>
                  <Label className="text-foreground-muted">
                    {language === 'ka' ? 'მიმართვის ტიპი' : 'Inquiry Type'}
                  </Label>
                  <Select onValueChange={(value) => handleSelectChange('inquiryType', value)}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder={language === 'ka' ? 'აირჩიეთ ტიპი' : 'Select type'} />
                    </SelectTrigger>
                    <SelectContent>
                      {inquiryTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="subject" className="text-foreground-muted">
                    {language === 'ka' ? 'თემა *' : 'Subject *'}
                  </Label>
                  <Input
                    id="subject"
                    name="subject"
                    type="text"
                    required
                    value={formData.subject}
                    onChange={handleChange}
                    className="input-elegant mt-1"
                    placeholder={language === 'ka' ? 'შეიყვანეთ თემა' : 'Enter subject'}
                  />
                </div>

                <div>
                  <Label htmlFor="message" className="text-foreground-muted">
                    {language === 'ka' ? 'შეტყობინება *' : 'Message *'}
                  </Label>
                  <Textarea
                    id="message"
                    name="message"
                    required
                    value={formData.message}
                    onChange={handleChange}
                    rows={6}
                    className="input-elegant mt-1 resize-none"
                    placeholder={language === 'ka' ? 'დაწერეთ თქვენი შეტყობინება...' : 'Write your message...'}
                  />
                </div>

                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full btn-hero"
                >
                  {isSubmitting ? (
                    language === 'ka' ? 'იგზავნება...' : 'Sending...'
                  ) : (
                    <>
                      <Send className="mr-2 w-4 h-4" />
                      {language === 'ka' ? 'შეტყობინების გაგზავნა' : 'Send Message'}
                    </>
                  )}
                </Button>
              </form>
            </div>

            {/* FAQ */}
            <div>
              <div className="mb-8">
                <h2 className="text-3xl font-jakarta font-bold text-gradient-hero mb-4">
                  {language === 'ka' ? 'ხშირად დასმული კითხვები' : 'Frequently Asked Questions'}
                </h2>
                <p className="text-foreground-muted">
                  {language === 'ka'
                    ? 'შესაძლოა თქვენი კითხვის პასუხი უკვე აქ იყოს'
                    : 'Your question might already be answered here'
                  }
                </p>
              </div>

              <div className="space-y-6">
                {faqs.map((faq, index) => (
                  <div key={index} className="card-feature">
                    <div className="flex items-start space-x-3">
                      <div className="w-6 h-6 bg-gradient-primary rounded-full flex items-center justify-center flex-shrink-0 mt-1">
                        <HelpCircle className="w-3 h-3 text-white" />
                      </div>
                      <div>
                        <h3 className="font-semibold text-foreground mb-2">
                          {faq.question}
                        </h3>
                        <p className="text-foreground-muted text-sm">
                          {faq.answer}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Contact Options */}
              <div className="mt-8 p-6 bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-xl border border-primary/20">
                <h3 className="font-semibold text-foreground mb-4 flex items-center">
                  <MessageCircle className="w-5 h-5 mr-2 text-primary-light" />
                  {language === 'ka' ? 'სხვა საკონტაქტო გზები' : 'Other Contact Options'}
                </h3>
                <div className="space-y-2 text-sm text-foreground-muted">
                  <p>
                    📧 <strong>Support:</strong> support@socialgenius.ge
                  </p>
                  <p>
                    💼 <strong>Sales:</strong> sales@socialgenius.ge
                  </p>
                  <p>
                    🤝 <strong>Partnership:</strong> partners@socialgenius.ge
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default ContactPage;