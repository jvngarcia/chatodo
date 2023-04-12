import { type Input } from "~/interfaces/templateProps"



/**
 * This is a React functional component that renders an input field with a label, placeholder, type,
 * and name.
 * @param  - - `MainInput`: a functional component that renders an input field with a label
 */

const MainInput: React.FC< Input > = ({ label = '', placeholder, type, name }) => {
    return (
        <>
            <label className="block mb-3 text-sm font-medium text-gray-600" htmlFor={ label.trim() }>
                { label }
            </label>
            <input name={ name } id={ label.trim() } className="block w-full px-2 py-3 text-black bg-white border border-gray-200 appearance-none rounded-xl placeholder:text-gray-400 focus:border-blue-500 focus:outline-none focus:ring-blue-500 sm:text-sm" placeholder={ placeholder } autoComplete="off" type={ type } />
        </>
    )
}


export default MainInput;