import React, { useState } from "react";
import { useAuthContext } from '../../../../contexts/useAuthContext'

const Import2: React.FC<any> = (props) => {
    const { cp2, onDispatchAuth } = useAuthContext();
    const [vl, setVl] = useState<string>(cp2)

    const handleSubmit = (e:any) => {
        e.preventDefault()

        onDispatchAuth({type: "update-cp2", payload: vl})
        setVl("")
    }

    return (
        <>
            <h2>enter value 2</h2>
            <form onSubmit={handleSubmit}>
            <input value={vl} onChange={(e:any) => setVl(e.target.value)} type="text" />
                <button>submit</button>
            </form>
        </>
    )
}

export default Import2