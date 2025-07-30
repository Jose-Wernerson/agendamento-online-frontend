import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { 
  CreditCard, 
  Smartphone, 
  DollarSign,
  QrCode,
  ExternalLink,
  CheckCircle,
  Clock,
  AlertCircle
} from 'lucide-react'
import ApiService from '../../services/api'

const PaymentForm = ({ agendamento, onPaymentComplete, onCancel }) => {
  const [selectedGateway, setSelectedGateway] = useState('pix')
  const [gateways, setGateways] = useState([])
  const [loading, setLoading] = useState(false)
  const [payment, setPayment] = useState(null)
  const [paymentStatus, setPaymentStatus] = useState(null)

  useEffect(() => {
    loadGateways()
  }, [])

  useEffect(() => {
    if (payment && payment.status === 'pending') {
      // Verificar status do pagamento periodicamente
      const interval = setInterval(() => {
        checkPaymentStatus()
      }, 5000) // Verificar a cada 5 segundos

      return () => clearInterval(interval)
    }
  }, [payment])

  const loadGateways = async () => {
    try {
      const response = await ApiService.request('/pagamentos/gateways')
      setGateways(response.gateways || [])
    } catch (error) {
      console.error('Erro ao carregar gateways:', error)
    }
  }

  const checkPaymentStatus = async () => {
    if (!payment) return

    try {
      const response = await ApiService.request(`/pagamentos/${payment.id}/status`)
      setPaymentStatus(response.gateway_status)
      
      if (response.status === 'paid') {
        onPaymentComplete && onPaymentComplete(response)
      }
    } catch (error) {
      console.error('Erro ao verificar status:', error)
    }
  }

  const handleCreatePayment = async () => {
    setLoading(true)
    try {
      const paymentData = {
        agendamento_id: agendamento.id,
        gateway: selectedGateway,
        amount: agendamento.servico.preco
      }

      const response = await ApiService.request('/pagamentos', {
        method: 'POST',
        body: paymentData
      })

      setPayment(response)
    } catch (error) {
      console.error('Erro ao criar pagamento:', error)
      alert('Erro ao criar pagamento: ' + error.message)
    } finally {
      setLoading(false)
    }
  }

  const getGatewayIcon = (gatewayId) => {
    switch (gatewayId) {
      case 'pix':
        return <Smartphone className="h-6 w-6" />
      case 'pagseguro':
      case 'mercadopago':
        return <CreditCard className="h-6 w-6" />
      default:
        return <DollarSign className="h-6 w-6" />
    }
  }

  const getStatusIcon = (status) => {
    switch (status) {
      case 'paid':
        return <CheckCircle className="h-5 w-5 text-green-600" />
      case 'pending':
        return <Clock className="h-5 w-5 text-yellow-600" />
      case 'cancelled':
      case 'expired':
        return <AlertCircle className="h-5 w-5 text-red-600" />
      default:
        return <Clock className="h-5 w-5 text-gray-600" />
    }
  }

  const getStatusText = (status) => {
    switch (status) {
      case 'paid':
        return 'Pago'
      case 'pending':
        return 'Aguardando pagamento'
      case 'cancelled':
        return 'Cancelado'
      case 'expired':
        return 'Expirado'
      default:
        return 'Processando'
    }
  }

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(value)
  }

  if (payment) {
    return (
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
        <div className="text-center mb-6">
          <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
            {getGatewayIcon(payment.gateway)}
          </div>
          <h2 className="text-xl font-bold text-slate-900 dark:text-white">
            Pagamento {payment.gateway.toUpperCase()}
          </h2>
          <p className="text-slate-600 dark:text-slate-400">
            {formatCurrency(payment.valor)}
          </p>
        </div>

        {/* Status do Pagamento */}
        <div className="flex items-center justify-center space-x-2 mb-6">
          {getStatusIcon(paymentStatus?.status || payment.status)}
          <span className="font-medium text-slate-900 dark:text-white">
            {getStatusText(paymentStatus?.status || payment.status)}
          </span>
        </div>

        {/* PIX QR Code */}
        {payment.gateway === 'pix' && payment.payment_data?.qr_code_url && (
          <div className="text-center mb-6">
            <div className="bg-white p-4 rounded-lg border-2 border-dashed border-slate-300 mb-4">
              <img 
                src={payment.payment_data.qr_code_url} 
                alt="QR Code PIX" 
                className="mx-auto"
              />
            </div>
            <p className="text-sm text-slate-600 dark:text-slate-400 mb-2">
              Escaneie o QR Code com seu app do banco ou copie o código PIX
            </p>
            <div className="bg-slate-100 dark:bg-slate-700 p-3 rounded text-xs font-mono break-all">
              {payment.payment_data.pix_code}
            </div>
          </div>
        )}

        {/* Links de Pagamento */}
        {(payment.gateway === 'pagseguro' || payment.gateway === 'mercadopago') && (
          <div className="text-center mb-6">
            <Button
              onClick={() => window.open(payment.payment_data.payment_url || payment.payment_data.checkout_url, '_blank')}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              <ExternalLink className="h-4 w-4 mr-2" />
              Pagar no {payment.gateway === 'pagseguro' ? 'PagSeguro' : 'Mercado Pago'}
            </Button>
          </div>
        )}

        {/* Informações do Agendamento */}
        <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg mb-6">
          <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
            Detalhes do Agendamento
          </h3>
          <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
            <p>Cliente: {agendamento.cliente?.nome}</p>
            <p>Serviço: {agendamento.servico?.nome}</p>
            <p>Profissional: {agendamento.profissional?.nome}</p>
            <p>Data: {new Date(agendamento.data_hora).toLocaleString('pt-BR')}</p>
          </div>
        </div>

        {/* Botões */}
        <div className="flex space-x-3">
          <Button
            variant="outline"
            onClick={onCancel}
            className="flex-1"
          >
            Voltar
          </Button>
          <Button
            onClick={checkPaymentStatus}
            disabled={loading}
            className="flex-1"
          >
            Verificar Status
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 max-w-md mx-auto">
      <div className="text-center mb-6">
        <div className="p-3 bg-green-100 dark:bg-green-900 rounded-full w-16 h-16 mx-auto mb-4 flex items-center justify-center">
          <DollarSign className="h-8 w-8 text-green-600 dark:text-green-400" />
        </div>
        <h2 className="text-xl font-bold text-slate-900 dark:text-white">
          Pagamento do Agendamento
        </h2>
        <p className="text-slate-600 dark:text-slate-400">
          Escolha a forma de pagamento
        </p>
      </div>

      {/* Valor */}
      <div className="text-center mb-6">
        <p className="text-3xl font-bold text-slate-900 dark:text-white">
          {formatCurrency(agendamento.servico?.preco || 0)}
        </p>
        <p className="text-slate-600 dark:text-slate-400">
          {agendamento.servico?.nome}
        </p>
      </div>

      {/* Gateways */}
      <div className="space-y-3 mb-6">
        <Label className="text-sm font-medium text-slate-900 dark:text-white">
          Forma de Pagamento
        </Label>
        {gateways.map((gateway) => (
          <div
            key={gateway.id}
            onClick={() => setSelectedGateway(gateway.id)}
            className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
              selectedGateway === gateway.id
                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
            }`}
          >
            <div className="flex items-center space-x-3">
              <div className={`p-2 rounded-lg ${
                selectedGateway === gateway.id
                  ? 'bg-blue-100 dark:bg-blue-800'
                  : 'bg-slate-100 dark:bg-slate-700'
              }`}>
                {getGatewayIcon(gateway.id)}
              </div>
              <div className="flex-1">
                <h3 className="font-semibold text-slate-900 dark:text-white">
                  {gateway.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {gateway.description}
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-500">
                  {gateway.processing_time}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Informações do Agendamento */}
      <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg mb-6">
        <h3 className="font-semibold text-slate-900 dark:text-white mb-2">
          Resumo do Agendamento
        </h3>
        <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
          <p>Cliente: {agendamento.cliente?.nome}</p>
          <p>Serviço: {agendamento.servico?.nome}</p>
          <p>Profissional: {agendamento.profissional?.nome}</p>
          <p>Data: {new Date(agendamento.data_hora).toLocaleString('pt-BR')}</p>
        </div>
      </div>

      {/* Botões */}
      <div className="flex space-x-3">
        <Button
          variant="outline"
          onClick={onCancel}
          disabled={loading}
          className="flex-1"
        >
          Cancelar
        </Button>
        <Button
          onClick={handleCreatePayment}
          disabled={loading || !selectedGateway}
          className="flex-1 bg-green-600 hover:bg-green-700"
        >
          {loading ? (
            <div className="flex items-center space-x-2">
              <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
              <span>Processando...</span>
            </div>
          ) : (
            'Pagar Agora'
          )}
        </Button>
      </div>
    </div>
  )
}

export default PaymentForm

