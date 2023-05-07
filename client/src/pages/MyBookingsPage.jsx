import { Link } from "react-router-dom";
import AccountNavigation from "../AccountNavigation";
import { useEffect, useState } from "react";
import axios from "axios";
import { LoginContext } from "../LoginContex";
import { useContext } from "react";

export default function MyBookingsPage() {

    const [trips,setTrips] = useState([])

    const {user,setUser, ready} = useContext(LoginContext)
    

    useEffect(() => {
        const id = user._id
        axios.get(`/myBookings/${id}`).then(({data}) =>{
            let convertedData = data

          for (let x=0;x<convertedData.length;x++){

          let departure = "2023-04-24"

         if(convertedData[x].departure){
              departure = (convertedData[x].departure).substring(0, 10)
          }

          let returnDate = "2023-04-24"
          
          if(convertedData[x].departure){
              returnDate = (convertedData[x].returnDate).substring(0, 10)
          }

          convertedData[x].departure = departure
          convertedData[x].returnDate = returnDate

        }
          setTrips(convertedData)
        })
    },[])

    return(
        <div>
            <AccountNavigation/>
            <div className="mt-4 xl:mx-20">
                {trips.length > 0 && trips.map(trip => (
                    <Link to={"/trip/" + trip._id} className="m-5 flex bg-gray-100 p-4 rounded-xl gap-4 cursor-pointer">
                        <div className="flex w-32 h-32 bg-gray-300 shrink-0">
                            {trip.photos.length > 0 && (
                                <img className="object-cover" src={"http://localhost:4000/"+trip.photos[0]} alt="zdjęcie"/>
                            )}
                        </div>
                        <div className="grow-0 shrink">
                            <h2 className="text-xl">{trip.title}</h2>
                            <p className="text-md mt-2">{trip.shortDescription}</p>
                            <p className="text-lg mt-2">{trip.departure} - {trip.returnDate}</p>
                        </div>
                    </Link>
                )) }
            </div>
        </div>

    )
}