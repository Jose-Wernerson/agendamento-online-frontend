const API_BASE_URL = 'http://localhost:5000/api'

class ApiService {
  async request(endpoint, options = {}) {
    const url = `${API_BASE_URL}${endpoint}`
    const config = {
      headers: {
        'Content-Type': 'application/json',
        ...options.headers,
      },
      ...options,
    }

    if (config.body && typeof config.body === 'object') {
      config.body = JSON.stringify(config.body)
    }

    try {
      const response = await fetch(url, config)
      
      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}))
        throw new Error(errorData.erro || `HTTP error! status: ${response.status}`)
      }

      return await response.json()
    } catch (error) {
      console.error('API request failed:', error)
      throw error
    }
  }

  // Empresas
  async getEmpresas() {
    return this.request('/empresas')
  }

  async createEmpresa(data) {
    return this.request('/empresas', {
      method: 'POST',
      body: data,
    })
  }

  async updateEmpresa(id, data) {
    return this.request(`/empresas/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async getEmpresaConfiguracoes(id) {
    return this.request(`/empresas/${id}/configuracoes`)
  }

  // Clientes
  async getClientes(empresaId, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/empresas/${empresaId}/clientes?${queryString}`)
  }

  async createCliente(empresaId, data) {
    return this.request(`/empresas/${empresaId}/clientes`, {
      method: 'POST',
      body: data,
    })
  }

  async updateCliente(id, data) {
    return this.request(`/clientes/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteCliente(id) {
    return this.request(`/clientes/${id}`, {
      method: 'DELETE',
    })
  }

  async getClienteHistorico(id) {
    return this.request(`/clientes/${id}/historico`)
  }

  async buscarClientes(empresaId, termo) {
    return this.request(`/empresas/${empresaId}/clientes/buscar?termo=${encodeURIComponent(termo)}`)
  }

  // Profissionais
  async getProfissionais(empresaId) {
    return this.request(`/empresas/${empresaId}/profissionais`)
  }

  async createProfissional(empresaId, data) {
    return this.request(`/empresas/${empresaId}/profissionais`, {
      method: 'POST',
      body: data,
    })
  }

  async updateProfissional(id, data) {
    return this.request(`/profissionais/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteProfissional(id) {
    return this.request(`/profissionais/${id}`, {
      method: 'DELETE',
    })
  }

  async getAgendaProfissional(id, dataInicio, dataFim) {
    const params = new URLSearchParams()
    if (dataInicio) params.append('data_inicio', dataInicio)
    if (dataFim) params.append('data_fim', dataFim)
    
    return this.request(`/profissionais/${id}/agenda?${params.toString()}`)
  }

  async getHorariosDisponiveis(profissionalId, data, servicoId) {
    const params = new URLSearchParams({ data })
    if (servicoId) params.append('servico_id', servicoId)
    
    return this.request(`/profissionais/${profissionalId}/horarios-disponiveis?${params.toString()}`)
  }

  // Serviços
  async getServicos(empresaId) {
    return this.request(`/empresas/${empresaId}/servicos`)
  }

  async createServico(empresaId, data) {
    return this.request(`/empresas/${empresaId}/servicos`, {
      method: 'POST',
      body: data,
    })
  }

  async updateServico(id, data) {
    return this.request(`/servicos/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async deleteServico(id) {
    return this.request(`/servicos/${id}`, {
      method: 'DELETE',
    })
  }

  async getProfissionaisServico(servicoId) {
    return this.request(`/servicos/${servicoId}/profissionais`)
  }

  async associarProfissionalServico(servicoId, data) {
    return this.request(`/servicos/${servicoId}/profissionais`, {
      method: 'POST',
      body: data,
    })
  }

  async getCategorias(empresaId) {
    return this.request(`/empresas/${empresaId}/servicos/categorias`)
  }

  // Agendamentos
  async getAgendamentos(empresaId, params = {}) {
    const queryString = new URLSearchParams(params).toString()
    return this.request(`/empresas/${empresaId}/agendamentos?${queryString}`)
  }

  async createAgendamento(empresaId, data) {
    return this.request(`/empresas/${empresaId}/agendamentos`, {
      method: 'POST',
      body: data,
    })
  }

  async updateAgendamento(id, data) {
    return this.request(`/agendamentos/${id}`, {
      method: 'PUT',
      body: data,
    })
  }

  async cancelarAgendamento(id, motivo) {
    return this.request(`/agendamentos/${id}/cancelar`, {
      method: 'POST',
      body: { motivo_cancelamento: motivo },
    })
  }

  async reagendarAgendamento(id, novaDataHora) {
    return this.request(`/agendamentos/${id}/reagendar`, {
      method: 'POST',
      body: { nova_data_hora: novaDataHora },
    })
  }

  async getAgendaHoje(empresaId) {
    return this.request(`/empresas/${empresaId}/agenda/hoje`)
  }
}

export default new ApiService()

