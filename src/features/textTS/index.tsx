import React from "react"
import SearchBar from "../movies/components/searchBar";

const TestTS: React.FC<any> = (props) => {

    let arr: string[];
    let object: {
        name: string,
        age: 20 | 21
    }[]

    // object = {
    //     name: "john",
    //     age: 21
    // }

    object=[{name: "ehma", age:20},{name: "rocy", age:21}]

    arr = ["1223", "abc"]

    return (
        <div style={{background:"#333"}}>
            <SearchBar onSubmit={(value: string) => console.log("value", value)}/>
            <h1>test ts</h1>
        </div>
    )
}

export default TestTS;