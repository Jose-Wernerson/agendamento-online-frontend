import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { 
  BarChart3, 
  Download, 
  Calendar,
  Users,
  DollarSign,
  TrendingUp,
  Clock,
  Star
} from 'lucide-react'
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  AreaChart,
  Area
} from 'recharts'
import { useAuth } from '../../contexts/AuthContext'
import ApiService from '../../services/api'

const RelatoriosPage = () => {
  const [periodo, setPeriodo] = useState('30d')
  const [loading, setLoading] = useState(true)
  const [dashboardData, setDashboardData] = useState(null)
  const [agendamentosData, setAgendamentosData] = useState([])
  const [servicosData, setServicosData] = useState([])
  const [profissionaisData, setProfissionaisData] = useState([])
  const [horariosData, setHorariosData] = useState([])
  const [statusData, setStatusData] = useState({})
  const { empresa } = useAuth()

  useEffect(() => {
    if (empresa?.id) {
      loadAnalyticsData()
    }
  }, [empresa?.id, periodo])

  const loadAnalyticsData = async () => {
    try {
      setLoading(true)
      
      // Carregar dados do dashboard
      const dashboardResponse = await ApiService.request(
        `/empresas/${empresa.id}/analytics/dashboard?periodo=${periodo}`
      )
      setDashboardData(dashboardResponse)

      // Carregar agendamentos por período
      const agendamentosResponse = await ApiService.request(
        `/empresas/${empresa.id}/analytics/agendamentos?periodo=${periodo}`
      )
      setAgendamentosData(agendamentosResponse.dados || [])

      // Carregar serviços populares
      const servicosResponse = await ApiService.request(
        `/empresas/${empresa.id}/analytics/servicos?limite=5`
      )
      setServicosData(servicosResponse.servicos || [])

      // Carregar performance dos profissionais
      const profissionaisResponse = await ApiService.request(
        `/empresas/${empresa.id}/analytics/profissionais`
      )
      setProfissionaisData(profissionaisResponse.profissionais || [])

      // Carregar horários de pico
      const horariosResponse = await ApiService.request(
        `/empresas/${empresa.id}/analytics/horarios-pico`
      )
      setHorariosData(horariosResponse.horarios || [])

      // Carregar status dos agendamentos
      const statusResponse = await ApiService.request(
        `/empresas/${empresa.id}/analytics/status-agendamentos?periodo=${periodo}`
      )
      setStatusData(statusResponse.status || {})

    } catch (error) {
      console.error('Erro ao carregar analytics:', error)
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

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('pt-BR', {
      day: '2-digit',
      month: '2-digit'
    })
  }

  const COLORS = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6']

  const statusDataForChart = Object.entries(statusData).map(([status, count], index) => ({
    name: status.charAt(0).toUpperCase() + status.slice(1).replace('_', ' '),
    value: count,
    color: COLORS[index % COLORS.length]
  }))

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
            Relatórios e Analytics
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Analise o desempenho do seu negócio com métricas detalhadas
          </p>
        </div>
        <div className="flex items-center space-x-3">
          <select
            value={periodo}
            onChange={(e) => setPeriodo(e.target.value)}
            className="px-3 py-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-800 text-slate-900 dark:text-white"
          >
            <option value="7d">Últimos 7 dias</option>
            <option value="30d">Últimos 30 dias</option>
            <option value="90d">Últimos 90 dias</option>
            <option value="1y">Último ano</option>
          </select>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Download className="h-4 w-4 mr-2" />
            Exportar
          </Button>
        </div>
      </div>

      {/* Métricas Principais */}
      {dashboardData && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Total de Agendamentos
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {dashboardData.agendamentos.total}
                </p>
              </div>
              <div className="p-3 bg-blue-100 dark:bg-blue-900/20 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className={`${dashboardData.agendamentos.crescimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {dashboardData.agendamentos.crescimento >= 0 ? '+' : ''}{dashboardData.agendamentos.crescimento.toFixed(1)}%
              </span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">vs período anterior</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Clientes Ativos
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {dashboardData.clientes.ativos}
                </p>
              </div>
              <div className="p-3 bg-green-100 dark:bg-green-900/20 rounded-lg">
                <Users className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              {dashboardData.clientes.novos} novos clientes
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Receita Total
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {formatCurrency(dashboardData.receita.total)}
                </p>
              </div>
              <div className="p-3 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                <DollarSign className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
            </div>
            <div className="mt-4 flex items-center text-sm">
              <TrendingUp className="h-4 w-4 text-green-500 mr-1" />
              <span className={`${dashboardData.receita.crescimento >= 0 ? 'text-green-600' : 'text-red-600'}`}>
                {dashboardData.receita.crescimento >= 0 ? '+' : ''}{dashboardData.receita.crescimento.toFixed(1)}%
              </span>
              <span className="text-slate-600 dark:text-slate-400 ml-1">vs período anterior</span>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-slate-600 dark:text-slate-400">
                  Taxa de Ocupação
                </p>
                <p className="text-3xl font-bold text-slate-900 dark:text-white">
                  {dashboardData.ocupacao.taxa.toFixed(1)}%
                </p>
              </div>
              <div className="p-3 bg-orange-100 dark:bg-orange-900/20 rounded-lg">
                <Clock className="h-6 w-6 text-orange-600 dark:text-orange-400" />
              </div>
            </div>
            <div className="mt-4 text-sm text-slate-600 dark:text-slate-400">
              Ticket médio: {formatCurrency(dashboardData.receita.ticket_medio)}
            </div>
          </div>
        </div>
      )}

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Agendamentos por Período */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Agendamentos por Período
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <AreaChart data={agendamentosData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="periodo" 
                tickFormatter={formatDate}
                className="text-slate-600 dark:text-slate-400"
              />
              <YAxis className="text-slate-600 dark:text-slate-400" />
              <Tooltip 
                labelFormatter={formatDate}
                formatter={(value, name) => [
                  name === 'agendamentos' ? value : formatCurrency(value),
                  name === 'agendamentos' ? 'Agendamentos' : 'Receita'
                ]}
              />
              <Area 
                type="monotone" 
                dataKey="agendamentos" 
                stroke="#3B82F6" 
                fill="#3B82F6" 
                fillOpacity={0.3}
              />
            </AreaChart>
          </ResponsiveContainer>
        </div>

        {/* Receita por Período */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Receita por Período
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={agendamentosData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis 
                dataKey="periodo" 
                tickFormatter={formatDate}
                className="text-slate-600 dark:text-slate-400"
              />
              <YAxis className="text-slate-600 dark:text-slate-400" />
              <Tooltip 
                labelFormatter={formatDate}
                formatter={(value) => [formatCurrency(value), 'Receita']}
              />
              <Line 
                type="monotone" 
                dataKey="receita" 
                stroke="#10B981" 
                strokeWidth={3}
                dot={{ fill: '#10B981', strokeWidth: 2, r: 4 }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Serviços Mais Populares */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Serviços Mais Populares
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={servicosData} layout="horizontal">
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis type="number" className="text-slate-600 dark:text-slate-400" />
              <YAxis 
                type="category" 
                dataKey="nome" 
                width={100}
                className="text-slate-600 dark:text-slate-400"
              />
              <Tooltip 
                formatter={(value, name) => [
                  name === 'total_agendamentos' ? value : formatCurrency(value),
                  name === 'total_agendamentos' ? 'Agendamentos' : 'Receita Total'
                ]}
              />
              <Bar dataKey="total_agendamentos" fill="#3B82F6" />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Status dos Agendamentos */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
          <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
            Status dos Agendamentos
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={statusDataForChart}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {statusDataForChart.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Performance dos Profissionais */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Performance dos Profissionais
        </h3>
        <ResponsiveContainer width="100%" height={400}>
          <BarChart data={profissionaisData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="nome" 
              className="text-slate-600 dark:text-slate-400"
            />
            <YAxis className="text-slate-600 dark:text-slate-400" />
            <Tooltip 
              formatter={(value, name) => [
                name === 'total_agendamentos' ? value : formatCurrency(value),
                name === 'total_agendamentos' ? 'Agendamentos' : 
                name === 'receita_total' ? 'Receita Total' : 'Ticket Médio'
              ]}
            />
            <Bar dataKey="total_agendamentos" fill="#3B82F6" name="total_agendamentos" />
            <Bar dataKey="receita_total" fill="#10B981" name="receita_total" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Horários de Pico */}
      <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-4">
          Horários de Pico
        </h3>
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={horariosData}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis 
              dataKey="hora" 
              className="text-slate-600 dark:text-slate-400"
            />
            <YAxis className="text-slate-600 dark:text-slate-400" />
            <Tooltip 
              formatter={(value) => [value, 'Agendamentos']}
            />
            <Bar dataKey="agendamentos" fill="#F59E0B" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  )
}

export default RelatoriosPage

