// components/Modal.tsx
import React, { ReactNode, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { X } from 'phosphor-react'

interface ModalProps {
  title: string
  children: ReactNode
  onClose: () => void
  show: boolean
}

export const Modal: React.FC<ModalProps> = ({ title, children, onClose, show }) => {
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    document.addEventListener('keydown', handler)
    return () => document.removeEventListener('keydown', handler)
  }, [onClose])

  return createPortal(
    <AnimatePresence>
      {show && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 flex items-center justify-center z-50 p-4"
        >
          {/* Backdrop with cyberpunk grid effect */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 bg-gradient-to-br from-gray-900 via-purple-900/30 to-cyan-900/20"
            onClick={onClose}
          >
            {/* Animated grid pattern */}
            <div className="absolute inset-0 bg-[url('/grid-pattern.svg')] bg-[size:40px_40px] opacity-10"></div>
          </motion.div>
          
          {/* Modal content with cyberpunk styling */}
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20, opacity: 0 }}
            transition={{ type: "spring", damping: 25 }}
            className="relative bg-gray-800/80 backdrop-blur-xl rounded-xl border border-cyan-500/30 w-full max-w-md overflow-hidden shadow-2xl"
            onClick={(e) => e.stopPropagation()}
            style={{
              boxShadow: '0 0 40px rgba(123, 97, 255, 0.3), 0 0 100px rgba(0, 255, 194, 0.1)',
              background: 'linear-gradient(145deg, rgba(26, 26, 42, 0.9) 0%, rgba(42, 42, 58, 0.9) 100%)'
            }}
          >
            {/* Glowing top bar */}
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-cyan-500 via-purple-500 to-cyan-500"></div>
            
            {/* Header with animated circuit lines */}
            <header className="relative px-6 py-5 border-b border-cyan-500/20">
              {/* Circuit line decoration */}
              <div className="absolute bottom-0 left-0 right-0 h-1">
                <div className="absolute left-0 w-1/3 h-full bg-cyan-500 animate-pulse"></div>
                <div className="absolute right-0 w-1/4 h-full bg-purple-500 animate-pulse delay-300"></div>
              </div>
              
              <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                {title}
              </h2>
              
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-1 rounded-full hover:bg-gray-700/50 transition-colors group"
                aria-label="Close modal"
              >
                <X 
                  size={24} 
                  className="text-gray-400 group-hover:text-cyan-400 transition-colors" 
                  weight="bold"
                />
              </button>
            </header>
            
            {/* Content with subtle animation */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="p-6 text-gray-200"
            >
              {children}
            </motion.div>
            
            {/* Animated bottom glow */}
            <div className="absolute bottom-0 left-0 right-0 h-2 bg-gradient-to-r from-purple-600/30 via-cyan-500/50 to-purple-600/30"></div>
            
            {/* Corner decorations */}
            <div className="absolute top-3 left-3 w-3 h-3 border-t border-l border-cyan-500"></div>
            <div className="absolute top-3 right-3 w-3 h-3 border-t border-r border-purple-500"></div>
            <div className="absolute bottom-3 left-3 w-3 h-3 border-b border-l border-purple-500"></div>
            <div className="absolute bottom-3 right-3 w-3 h-3 border-b border-r border-cyan-500"></div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  )
}