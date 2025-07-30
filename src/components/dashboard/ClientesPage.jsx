import { useState } from 'react'
import ClientesList from '../clientes/ClientesList'
import ClienteForm from '../clientes/ClienteForm'

const ClientesPage = () => {
  const [view, setView] = useState('list') // 'list', 'create', 'edit'
  const [selectedCliente, setSelectedCliente] = useState(null)

  const handleClienteCreate = () => {
    setSelectedCliente(null)
    setView('create')
  }

  const handleClienteEdit = (cliente) => {
    setSelectedCliente(cliente)
    setView('edit')
  }

  const handleClienteSelect = (cliente) => {
    // Aqui poderia abrir um modal com detalhes do cliente
    console.log('Cliente selecionado:', cliente)
  }

  const handleSave = (cliente) => {
    console.log('Cliente salvo:', cliente)
    setView('list')
    setSelectedCliente(null)
  }

  const handleCancel = () => {
    setView('list')
    setSelectedCliente(null)
  }

  return (
    <div>
      {view === 'list' && (
        <ClientesList
          onClienteSelect={handleClienteSelect}
          onClienteEdit={handleClienteEdit}
          onClienteCreate={handleClienteCreate}
        />
      )}
      
      {(view === 'create' || view === 'edit') && (
        <ClienteForm
          cliente={selectedCliente}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      )}
    </div>
  )
}

export default ClientesPage

