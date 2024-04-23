import React, { useEffect, useState } from 'react'
import './dashboard.css'
import { useNavigate, NavLink } from 'react-router-dom';
import 'reactjs-popup/dist/index.css';
import SearchVehichalPopup from './SearchVehichalPopup';
import AddVehicalPopup from './AddVehicalPopup';

const Dashboard = () => {
    const [items, setItems] = useState([]);
    const [allData, setAllData] = useState();
    const [isAdmin, setIsAdmin] = useState();
    const [loginEmail, setLoginEmail] = useState(localStorage.getItem('Email'));
    const [userType, setUserType] = useState(localStorage.getItem('UserType'))
    const [addvehichal, setAddVehical] = useState(false);
    const [searchVehical, setSearchVehical] = useState(false);
    const [getData, setGetData] = useState(null);
    const [allVehical, setAllVehical] = useState()
    
    const navigate = useNavigate();

    const handleLogout = () => {
        alert('Logged Out !')
        localStorage.clear();
        navigate('/login')
      }
      const toggleAddVehicle = () => {
        setAddVehical(!addvehichal);
      };
      const toggleSearch = () => {
        setSearchVehical(!searchVehical);
      };

      
    const removeItem = (shopno) => {
       console.log(shopno, "id is here");
       fetch('http://localhost:5000/api/deleteUser',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({shopno : shopno}),
            })
            .then((data) => {
               if(data.status == 200){
                console.log("Successfully Deleted", data)
               alert('User Removed')
               const dummy = [...allData];
               setAllData([...dummy]);
               }
            })
            .catch((error) => {
              console.error('Error fetching shop info:', error);
            });
    };
  
    useEffect(() => {
        fetch('http://localhost:5000/api/shopInfo')
        .then((response) => response.json())
        .then((data) => {
            const items = localStorage.getItem('UserType');
            if(items === 'Admin'){
              setIsAdmin(true)
            }else{
                if(items === 'undefined' || items === null || items === '' || !items ){
                    navigate('/login')
                }
            }
            const datadummy = data.filter((item)=> item.shopno)
            const logedindata = data.filter((item)=> item.email === loginEmail)
          setAllData([...datadummy]);
          setGetData([...logedindata]);
        })
        .catch((error) => {
          console.error('Error fetching shop info:', error);
        });
    },[]);
    
    useEffect(() => {
        if ( getData && getData.length > 0) {
            fetch('http://localhost:5000/api/getVehicalbyshop',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({vno : getData[0].shopno}),
            })
            .then((response) => response.json())
            .then((data) => {
                setAllVehical([...data])
            })
            .catch((error) => {
              console.error('Error fetching shop info:', error);
            });
        }
    }, [getData, addvehichal]);

    const deleteVehical = (vno) =>{
        fetch('http://localhost:5000/api/removeVehical',{
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({vno : vno, shopno: getData[0].shopno }),
            })
            .then((data) => {
                if(data.status == 200){
                    alert("data removed");
                    const dummy = [...getData];
                    setGetData([...dummy]);
                }
            })
            .catch((error) => {
              console.error('Error fetching shop info:', error);
            });
    }
    
  return (
    <>
    <div className='flex text-black bg-slate-50 p-2 shadow-xl items-center justify-between sticky top-0'>
        <div className='flex items-center'>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-10 h-10">
        <path fillRule="evenodd" d="M18.685 19.097A9.723 9.723 0 0 0 21.75 12c0-5.385-4.365-9.75-9.75-9.75S2.25 6.615 2.25 12a9.723 9.723 0 0 0 3.065 7.097A9.716 9.716 0 0 0 12 21.75a9.716 9.716 0 0 0 6.685-2.653Zm-12.54-1.285A7.486 7.486 0 0 1 12 15a7.486 7.486 0 0 1 5.855 2.812A8.224 8.224 0 0 1 12 20.25a8.224 8.224 0 0 1-5.855-2.438ZM15.75 9a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" clipRule="evenodd" />
        </svg>
        <div className='text-xl text-bold pl-2 cursor-pointer'>{getData?.[0].name}</div>
        </div>
      
            <div className='flex items-center p-4 hover:cursor-pointer '>
                {  (userType === 'ShopOwner' ||  userType === 'Admin') &&
                    <div className='flex mr-8' onClick={toggleAddVehicle}>
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                        <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25ZM12.75 9a.75.75 0 0 0-1.5 0v2.25H9a.75.75 0 0 0 0 1.5h2.25V15a.75.75 0 0 0 1.5 0v-2.25H15a.75.75 0 0 0 0-1.5h-2.25V9Z" clipRule="evenodd" />
                        </svg>
                        Vehical
                    </div>
                }
                <div className='flex ' onClick={toggleSearch}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M8.25 10.875a2.625 2.625 0 1 1 5.25 0 2.625 2.625 0 0 1-5.25 0Z" />
                    <path fillRule="evenodd" d="M12 2.25c-5.385 0-9.75 4.365-9.75 9.75s4.365 9.75 9.75 9.75 9.75-4.365 9.75-9.75S17.385 2.25 12 2.25Zm-1.125 4.5a4.125 4.125 0 1 0 2.338 7.524l2.007 2.006a.75.75 0 1 0 1.06-1.06l-2.006-2.007a4.125 4.125 0 0 0-3.399-6.463Z" clipRule="evenodd" />
                    </svg>
                    Search
                </div>
                <div className='text-lg pl-3 hover:underline h-fit flex' onClick={handleLogout} to='login' >
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
                    <path d="M11.47 1.72a.75.75 0 0 1 1.06 0l3 3a.75.75 0 0 1-1.06 1.06l-1.72-1.72V7.5h-1.5V4.06L9.53 5.78a.75.75 0 0 1-1.06-1.06l3-3ZM11.25 7.5V15a.75.75 0 0 0 1.5 0V7.5h3.75a3 3 0 0 1 3 3v9a3 3 0 0 1-3 3h-9a3 3 0 0 1-3-3v-9a3 3 0 0 1 3-3h3.75Z" />
                    </svg>
                    Logout
                </div>
            </div>    
       
                {searchVehical &&  !addvehichal &&(
                   <SearchVehichalPopup onClose={toggleSearch}/>
                )}
                {addvehichal && !searchVehical &&
                   <AddVehicalPopup handleClose={toggleAddVehicle} logindata={getData}/>
                 } 
        
    </div>
    <div>
        <div className='text-left p-4 pl-6 text-4xl font-bold mb-4'>Dashboard</div>
            <>
            <div className='text-left p-4 pl-6 text-3xl font-bold pb-0'>All Shops</div>
            <div className="data flex justify-center p-4">
                <table className='w-full border rounded border-gray shadow-xl'>
                    <thead className=' bg-zinc-300'>
                        <tr>
                            <th className=''>Sr. No.</th>
                            <th>Shop No</th>
                            <th>Shop Owner</th>
                             {/* <th>Name</th> */}
                            {/* <th>Address</th> */}
                             <th>Modify</th> 
                        </tr>
                    </thead>
            
                {
                    allData?.map((item,i) => 
                        {
                            return(
                                    <tbody key={i}>
                                        <tr>
                                            <td>{i+1}</td>
                                            <td>{item.shopno}</td>
                                            <td>{item.name}</td>
                                            {/* <td>{item.Number}</td>
                                            <td>{item.Address}</td> */}
                                            { isAdmin || item.email === loginEmail ?
                                            <td>
                                                {/* <button className='bg-green-500 px-4 py-1 rounded text-white hover:bg-green-700'>Update</button> */}
                                               {isAdmin && <button className='bg-red-500 px-4 py-1 rounded text-white hover:bg-red-700' onClick={() => removeItem(item.shopno)}>remove</button> }
                                            </td>
                                            :
                                            <td>
                                                ---
                                            </td>
                                            }
                                        </tr>
                                    </tbody>
                            );
                        }
                    )
                }
            </table>
            </div>
                
            </>
            {userType !== 'Other' &&
                <>
                     <div className='text-left p-4 pl-6 text-3xl font-bold pb-0 mt-2'>Your Vehical</div>
                    <>
                    <div className="data flex justify-center p-4">
                    <table className='w-full border rounded border-gray shadow-xl'>
                        <thead className=' bg-zinc-300'>
                            <tr>
                                <th className=''>No.</th>
                                <th>Vehical No</th>
                                <th>Vehical Owner</th>
                                {/* <th>Name</th> */}
                                {/* <th>Address</th> */}
                                <th>Modify</th> 
                            </tr>
                        </thead>
                        {allVehical?.map((item,i)=>{
                                return(
                                        <tbody key={i}>
                                            <tr>
                                                <td>{i+1}</td>
                                                <td>{item.vno}</td>
                                                <td>{item.vname}</td>
                                                <td>
                                                <button className='bg-red-500 px-4 py-1 rounded text-white hover:bg-red-700' onClick={() => deleteVehical(item.vno)}>remove</button> 
                                               </td>
                                            </tr>
                                        </tbody>
                                );
                            }
                        )
                    }
                </table>
                </div>

                { allVehical?.length == 0 && <div className='text-center'>No vehical Registered Yet !</div>}
                    </>
                </>
            }
    </div>
    </>
  
  )
}

export default Dashboard