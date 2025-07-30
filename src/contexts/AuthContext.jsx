import { createContext, useContext, useState, useEffect } from 'react'

const AuthContext = createContext()

export const useAuth = () => {
  const context = useContext(AuthContext)
  if (!context) {
    throw new Error('useAuth deve ser usado dentro de um AuthProvider')
  }
  return context
}

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [empresa, setEmpresa] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    // Verificar se há dados de autenticação salvos
    const savedUser = localStorage.getItem('user')
    const savedEmpresa = localStorage.getItem('empresa')
    
    if (savedUser) {
      setUser(JSON.parse(savedUser))
    }
    
    if (savedEmpresa) {
      setEmpresa(JSON.parse(savedEmpresa))
    }
    
    setLoading(false)
  }, [])

  const login = async (email, password) => {
    try {
      // Aqui seria feita a chamada para a API de login
      // Por enquanto, vamos simular um login
      const mockUser = {
        id: 1,
        email: email,
        nome: 'Administrador'
      }
      
      const mockEmpresa = {
        id: 1,
        nome: 'Empresa Demo',
        email: email,
        cor_primaria: '#007BFF',
        cor_secundaria: '#6C757D',
        cor_acento: '#28A745'
      }
      
      setUser(mockUser)
      setEmpresa(mockEmpresa)
      
      localStorage.setItem('user', JSON.stringify(mockUser))
      localStorage.setItem('empresa', JSON.stringify(mockEmpresa))
      
      return { success: true }
    } catch (error) {
      return { success: false, error: error.message }
    }
  }

  const logout = () => {
    setUser(null)
    setEmpresa(null)
    localStorage.removeItem('user')
    localStorage.removeItem('empresa')
  }

  const updateEmpresa = (novaEmpresa) => {
    setEmpresa(novaEmpresa)
    localStorage.setItem('empresa', JSON.stringify(novaEmpresa))
  }

  const value = {
    user,
    empresa,
    loading,
    login,
    logout,
    updateEmpresa,
    isAuthenticated: !!user
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}

