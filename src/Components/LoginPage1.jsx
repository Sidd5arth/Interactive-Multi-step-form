import React from 'react'
import { useState, useRef, useEffect } from 'react';
import loginstyle from './loginstyle.css';
import FormInputComp from './TransitionComponents/FormInputComp';
import Sidebar from './Sidebar';
import ThankyouPage from './ThankyouPage';
import FinishingPage from './FinishingPage';
import PickAddon from './PickAddon';
import SelectPlan from './SelectPlan';
import InfoForm from './InfoForm';

function LoginPage1() {
  var count = 0;
    const [animate, setAnimate] = useState(true);
    const [step, setStep] = useState(1);
    const [disable, setDisable] = useState(false);
    const [errorButton, setErrorButton] = useState(false);
    const [valid, setValid] = useState(false);
    const [activeCard, setActiveCard] = useState({});
    const [planSelect, setPlanSelect] = useState(false)
    const [validState, setValidState] = useState({
      emptyEmail: true,
      emptyName: true,
      emptyPhone: true,
      name: {
        state: false,
        error: "Enter your name"
      },
      phone: {
        state: false,
        error: "Enter your Number"
      },
      email: {
        state: false,
        error: "Enter a valid Email"
      }
  
    });
    const [addonInfo, setAddonInfo] = useState(
      [
        {name:"Online service", state: false, addPrice: ""},
        {name:"Larger storage", state: false, addPrice: ""},
        {name:"Customizable profile", state: false, addPrice: ""},
      ]
      );
      const initialState = () => {
        if(validState.emptyEmail || validState.emptyName || validState.emptyPhone){
          return true
        }else return false;
      }

      useEffect(() => {
          if (Object.keys(validState).some(field => validState[field].state)) {
            setDisable(true);
            setErrorButton(true);
          } else if(initialState()){
            setDisable(false);
            setValid(false);
          }else{
            setDisable(false);
            setErrorButton(false);
          }
      }, [validState]);
      

    const handleNextStep = () => {
      console.log('clicked');
        setStep(prev => prev+1);
    }
    const handlePrevStep = () => {
         setStep(prev => prev-1);
    }

    const pageTitle = () => {
        if(step === 1) return {
            heading:"Personal info",
            subheading: "Please provide you name, email address, and phone number",
            currentStep:1,
        }
        if(step === 2) return {
            heading: "Select Your Plan",
            subheading: "You have the option of monthly or yearly billing",
            currentStep:2,
        }
        if(step === 3) return {
            heading: "Pick add-ons",
            subheading: "Add-ons help enhance your gamind experience",
            currentStep:3,
        }
        if(step === 4) return {
            heading: "Finishing-up",
            subheading: "Double-check everythink looks OK before confirming",
            currentStep:4,
        }
        if(step === 5) return {
            heading: "Thankyou",
            subheading: "Thankyou for confirming your subscription! We hope you have fun using our platform, If you ever need support, please frll free to email us at @loremgaming.com",
        }
    }

    const timingSequencer = () => {
        setAnimate(false);
        setTimeout(() => {
            setAnimate(true);
          }, 400);
    }

  const handleClickNext = () => {

    if(step === 1){
      if(initialState()){
        setErrorButton(true);
        setDisable(true);
        setValid(true);
        return;
      }
      setActiveCard({});
      setAddonInfo([
        {name:"Online service", state: false, addPrice: ""},
        {name:"Larger storage", state: false, addPrice: ""},
        {name:"Customizable profile", state: false, addPrice: ""},
      ])
  }
    if(step === 5){
        setStep(1);
        setAnimate(true);
    }
      if(!disable){
        timingSequencer();
          setTimeout(() => {
              handleNextStep();
            }, 400);
      }
  }
  const handleClickPrev = () => {
    console.log(step);
    validState.emptyEmail = true;
    validState.emptyName = true;
    validState.emptyPhone = true;
    console.log(validState.emptyEmail);
    console.log(validState.emptyPhone);
    console.log(validState.emptyName);
    timingSequencer();

    if(step === 4 || step === 3){
      setTimeout(() => {
        setAddonInfo([
          {name:"Online service", state: false, addPrice: ""},
          {name:"Larger storage", state: false, addPrice: ""},
          {name:"Customizable profile", state: false, addPrice: ""},
        ])
      }, 400);
  }
    if(step === 3){
      setTimeout(() => {
      setActiveCard({});
      setPlanSelect(false);
      }, 400);
  }

    
    if(step === 1){
        setAnimate(true);
        setActiveCard({});
        setAddonInfo( [
          {name:"Online service", state: false, addPrice: ""},
          {name:"Larger storage", state: false, addPrice: ""},
          {name:"Customizable profile", state: false, addPrice: ""},
        ])
    }else{
        setTimeout(() => {
            handlePrevStep();
          }, 400);
    }
  }
  const handlePlanInfo = (info) =>{
    setPlanSelect(info);
  }

  return (
    <div className='login-Container'>
        <Sidebar
        pageTitle={pageTitle}
        />
        <div className='info-form'>
            {step===1 && 
            <InfoForm
            pageTitle={pageTitle}
            setAnimate={setAnimate}
            animate={animate}
            validState={validState}
            setValidState={setValidState}
            valid={valid}
            />}
            {step===2 && 
            <SelectPlan
            pageTitle={pageTitle}
            planSelect={planSelect}
            animate={animate}
            planInfo={handlePlanInfo}
            activeCard={activeCard}
            setActiveCard={setActiveCard}
            />}
            {step===3 && 
            <PickAddon
            planSelect={planSelect}
            pageTitle={pageTitle}
            animate={animate}
            addonInfo={addonInfo}
            setAddonInfo={setAddonInfo}
            />}
            {step===4 && 
            <FinishingPage
            pageTitle={pageTitle}
            activeCard={activeCard}
            animate={animate}
            addonInfo={addonInfo}
            />}
            {step===5 && 
            <ThankyouPage
            pageTitle={pageTitle}
            />} 
          <div className="bnts">
          <button onClick={handleClickPrev} className='form-btn2'>Go Back</button>
          <button 
          disabled={disable} 
          onClick={handleClickNext} 
          className= {`form-btn ${errorButton ? "btn-shake" : ""}`}
          >
            Next Step
          </button>
          </div>
        </div>
      </div>
  )
}
export default LoginPage1;