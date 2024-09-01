import React, {useState, useEffect} from 'react'
import '../../styles/Clock.css'

const Clock = () => {

  const [days, setDays] = useState()
  const [hours, setHours] = useState()
  const [minutes, setMinutes] = useState()
  const [seconds, setSeconds] = useState()

  let interval;

  const countDown = () =>{
    // Step 1: Create a Date object for the current date
const currentDate = new Date();

// Step 2: Calculate the last day of the current month
const endOfMonth = new Date(currentDate.getFullYear(), currentDate.getMonth() + 1, 0);

// Step 3: Add 10 days to the last day of the month
const futureDate = new Date(endOfMonth);
futureDate.setDate(endOfMonth.getDate() + 10);

// Step 4: Get the timestamp for the new date
const destination = futureDate.getTime();
      // const destination = new Date('Jun 30, 2024').getTime();

      interval = setInterval(()=>{
        const now = new Date().getTime();
        const different = destination - now
        const days = Math.floor(different /(1000 * 60 * 60 * 24))
        const hours = Math.floor((different % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60))

        const minutes = Math.floor((different % (1000 * 60 * 60) )/ (1000 * 60 ))

        const seconds = Math.floor((different % (1000 * 60)) / 1000 )

        if(destination < 0) clearInterval(interval.current)
        else{
          setDays(days);
          setHours(hours);
          setMinutes(minutes);
          setSeconds(seconds)
        }
      })
  }
   useEffect(() =>{
    countDown()
   })
  return (
    <div className='clock__wrapper d-flex align-items-center gap-3'>
      <div className="clock__data d-flex align-items-center gap-3">
        <div className='text-center'>
          <h1 className='text-white fs-3 mb-2'>{days}</h1>
          <h5 className='text-white fs-6'>Days</h5>
        </div>
        <span className='text-white fs-3 colen'>:</span>
      </div>

      <div className="clock__data d-flex align-items-center gap-3 clock__even__data">
        <div className='text-center'>
          <h1 className='text-white fs-3 mb-2'>{hours}</h1>
          <h5 className='text-white fs-6'>Hours</h5>
        </div>
        <span className='text-white fs-3 colen'>:</span>
      </div>

      <div className="clock__data d-flex align-items-center gap-3 clock__even__data">
        <div className='text-center'>
          <h1 className='text-white fs-3 mb-2'>{minutes}</h1>
          <h5 className='text-white fs-6'>Minutes</h5>
        </div>
        <span className='text-white fs-3 colen'>:</span>
      </div>
    
      <div className="clock__data d-flex align-items-center gap-3 clock__even__data">
        <div className='text-center'>
          <h1 className='text-white fs-3 mb-2'>{seconds}</h1>
          <h5 className='text-white fs-6 colen'>Seconds</h5>
        </div>
      </div>
      
      </div>
  )
}

export default Clock