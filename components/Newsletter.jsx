import { useState } from "react"
import axios from "axios"
import { FormattedMessage } from "react-intl"


export default function Newsletters()  {
    const [email, setEmail] = useState("")
    const [state, setState] = useState("IDLE")
    const [errorMessage, setErrorMessage] = useState(null)

    const subscribe = async () => {
        setState("LOADING")
        setErrorMessage(null)
        try {
            const response = await axios.post("/api/newsletter", { email })
            setState("SUCCESS")
        } catch (e) {
            setErrorMessage(e.response.data.error)
            setState("ERROR")
        }
    }

    return (
        <div className="flex flex-col items-center w-full">

            <p className="text-xl text-center">
                <FormattedMessage
                    id='app.text3'
                    defaultMessage='JOIN OUR WHITELIST'
                />
            </p>
            <div className="flex w-2/2 lg:w-3/12 justify-center mt-2 flex-col lg:flex-row">
                <input
                    className="appearance-none mb-2 lg:mb-0 w-full lg:w-2/3 border border-[#7098b7] rounded py-1 px-4 text-gray-700 leading-tight focus:outline-none focus:border-gray-600 "
                    type="text"
                    placeholder="Enter Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
                <button
                    className={`lg:ml-2 w-full lg:w-1/3 shadow bg-brand2  text-center text-white font-bold  rounded  bg-[#7098b7] hover:text-[#EFEDA5]${state === "LOADING" ? "button-gradient-loading" : ""
                        }`}
                    type="button"
                    disabled={state === "LOADING"}
                    onClick={subscribe}
                >
                    <FormattedMessage
                        id='app.button'
                        defaultMessage='To Subcribe'
                    />
                </button>
            </div>
            <div className="text-center flex justify-center">
                {state === "ERROR" && <p className=" mt-2 text-red-600">{errorMessage}</p>}
                {state === "SUCCESS" && <p className="w-1/2 mt-2 text-green-600">Success!</p>}
            </div>
        </div>
    )
}
