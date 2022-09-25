import React, { ReactChildren, ReactChild } from 'react'

interface LayoutProps {
  children: ReactChild[] | ReactChildren[]
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
  return (
    <main>
      <div className='container'>{children}</div>
    </main>
  )
}

export default Layout
