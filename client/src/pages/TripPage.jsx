import axios from "axios"
import { useContext, useEffect, useState } from "react"
import { Link, Navigate, useParams } from "react-router-dom"
import { LoginContext } from "../LoginContex"

export default function TripPage(){

    const {id} = useParams()

    const [trip,setTrip] = useState(null)

    const {user,setUser, ready} = useContext(LoginContext)

    const [redirect,setRedirect] = useState(false)

    useEffect(() => {
        if(!id) {
            return
        }
        axios.get(`/trips/${id}`).then(({data}) =>{

                let convertedData = data
      
                let departure = "2023-04-24"
      
               if(convertedData.departure){
                    departure = convertedData.departure.substring(0, 10)
                }
      
                let returnDate = "2023-04-24"
                
                if(convertedData.departure){
                    returnDate = convertedData.returnDate.substring(0, 10)
                }
      
                convertedData.departure = departure
                convertedData.returnDate = returnDate
                setTrip(convertedData)
            })
    },[id])

    async function bookTrip(){
        await axios.post("/booking", {
            user,id
        })
        setRedirect(true)
    }

    if(!trip) return ''

    if(redirect){
        return <Navigate to={`/account/myBookings/${id}`}/>
      }

    return(
        <div className="mt-8 container m-auto">
            <div>
                <h1 className="text-4xl text-center">{trip.title}</h1>
                <h2 className="text-2xl text-center gap-2 my-2 mt-6">
                    {trip.departure} - {trip.returnDate}
                </h2>
            </div>
            <div className="gap-2 w-full border my-5">
                <div>
                    {trip.photos?.[0]  && (
                        <div>
                            <img className="border-2 border-primary object-cover w-full h-96 xl:h-[24rem] 2xl:h-[32rem]" src={'http://localhost:4000/'+trip.photos[0]}/>
                        </div>
                    )
                    }
                </div>
            </div>
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 w-full my-5">
                <div className="p-10 m-auto">
                    <p className="text-lg text-center h-full align-middle">
                        {trip.shortDescription}
                    </p>
                </div>
                <div>
                {trip.photos?.[1]  && (
                        <div>
                            <img className="border-2 border-primary object-cover w-full h-[28rem]" src={'http://localhost:4000/'+trip.photos[1]}/>
                        </div>
                    )
                    }
                </div>
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-2 w-full my-5">
                <div className="p-10 m-auto">
                    <p className="text-lg text-center h-full align-middle">
                        {trip.description}
                    </p>
                </div>
                <div>
                {trip.photos?.[2]  && (
                        <div>
                            <img className="border-2 border-primary object-cover w-full h-[28rem]" src={'http://localhost:4000/'+trip.photos[2]}/>
                        </div>
                    )
                    }
                </div>
            </div>

            <div className="grid grid-cols-4 gap-5 w-full my-5 text-center text-lg">
                <div className="border-2 border-primary m-auto p-3 w-full">
                    <p>Liczba dni</p>
                    {trip.days}
                </div>
                <div className="border-2 border-primary m-auto p-3 w-full">
                    <p>Cena/os</p>
                    {trip.price} zł
                </div>
                <div className="border-2 border-primary m-auto p-3 w-full">
                    <p>Maksymalna ilość osób</p>
                    {trip.maxPersons} 
                </div>

                {user === null && (

                    <Link to={"/login"} className="m-auto p-7 w-full bg-primary text-white">   
                        Zaloguj się aby zarezerwować miejsce
                    </Link>


                )}

                {user !== null && (  

                <div className="m-auto p-5 w-full bg-primary text-white cursor-pointer">
                    <button onClick={bookTrip} className="w-full h-full primary cursor-pointer">Zarezerwuj miejsce</button>
                </div>

                )}

            </div>

        </div>
    )
}