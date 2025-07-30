import { useState, useEffect } from 'react'
import { useAuth } from '../../contexts/AuthContext'
import { 
  Calendar, 
  Users, 
  DollarSign, 
  TrendingUp,
  Clock,
  CheckCircle,
  AlertCircle,
  Plus,
  ArrowUpRight,
  ArrowDownRight
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts'
import ApiService from '../../services/api'

const DashboardHome = () => {
  const { user, empresa } = useAuth()
  const [dashboardData, setDashboardData] = useState(null)
  const [agendamentosHoje, setAgendamentosHoje] = useState([])
  const [agendamentosChart, setAgendamentosChart] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    if (empresa?.id) {
      loadDashboardData()
    }
  }, [empresa?.id])

  const loadDashboardData = async () => {
    try {
      setLoading(true)
      
      // Carregar métricas do dashboard
      const dashboardResponse = await ApiService.request(
        `/empresas/${empresa.id}/analytics/dashboard?periodo=30d`
      )
      setDashboardData(dashboardResponse)
      
      // Carregar agendamentos de hoje (simulado)
      setAgendamentosHoje([
        { 
          id: 1, 
          data_hora: new Date().toISOString(), 
          cliente: { nome: 'Maria Silva' }, 
          servico: { nome: 'Corte + Escova' }, 
          profissional: { nome: 'Ana' },
          status: 'confirmado'
        },
        { 
          id: 2, 
          data_hora: new Date(Date.now() + 90*60000).toISOString(), 
          cliente: { nome: 'João Santos' }, 
          servico: { nome: 'Barba' }, 
          profissional: { nome: 'Carlos' },
          status: 'agendado'
        },
        { 
          id: 3, 
          data_hora: new Date(Date.now() + 300*60000).toISOString(), 
          cliente: { nome: 'Ana Costa' }, 
          servico: { nome: 'Manicure' }, 
          profissional: { nome: 'Lucia' },
          status: 'confirmado'
        }
      ])

      // Carregar dados para gráfico (últimos 7 dias)
      const agendamentosResponse = await ApiService.request(
        `/empresas/${empresa.id}/analytics/agendamentos?periodo=7d`
      )
      setAgendamentosChart(agendamentosResponse.dados || [])
      
    } catch (error) {
      console.error('Erro ao carregar dados do dashboard:', error)
      // Dados de fallback para demonstração
      setDashboardData({
        agendamentos: { total: 45, hoje: 8, crescimento: 12.5 },
        clientes: { total: 248, ativos: 156, novos: 12 },
        receita: { total: 15420, hoje: 850, crescimento: 18.3, ticket_medio: 85.50 },
        ocupacao: { taxa: 87, horarios_disponiveis: 8, horarios_ocupados: 8 }
      })
    } finally {
      setLoading(false)
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  const formatTime = (dateString) => {
    return new Date(dateString).toLocaleTimeString('pt-BR', {
      hour: '2-digit',
      minute: '2-digit'
    })
  }

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    })
  }

  const getStatusColor = (status) => {
    switch (status) {
      case 'confirmado':
        return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
      case 'agendado':
        return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400'
      case 'em_andamento':
        return 'bg-yellow-100 text-yellow-800 dark:bg-yellow-900/20 dark:text-yellow-400'
      case 'concluido':
        return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400'
      default:
        return 'bg-slate-100 text-slate-800 dark:bg-slate-900/20 dark:text-slate-400'
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'confirmado':
      case 'concluido':
        return <CheckCircle className="h-4 w-4" />
      case 'em_andamento':
        return <Clock className="h-4 w-4" />
      default:
        return <AlertCircle className="h-4 w-4" />
    }
  }

  const getTrendIcon = (value) => {
    return value >= 0 ? (
      <ArrowUpRight className="h-4 w-4 text-green-500" />
    ) : (
      <ArrowDownRight className="h-4 w-4 text-red-500" />
    )
  }

  const getTrendColor = (value) => {
    return value >= 0 ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Dashboard
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Bem-vindo de volta, {user?.nome}! Aqui está um resumo do seu negócio hoje.
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Agendamentos Hoje
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {dashboardData?.agendamentos?.hoje || 0}
              </p>
            </div>
            <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
              <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {getTrendIcon(dashboardData?.agendamentos?.crescimento || 0)}
            <span className={getTrendColor(dashboardData?.agendamentos?.crescimento || 0)}>
              {dashboardData?.agendamentos?.crescimento >= 0 ? '+' : ''}{(dashboardData?.agendamentos?.crescimento || 0).toFixed(1)}%
            </span>
            <span className="text-slate-600 dark:text-slate-400 ml-1">vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Clientes Ativos
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {dashboardData?.clientes?.ativos || 0}
              </p>
            </div>
            <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
              <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            {dashboardData?.clientes?.novos || 0} novos este mês
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Receita do Mês
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(dashboardData?.receita?.total || 0)}
              </p>
            </div>
            <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
              <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
            </div>
          </div>
          <div className="mt-4 flex items-center text-sm">
            {getTrendIcon(dashboardData?.receita?.crescimento || 0)}
            <span className={getTrendColor(dashboardData?.receita?.crescimento || 0)}>
              {dashboardData?.receita?.crescimento >= 0 ? '+' : ''}{(dashboardData?.receita?.crescimento || 0).toFixed(1)}%
            </span>
            <span className="text-slate-600 dark:text-slate-400 ml-1">vs mês anterior</span>
          </div>
        </div>

        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                Taxa de Ocupação
              </p>
              <p className="text-3xl font-bold text-slate-900 dark:text-white">
                {(dashboardData?.ocupacao?.taxa || 0).toFixed(1)}%
              </p>
            </div>
            <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
              <TrendingUp className="h-6 w-6 text-orange-600 dark:text-orange-400" />
            </div>
          </div>
          <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
            Ticket médio: {formatCurrency(dashboardData?.receita?.ticket_medio || 0)}
          </div>
        </div>
      </div>

      {/* Charts and Lists */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agendamentos dos Últimos 7 Dias */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
              Agendamentos - Últimos 7 Dias
            </h2>
          </div>
          
          <div className="p-6">
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={agendamentosChart}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis 
                  dataKey="periodo" 
                  tickFormatter={formatDate}
                  className="text-slate-600 dark:text-slate-400"
                />
                <YAxis className="text-slate-600 dark:text-slate-400" />
                <Tooltip 
                  labelFormatter={formatDate}
                  formatter={(value) => [value, 'Agendamentos']}
                />
                <Line 
                  type="monotone" 
                  dataKey="agendamentos" 
                  stroke="#3B82F6" 
                  strokeWidth={2}
                  dot={{ fill: '#3B82F6', strokeWidth: 2, r: 4 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Agendamentos de Hoje */}
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                Agendamentos de Hoje
              </h2>
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </div>
          </div>
          
          <div className="p-6">
            {agendamentosHoje.length > 0 ? (
              <div className="space-y-4">
                {agendamentosHoje.slice(0, 5).map((agendamento) => (
                  <div
                    key={agendamento.id}
                    className="flex items-center justify-between p-4 bg-slate-50 dark:bg-slate-700 rounded-lg"
                  >
                    <div className="flex items-center space-x-4">
                      <div className="text-sm font-mono bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 px-2 py-1 rounded">
                        {formatTime(agendamento.data_hora)}
                      </div>
                      <div>
                        <div className="font-medium text-slate-900 dark:text-white">
                          {agendamento.cliente?.nome}
                        </div>
                        <div className="text-sm text-slate-600 dark:text-slate-400">
                          {agendamento.servico?.nome} - {agendamento.profissional?.nome}
                        </div>
                      </div>
                    </div>
                    <div className={`inline-flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(agendamento.status)}`}>
                      {getStatusIcon(agendamento.status)}
                      <span className="capitalize">{agendamento.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-8">
                <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
                <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
                  Nenhum agendamento hoje
                </h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Que tal aproveitar para organizar a agenda de amanhã?
                </p>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  <Plus className="h-4 w-4 mr-2" />
                  Criar Agendamento
                </Button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Resumo Rápido */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="p-6 border-b border-slate-200 dark:border-slate-700">
          <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
            Resumo Rápido
          </h2>
        </div>
        
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {agendamentosHoje.length > 0 ? formatTime(agendamentosHoje[0].data_hora) : '--:--'}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Próximo agendamento</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {dashboardData?.ocupacao?.horarios_disponiveis || 0}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Horários livres hoje</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {dashboardData?.clientes?.novos || 0}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Novos clientes esta semana</p>
            </div>
            
            <div className="text-center">
              <p className="text-2xl font-bold text-slate-900 dark:text-white">
                {formatCurrency(dashboardData?.receita?.hoje || 0)}
              </p>
              <p className="text-sm text-slate-600 dark:text-slate-400">Receita hoje</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DashboardHome

