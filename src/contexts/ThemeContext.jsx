import { createContext, useContext, useState, useEffect } from 'react'

const ThemeContext = createContext()

export const useTheme = () => {
  const context = useContext(ThemeContext)
  if (!context) {
    throw new Error('useTheme deve ser usado dentro de um ThemeProvider')
  }
  return context
}

export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState('light')
  const [customColors, setCustomColors] = useState({
    primary: '#007BFF',
    secondary: '#6C757D',
    accent: '#28A745'
  })

  useEffect(() => {
    // Verificar preferência salva
    const savedTheme = localStorage.getItem('theme')
    const savedColors = localStorage.getItem('customColors')
    
    if (savedTheme) {
      setTheme(savedTheme)
    }
    
    if (savedColors) {
      setCustomColors(JSON.parse(savedColors))
    }
    
    // Aplicar tema ao documento
    document.documentElement.classList.toggle('dark', savedTheme === 'dark')
  }, [])

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light'
    setTheme(newTheme)
    localStorage.setItem('theme', newTheme)
    document.documentElement.classList.toggle('dark', newTheme === 'dark')
  }

  const updateColors = (newColors) => {
    setCustomColors(newColors)
    localStorage.setItem('customColors', JSON.stringify(newColors))
    
    // Aplicar cores customizadas via CSS variables
    const root = document.documentElement
    root.style.setProperty('--color-primary', newColors.primary)
    root.style.setProperty('--color-secondary', newColors.secondary)
    root.style.setProperty('--color-accent', newColors.accent)
  }

  const value = {
    theme,
    customColors,
    toggleTheme,
    updateColors,
    isDark: theme === 'dark'
  }

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  )
}

