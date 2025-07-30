import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { 
  Search, 
  Plus, 
  Edit, 
  Trash2, 
  Phone, 
  Mail, 
  Calendar,
  User,
  Filter
} from 'lucide-react'
import { useAuth } from '../../contexts/AuthContext'
import ApiService from '../../services/api'

const ClientesList = ({ onClienteSelect, onClienteEdit, onClienteCreate }) => {
  const [clientes, setClientes] = useState([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const { empresa } = useAuth()

  useEffect(() => {
    if (empresa?.id) {
      loadClientes()
    }
  }, [empresa?.id, currentPage, searchTerm])

  const loadClientes = async () => {
    try {
      setLoading(true)
      const params = {
        page: currentPage,
        per_page: 20,
        busca: searchTerm
      }
      
      const response = await ApiService.getClientes(empresa.id, params)
      setClientes(response.clientes || [])
      setTotalPages(response.pages || 1)
    } catch (error) {
      console.error('Erro ao carregar clientes:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleSearch = (e) => {
    setSearchTerm(e.target.value)
    setCurrentPage(1)
  }

  const handleDeleteCliente = async (clienteId) => {
    if (window.confirm('Tem certeza que deseja excluir este cliente?')) {
      try {
        await ApiService.deleteCliente(clienteId)
        loadClientes()
      } catch (error) {
        console.error('Erro ao excluir cliente:', error)
        alert('Erro ao excluir cliente')
      }
    }
  }

  const formatPhone = (phone) => {
    if (!phone) return ''
    return phone.replace(/(\d{2})(\d{5})(\d{4})/, '($1) $2-$3')
  }

  const formatDate = (dateString) => {
    if (!dateString) return 'Nunca'
    return new Date(dateString).toLocaleDateString('pt-BR')
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
          <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
            Clientes
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            Gerencie seus clientes e histórico de atendimentos
          </p>
        </div>
        <Button onClick={onClienteCreate} className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Cliente
        </Button>
      </div>

      {/* Search and Filters */}
      <div className="flex flex-col sm:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
          <Input
            placeholder="Buscar por nome, telefone ou e-mail..."
            value={searchTerm}
            onChange={handleSearch}
            className="pl-10"
          />
        </div>
        <Button variant="outline" className="sm:w-auto">
          <Filter className="h-4 w-4 mr-2" />
          Filtros
        </Button>
      </div>

      {/* Clientes Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {clientes.map((cliente) => (
          <div
            key={cliente.id}
            className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
            onClick={() => onClienteSelect && onClienteSelect(cliente)}
          >
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center space-x-3">
                <div className="w-12 h-12 bg-blue-100 dark:bg-blue-900 rounded-full flex items-center justify-center">
                  <User className="h-6 w-6 text-blue-600 dark:text-blue-400" />
                </div>
                <div>
                  <h3 className="font-semibold text-slate-900 dark:text-white">
                    {cliente.nome}
                  </h3>
                  <p className="text-sm text-slate-500 dark:text-slate-400">
                    Cliente desde {formatDate(cliente.criado_em)}
                  </p>
                </div>
              </div>
              
              <div className="flex space-x-1">
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    onClienteEdit && onClienteEdit(cliente)
                  }}
                  className="h-8 w-8 p-0"
                >
                  <Edit className="h-4 w-4" />
                </Button>
                <Button
                  size="sm"
                  variant="ghost"
                  onClick={(e) => {
                    e.stopPropagation()
                    handleDeleteCliente(cliente.id)
                  }}
                  className="h-8 w-8 p-0 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/20"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              {cliente.telefone && (
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Phone className="h-4 w-4" />
                  <span>{formatPhone(cliente.telefone)}</span>
                </div>
              )}
              
              {cliente.email && (
                <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                  <Mail className="h-4 w-4" />
                  <span>{cliente.email}</span>
                </div>
              )}
              
              <div className="flex items-center space-x-2 text-sm text-slate-600 dark:text-slate-400">
                <Calendar className="h-4 w-4" />
                <span>Último atendimento: {formatDate(cliente.ultimo_atendimento)}</span>
              </div>
            </div>

            {cliente.observacoes && (
              <div className="mt-3 p-2 bg-slate-50 dark:bg-slate-700 rounded text-sm text-slate-600 dark:text-slate-400">
                {cliente.observacoes.length > 100 
                  ? `${cliente.observacoes.substring(0, 100)}...`
                  : cliente.observacoes
                }
              </div>
            )}

            <div className="mt-4 flex items-center justify-between">
              <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                cliente.ativo 
                  ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400'
                  : 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
              }`}>
                {cliente.ativo ? 'Ativo' : 'Inativo'}
              </span>
              
              <Button
                size="sm"
                variant="outline"
                onClick={(e) => {
                  e.stopPropagation()
                  // Aqui seria aberto o histórico do cliente
                }}
              >
                Ver Histórico
              </Button>
            </div>
          </div>
        ))}
      </div>

      {/* Empty State */}
      {clientes.length === 0 && !loading && (
        <div className="text-center py-12">
          <User className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            Nenhum cliente encontrado
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            {searchTerm 
              ? 'Tente ajustar os termos de busca'
              : 'Comece cadastrando seu primeiro cliente'
            }
          </p>
          {!searchTerm && (
            <Button onClick={onClienteCreate} className="bg-blue-600 hover:bg-blue-700">
              <Plus className="h-4 w-4 mr-2" />
              Cadastrar Primeiro Cliente
            </Button>
          )}
        </div>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex items-center justify-center space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
            disabled={currentPage === 1}
          >
            Anterior
          </Button>
          
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Página {currentPage} de {totalPages}
          </span>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
            disabled={currentPage === totalPages}
          >
            Próxima
          </Button>
        </div>
      )}
    </div>
  )
}

export default ClientesList

