import React, { useRef, useState, useEffect } from "react";
import SearchIcon from "../../images/icons/search.svg"
import "./style.scss"

const SearchBar: React.FC<any> = (props) => {
    const { onSubmit } = props
    const [display, setDisplay] = useState(false)
    const refInput = useRef<HTMLInputElement>(null)
    const [value1, setValue] = useState('')
   

    const handleDisplay = () => {
        if(!value1) {
            setDisplay(!display)
        }
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()

        const refInputValue = refInput.current!.value
        
        if(refInputValue.trim().length === 0){
            console.log("chay vao day", refInputValue);
            return
        }
        
        onSubmit(refInputValue)
    }

    useEffect(() => {
        if (display) {
            refInput.current?.focus()
        }
    }, [display])

    return (
        <form className="search-bar" onSubmit={handleSubmit}>
            {
                display 
                ? (<input 
                    className="input-field" 
                    // onChange={(e:any) => setValue(e.target.value)} 
                    ref={refInput} type="text" 
                    onBlur={handleDisplay} />) 
                : <img className="search-icon" onClick={handleDisplay} src={SearchIcon} alt="" />
            }
        </form>
    )
}

export default SearchBar;