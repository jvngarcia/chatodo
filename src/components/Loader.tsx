import { JellyTriangle } from '@uiball/loaders'
import { useContext } from 'react'
import { LoadingContext } from '~/pages/_app'




const Loader: React.FC = () => {

    const { loading } = useContext( LoadingContext )

    return (
        <div className={`absolute top-0 left-0 right-0 bottom-0 bg-white opacity-80 z-50 ${loading ? '' : 'hidden'}`}>
            <div className="flex justify-center items-center h-full">
                <div className='text-center'>
                    <div className='flex justify-center'>
                        <JellyTriangle
                            size={50}
                            speed={2.5}
                            color="black"
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Loader;