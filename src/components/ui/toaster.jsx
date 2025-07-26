import * as React from "react"
import { X } from "lucide-react"
import { cn } from "@/lib/utils"

const ToastContext = React.createContext({})

const useToast = () => {
  const context = React.useContext(ToastContext)
  if (!context) {
    throw new Error("useToast must be used within a ToastProvider")
  }
  return context
}

const ToastProvider = ({ children }) => {
  const [toasts, setToasts] = React.useState([])

  const addToast = React.useCallback((toast) => {
    const id = Math.random().toString(36).substr(2, 9)
    const newToast = { id, ...toast }
    setToasts(prev => [...prev, newToast])

    // Auto remove after duration
    setTimeout(() => {
      setToasts(prev => prev.filter(t => t.id !== id))
    }, toast.duration || 5000)

    return id
  }, [])

  const removeToast = React.useCallback((id) => {
    setToasts(prev => prev.filter(t => t.id !== id))
  }, [])

  const toast = React.useCallback((props) => {
    return addToast(props)
  }, [addToast])

  return (
    <ToastContext.Provider value={{ toast, toasts, removeToast }}>
      {children}
      <Toaster />
    </ToastContext.Provider>
  )
}

const Toaster = () => {
  const { toasts, removeToast } = useToast()

  return (
    <div className="fixed top-0 right-0 z-50 p-4 space-y-2">
      {toasts.map((toast) => (
        <Toast key={toast.id} {...toast} onClose={() => removeToast(toast.id)} />
      ))}
    </div>
  )
}

const Toast = ({ title, description, variant = "default", onClose }) => {
  return (
    <div
      className={cn(
        "min-w-[300px] rounded-lg border p-4 shadow-lg animate-slide-up",
        {
          "bg-background text-foreground": variant === "default",
          "bg-destructive text-destructive-foreground": variant === "destructive",
          "bg-green-500 text-white": variant === "success",
          "bg-yellow-500 text-white": variant === "warning",
        }
      )}
    >
      <div className="flex items-start justify-between">
        <div className="flex-1">
          {title && (
            <div className="text-sm font-semibold">{title}</div>
          )}
          {description && (
            <div className="text-sm opacity-90 mt-1">{description}</div>
          )}
        </div>
        <button
          onClick={onClose}
          className="ml-4 opacity-70 hover:opacity-100 transition-opacity"
        >
          <X size={16} />
        </button>
      </div>
    </div>
  )
}

export { ToastProvider, useToast, Toaster }