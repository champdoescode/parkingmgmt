import React, { useEffect, useState } from 'react'

export default function AddVehicalPopup({handleClose, logindata}) {
    const vehicalData = {
        vno: '',
        vname: '',
        shopno: logindata[0].shopno
    }
    const [vehicalDetails, setVehicalDetails] = useState(vehicalData);
   
    const handleSubmit = ()=>{
        if(vehicalDetails.vno !== '' && vehicalDetails.vname !== ''){
            fetch('http://localhost:5000/api/addvehical', {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                },
                body: JSON.stringify(vehicalDetails),
              })
                .then((data) => {
                  if(data.status == 200){
                    alert('Vehical Added !')
                    handleClose();
                  }else{
                    if(data.status == 600){
                      alert('Vehical Already Exists !')
                    }
                    if(data.status == 400){
                      alert('You can add only 2 vehical')
                    }
                  }
                })
                .catch((error) => {
                  console.error('Error sending data:', error);
                });
        }else{
          alert('Please fill all details')
        }
    }



  return (
<div className=" bg-gray-50 border border-gray-200 rounded popup cursor-default w-4/12 shadow-2xl">
        <div className='w-full flex justify-end p-4 cursor-pointer' onClick={handleClose}>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
        </svg>
        </div>
        <form className='p-8 pt-0' action="">
            <div className='flex items-center justify-between my-2'>
                <label className='text-black text-base font-normal' htmlFor="">Vehicle Number : </label>
                <input className='border border-gray-200 h-8 px-4 w-48 rounded focus:outline-none' type="text" placeholder='RJ14QC3333' name='vno' value={vehicalDetails.vno} onChange={(e)=>setVehicalDetails({...vehicalDetails, vno:e.target.value})}/>
            </div>
            <div className='flex items-center justify-between my-2'>
                <label className='text-black text-base font-normal' htmlFor="">Vehicle Owner Name : </label>
                <input className='border border-gray-200 h-8 px-4 w-48 rounded focus:outline-none' type="text" placeholder='John' name='vname' value={vehicalDetails.vname} onChange={(e)=>setVehicalDetails({...vehicalDetails, vname: e.target.value})}/>
            </div>
            
        </form>
        <input type='button' value='submit' className='bg-slate-600 text-white mx-auto flex mb-4 cursor:pointer px-4 py-2 rounded hover:bg-slate-700' onClick={handleSubmit}/>
</div>
  )
}
