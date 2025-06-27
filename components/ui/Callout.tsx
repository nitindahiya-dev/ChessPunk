// components/ui/Callout.tsx
import React from 'react'

export type CalloutType = 'tip' | 'info' | 'warning'

export interface CalloutProps {
  type?: CalloutType
  children: React.ReactNode
}

const colorMap: Record<CalloutType, { bg: string; border: string }> = {
  tip:     { bg: 'bg-green-800/10',  border: 'border-green-500' },
  info:    { bg: 'bg-blue-800/10',   border: 'border-blue-500'  },
  warning: { bg: 'bg-yellow-800/10', border: 'border-yellow-500' },
}

export const Callout: React.FC<CalloutProps> = ({
  type = 'info',
  children,
}) => {
  const { bg, border } = colorMap[type]
  return (
    <div
      className={`border-l-4 ${border} ${bg} p-4 mb-6 rounded-md`}
      role="note"
      aria-label={type}
    >
      {children}
    </div>
  )
}
