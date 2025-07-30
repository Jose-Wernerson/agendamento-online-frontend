import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Calendar, Clock, User, Phone, Mail } from 'lucide-react'

const ClienteAgendamento = () => {
  const { empresaId } = useParams()
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    servico: '',
    profissional: '',
    data: '',
    horario: '',
    nome: '',
    telefone: '',
    email: ''
  })

  const servicos = [
    { id: 1, nome: 'Corte Masculino', duracao: 30, preco: 25 },
    { id: 2, nome: 'Corte Feminino', duracao: 45, preco: 35 },
    { id: 3, nome: 'Barba', duracao: 20, preco: 15 },
    { id: 4, nome: 'Manicure', duracao: 60, preco: 20 }
  ]

  const profissionais = [
    { id: 1, nome: 'Ana Silva', especialidade: 'Cabelo' },
    { id: 2, nome: 'Carlos Santos', especialidade: 'Barba' },
    { id: 3, nome: 'Lucia Costa', especialidade: 'Unhas' }
  ]

  const horarios = ['09:00', '09:30', '10:00', '10:30', '11:00', '14:00', '14:30', '15:00', '15:30', '16:00']

  const handleNext = () => {
    setStep(step + 1)
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSubmit = () => {
    console.log('Agendamento criado:', formData)
    // Aqui seria feita a chamada para a API
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 py-12">
      <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg overflow-hidden">
          {/* Header */}
          <div className="bg-blue-600 text-white p-6">
            <h1 className="text-2xl font-bold">Agendar Serviço</h1>
            <p className="text-blue-100">Passo {step} de 4</p>
          </div>

          {/* Progress Bar */}
          <div className="bg-slate-200 dark:bg-slate-700 h-2">
            <div 
              className="bg-blue-600 h-2 transition-all duration-300"
              style={{ width: `${(step / 4) * 100}%` }}
            ></div>
          </div>

          <div className="p-6">
            {/* Passo 1: Escolher Serviço */}
            {step === 1 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Escolha o Serviço
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {servicos.map((servico) => (
                    <div
                      key={servico.id}
                      onClick={() => setFormData({...formData, servico: servico.id})}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.servico === servico.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
                      }`}
                    >
                      <h3 className="font-semibold text-slate-900 dark:text-white">{servico.nome}</h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">{servico.duracao} min</p>
                      <p className="text-lg font-bold text-blue-600">R$ {servico.preco}</p>
                    </div>
                  ))}
                </div>
                <Button 
                  onClick={handleNext} 
                  disabled={!formData.servico}
                  className="w-full"
                >
                  Continuar
                </Button>
              </div>
            )}

            {/* Passo 2: Escolher Profissional */}
            {step === 2 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Escolha o Profissional
                </h2>
                <div className="space-y-3">
                  {profissionais.map((prof) => (
                    <div
                      key={prof.id}
                      onClick={() => setFormData({...formData, profissional: prof.id})}
                      className={`p-4 border-2 rounded-lg cursor-pointer transition-all ${
                        formData.profissional === prof.id
                          ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20'
                          : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
                      }`}
                    >
                      <div className="flex items-center space-x-3">
                        <div className="w-12 h-12 bg-slate-300 rounded-full flex items-center justify-center">
                          <User className="h-6 w-6 text-slate-600" />
                        </div>
                        <div>
                          <h3 className="font-semibold text-slate-900 dark:text-white">{prof.nome}</h3>
                          <p className="text-sm text-slate-600 dark:text-slate-400">{prof.especialidade}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="flex space-x-3">
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    disabled={!formData.profissional}
                    className="flex-1"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* Passo 3: Escolher Data e Horário */}
            {step === 3 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Escolha Data e Horário
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="data">Data</Label>
                    <Input
                      id="data"
                      type="date"
                      value={formData.data}
                      onChange={(e) => setFormData({...formData, data: e.target.value})}
                      min={new Date().toISOString().split('T')[0]}
                    />
                  </div>

                  {formData.data && (
                    <div>
                      <Label>Horários Disponíveis</Label>
                      <div className="grid grid-cols-3 gap-2 mt-2">
                        {horarios.map((horario) => (
                          <button
                            key={horario}
                            onClick={() => setFormData({...formData, horario})}
                            className={`p-2 text-sm border rounded transition-all ${
                              formData.horario === horario
                                ? 'border-blue-500 bg-blue-50 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300'
                                : 'border-slate-200 dark:border-slate-600 hover:border-blue-300'
                            }`}
                          >
                            {horario}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleNext} 
                    disabled={!formData.data || !formData.horario}
                    className="flex-1"
                  >
                    Continuar
                  </Button>
                </div>
              </div>
            )}

            {/* Passo 4: Dados Pessoais */}
            {step === 4 && (
              <div className="space-y-6">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-white">
                  Seus Dados
                </h2>
                
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="nome">Nome Completo</Label>
                    <Input
                      id="nome"
                      value={formData.nome}
                      onChange={(e) => setFormData({...formData, nome: e.target.value})}
                      placeholder="Digite seu nome completo"
                    />
                  </div>

                  <div>
                    <Label htmlFor="telefone">Telefone</Label>
                    <Input
                      id="telefone"
                      value={formData.telefone}
                      onChange={(e) => setFormData({...formData, telefone: e.target.value})}
                      placeholder="(11) 99999-9999"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">E-mail</Label>
                    <Input
                      id="email"
                      type="email"
                      value={formData.email}
                      onChange={(e) => setFormData({...formData, email: e.target.value})}
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>

                <div className="bg-slate-50 dark:bg-slate-700 p-4 rounded-lg">
                  <h3 className="font-semibold text-slate-900 dark:text-white mb-2">Resumo do Agendamento</h3>
                  <div className="space-y-1 text-sm text-slate-600 dark:text-slate-400">
                    <p>Serviço: {servicos.find(s => s.id === formData.servico)?.nome}</p>
                    <p>Profissional: {profissionais.find(p => p.id === formData.profissional)?.nome}</p>
                    <p>Data: {formData.data}</p>
                    <p>Horário: {formData.horario}</p>
                    <p className="font-semibold text-slate-900 dark:text-white">
                      Valor: R$ {servicos.find(s => s.id === formData.servico)?.preco}
                    </p>
                  </div>
                </div>

                <div className="flex space-x-3">
                  <Button variant="outline" onClick={handleBack} className="flex-1">
                    Voltar
                  </Button>
                  <Button 
                    onClick={handleSubmit} 
                    disabled={!formData.nome || !formData.telefone}
                    className="flex-1 bg-green-600 hover:bg-green-700"
                  >
                    Confirmar Agendamento
                  </Button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default ClienteAgendamento

