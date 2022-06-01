import React from "react"
import SearchBar from "../movies/components/searchBar";
import Steps from "../steps";

const steps = [
    {
        id: 1,
        title: "step 1",
        subtitle: "",
        active: true
    },
    {
        id: 2,
        title: "step 2",
        subtitle: "description 2",
        active: true
    },
    {
        id: 3,
        title: "step 3",
        subtitle: "",
        active: false
    },
    {
        id: 4,
        title: "step 4",
        subtitle: "",
        active: false
    },
    {
        id: 5,
        title: "step 5",
        subtitle: "",
        active: false
    }
]

const TestTS: React.FC<any> = (props) => {

    // let arr: string[];
    // let object: {
    //     name: string,
    //     age: 20 | 21
    // }[]

    // object = {
    //     name: "john",
    //     age: 21
    // }

    // object=[{name: "ehma", age:20},{name: "rocy", age:21}]

    // arr = ["1223", "abc"]

    return (
        <div>
            <SearchBar onSubmit={(value: string) => console.log("value", value)}/>
            <h1>test ts</h1>

            <div style={{maxWidth:"900px"}}>
            <Steps stepsDefault={steps} onStepActive={(item: any) => console.log("item", item)}/>
            </div>
        </div>
    )
}

export default TestTS;