import React from 'react'

interface AlertProps {
  msg?: string
  type: 'danger' | 'success' | 'warning' | 'info'
  className?: string
}

const Alert: React.FC<AlertProps> = ({ msg, type, className = '' }) => {
  return (
    <article className={`alert alert_${type} ${className}`}>
      <div className='alert__body'>{msg}</div>
    </article>
  )
}

export default Alert
