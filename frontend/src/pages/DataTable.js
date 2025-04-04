import { useState, useEffect } from "react"
import axios from "axios";
import Spinner from "../components/Spinner";

export default function DataTable() {
    const [data, setData] = useState([]);
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        (async () => {
            try {
                setIsLoading(true)
                const response = await axios.get(`${process.env.REACT_APP_API_URL}/users`, {})
                setData(response.data)
                setIsLoading(false)
            } catch (err) {
                setIsLoading(false)
                window.location.href = '/error'
            }
        })()
    }, [])

    return <div className="p-6">
        <p className="mb-3 text-3xl">Data Table</p>

        <div class="w-full bg-white border border-gray-200 rounded-lg shadow-sm">
            <div className="relative overflow-x-auto">
                <table className="w-full text-sm text-left rtl:text-right text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                        <tr>
                            <th scope="col" className="px-6 py-3">
                                Email
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Password
                            </th>
                            <th scope="col" className="px-6 py-3">
                                About Me
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Addresse
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Birthdate
                            </th>
                            <th scope="col" className="px-6 py-3">
                                Created At
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {isLoading && <tr className="bg-white border-b">
                            <th colSpan={6} scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                <div className="flex flex-col justify-center items-center">
                                    <Spinner />
                                    <p className="mt-2">Your data will be here shortly</p>
                                </div>
                            </th>
                        </tr>}
                        {data.map((user) => <tr key={user.id} className="bg-white border-b">
                            <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.email}
                            </th>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.password}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.aboutMe}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {`${user.street}, ${user.city} ${user.state} ${user.zip}`}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.birthdate}
                            </td>
                            <td className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                                {user.createdAt}
                            </td>
                        </tr>)}

                    </tbody>
                </table>
            </div>
        </div>
    </div>
}