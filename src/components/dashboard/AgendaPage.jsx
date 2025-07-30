import { useState, useEffect } from 'react'
import { Button } from '@/components/ui/button'
import { Calendar, Plus, ChevronLeft, ChevronRight } from 'lucide-react'

const AgendaPage = () => {
  const [currentDate, setCurrentDate] = useState(new Date())
  const [view, setView] = useState('week') // 'day', 'week', 'month'

  const formatDate = (date) => {
    return date.toLocaleDateString('pt-BR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    })
  }

  const navigateDate = (direction) => {
    const newDate = new Date(currentDate)
    if (view === 'day') {
      newDate.setDate(newDate.getDate() + direction)
    } else if (view === 'week') {
      newDate.setDate(newDate.getDate() + (direction * 7))
    } else if (view === 'month') {
      newDate.setMonth(newDate.getMonth() + direction)
    }
    setCurrentDate(newDate)
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Agenda
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Gerencie seus agendamentos e horários
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Agendamento
        </Button>
      </div>

      {/* Controls */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white dark:bg-slate-800 p-4 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700">
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate(-1)}
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          
          <h2 className="text-lg font-semibold text-slate-900 dark:text-white">
            {formatDate(currentDate)}
          </h2>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => navigateDate(1)}
          >
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex space-x-2">
          {['day', 'week', 'month'].map((viewType) => (
            <Button
              key={viewType}
              variant={view === viewType ? 'default' : 'outline'}
              size="sm"
              onClick={() => setView(viewType)}
              className="capitalize"
            >
              {viewType === 'day' ? 'Dia' : viewType === 'week' ? 'Semana' : 'Mês'}
            </Button>
          ))}
        </div>
      </div>

      {/* Calendar View */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="text-center py-12">
          <Calendar className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            Agenda Interativa
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            A visualização da agenda será implementada na próxima fase
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Criar Primeiro Agendamento
          </Button>
        </div>
      </div>
    </div>
  )
}

export default AgendaPage

