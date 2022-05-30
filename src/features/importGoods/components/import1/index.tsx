import React, { useEffect, useState } from "react";
import { useAuthContext } from '../../../../contexts/useAuthContext'


const Import1: React.FC<any> = (props) => {
    const { cp1, onDispatchAuth } = useAuthContext();
    const [vl, setVl] = useState<string>(cp1)

    const handleSubmit = (e:any) => {
        e.preventDefault()

        onDispatchAuth({type: "update-cp1", payload: vl})
        setVl("")
    }


    return (
        <>
            <h2>enter value 1</h2>
            <form onSubmit={handleSubmit}>
            <input value={vl} onChange={(e:any) => setVl(e.target.value)} type="text" />
                <button>submit</button>
            </form>
        </>
    )
}

export default Import1