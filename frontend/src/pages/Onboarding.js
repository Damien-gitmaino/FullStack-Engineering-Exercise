import React, { useState, useEffect } from "react"
import StaticForm from "../components/StaticForm";
import DoneIcon from "../components/icons/DoneIcon";
import DynamicForm from "../components/DynamicForm";
import Spinner from "../components/Spinner";
import axios from "axios";

export default function Onboarding() {
    const [data, setData] = useState([])
    const [isLoading, setIsLoading] = useState(false);
    const [page, setPage] = useState(0);
    const [inputs, setInputs] = useState({
        email: '',
        password: '',
        aboutMe: '',
        street: '',
        city: '',
        state: '',
        zip: '',
        birthdate: null
    })

    const [isDone, setIsDone] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/admin`, {})
                setData(response.data)
                setPage(1)
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
                window.location.href = '/error'
            }
        })()
    }, [])

    async function handleSubmitData(data) {
        setInputs({ ...data })

        if (page >= data.length) {
            try {
                setIsSubmitting(true)
                await axios.post(`${process.env.REACT_APP_API_URL}/register`, data)
                setIsDone(true)
                setIsSubmitting(false)
            } catch (err) {
                setIsSubmitting(false)
                window.location.href = '/error'
            }
        } else
            setPage(prevState => prevState + 1)
    }

    function handlePrevious() {
        setPage(prevState => prevState - 1)
    }

    return <div className="min-h-screen flex items-center justify-center bg-gray-100">
        {!isDone ? <div className="w-1/4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm">
            <ol className="flex items-center w-full text-sm font-medium text-center text-gray-500 sm:text-base mb-10">
                <li className={`flex md:w-full items-center ${page >= 1 ? 'text-blue-600' : ''} sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {page > 1 && <DoneIcon />}
                        Page <span class="hidden sm:inline-flex sm:ms-2">1</span>
                    </span>
                </li>
                {data.map((elem) => <li key={elem.id} className={`flex md:w-full items-center after:content-[''] ${page >= elem.page ? 'text-blue-600' : ''} after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10`}>
                    <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200">
                        {page > elem.page && <DoneIcon />}
                        Page <span class="hidden sm:inline-flex sm:ms-2">{elem.page}</span>
                    </span>
                </li>)}
            </ol>

            {isLoading && <div className="flex flex-col justify-center items-center">
                <Spinner />
                <p className="mt-2">Your form will be here shortly</p>
            </div>}

            {page === 1 && <StaticForm data={inputs} handleChange={handleSubmitData} />}
            {data.map((elem, index) => {
                if (page !== elem.page)
                    return <></>
                return <DynamicForm data={inputs} handleChange={handleSubmitData} components={elem.components} isNextPage={index + 1 !== data.length} isSubmitting={isSubmitting} handlePrevious={handlePrevious} />
            })}

        </div> : <div className="w-1/4 p-6 bg-white border border-gray-200 rounded-lg shadow-sm text-center">
            <p className="mb-3">User with the email ({inputs.email}) is succefuly register</p>
            <button type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center"
                onClick={() => window.location.reload()}
            >Return to the main page</button>
        </div>}
    </div>
}