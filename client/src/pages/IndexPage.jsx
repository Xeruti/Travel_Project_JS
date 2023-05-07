import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export default function IndexPage() {

    const [trips,setTrips] = useState([]) //deklarowanie zmiennych dzięki funkcji reacta - useState, dynamiczne zmienianie zawartości zmiennej

    useEffect(() => {   
        //useEffect pozwala na wykonanie funkcji przy dodatkowych eventach na stronie, takich jak np. załadaowanie się strony,
        //aktualizacja danych czy kliknięcie przycisku

        //wysyłamy zapytanie typu GET do endpointu .trips naszego api aby uzyskać wszystkie wycieczki 
        axios.get('/trips').then(({data}) => {

            //uzyskujemy dane z serwera - naprawiamy format daty aby odpowiadał naszym standardom 

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

        //aktualizujemy state naszych "tripów"
          setTrips(convertedData)
        })
    },[]) // [] - oznacza że funkcja wykona się przy pierwszym odpaleniu strony

    return( //każda strona jest u nas funkcją lub zmienną którą zwracamy do głównego elementu strony, dzięki jsx możemy dzielić
            //na oddzielne podgrupy nie tylko kod JS ale także komponenty związane z HTML
        <div className=" container m-auto mt-10 grid grid-cols-1">
          
          {trips.length > 0 && trips.map(trip => (  
            //mapowanie uzyskanych danych i tworzenie odpowiedniej struktury dla wyświetlenia każdej wartości
            //Korzystanie z react-router-dom do przemieszczania się po aplikacji i renderowania odpowiednich komponentów
            // Link - przemieszczanie pomiędzy podstronami  Navigate - przekierowanie do innej podstrony, 
            //useParams - używanie parametrów takich jak id, user login itp. aby przekazywać je do odpowiednich podstron
              <Link to={'/trip/'+trip._id}>
                    <div className="m-5 flex rounded-xl gap-4 cursor-pointer border-2">
                        <div className="flex w-64 h-64 shrink-0 ">
                            {trip.photos.length > 0 && (
                                //zawieranie kodu js wewnątrz znaczników HTML - JSX
                                <img className="object-cover rounded-xl" src={"http://localhost:4000/"+trip.photos[0]} alt="zdjęcie"/>
                            )}
                        </div>
                        <div className="my-6 mx-3 grid grid-cols-4 w-full">
                        <div className="col-span-3 grow-0 shrink">
                            <h2 className="text-3xl">{trip.title}</h2>
                            <p className="mt-3 text-lg">{trip.days} dni</p>
                            <p className="flex gap-2 my-2 mt-3 text-lg">
                              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M8 4H5C3.89543 4 3 4.89543 3 6V9M8 4H16M8 4V2M8 4V6M16 4H19C20.1046 4 21 4.89543 21 6V9H3M16 4V2M16 4V6M3 9V20C3 21.1046 3.89543 22 5 22H10M17 15.25V17L18.25 18.25M22 17C22 19.7614 19.7614 22 17 22C14.2386 22 12 19.7614 12 17C12 14.2386 14.2386 12 17 12C19.7614 12 22 14.2386 22 17Z" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                              {trip.departure} - {trip.returnDate}
                            </p>
                            <p className="text-md mt-4 hidden xl:flex">{trip.shortDescription}</p>
                        </div>

                        <div className="col-span-1 grow-0 shrink text-center">
                            <p className="text-3xl text-primary pt-20">od {trip.price} zł</p>
                        </div>
                        </div>
                    </div>
              </Link>
                )) }
        </div>

    )
}