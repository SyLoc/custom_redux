import React, { useState } from "react";
import { useAuthContext } from '../../../../contexts/useAuthContext'

const Import3: React.FC<any> = (props) => {
    const { cp3, onDispatchAuth } = useAuthContext();
    const [vl, setVl] = useState<string>(cp3)

    const handleSubmit = (e:any) => {
        e.preventDefault()

        onDispatchAuth({type: "update-cp3", payload: vl})
        setVl("")
    }

    return (
        <>
            <h2>enter value 3</h2>
            <form onSubmit={handleSubmit}>
            <input value={vl} onChange={(e:any) => setVl(e.target.value)} type="text" />
                <button>submit</button>
            </form>
        </>
    )
}

export default Import3