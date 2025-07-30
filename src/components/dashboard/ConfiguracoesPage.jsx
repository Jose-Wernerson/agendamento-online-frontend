import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Settings, Save } from 'lucide-react'

const ConfiguracoesPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Configurações
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Personalize sua empresa e sistema
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Save className="h-4 w-4 mr-2" />
          Salvar Alterações
        </Button>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="text-center py-12">
          <Settings className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            Configurações do Sistema
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Personalize cores, horários, notificações e integrações
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            Configurar Sistema
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ConfiguracoesPage

