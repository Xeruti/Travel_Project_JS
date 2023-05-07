import { useEffect, useState } from "react";
import axios from "axios";

export default function ContactPage() {

    const [trips,setTrips] = useState([])

    useEffect(() => {
        axios.get('/trips').then(({data}) => {

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
        <div className="container m-auto text-center mt-10 grid grid-cols-1">
          <div>
            <p className="text-lg mt-2">Skontaktuj się z nami:</p>  
            <p className="text-lg mt-2">Telefon: 987 654 321</p>
            <p className="text-lg mt-2">Email: travelproject@gmail.com</p>
            <p className="text-lg mt-2">Siedziba: Słoneczna 10 Warszawa</p>      
          </div>
        </div>

    )
}