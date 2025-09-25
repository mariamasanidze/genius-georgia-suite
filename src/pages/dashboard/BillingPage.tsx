import React from 'react';
import { useLanguage } from '@/contexts/LanguageContext';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { CreditCard, Download, Calendar, CheckCircle } from 'lucide-react';

const BillingPage: React.FC = () => {
  const { language } = useLanguage();
  const { user } = useAuth();

  const currentPlan = {
    name: language === 'ka' ? 'პროფესიონალი' : 'Professional',
    price: '99₾',
    period: language === 'ka' ? 'თვეში' : '/month',
    nextBilling: '2024-02-15',
    features: [
      language === 'ka' ? '200 პოსტი თვეში' : '200 posts per month',
      language === 'ka' ? '5 სოციალური აკაუნტი' : '5 social accounts',
      language === 'ka' ? 'დამატებითი ანალიტიკა' : 'Advanced analytics',
      language === 'ka' ? 'პრიორიტეტული მხარდაჭერა' : 'Priority support'
    ]
  };

  const invoices = [
    { 
      id: 'INV-001', 
      date: '2024-01-15', 
      amount: '99₾', 
      status: language === 'ka' ? 'გადახდილი' : 'Paid',
      description: language === 'ka' ? 'პროფესიონალი გეგმა - იანვარი' : 'Professional Plan - January'
    },
    { 
      id: 'INV-002', 
      date: '2023-12-15', 
      amount: '99₾', 
      status: language === 'ka' ? 'გადახდილი' : 'Paid',
      description: language === 'ka' ? 'პროფესიონალი გეგმა - დეკემბერი' : 'Professional Plan - December'
    },
    { 
      id: 'INV-003', 
      date: '2023-11-15', 
      amount: '99₾', 
      status: language === 'ka' ? 'გადახდილი' : 'Paid',
      description: language === 'ka' ? 'პროფესიონალი გეგმა - ნოემბერი' : 'Professional Plan - November'
    }
  ];

  return (
    <div className="p-6 space-y-8">
      <div>
        <h1 className="text-3xl font-jakarta font-bold text-foreground">
          {language === 'ka' ? 'ბილინგი და გადახდები' : 'Billing & Payments'}
        </h1>
        <p className="text-foreground-muted mt-2">
          {language === 'ka' ? 'მართეთ თქვენი სუბსკრიფცია და გადახდები' : 'Manage your subscription and payments'}
        </p>
      </div>

      {/* Current Plan */}
      <div className="dashboard-card">
        <div className="flex items-center space-x-3 mb-6">
          <div className="w-10 h-10 bg-gradient-primary rounded-xl flex items-center justify-center">
            <CreditCard className="w-5 h-5 text-white" />
          </div>
          <h2 className="text-xl font-semibold text-foreground">
            {language === 'ka' ? 'მიმდინარე გეგმა' : 'Current Plan'}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-primary/10 to-primary-light/10 rounded-xl p-6 border border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h3 className="text-2xl font-bold text-gradient-hero">
                {currentPlan.name}
              </h3>
              <p className="text-foreground-muted">
                {currentPlan.price} {currentPlan.period}
              </p>
            </div>
            <div className="text-right">
              <p className="text-sm text-foreground-muted">
                {language === 'ka' ? 'შემდეგი ბილინგი:' : 'Next billing:'}
              </p>
              <p className="font-semibold text-foreground flex items-center">
                <Calendar className="w-4 h-4 mr-1" />
                {currentPlan.nextBilling}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            {currentPlan.features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <CheckCircle className="w-4 h-4 text-primary-light flex-shrink-0" />
                <span className="text-sm text-foreground">{feature}</span>
              </div>
            ))}
          </div>

          <div className="flex space-x-4">
            <Button className="btn-hero">
              {language === 'ka' ? 'გეგმის შეცვლა' : 'Change Plan'}
            </Button>
            <Button variant="outline">
              {language === 'ka' ? 'გაუქმება' : 'Cancel Subscription'}
            </Button>
          </div>
        </div>
      </div>

      {/* Payment Method */}
      <div className="dashboard-card">
        <h2 className="text-xl font-semibold text-foreground mb-6">
          {language === 'ka' ? 'გადახდის მეთოდი' : 'Payment Method'}
        </h2>

        <div className="flex items-center justify-between p-4 border border-border rounded-lg">
          <div className="flex items-center space-x-4">
            <div className="w-12 h-8 bg-gradient-primary rounded flex items-center justify-center">
              <span className="text-white text-xs font-bold">CARD</span>
            </div>
            <div>
              <p className="font-medium text-foreground">•••• •••• •••• 4242</p>
              <p className="text-sm text-foreground-muted">
                {language === 'ka' ? 'ვარდება: 12/25' : 'Expires: 12/25'}
              </p>
            </div>
          </div>
          <Button variant="outline" size="sm">
            {language === 'ka' ? 'შეცვლა' : 'Update'}
          </Button>
        </div>
      </div>

      {/* Billing History */}
      <div className="dashboard-card">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-semibold text-foreground">
            {language === 'ka' ? 'ბილინგის ისტორია' : 'Billing History'}
          </h2>
          <Button variant="outline" size="sm">
            <Download className="w-4 h-4 mr-2" />
            {language === 'ka' ? 'ჩამოტვირთვა' : 'Download All'}
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="border-b border-border">
                <th className="text-left py-3 text-sm font-medium text-foreground-muted">
                  {language === 'ka' ? 'ინვოისი' : 'Invoice'}
                </th>
                <th className="text-left py-3 text-sm font-medium text-foreground-muted">
                  {language === 'ka' ? 'თარიღი' : 'Date'}
                </th>
                <th className="text-left py-3 text-sm font-medium text-foreground-muted">
                  {language === 'ka' ? 'აღწერა' : 'Description'}
                </th>
                <th className="text-left py-3 text-sm font-medium text-foreground-muted">
                  {language === 'ka' ? 'თანხა' : 'Amount'}
                </th>
                <th className="text-left py-3 text-sm font-medium text-foreground-muted">
                  {language === 'ka' ? 'სტატუსი' : 'Status'}
                </th>
                <th className="text-left py-3 text-sm font-medium text-foreground-muted">
                  {language === 'ka' ? 'ქმედება' : 'Action'}
                </th>
              </tr>
            </thead>
            <tbody>
              {invoices.map((invoice) => (
                <tr key={invoice.id} className="border-b border-border/50">
                  <td className="py-4 text-sm font-mono text-foreground">
                    {invoice.id}
                  </td>
                  <td className="py-4 text-sm text-foreground">
                    {invoice.date}
                  </td>
                  <td className="py-4 text-sm text-foreground">
                    {invoice.description}
                  </td>
                  <td className="py-4 text-sm font-medium text-foreground">
                    {invoice.amount}
                  </td>
                  <td className="py-4">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-success/10 text-success">
                      <CheckCircle className="w-3 h-3 mr-1" />
                      {invoice.status}
                    </span>
                  </td>
                  <td className="py-4">
                    <Button variant="ghost" size="sm">
                      <Download className="w-4 h-4 mr-1" />
                      {language === 'ka' ? 'ჩამოტვირთვა' : 'Download'}
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default BillingPage;