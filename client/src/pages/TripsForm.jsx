import { useEffect, useState } from "react"
import AccountNavigation from "../AccountNavigation"
import { Navigate, useParams } from "react-router-dom"
import axios from "axios"

export default function TripsForm(){

    const {id} = useParams()
    const [title,setTitle] = useState('')
    const [photos,setPhotos] = useState([])
    const [shortDescription,setShortDescription] = useState('')
    const [description,setDescription] = useState('')
    const [departure,setDeparture] = useState('')
    const [returnDate,setReturnDate] = useState('')
    const [price,setPrice] = useState(1)
    const [days,setDays] = useState(1)
    const [maxPersons,setMaxPersons] = useState(1)

    const [redirect,setRedirect] = useState(false)

    useEffect(() => {
        if (!id) {
          return;
        }
        axios.get('/trips/'+id).then(response => {
           const {data} = response
           setTitle(data.title)
           setPhotos(data.photos)
           setDescription(data.description)
           setShortDescription(data.shortDescription)
           setMaxPersons(data.maxPersons)
           setPrice(data.price)
           setDays(data.days)

           let departure = "2023-04-24"

           if(data.departure){
                departure = (data.departure).substring(0, 10)
            }

            let returnDate = "2023-04-24"
            
            if(data.departure){
                returnDate = (data.returnDate).substring(0, 10)
            }

           setDeparture(departure)
           setReturnDate(returnDate)
        });
      }, [id]);

    
    function uploadPhoto(e){
        const files = e.target.files
        const data = new FormData()
        for(let i=0; i< files.length; i++){
        data.append('photos',files[i])
        }
        axios.post('/upload', data,{
            headers: {'Content-type':'multipart/form-data'}
        }).then(response => {
            const {data:filenames} = response
            setPhotos(prev => {
                return [...prev,...filenames]
            })
        })
    }

    async function AddNewTrip(e){
        e.preventDefault()

        const tripData = {
            title,
            photos,
            shortDescription,
            description,
            departure,
            returnDate,
            price,
            days,
            maxPersons
        }

        if(id){
            //update
            axios.put('/trips', {id, ...tripData})
            setRedirect(true)
            return <Navigate to={'/account/trips'}/>
        } else {
            //new
            await axios.post('/trips', tripData)
            setRedirect(true)

    }
    }

    async function deleteTrip(e){
        e.preventDefault()
        axios.delete(`/trips/delete/`+id)
        setRedirect(true)
    }

    if(redirect){
        return <Navigate to={'/account/trips'}/>
    }

    function removePhoto(filename) {
        setPhotos([...photos.filter(photo => photo !== filename)])
    }


    return(
        <div className="container m-auto">
            <AccountNavigation/>
                    <form onSubmit={AddNewTrip}>
                        <h2 className="text-xl mt-4">Nazwa wyjazdu</h2>
                        <input type='text' value={title} onChange={e => setTitle(e.target.value)}  placeholder="Nazwa wyjazdu"></input>
                        <h2 className="text-xl mt-4">Wstępny opis</h2>
                        <input type='text' value={shortDescription} onChange={e => setShortDescription(e.target.value)} placeholder="Wstępny opis wyjazdu"></input>
                        <h2 className="text-xl mt-4">Zdjęcia</h2>
                            <div className="mt-2 gap-2 grid grid-cols-2 md:grid-cols-3 xl:grid-cols-5">
                                {photos.length > 0 && photos.map(link => (
                                    <div className="h-48 flex relative" key={link}>
                                        <img className="rounded-xl w-full object-cover" src={'http://localhost:4000/'+link}></img>
                                        <button onClick={() => removePhoto(link)}>
                                        <div className="absolute bottom-2 right-2">
                                            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg"><path d="M3 6H21M5 6V20C5 21.1046 5.89543 22 7 22H17C18.1046 22 19 21.1046 19 20V6M8 6V4C8 2.89543 8.89543 2 10 2H14C15.1046 2 16 2.89543 16 4V6" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M14 11V17" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path><path d="M10 11V17" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"></path></svg>
                                        </div>
                                        </button>
                                    </div>
                                ))}
                                <label className="flex items-center p-4 gap-2 justify-center border bg-transparent rounded-xl cursor-pointer">
                                <input type="file" className="hidden" multiple onChange={uploadPhoto}/>
                                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M3 14V20C3 21.1046 3.89543 22 5 22H19C20.1046 22 21 21.1046 21 20V14" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                    <path d="M12 17V3M12 3L7 8.44446M12 3L17 8.44444" stroke="rgba(0,0,0,0.95)" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round">
                                    </path>
                                </svg>
                                    Dodaj Zdjęcie
                                </label>
                            </div>
                        <h2 className="text-xl mt-4">Opis</h2>
                        <textarea  value={description} onChange={e => setDescription(e.target.value)} />

                        <div className="mt-2 grid grid-cols-2 gap-3">

                            <div>
                                <h2 className="text-xl mt-4">Data Wyjazdu</h2>
                                <label className="border p-4 flex gap-2 items-center cursor-pointer">
                                <input type="date" value={departure} onChange={e => setDeparture(e.target.value)}/>
                                </label>
                            </div>

                            <div>
                                <h2 className="text-xl mt-4">Data Powrotu</h2>
                                <label className="border p-4 flex gap-2 items-center cursor-pointer">
                                <input type="date" value={returnDate} onChange={e => setReturnDate(e.target.value)}/>
                                </label>
                            </div>

                        </div>

                        <div className="mt-2 grid grid-cols-3 gap-3">

                            <div>
                                <h2 className="text-xl text-center mt-4">Ilość dni</h2>
                                <label className="ml-5 py-3 border flex gap-2 justify-center items-center cursor-pointer">
                                <input className="text-center" type="number" value={days} onChange={e => setDays(e.target.value)}/>
                                </label>
                            </div>

                            <div>
                                <h2 className="text-xl text-center mt-4">Cena</h2>
                                <label className="ml-5 py-3 border flex gap-2 justify-center items-center cursor-pointer">
                                <input className="text-center" type="number" value={price} onChange={e => setPrice(e.target.value)}/>
                                </label>
                            </div>

                            <div>
                                <h2 className="text-xl text-center mt-4">Liczba osób</h2>
                                <label className="ml-5 py-3 border flex gap-2 justify-center items-center cursor-pointer">
                                <input className="text-center" type="number" value={maxPersons} onChange={e => setMaxPersons(e.target.value)}/>
                                </label>
                            </div>
                        </div>

                        <div className="my-3 grid grid-cols-1 place-items-center mx-20">
                            <div className="w-full">
                                <button className="primary">Zapisz</button>
                            </div>
                        </div>

                        {
                            id !== undefined && (
                                <div className="my-3 grid grid-cols-1 place-items-center mx-20">
                                    <div className="w-full">
                                        <button onClick={deleteTrip} className="primary bg-red-100">Usuń</button>
                                    </div>
                                </div>
                            )
                        }
                        

                    </form>
                </div>
    )
}