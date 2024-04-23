import React, { useState } from 'react'

export default function SearchVehichalPopup({onClose}) {
  const [vehicalNo, setVehicalNo] = useState("");
  const [vehicalFound, setVehicalFound] = useState();

  const handleSearchVehical = () =>{
    if(vehicalNo !== ''){
        fetch('http://localhost:5000/api/searchVehical',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({vno : vehicalNo }),
            })
            .then((response) => response.json())
            .then((data) => {
                if(data.length > 0){
                  console.log(data[0], "Here is Data")
                    setVehicalFound(data[0])
                    alert('We found a Match !');
                }else{
                  alert('No Match Found, Try Again')
                }
            })
            .catch((error) => {
              console.error('Error fetching shop info:', error);
            });
    }else{
      alert('Vehical No can not be empty')
    }
  }

  return (
    <div className="bg-gray-50 rounded popup cursor-default w-4/12 shadow-2xl border border-gray-200">
                        <div className='w-full flex justify-end p-4' onClick={onClose}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.72 6.97a.75.75 0 1 0-1.06 1.06L10.94 12l-1.72 1.72a.75.75 0 1 0 1.06 1.06L12 13.06l1.72 1.72a.75.75 0 1 0 1.06-1.06L13.06 12l1.72-1.72a.75.75 0 1 0-1.06-1.06L12 10.94l-1.72-1.72Z" clipRule="evenodd" />
                        </svg>
                        </div>
                        {!vehicalFound &&
                        <form className='' action="">
                            <div className='flex flex-col items-center justify-between my-2'>
                                <label className='text-black text-3xl mt-0 font-semibold' htmlFor="">Search Vehicle : </label>
                                <input className='border border-gray-500 h-8 px-4 w-48 mt-4 rounded focus:outline-none' type="text" placeholder='RJ14QC3333' onChange={(e)=>setVehicalNo(e.target.value)} value={vehicalNo}/>
                                <input onClick={handleSearchVehical} type='button' value='Search' className='bg-slate-600 text-white mt-8 cursor:pointer px-4 py-2 rounded hover:bg-slate-700 mb-2'/>
                            </div>
                        </form>
                        }
                        { vehicalFound  &&
                        <>
                        <div className='p-8 pt-0' style={{marginTop: '-30px'}}>
                          <div className='flex justify-center'>
                          <svg xmlns="http://www.w3.org/2000/svg" width='50px' height='50px' viewBox="0 0 24 24" fill="#AFE1AF" class="w-20 h-20">
                          <path fill-rule="evenodd" d="M8.603 3.799A4.49 4.49 0 0 1 12 2.25c1.357 0 2.573.6 3.397 1.549a4.49 4.49 0 0 1 3.498 1.307 4.491 4.491 0 0 1 1.307 3.497A4.49 4.49 0 0 1 21.75 12a4.49 4.49 0 0 1-1.549 3.397 4.491 4.491 0 0 1-1.307 3.497 4.491 4.491 0 0 1-3.497 1.307A4.49 4.49 0 0 1 12 21.75a4.49 4.49 0 0 1-3.397-1.549 4.49 4.49 0 0 1-3.498-1.306 4.491 4.491 0 0 1-1.307-3.498A4.49 4.49 0 0 1 2.25 12c0-1.357.6-2.573 1.549-3.397a4.49 4.49 0 0 1 1.307-3.497 4.49 4.49 0 0 1 3.497-1.307Zm7.007 6.387a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                          </svg>
                          </div>
                          <div className='text-center'>
                          <label className='text-black text-center text-3xl mt-0 font-semibold' htmlFor="">Valid Vehical </label>
                          <div className='text-gray text-center text-xl mt-0 font-semibold mt-1' htmlFor="">Shop No : {vehicalFound.shopno}</div>
                          <div className='flex items-center justify-between my-2 items-center mt-5'>
                            <label className='text-black text-base font-normal' htmlFor="">Vehicle Number : </label>
                            <label className='px-4 rounded' htmlFor=''>{vehicalFound.vno}</label>
                          </div>
                          <div className='flex items-center justify-between my-2 items-center mt-4'>
                            <label className='text-black text-base font-normal' htmlFor="">Vehicle Owner Name : </label>
                            <label className='px-4 rounded' htmlFor=''>{vehicalFound.vname}</label>
                          </div>
                          </div>
                        </div> 
                        </>
                        }       
                    </div>
  )
}
