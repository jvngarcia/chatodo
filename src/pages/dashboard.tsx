import { type NextPage } from "next";
import { useRouter } from "next/router";
import Template from "~/components/Template";



const Dashboard: NextPage = () => {

    const router = useRouter()
    const { query } = router

    console.log(query.create)



    return (
        <Template titleHead="Dashboard - ChaTodo" >
            <div className="container mx-auto">
                <div className="grid grid-cols-3">

                    <div className="w-full h-full p-4 mx-auto space-y-4 bg-white rounded-xl border">
                        <h1 className="text-2xl font-bold text-gray-800">Add contact</h1>
                        <p className="text-gray-600">To add new contacts you must take into account that they must be registered on the platform.</p>
                    </div>
                </div>

            </div>
        </Template>
    );
};


export default Dashboard;