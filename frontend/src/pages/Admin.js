import { useState, useEffect } from "react"
import LoadingButton from "../components/LoadingButton"
import axios from "axios";
import Spinner from "../components/Spinner";

export default function Admin() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isDone, setIsDone] = useState(false)
    const [isError, setIsError] = useState('');

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin`, {})
                setData(response.data)
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
                window.location.href = '/error'
            }
        })()
    }, [])

    async function handleSubmit(event) {
        event.preventDefault();

        for (let page of data)
            if (page.components.length === 0) {
                setIsError('Need at least one on each page')
                return;
            }

        try {
            setIsSubmitting(true)
            await axios.put(`${process.env.REACT_APP_API_URL}/admin`, data)
            setIsError('')
            setIsDone(true)
            setIsSubmitting(false)
        } catch (err) {
            setIsSubmitting(false)
            if (err.response.statusCode === 413)
                setIsError(err.response.data)
            else
                window.location.href = '/error'
        }
    }

    function getPageIdForComponent(component) {
        const found = data.find(d => d.components.includes(component))
        return found ? found.id : null
    }

    function handleCheckboxChange(pageId, componentKey) {
        setData(prev =>
            prev.map(page => {
                if (page.id === pageId) {
                    const hasComponent = page.components.includes(componentKey)
                    const newComponents = hasComponent
                        ? page.components.filter(c => c !== componentKey)
                        : [...page.components, componentKey]

                    return { ...page, components: newComponents }
                }
                return page
            })
        )
    }

    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <div className="w-1/4 p-6">
            <p className="mb-3 text-3xl">Admin</p>

            {isLoading ? <div className="flex flex-col justify-center items-center">
                <Spinner />
                <p className="mt-2">Your data will be here shortly</p>
            </div> : <div className="grid grid-cols-2 gap-4 mb-3">
                {data.map((elem) => (
                    <div key={elem.id} className="w-full bg-white border border-gray-200 rounded-lg shadow-sm p-6">
                        <p className="mb-3">Page {elem.page}</p>

                        {['aboutMe', 'address', 'birthdate'].map((component) => {
                            const checkboxId = `${elem.id}-${component}`
                            const isChecked = elem.components.includes(component)
                            const pageThatOwnsComponent = getPageIdForComponent(component)
                            const isDisabled = pageThatOwnsComponent !== null && pageThatOwnsComponent !== elem.id

                            return (
                                <div key={component} className="flex items-center mb-4">
                                    <input
                                        id={checkboxId}
                                        type="checkbox"
                                        checked={isChecked}
                                        disabled={isDisabled}
                                        onChange={() => handleCheckboxChange(elem.id, component)}
                                        className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded-sm focus:ring-blue-500 focus:ring-2 disabled:opacity-50 disabled:cursor-not-allowed"
                                    />
                                    <label
                                        htmlFor={checkboxId}
                                        className={`ms-2 text-sm font-medium ${isDisabled ? 'text-gray-400' : 'text-gray-900'
                                            }`}
                                    >
                                        {component.charAt(0).toUpperCase() + component.slice(1)} input
                                    </label>
                                </div>
                            )
                        })}
                    </div>
                ))}
            </div>}

            <LoadingButton label={'Save'} loading={isSubmitting} />
            {isError !== '' && <p className="mt-3 text-red-600">{isError}</p>}
            {isDone && <p className="mt-3 text-green-500">The data is updated</p>}
        </div>
    </div>
}