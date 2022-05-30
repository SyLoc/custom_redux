import React , { useEffect, useState } from 'react'
import axios from 'axios'
import { Steps } from 'antd'
import Component1 from "./components/import1"
import Component2 from "./components/import2"
import Component3 from "./components/import3"



const { Step } = Steps

const ImportFoods: React.FC<any> = (props) => { 
    const [step, setStep] = useState(0)
    const [imageFile, setImageFile] = useState("")

    // useEffect(() => {
    //     const getImage = () => {
    //         axios.get('http://localhost:5000/v1/image/1653548011405.png')
    //             .then((res) => console.log("res", res))
    //     }

    //     getImage()
          
    // }, [])

    const uploadImage = async () => {
        axios({
            method: 'POST',
            url: 'http://localhost:5000/v1/image/upload',
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            },
            data: {
              file: imageFile
            }
          });
    }

    const handleSubmit = (e: any) => {
        e.preventDefault()
        // const formData = new FormData()
        // formData.append("file", imageFile)
        axios.post("http://localhost:5000/v1/image/upload", imageFile)
        .then((res) => console.log("red", res))

    }

    const showFile = (e:any) => {
        e.preventDefault();
        setImageFile(e.target.files[0])
        // const reader = new FileReader();
        // reader.onload = (e) => {
        //   const image = e.target.result;
        //   console.log(image);
        // };
        // reader.readAsText(e.target.files[0]);
        console.log("reader", e.target.files[0]);
      };

    return (
        <div style={{marginTop:"50px", maxWidth:"1200px"}}>

        {/* <Button type="primary">Primary Button</Button> */}

        <Steps current={step} percent={60}>
            <Step title="Task 1" description="" />
            <Step title="Task 2" subTitle="" description="" />
            <Step title="Task 3" description="" />
        </Steps>

        {/* <img src="http://localhost:5000/v1/image/1653548011405.png" alt="" /> */}

        <form onSubmit={handleSubmit}>
            <h2>upload image</h2>
            <input type="file" name='upload_image' onChange={showFile} />
            <button>submit</button>
        </form>

        <button type='button' onClick={() => setStep((st) => st <= 0 ? 0 : st - 1)}>back</button>
        <button type='button' onClick={() => setStep((st) => st >= 2 ? 0 : st + 1)}>next</button>


        {
            step === 0 && <Component1 />
        }
        {
            step === 1 && <Component2 />
        }
        {
            step === 2 && <Component3 />
        }



        </div>
    )
}


export default ImportFoods