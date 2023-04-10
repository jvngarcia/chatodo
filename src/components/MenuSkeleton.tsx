import { Skeleton } from "~/interfaces/templateProps"



/* This code defines a functional component called `MenuSkeleton` that takes in a prop called
`quantity` of type `Skeleton`. The component then creates an array of `li` elements with a nested
structure of `div` elements that contain CSS classes and styles. The number of `li` elements created
is determined by the `quantity` prop passed in. Finally, the component returns the array of `li`
elements wrapped in a React fragment. The component is then exported as the default export of the
module. */

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