import React, {useState,useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import { setCartLength } from '../../../Redux/Cart/CartSlice';
import { BsSearch } from "react-icons/bs";
import '../../../Components/UserComponents/Nav/Nav.css';
import { TiThMenu } from "react-icons/ti";
import { FaUserCircle } from "react-icons/fa";
import { AiFillHome } from "react-icons/ai";
import { BiSolidCategory } from "react-icons/bi";
import SearchResultsList from './SearchResultsList';
import { FaUser } from "react-icons/fa";
import { MdArrowDropDown } from "react-icons/md";
import { MdArrowDropUp } from "react-icons/md";
import { PiHandbagSimpleFill } from "react-icons/pi";
import { BiSolidWalletAlt } from "react-icons/bi";
import { RiFolderUserFill } from "react-icons/ri";
import { BiSolidShoppingBags } from "react-icons/bi";
import { GoHeartFill } from "react-icons/go";
import { TbLogout2 } from "react-icons/tb";
import { logOutUser } from '../../../Redux/Auth/Auth'; 
import { logout } from '../../../Redux/Address/AddressSlice'; 
import { cartlogout } from '../../../Redux/Cart/CartSlice'; 
import { base_url } from '../../../Config';

const Nav = () => {
      const navigate = useNavigate();
      const dispatch = useDispatch();
    
 
      const [loading, setLoading] = useState(true);
      const [isMenuOpen, setIsMenuOpen] = useState(false);
      const [searchInput, setSearchInput] = useState('');
      const [searchResults, setSearchResults] = useState([]);
      const [profieInfoOpen, setProfileInfoOpen] = useState(false);
      const [paymentdropdown, setPaymentdropdown] = useState(false);
      const [myStuffDropdown, setMystuffdropdown] = useState(false);

      const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };
      
      const cartLength = useSelector(state => state.cart.length);
      const user = useSelector((state) => state.auth.auth.user);
      
      
      useEffect(() => {
        
            axios.get(`${base_url}/api/v2/isLoggedIn`,{withCredentials:true})
                  .then((res) => {

                        dispatch(setCartLength(res.data.CartLength));
                     
                })
                  .catch((err) => {
                        console.log(err)
                       
                  })
        },[]);

      useEffect(() => {
            getSearchItems();
      },[searchInput]);
     
      const getSearchItems = () => {
            axios.get(`${base_url}/api/v2/search`)
                  .then((res) => {
                        let results = res.data.products;
                        results = results.filter((item) => {
                              return searchInput && item && item.name && item.name.toLowerCase().includes(searchInput) || item.description.toLowerCase().includes(searchInput);
                        });
                        setSearchResults(results);
                  })
                  .catch((err) => {
                        console.log(err)
                  });
      };

      const handleLogOut = () => {
            axios.get(`${base_url}/api/v2/logout`,{withCredentials:true})
                .then((res) => {
                   
                    if (res.status === 200 && res.data.success === true) {
                        dispatch(logOutUser());
                        dispatch(logout());
                        dispatch(cartlogout());
                    }
                })
                .catch((err) => {
                console.log(err);
            })
        }

      
      return (
            <>
                  <nav className=' mx-auto z-50  lg:flex lg:sticky lg:top-0 lg:backdrop-blur-xl    flex-nowrap md:items-center py-4 md:px-2 xl:px-12  md:justify-evenly  font-poppins '>
                   
              <div className=' h-fit lg:mb-0 mb-2 cursor-default'>  
                  <div className='text-center tracking-wider '>
                        <span className='text-3xl font-serif font-semibold'>E</span>
                        <span className='font-semibold text-3xl font-frank-lukh'>ZIRE</span>
                  </div>
                  <div className='text-xs text-center'>
                        <span className='md:tracking-widest text-gray-500 font-extralight font-sans '>FASHION STORE</span>
                  </div>
              </div>
            <div className='md:flex   lg:justify-center md:justify-between  items-center   md:bg-[#0d1b2a] lg:px-12 md:px-6  md:rounded-full py-2 '>
                  <div className='md:flex lg:space-x-7 md:space-x-3 lg:gap-4 md:gap-3 items-center  tracking-wide'>
                        <div className='relative flex items-center  bg-white rounded-full py-1 px-2 input-container  '>
                              <input autoComplete='off' className=' bg-[#e0e6ef]  md:w-72 sm:w-full  rounded-full md:py-1 md:px-4 px-5 py-2 outline-none expandable-input ' type="search" placeholder='Search' name="search" id="search" value={searchInput} onChange={(e)=>setSearchInput(e.target.value)}/> 
                                          {/* <div className='absolute  right-4 search text-xl'><a href="#" className='text-slate-700'><BsSearch /></a></div> */}
                                          <div>{searchInput.length > 0 && <SearchResultsList results={ searchResults} />}</div>

                        </div>
                              <div className='flex sm:justify-between  md:p-0 sm:p-2  ease-out md:text-[white]  uppercase tracking-wider font-light md:bg-transparent sm:bg-[#0d1b2a]'>
                                    <div className=' lg:gap-4 md:space-x-6  md:gap-2 hidden md:block'>
                                    <a className='hover:scale-110   text-sm ' href="/">Home</a>
                                    <a className='hover:scale-110  text-sm ' href="/men">Men</a>
                                    <a className='hover:scale-110  text-sm ' href="/women">Women</a>
                                    </div>

                                    <div className=' md:hidden flex items-center space-x-5'>
                                          <div className='relative px-4 py-2'>
                                          {
                                                cartLength >0 && <button onClick={() => navigate('/cart')}><div className='   absolute  right-0 top-0 text-white  rounded-full w-6    text-center '><span className=' text-xs bg-red-500 py-1 px-2  font-bold  rounded-full'>{ cartLength}</span></div></button> 
                                          }
                                                <button><a className='' href="/cart"><BiSolidShoppingBags className='text-xl text-white'/></a></button>
                                          </div>
                                          <div>
                                                
                                                      
                                                      <div className='flex space-x-6 text-2xl text-[#f86666]'>
                                                            <button><a href="/wishlist"><GoHeartFill /></a></button>
                                                      </div> 
                                                                       
                                                
                                          </div>  
                                    </div>     
                                    <div className='flex  items-center     text-white'>
                                          <div className='flex space-x-1 gap-1 md:hidden '>
                                          {
                                                            user ?
                                                            user.avatar?<img className='h-8 border rounded-full' src={`${base_url}/${user.avatar.url}`} alt="profile" onClick={()=>navigate('/profile')}/>:<FaUserCircle className='text-2xl' onClick={()=>navigate('/profile')}/>
                                                            : <button className='h-fit text-sm font-semibold bg-orange-400 py-1 px-2 rounded text-white' onClick={() => navigate('/Login')}>Login</button>
                                          }
                                          </div>   
                                          <button className='p-1 text-2xl ml-2 md:hidden' onClick={toggleMenu}><TiThMenu /></button>
                                    </div>
                              </div>
                  </div>
                  <div className='md:flex lg:ml-12 space-x- md:items-center sm:hidden'>
                        <div className='relative px-4 py-2'>
                        {
                              cartLength >0 && <button onClick={() => navigate('/cart')}><div className='   absolute right-0 top-0 text-white  rounded-full w-6    text-center '><span className=' text-xs bg-red-500 py-1 px-2  font-bold  rounded-full'>{ cartLength}</span></div></button> 
                        }
                              <button><a  href="/cart"><BiSolidShoppingBags  className='text-white text-2xl'/></a></button>
                        </div>
                        <div>
                        
                                    <div className='px-4 py-2'>
                                          <button className=''><a href="/wishlist"><GoHeartFill className='text-[#f86666] text-2xl'/></a></button>
                                    </div> 
                                                      
                        
                        </div>
                        <div className='ml-5'>
                              <button className='text-white text-2xl' onClick={()=>navigate('/profile')}>
                                    {
                                                      user && user.avatar ? <img className='h-8 border rounded-full' src={`${base_url}/${user.avatar.url}`} alt="profile" /> :
                                                      <FaUserCircle />
                                    }
                              </button>
                        </div>
                  </div>
            </div>
            <div className=' space-x-1 gap-1  hidden lg:flex'>
                  {
                        user ?'': <button className='h-auto bg-orange-400 py-1 px-2 rounded text-white' onClick={()=>navigate('/Login')}>Login</button>
                  }
            </div>
            </nav>

                     
                   

                              {/* Side Menu */}
            <div className={`md:hidden sm:block fixed top-0 z-20 left-0 h-full  pl-4 w-64 bg-[#0d1b2a] shadow-lg transform ${isMenuOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 ease-in-out`} aria-label="Sidebar">
                  <div className='flex flex-col p-5 h-full'>
                        <div className=' h-fit  mb-2 text-white border-b-2 pb-3 border-gray-600 cursor-default'>  
                              <div className='text-center tracking-wider '>
                                    <span className='text-3xl font-serif font-semibold '>E</span>
                                    <span className='font-semibold text-3xl font-frank-lukh'>ZIRE</span>
                              </div>
                        <div className='text-xs text-center'>
                              <span className='md:tracking-widest text-gray-400 font-extralight font-sans '>FASHION STORE</span>
                        </div>
                        </div>

                              <div className='h-4/5 overflow-y-scroll'>
                              <div className='flex items-center space-x-2 text-xl text-white mb-3 mt-4'>
                                    <AiFillHome /><a href="/" className='text-lg'>Home</a>
                              </div>

                              <div className='flex items-center text-white space-x-2 text-xl mb-3'>
                                    <BiSolidCategory /><span className='text-lg'>Category</span>
                              </div>

                              <div className='mx-1 mt-2 px-7 pt-2 text-slate-400 bg-[#] shadow-[black] rounded-md shadow-sm mb-3'>
                                    <div className='mb-3'><a className='py-2' href="/men">Men</a></div>
                                    <div className='mb-3'><a className='py-2' href="/women">Women</a></div>
                              </div>

                              <div className='mb-3'>
                                    <a href='/orders' className='flex items-center text-white space-x-2 text-xl'><PiHandbagSimpleFill /><span className='text-lg'>Orders</span></a>   
                              </div>

                              <div className=' text-white mb-1'>
                                    <button className='flex items-center  white  text-xl mb-3' onClick={() => {
                                          setProfileInfoOpen((prev) => !prev);
                                          setMystuffdropdown(false);
                                          setPaymentdropdown(false)
                                    }}>
                                          <div className='flex items-center space-x-2'><FaUser /><span className='text-lg'>Account settings</span></div>
                                    <div className='text-2xl ml-3'>{profieInfoOpen?(<MdArrowDropUp />):(<MdArrowDropDown />)}</div>
                                    </button>
                                    {
                                          profieInfoOpen && 
                                          <div className='bg-[#]  shadow-[black] h-fit w-full text-base rounded-md shadow-inner'>
                                                      <ul className='pl-4 py-2 text-slate-300'>
                                                            <li  className='mb-3'><a href="/user-information">Profile Information</a></li>
                                                            <li className='mb-3'><a href="/Address">Manage Address</a></li>
                                                            <li className='mb-3'><a href="/maintenance">PAN Information</a></li>
                                                      </ul>
                                          </div>
                                    }
                              </div>
                   
                              <div className=' text-white mb-1'>
                                    <button className='flex items-center  white  text-xl mb-3' onClick={() => {
                                          setPaymentdropdown((prev) => !prev);
                                          setMystuffdropdown(false);
                                          setProfileInfoOpen(false)
                                    }}>
                                          <div className='flex items-center space-x-2'><BiSolidWalletAlt /><span className='text-lg'>Payments</span></div>
                                    <div className='text-2xl ml-3'>{paymentdropdown?(<MdArrowDropUp />):(<MdArrowDropDown />)}</div>
                                    </button>
                                    {
                                          paymentdropdown && 
                                          <div className=' shadow-[black] h-fit w-full text-base rounded-md shadow-inner'>
                                                      <ul className='pl-6 py-2 text-slate-300'>
                                                            <li className='mb-3'><a href="/maintenance">Gift Cards</a></li>
                                                            <li className='mb-3'><a href="/maintenance">Saved UPI</a></li>
                                                            <li className='mb-3'><a href="/maintenance">Saved Cards</a></li>
                                                      </ul>
                                          </div>
                                    }
                              </div>

                              <div className=' text-white'>
                                    <button className='flex items-center  white  text-xl mb-3' onClick={() => {
                                          setMystuffdropdown((prev) => !prev);
                                          setProfileInfoOpen(false);
                                          setPaymentdropdown(false)
                                    }}>
                                          <div className='flex items-center space-x-2'><RiFolderUserFill /><span className='text-lg'>My stuff</span></div>
                                    <div className='text-2xl ml-3'>{myStuffDropdown?(<MdArrowDropUp />):(<MdArrowDropDown />)}</div>
                                    </button>
                                    {
                                          myStuffDropdown && 
                                          <div className='shadow-[black] h-fit w-full text-base rounded-md shadow-inner'>
                                                      <ul className='pl-6 py-2 text-slate-300'>
                                                            <li className='mb-3'><a href="/maintenance">My Coupons</a></li>
                                                            <li className='mb-3'><a href="/maintenance">My Reviews and Rating </a></li>
                                                            {/* <li className='mb-3'><a href="/maintenance">All Notification</a></li> */}
                                                            <li className='mb-3'><a href="/wishlist">My Whishlist</a></li>

                                                      </ul>
                                          </div>
                                    }
                              </div>
                                    
                              </div>

                    
                              {

                                    user ? <div className='flex flex-col items-center mt-5  border-gray-600 fixed bottom-5 left-3'>
                                          <div className='my-5'>
                                                <button className='h-auto flex items-center text-white font-semibold' onClick={handleLogOut}><TbLogout2  /><span className='ml-2'>LogOut</span></button>
                                          </div>
                                          <div className='flex border-t-2 pt-3'>
                                          <div className='text-3xl text-white'>
                                    {
                                                user && user.avatar ? <img className='h-8 border rounded-full' src={`${base_url}/${user.avatar.url}`} alt="profile" />:<FaUserCircle />
                                    } 
                                    </div>
                                    <div className='leading-3 ml-1'>
                                                <div><a href='/user-information' className='text-sm text-white' >{user? user.name :''}</a></div>
                                                <span className='text-xs text-slate-400 cursor-default'>{user?user.email:'' }</span>
                                    </div>

                                                
                                          </div>
                                    
                                    </div>:''
                              }

                              
                              
                  </div>
                        
            </div>
            {isMenuOpen && <div className='fixed inset-0  opacity-50' onClick={toggleMenu}></div>}
        </>
      
  )
}

export default Nav