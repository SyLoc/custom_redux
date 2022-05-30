import React, { useState } from "react";
import { data } from "./data";
import ReactPlayer from 'react-player'
import "./style.scss"
import { FaPlay } from 'react-icons/fa'
import SocialIcon from "../../components/SocialIcon";

const style = {
    // border: "1px solid #f2f2f2",
    marginTop: "100px",
    boxShadow: "0 0 2px rgba(0,0,0,0.2)",
    margin: "50px 0"
}

const Tiktok: React.FC<any> = () => {
    const [isPlay, setIsPlay] = useState(false)

    const onReview = () => {
        console.log("onreview");
    }


    return (
        <div style={{ maxWidth: "800px", margin: "100px" }} className="video-tiktok">
            

        <SocialIcon url="https://facebook.com" type="facebook"/>
        <SocialIcon url="https://facebook.com" type="linkedin"/>
        <SocialIcon url="https://facebook.com" type="instagram"/>
        <SocialIcon url="https://facebook.com" type="twitter"/>


            {/* <div className="wrap-video">
                <ReactPlayer
                    width="100%"
                    height="100%"
                    url="https://v16-webapp.tiktok.com/37f23b0a9d3364de46a116b044fcd7ed/628c9e77/video/tos/useast2a/tos-useast2a-pve-0037-aiso/3def5761fa2044cb944c6631cd13f855/?a=1988&ch=0&cr=0&dr=0&lr=tiktok&cd=0%7C0%7C1%7C0&cv=1&br=3482&bt=1741&cs=0&ds=3&ft=eXd.6Hk_Myq8ZpAdTwe2NKfQml7Gb&mime_type=video_mp4&qs=0&rc=ZmZnOzZmZTo6OjY3PGRkOEBpamRuNGQ6ZjZuOzMzZjgzM0BfNS8vYTQzX2IxYDBiL2MxYSMvMWJvcjRfM2tgLS1kL2Nzcw%3D%3D&l=20220524025906010244055220228F44C3"
                    controls
                    progressInterval={10}
                    light
                    showPreview={onReview}
                />
            </div> */}
        </div>
    );
};

export default Tiktok;
