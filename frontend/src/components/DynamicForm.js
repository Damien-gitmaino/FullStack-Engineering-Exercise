import React, { useState } from "react"
import LoadingButton from "./LoadingButton"

export function AboutMeInput({ value, handleChange }) {
    return (
        <div className="mb-3">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900">About me</label>
            <textarea
                required
                id="aboutMe"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="About Me"
                value={value.aboutMe}
                onChange={(event) => handleChange(event, "aboutMe")}
            />
        </div>
    );
}

export function AddressInput({ value, handleChange }) {
    return (
        <div className="mb-3">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Address</label>
            <input
                required
                name="street"
                placeholder="Street"
                value={value.street}
                onChange={(event) => handleChange(event, "street")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            />
            <input
                required
                name="city"
                placeholder="City"
                value={value.city}
                onChange={(event) => handleChange(event, "city")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            />
            <input
                required
                name="state"
                placeholder="State"
                value={value.state}
                onChange={(event) => handleChange(event, "state")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 mb-2"
            />
            <input
                required
                name="zip"
                placeholder="Zip"
                value={value.zip}
                onChange={(event) => handleChange(event, "zip")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
        </div>
    );
}

export function BirthdateInput({ value, handleChange }) {
    return (
        <div className="mb-3">
            <label for="email" className="block mb-2 text-sm font-medium text-gray-900">Birthdate</label>
            <input
                name="birthdate"
                required
                type="date"
                value={value.birthdate}
                onChange={(event) => handleChange(event, "birthdate")}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            />
        </div>
    );
}

const dynamicInput = {
    aboutMe: AboutMeInput,
    address: AddressInput,
    birthdate: BirthdateInput,
};

export default function DynamicForm({ data, handleChange, components, isNextPage, isSubmitting, handlePrevious }) {
    const [value, setValue] = useState(data);

    const handleSubmit = (event) => {
        event.preventDefault();
        handleChange(value);
    };

    const onChange = (event, key) => {
        setValue((prev) => ({
            ...prev,
            [key]: event.target.value,
        }));
    };

    return (
        <form className="max-w-sm mx-auto flex flex-col gap-4" onSubmit={handleSubmit}>
            {components.map((key) => {
                const Component = dynamicInput[key];
                return Component ? (
                    <Component
                        key={key}
                        value={value}
                        handleChange={onChange}
                    />
                ) : null;
            })}

            <div className="flex justify-end gap-4">
                <button onClick={() => handlePrevious()} type='button' className="text-gray-900 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-2">
                    Previous
                </button>
                <LoadingButton
                    type="submit"
                    label={isNextPage ? "Next page" : "Submitting"}
                    loading={isSubmitting}
                />
            </div>
        </form>
    );
}