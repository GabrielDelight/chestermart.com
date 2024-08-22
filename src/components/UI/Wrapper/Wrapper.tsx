import React from 'react'
import { WrapperTypes } from '../../../types/types'
import Footer from '../Footer/Footer'
import Header from '../Header/Header'
const Wrapper: React.FC<WrapperTypes> = ({children}) => {
  return (
    <div>
      <Header />


      {children}



      <Footer />
    </div>
  )
}

export default Wrapper