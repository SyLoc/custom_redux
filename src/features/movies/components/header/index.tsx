import React from "react";
import "./style.scss"
import { NavLink } from "react-router-dom";

const Header:React.FC<any> = () => {


    const navLinkClass = (props: any) => {
        const { isActive } = props

        return isActive ? "is-active" : ""
    }


    return (
        <div className="header">
            <ul className="nav-list">
                <li>
                    <NavLink className={navLinkClass} to="/">Home</NavLink>
                </li>
                <li>
                    <NavLink className={navLinkClass} to="/products">Products</NavLink>
                </li>
                <li>
                    <NavLink className={navLinkClass} to="/about">About</NavLink>
                </li>
                <li>
                    <NavLink className={navLinkClass} to="/location">Location</NavLink>
                </li>
                <li>
                    <NavLink className={navLinkClass} to="/cart">Cart</NavLink>
                </li>
            </ul>
        </div>
    )
}

export default Header;