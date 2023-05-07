import { Link, useLocation, useParams } from "react-router-dom"
import { LoginContext } from "./LoginContex"
import { useContext } from "react"


export default function AccountNavigation(){

    const {user,setUser, ready} = useContext(LoginContext)

    const id = user._id

    const {pathname} = useLocation()
    let subpage = pathname.split('/')?.[2]
    if(subpage === undefined){
        subpage = 'profile'
    }
    
    function linkClasses (type=null){
        let classes =  'inline-flex gap-2 py-2 px-6 rounded-full'

        if(type === subpage ){
            classes += ' bg-primary text-white'
        }

        else{
            classes += ' bg-gray-300'
        }

        return classes
    }

    return(
        <nav className="w-full flex justify-center mt-8 gap-2" >
                <Link className={linkClasses('profile')} to={'/account'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="7" r="4" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </circle>
                        <path d="M4 21V17C4 15.8954 4.89543 15 6 15H18C19.1046 15 20 15.8954 20 17V21" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                    My profile
                </Link>

                <Link className={linkClasses('myBookings')} to={`/account/myBookings/${id}`}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></circle><path d="M3 12H22" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 2.2019C14.4744 4.72698 16 8.18526 16 11.9999C16 15.8145 14.4744 19.2728 12 21.7978" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M12 2.2019C9.52563 4.72698 8 8.18526 8 11.9999C8 15.8145 9.52563 19.2728 12 21.7978" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                    My bookings
                </Link>

                {user.role === 'admin' && (

                <Link className={linkClasses('trips')} to={'/account/trips'}>
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <circle cx="12" cy="12" r="10" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </circle>
                        <path d="M12 6V16" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <path d="M12 9L17.1962 12" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <path d="M12 9L6.80385 12" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <path d="M12 16L9.5 17.5" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                        <path d="M12 16L14.5 17.5" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                        </path>
                    </svg>
                    Edit Trips
                </Link>
                )}
            </nav>
    )
}