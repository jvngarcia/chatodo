import { Skeleton } from "~/interfaces/templateProps"



const MenuSkeleton: React.FC<Skeleton> = ({ quantity }) => {

    const rows = []
    for (let index = 0; index < quantity; index++) {
        rows.push(
            <li key={ index }>
                <div className="inline-flex items-center w-full px-4 py-2 mt-1 text-sm text-gray-500 transition duration-200 ease-in-out transform rounded-lg focus:shadow-outline hover:bg-gray-100 hover:scale-95 hover:text-blue-500">
                    <div className="animate-pulse flex-row items-center justify-center rounded-xl border w-full">
                        <div className="flex flex-col space-y-2">
                            <div className="h-6 w-full rounded-md bg-gray-200 "></div>
                        </div>
                    </div>
                </div>
            </li>
        )

    }

    return (
        <>
            { rows }
        </>
    )
}


export default MenuSkeleton;