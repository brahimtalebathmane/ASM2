import React, { useState } from 'react';
import { Check, Star, Users, Zap, Crown, ArrowRight } from 'lucide-react';
import { useCMS } from './CMSProvider';

const MembershipSection = () => {
  const { data, loading } = useCMS();
  const [selectedPlan, setSelectedPlan] = useState('startup');

  if (loading) {
    return <div className="py-20 bg-white"></div>;
  }

  const membershipData = data.membershipPlans || {};
  const plans = membershipData.plans || [];

  const getIconComponent = (planId: string) => {
    switch (planId) {
      case 'startup': return <Zap className="w-8 h-8" />;
      case 'scale': return <Star className="w-8 h-8" />;
      case 'enterprise': return <Crown className="w-8 h-8" />;
      default: return <Zap className="w-8 h-8" />;
    }
  };

  const getColorClass = (planId: string) => {
    switch (planId) {
      case 'startup': return 'from-blue-500 to-blue-600';
      case 'scale': return 'from-emerald-500 to-emerald-600';
      case 'enterprise': return 'from-purple-500 to-purple-600';
      default: return 'from-blue-500 to-blue-600';
    }
  };

  const benefits = [
    {
      icon: <Users className="w-12 h-12" />,
      title: "Réseau d'entrepreneurs",
      description: "Rejoignez une communauté de plus de 200 entrepreneurs passionnés"
    },
    {
      icon: <Zap className="w-12 h-12" />,
      title: "Accélération business",
      description: "Programmes d'accompagnement pour accélérer votre croissance"
    },
    {
      icon: <Star className="w-12 h-12" />,
      title: "Visibilité maximale",
      description: "Augmentez votre visibilité auprès des investisseurs et partenaires"
    }
  ];

  return (
    <section id="adhesion" className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Rejoignez <span className="text-emerald-500">la MSA</span>
          </h2>
          <div className="w-20 h-1 bg-gradient-to-r from-emerald-500 to-blue-600 mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Choisissez le plan d'adhésion qui correspond à vos besoins et accédez à un écosystème d'innovation unique en Mauritanie
          </p>
        </div>

        {/* Benefits Overview */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {benefits.map((benefit, index) => (
            <div key={index} className="text-center group hover:scale-105 transition-transform duration-300">
              <div className="w-20 h-20 bg-gradient-to-br from-emerald-500 to-blue-600 rounded-2xl flex items-center justify-center text-white mx-auto mb-4 group-hover:shadow-xl transition-shadow">
                {benefit.icon}
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">{benefit.title}</h3>
              <p className="text-gray-600">{benefit.description}</p>
            </div>
          ))}
        </div>

        {/* Pricing Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {plans.map((plan) => (
            <div
              key={plan.id}
              className={`relative bg-white rounded-3xl shadow-xl border-2 transition-all duration-300 hover:shadow-2xl hover:-translate-y-2 ${
                plan.popular ? 'border-emerald-500 scale-105' : 'border-gray-200'
              } ${selectedPlan === plan.id ? 'ring-4 ring-emerald-500/20' : ''}`}
              onClick={() => setSelectedPlan(plan.id)}
            >
              {plan.popular && (
                <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                  <span className="bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-6 py-2 rounded-full text-sm font-bold shadow-lg">
                    Le plus populaire
                  </span>
                </div>
              )}

              <div className="p-8">
                {/* Header */}
                <div className="text-center mb-8">
                  <div className={`w-16 h-16 bg-gradient-to-br ${getColorClass(plan.id)} rounded-2xl flex items-center justify-center text-white mx-auto mb-4`}>
                    {getIconComponent(plan.id)}
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900 mb-2">{plan.name}</h3>
                  <p className="text-gray-600 mb-4">{plan.description}</p>
                  
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-gray-900">{plan.price}</span>
                    <span className="text-gray-500 ml-1">MRU</span>
                    <span className="text-gray-500 ml-1">{plan.period}</span>
                  </div>
                </div>

                {/* Features */}
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, index) => (
                    <li key={index} className="flex items-start space-x-3">
                      <Check className="w-5 h-5 text-emerald-500 mt-0.5 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </li>
                  ))}
                </ul>

                {/* CTA */}
                <a
                  href={plan.popular ? "mailto:mauristartups@gmail.com?subject=Adhésion Plan " + plan.name : "mailto:mauristartups@gmail.com?subject=Information Plan " + plan.name}
                  className={`w-full py-4 rounded-lg font-bold text-lg transition-all duration-300 flex items-center justify-center space-x-2 ${
                    plan.popular
                      ? 'bg-gradient-to-r from-emerald-500 to-emerald-600 text-white hover:from-emerald-600 hover:to-emerald-700 shadow-lg hover:shadow-xl'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <span>{plan.popular ? 'Choisir ce plan' : 'En savoir plus'}</span>
                  <ArrowRight className="w-5 h-5" />
                </a>
              </div>
            </div>
          ))}
        </div>

        {/* Membership Form */}
        <div className="bg-gradient-to-r from-blue-900 to-emerald-900 rounded-3xl p-8 md:p-12 text-white">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h3 className="text-3xl font-bold mb-4">Prêt à nous rejoindre ?</h3>
              <p className="text-blue-200 text-lg">
                Contactez-nous directement pour finaliser votre adhésion et rejoindre notre communauté d'entrepreneurs
              </p>
            </div>

            <div className="text-center">
              <a
                href="mailto:mauristartups@gmail.com"
                className="inline-block bg-gradient-to-r from-emerald-500 to-emerald-600 text-white px-12 py-4 rounded-lg font-bold text-lg hover:from-emerald-600 hover:to-emerald-700 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                Nous contacter pour adhérer
              </a>
              <p className="text-blue-300 text-sm mt-4">
                Cliquez pour nous envoyer un email avec vos informations
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MembershipSection;