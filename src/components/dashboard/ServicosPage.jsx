import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Briefcase, Plus } from 'lucide-react'

const ServicosPage = () => {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-900 dark:text-white">
            Serviços
          </h1>
          <p className="text-slate-600 dark:text-slate-400">
            Configure os serviços oferecidos e seus preços
          </p>
        </div>
        <Button className="bg-blue-600 hover:bg-blue-700">
          <Plus className="h-4 w-4 mr-2" />
          Novo Serviço
        </Button>
      </div>

      {/* Content */}
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-sm border border-slate-200 dark:border-slate-700 p-6">
        <div className="text-center py-12">
          <Briefcase className="h-12 w-12 text-slate-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-slate-900 dark:text-white mb-2">
            Catálogo de Serviços
          </h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">
            Cadastre os serviços que sua empresa oferece
          </p>
          <Button className="bg-blue-600 hover:bg-blue-700">
            <Plus className="h-4 w-4 mr-2" />
            Cadastrar Primeiro Serviço
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ServicosPage

