import { Routes, Route, Link, useLocation } from 'react-router-dom'
import { useState } from 'react'
import { useAuth } from '../contexts/AuthContext'
import { 
  Calendar, 
  Users, 
  UserCheck, 
  Briefcase, 
  BarChart3, 
  Settings,
  Home,
  Menu,
  X
} from 'lucide-react'
import { Button } from '@/components/ui/button'

// Componentes das páginas
import DashboardHome from '../components/dashboard/DashboardHome'
import ClientesPage from '../components/dashboard/ClientesPage'
import ProfissionaisPage from '../components/dashboard/ProfissionaisPage'
import ServicosPage from '../components/dashboard/ServicosPage'
import AgendaPage from '../components/dashboard/AgendaPage'
import RelatoriosPage from '../components/dashboard/RelatoriosPage'
import ConfiguracoesPage from '../components/dashboard/ConfiguracoesPage'

const Dashboard = () => {
  const { user, empresa } = useAuth()
  const location = useLocation()
  const [sidebarOpen, setSidebarOpen] = useState(false)

  const navigation = [
    { name: 'Início', href: '/dashboard', icon: Home, current: location.pathname === '/dashboard' },
    { name: 'Agenda', href: '/dashboard/agenda', icon: Calendar, current: location.pathname.startsWith('/dashboard/agenda') },
    { name: 'Clientes', href: '/dashboard/clientes', icon: Users, current: location.pathname.startsWith('/dashboard/clientes') },
    { name: 'Profissionais', href: '/dashboard/profissionais', icon: UserCheck, current: location.pathname.startsWith('/dashboard/profissionais') },
    { name: 'Serviços', href: '/dashboard/servicos', icon: Briefcase, current: location.pathname.startsWith('/dashboard/servicos') },
    { name: 'Relatórios', href: '/dashboard/relatorios', icon: BarChart3, current: location.pathname.startsWith('/dashboard/relatorios') },
    { name: 'Configurações', href: '/dashboard/configuracoes', icon: Settings, current: location.pathname.startsWith('/dashboard/configuracoes') },
  ]

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <div className="flex">
        {/* Sidebar Mobile Overlay */}
        {sidebarOpen && (
          <div 
            className="fixed inset-0 z-40 bg-black bg-opacity-50 lg:hidden"
            onClick={() => setSidebarOpen(false)}
          />
        )}

        {/* Sidebar */}
        <div className={`fixed inset-y-0 left-0 z-50 w-64 bg-white dark:bg-slate-800 shadow-lg transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0 ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        }`}>
          <div className="flex items-center justify-between h-16 px-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-2">
              <div className="p-2 bg-blue-600 rounded-lg">
                <Calendar className="h-5 w-5 text-white" />
              </div>
              <div>
                <h1 className="text-sm font-bold text-slate-900 dark:text-white">
                  {empresa?.nome || 'AgendaOnline'}
                </h1>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Dashboard
                </p>
              </div>
            </div>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(false)}
              className="lg:hidden"
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          <nav className="mt-6 px-3">
            <div className="space-y-1">
              {navigation.map((item) => {
                const Icon = item.icon
                return (
                  <Link
                    key={item.name}
                    to={item.href}
                    onClick={() => setSidebarOpen(false)}
                    className={`group flex items-center px-3 py-2 text-sm font-medium rounded-md transition-colors ${
                      item.current
                        ? 'bg-blue-100 text-blue-700 dark:bg-blue-900 dark:text-blue-300'
                        : 'text-slate-700 hover:text-blue-600 hover:bg-slate-100 dark:text-slate-300 dark:hover:text-blue-400 dark:hover:bg-slate-700'
                    }`}
                  >
                    <Icon className={`mr-3 h-5 w-5 ${
                      item.current 
                        ? 'text-blue-600 dark:text-blue-400' 
                        : 'text-slate-400 group-hover:text-blue-500'
                    }`} />
                    {item.name}
                  </Link>
                )
              })}
            </div>
          </nav>

          {/* User Info */}
          <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-slate-200 dark:border-slate-700">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-slate-300 dark:bg-slate-600 rounded-full flex items-center justify-center">
                <span className="text-sm font-medium text-slate-700 dark:text-slate-300">
                  {user?.nome?.charAt(0) || 'U'}
                </span>
              </div>
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium text-slate-900 dark:text-white truncate">
                  {user?.nome || 'Usuário'}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400 truncate">
                  {empresa?.plano || 'Plano Básico'}
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Main Content */}
        <div className="flex-1 lg:ml-0">
          {/* Top Bar */}
          <div className="bg-white dark:bg-slate-800 shadow-sm border-b border-slate-200 dark:border-slate-700 lg:hidden">
            <div className="flex items-center justify-between h-16 px-4">
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setSidebarOpen(true)}
              >
                <Menu className="h-5 w-5" />
              </Button>
              <h1 className="text-lg font-semibold text-slate-900 dark:text-white">
                Dashboard
              </h1>
              <div className="w-10" /> {/* Spacer */}
            </div>
          </div>

          {/* Page Content */}
          <main className="p-6">
            <Routes>
              <Route path="/" element={<DashboardHome />} />
              <Route path="/agenda/*" element={<AgendaPage />} />
              <Route path="/clientes/*" element={<ClientesPage />} />
              <Route path="/profissionais/*" element={<ProfissionaisPage />} />
              <Route path="/servicos/*" element={<ServicosPage />} />
              <Route path="/relatorios/*" element={<RelatoriosPage />} />
              <Route path="/configuracoes/*" element={<ConfiguracoesPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </div>
  )
}

export default Dashboard

