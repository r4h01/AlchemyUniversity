import React, { useState } from 'react'
import {TiTick} from "react-icons/ti"
import "./stepper.css";

function Stepper({address, setAddress, currentStep, setCurrentStep, complete, setComplete, steps}) {
    // const steps = ["Generate PKey", "Get Address", "Confirm"]

    const getStep= steps.map((step, i)=>{
        return (
        <div className={`step-item ${currentStep === i + 1 && "active"} ${(i + 1 < currentStep || complete) && "complete"}`} key={i}>
            <div className='step md:text-sm lg:text-sm text-xs'>
                { i + 1 < currentStep || complete ? <TiTick size={24}/> : i+1}
                </div>
            <p className='text-slate-300 md:text-sm lg:text-sm text-xs text-center'>{step}</p>
            
        </div>)
    })

  return (
    <>
    <div className='flex justify-between'>
        
            {getStep}
    </div>
    

    </>
  )
}

export default Stepper