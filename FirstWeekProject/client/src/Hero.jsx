import React from 'react'
import Stepper from './Stepper'

function Hero() {
  return (
    <div className='flex-col'>

    <section className="text-white">
    <div className='flex justify-center'>
      <img className='w-8 justify-center' src='../dashboard_logo.75bc75d8.svg'></img>
    <p className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-md font-extrabold text-transparent sm:text-md ml-3">
      Raffaele D'Errico <span className="sm:block"> First Week Project </span> 
      </p>
    
    </div>
  <div
    className="mx-auto max-w-screen-sm px-4 py-20 lg:flex lg:items-center"
  >
    <div className="mx-auto max-w-3xl text-center">
      <h1
        className="bg-gradient-to-r from-green-300 via-blue-500 to-purple-600 bg-clip-text text-3xl font-extrabold text-transparent sm:text-5xl"
      >
        ECDSA-NODE
      </h1>      

      <p className="mx-auto mt-4 max-w-xl sm:text-xl sm:leading-relaxed">
        Set your address and try to transfer money with signature!
      </p>

    </div>
  </div>
</section>
    </div>
  )
}

export default Hero