
import React, { ReactNode, useState, useEffect } from "react";
import { FaFacebookF,FaLinkedinIn,FaInstagram,FaTwitter } from "react-icons/fa"

const icons = [<FaFacebookF/>, <FaLinkedinIn/>, <FaInstagram/>, <FaTwitter/>]

const SocialIcon: React.FC<any> = (props) => {
    const { type, url, styleIcon } = props
    const [icon, setIcon] = useState<ReactNode>(null)

    useEffect(() => {
        switch (type) {
            case "facebook":
                setIcon(icons[0])
                break;
            case "linkedin":
                setIcon(icons[1])
                break;
            case "instagram":
                setIcon(icons[2])
                break;
            case "twitter":
                setIcon(icons[3])
                break;
            default:
                setIcon(icons[0])
                break;
        }
    }, [type])

    return (
        <a href={url} className="social-icon" style={styleIcon}>
            {
                icon
            }
        </a>
    )
}

export default SocialIcon;