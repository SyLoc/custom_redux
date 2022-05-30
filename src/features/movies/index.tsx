import React from "react";
import Header from "./components/header";
import SearchBar from "./components/searchBar";
import SideBar from "./components/sideBar";
import "./style.scss"
import { Row, Col } from 'antd';
import BgImage from "./images/bg.png" 
import FooterImage from "./images/footer-img.png" 

const Movies:React.FC<any> = () => {

    return (
        <div className="main home">
            <div className="home-sidebar">
                <SideBar/>
            </div>
            <div className="home-main">
                <Row className="main-header">
                    <Col span={10}/>
                    <Col span={10}>
                        <Header/>
                    </Col>
                    <Col span={4} className="main-header__search">
                        <SearchBar/>
                    </Col>
                </Row>
                <div className="main-body">
                    <img src={BgImage} className="body-bg" alt="" />
                    <div className="body-content">
                        <div className="body-designer">
                            <h3>/ 01</h3>
                            <div className="progress-line">
                                <div className="progress-percent" style={{width: "160px"}}></div>
                            </div>
                            <h4>Designer by</h4>
                            <p className="text-gray">Thanh Dat</p>
                            <p className="text-gray">Datmagic</p>
                        </div>
                        <div className="body-title">
                            <h1>Black Pather 2</h1>
                            <p>King T'Challa returns home to the reclusive, 
                                technologically advanced African nation of <span>Wakanda to serve as his country's new leader.</span></p>
                        </div>
                    </div>
                </div>
                <Row className="main-footer">
                    <Col span={6}>
                        <h3>EVENTS</h3>
                        <div className="footer-information">
                            <p className="text-gray">
                                dat.nguyen@gmail.com.vn
                            </p>
                            <h4>SF - Sat, May 26 / 5 - 8PM</h4>
                        </div>
                    </Col>
                    <Col span={6}>
                        <h3>EVENTS</h3>
                        <div className="footer-information">
                            <p className="text-gray">
                                dat.nguyen@gmail.com.vn
                            </p>
                            <h4>SF - Sat, May 26 / 5 - 6PM</h4>
                        </div>
                    </Col>
                    <Col span={6}>
                        <img className="footer-img" src={FooterImage} alt="" />
                    </Col>
                    <Col span={6}>
                        <h3>NEWS</h3>
                        <div className="footer-information">
                            <p className="text-gray">
                                T'Challa, heir to the hidden but advanced kingdom of Wakanda, must step forward to...
                                <span>Read more</span>
                            </p>
                        </div>
                    </Col>
                </Row>
            </div>
        </div>
    )
}

export default Movies;