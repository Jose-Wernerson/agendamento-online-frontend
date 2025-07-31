import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { 
  Calendar, 
  Users, 
  BarChart3, 
  Smartphone, 
  Clock, 
  CreditCard,
  CheckCircle,
  ArrowRight,
  Star,
  Zap
} from 'lucide-react'

const Home = () => {
  const navigate = useNavigate()
  const [activeFeature, setActiveFeature] = useState(0)

  const features = [
    {
      icon: Calendar,
      title: 'Agenda Interativa',
      description: 'Visualize e gerencie agendamentos com calendário intuitivo e responsivo.',
      color: 'bg-blue-500'
    },
    {
      icon: Users,
      title: 'Gestão de Clientes',
      description: 'Cadastro completo com histórico, preferências e campos personalizados.',
      color: 'bg-green-500'
    },
    {
      icon: BarChart3,
      title: 'Dashboard Analítico',
      description: 'Métricas em tempo real, gráficos e relatórios de performance.',
      color: 'bg-purple-500'
    },
    {
      icon: Smartphone,
      title: 'Notificações Automáticas',
      description: 'Lembretes via WhatsApp e e-mail para clientes e profissionais.',
      color: 'bg-orange-500'
    },
    {
      icon: CreditCard,
      title: 'Pagamentos Online',
      description: 'Integração com Pix, PagSeguro e Mercado Pago para facilitar cobranças.',
      color: 'bg-indigo-500'
    },
    {
      icon: Clock,
      title: 'Múltiplos Profissionais',
      description: 'Suporte completo para equipes com agendas individuais.',
      color: 'bg-teal-500'
    }
  ]

  const plans = [
    {
      name: 'Básico',
      price: 'R$ 29',
      period: '/mês',
      description: 'Ideal para pequenos negócios',
      features: [
        'Até 2 profissionais',
        'Agenda básica',
        'Cadastro de clientes',
        'Notificações por e-mail',
        'Suporte por e-mail'
      ],
      popular: false
    },
    {
      name: 'Profissional',
      price: 'R$ 59',
      period: '/mês',
      description: 'Para empresas em crescimento',
      features: [
        'Até 10 profissionais',
        'Dashboard completo',
        'Notificações WhatsApp',
        'Integração de pagamentos',
        'Relatórios avançados',
        'Suporte prioritário'
      ],
      popular: true
    },
    {
      name: 'Avançado',
      price: 'R$ 99',
      period: '/mês',
      description: 'Solução completa para grandes empresas',
      features: [
        'Profissionais ilimitados',
        'Personalização total',
        'API personalizada',
        'Múltiplas filiais',
        'Suporte 24/7',
        'Treinamento incluído'
      ],
      popular: false
    }
  ]

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-600 via-blue-700 to-indigo-800 text-white">
        <div className="absolute inset-0 bg-black/10"></div>
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 lg:py-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Transforme seu
                  <span className="block text-yellow-300">
                    Agendamento
                  </span>
                  em Experiência
                </h1>
                <p className="text-xl lg:text-2xl text-blue-100 leading-relaxed">
                  Sistema completo e moderno para gerenciar clientes, profissionais 
                  e agendamentos com elegância e eficiência.
                </p>
              </div>
              
              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  onClick={() => navigate('/login')}
                  className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-4 text-lg"
                >
                  Começar Agora
                  <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-slate-900 text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
                >
                  Ver Demonstração
                </Button>
              </div>
              
              <div className="flex items-center space-x-6 text-sm">
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Teste grátis por 14 dias</span>
                </div>
                <div className="flex items-center space-x-2">
                  <CheckCircle className="h-5 w-5 text-green-400" />
                  <span>Sem compromisso</span>
                </div>
              </div>
            </div>
            
            <div className="relative">
              <div className="bg-white/10 backdrop-blur-sm rounded-2xl p-8 border border-white/20">
                <div className="space-y-6">
                  <div className="flex items-center justify-between">
                    <h3 className="text-lg font-semibold">Agenda de Hoje</h3>
                    <span className="text-sm bg-green-400 text-green-900 px-2 py-1 rounded-full">
                      8 agendamentos
                    </span>
                  </div>
                  
                  <div className="space-y-3">
                    {[
                      { time: '09:00', client: 'Maria Silva', service: 'Corte + Escova' },
                      { time: '10:30', client: 'João Santos', service: 'Barba' },
                      { time: '14:00', client: 'Ana Costa', service: 'Manicure' }
                    ].map((appointment, index) => (
                      <div key={index} className="flex items-center space-x-3 bg-white/10 rounded-lg p-3">
                        <div className="text-sm font-mono bg-blue-500 text-white px-2 py-1 rounded">
                          {appointment.time}
                        </div>
                        <div className="flex-1">
                          <div className="font-medium">{appointment.client}</div>
                          <div className="text-sm text-blue-200">{appointment.service}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white dark:bg-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Recursos que Fazem a Diferença
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto">
              Tudo que você precisa para modernizar e otimizar seu negócio em uma única plataforma.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon
              return (
                <div
                  key={index}
                  className="group p-6 bg-slate-50 dark:bg-slate-800 rounded-xl hover:shadow-lg transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setActiveFeature(index)}
                >
                  <div className={`inline-flex p-3 rounded-lg ${feature.color} mb-4 group-hover:scale-110 transition-transform`}>
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                    {feature.title}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400">
                    {feature.description}
                  </p>
                </div>
              )
            })}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section className="py-20 bg-slate-50 dark:bg-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl lg:text-4xl font-bold text-slate-900 dark:text-white mb-4">
              Planos para Todos os Tamanhos
            </h2>
            <p className="text-xl text-slate-600 dark:text-slate-400">
              Escolha o plano ideal para seu negócio e comece a transformar seus agendamentos hoje mesmo.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {plans.map((plan, index) => (
              <div
                key={index}
                className={`relative p-8 rounded-2xl border-2 transition-all duration-300 ${
                  plan.popular
                    ? 'border-blue-500 bg-white dark:bg-slate-900 shadow-xl scale-105'
                    : 'border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 hover:border-blue-300 dark:hover:border-blue-600'
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                    <span className="bg-blue-500 text-white px-4 py-2 rounded-full text-sm font-semibold flex items-center">
                      <Star className="h-4 w-4 mr-1" />
                      Mais Popular
                    </span>
                  </div>
                )}
                
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
                    {plan.name}
                  </h3>
                  <p className="text-slate-600 dark:text-slate-400 mb-4">
                    {plan.description}
                  </p>
                  <div className="flex items-baseline justify-center">
                    <span className="text-4xl font-bold text-slate-900 dark:text-white">
                      {plan.price}
                    </span>
                    <span className="text-slate-600 dark:text-slate-400 ml-1">
                      {plan.period}
                    </span>
                  </div>
                </div>
                
                <ul className="space-y-4 mb-8">
                  {plan.features.map((feature, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <CheckCircle className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                      <span className="text-slate-700 dark:text-slate-300">
                        {feature}
                      </span>
                    </li>
                  ))}
                </ul>
                
                <Button
                  className={`w-full ${
                    plan.popular
                      ? 'bg-blue-600 hover:bg-blue-700 text-white'
                      : 'bg-slate-900 hover:bg-slate-800 text-white dark:bg-white dark:text-slate-900 dark:hover:bg-slate-100'
                  }`}
                  onClick={() => navigate('/login')}
                >
                  Começar Teste Grátis
                </Button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-blue-600 to-indigo-700 text-white">
        <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
          <div className="space-y-8">
            <div className="inline-flex items-center space-x-2 bg-white/10 backdrop-blur-sm rounded-full px-4 py-2">
              <Zap className="h-5 w-5 text-yellow-300" />
              <span className="text-sm font-medium">Pronto para começar?</span>
            </div>
            
            <h2 className="text-3xl lg:text-5xl font-bold leading-tight">
              Transforme seu Negócio
              <span className="block text-yellow-300">
                em Minutos, não Meses
              </span>
            </h2>
            
            <p className="text-xl text-blue-100 max-w-2xl mx-auto">
              Junte-se a centenas de empresas que já modernizaram seus agendamentos 
              e aumentaram sua eficiência com nossa plataforma.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                onClick={() => navigate('/login')}
                className="bg-yellow-400 hover:bg-yellow-500 text-blue-900 font-semibold px-8 py-4 text-lg"
              >
                Começar Teste Grátis
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="border-white text-white hover:bg-white hover:text-blue-900 px-8 py-4 text-lg"
              >
                Falar com Especialista
              </Button>
            </div>
          </div>
        </div>
      </section>
    </div>
  )
}

export default Home

