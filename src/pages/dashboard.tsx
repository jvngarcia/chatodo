import { type NextPage } from "next";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext } from "react";
import MainInput from "~/components/MainInput";
import Template from "~/components/Template";
import { api } from "~/utils/api";
import { LoadingContext } from "./_app";
import Avvvatars from 'avvvatars-react'
import { useSession } from "next-auth/react";
import Swal from "sweetalert2";



const Dashboard: NextPage = () => {

    const router = useRouter()
    const { query } = router

    const loader = useContext(LoadingContext)

    const { mutate, error, data: new_contact, isLoading } = api.contacts.getContactByEmail.useMutation()
    loader.setLoading(isLoading)

    const handleSubmit = (event: any) => {
        event.preventDefault()
        const { email } = event.target
        mutate({ email: email.value })
    }


    return (
        <Template titleHead="Dashboard - ChaTodo" >
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-3 gap-4">
                    <div className={`w-full h-full p-4 mx-auto space-y-4 bg-gray-50 rounded-xl border ${query.create == 'contact' ? 'border-blue-300 animate-pulse duration-1000' : ''}`}>
                        <h1 className="text-2xl font-bold text-gray-800">Add contact</h1>
                        <p className="text-gray-600">To add new contacts you must take into account that they must be registered on the platform.</p>
                        <form onSubmit={(event) => handleSubmit(event)}>
                            <MainInput label="Email" placeholder="angel@gmail.com" type="email" name="email" />
                            <button className="px-4 py-2 text-white bg-blue-500 rounded-xl w-full mt-3" type="submit">Search</button>
                        </form>


                        {
                            new_contact && <TargetContact image={new_contact.image ?? ''} name={new_contact.name ?? ''} email={new_contact.email ?? ''} id={new_contact.id ?? ''} />
                        }

                        {
                            error && <p className="text-red-500">{error.message}</p>
                        }

                    </div>
                </div>

            </div>
        </Template>
    );
};


type TargetContactInterface = {
    id: string,
    image: string,
    name: string,
    email: string
}

export const TargetContact: React.FC<TargetContactInterface> = ({ id, image, name, email }) => {
    const router = useRouter()
    const { data: sessionData } = useSession();

    const { mutate, error, data: new_contact } = api.contacts.createContact.useMutation()

    console.log( new_contact )

    if( new_contact ){
        router.push({
            pathname: '/chat/contact/[id]',
            query: { id: id }
        })
    }

    if( error ){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: error.message,
        })
    }

    const createContact = ( email:string ) => {
        mutate({ sender: sessionData?.user.email ?? '' , receiver: email })
    }

    return (
        <div className="border rounded py-4 px-5 bg-white w-full">
            <div className="grid grid-cols-4">
                <div>
                    {
                        image ? <Image src={image} alt={name} width={50} height={50} /> : <Avvvatars value={name ?? 'anonimous'} size={50} />
                    }
                </div>
                <div className="col-span-3">
                    <p className="text-gray-800 font-bold truncate">{name}</p>
                    <p className="text-gray-800 truncate">{email}</p>
                </div>
            </div>
            <div className="mt-5">
                <button onClick={() => createContact( email )} className="px-4 py-2 text-white bg-red-500 rounded-xl w-full mt-3 block text-center">Write a message</button>
            </div>
        </div>
    )
}


export default Dashboard;