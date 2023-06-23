import Script from "next/script";
import React from "react";

const FooterComponent = () => {
    return (
        <>
            <button id="btnScrollTop" title="Go to top" style={{display: "inline-block;"}}><i
                className="fas fa-chevron-up"></i></button>
            <a className="btn-phone" href="tel:713-999-4470" rel="nofollow">
                <div className="phone-group phone-green phone-show">
                    <div className="phone-ph-circle"></div>
                    <div className="phone-ph-circle-fill"></div>
                    <div className="phone-ph-img-circle"></div>
                </div>
            </a>
        <footer id="footer" className="footer">
            <div className="footer-main">
                <div className="container-lg">
                    <div className="row gy-5 gx-3 g-lg-4">
                        <div className="col-md-4 col-xl-2">
                            <h3 className="footer-col-title">Links</h3>
                            <div className="footer-col-content">
                                <a href="https://w20.wocmarketing.com/services"><p>Our Services</p></a>
                                <a href="https://w20.wocmarketing.com/gallery"><p>Gallery</p></a>
                                <a href="https://w20.wocmarketing.com/about-us"><p>About Us</p></a>
                                <a href="https://w20.wocmarketing.com/contact"><p>Contact</p></a>
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-3">
                            <h3 className="footer-col-title">Operation hours</h3>
                            <div className="footer-col-content">
                                <p>Mon-Sat: 10:00AM-7:00PM </p>
                                <p> Sunday: Closed</p>
                            </div>
                        </div>
                        <div className="col-md-4 col-xl-4">
                            <h3 className="footer-col-title">Contact</h3>
                            <div className="footer-col-content">
                                <p><i className="fa-solid fa-location-dot me-2"></i>
                                    Street Name 10, Building 45, 1234 AB Oslo </p>
                                <p><i className="fa-solid fa-phone me-2"></i>
                                    <a href="tel:713-999-4470">
                                        713-999-4470 </a>
                                </p>
                                <p><i className="fa-solid fa-envelope me-2"></i>
                                    <a href="mailto:cs@wocprint.com">
                                        cs@wocprint.com </a>
                                </p>
                                <ul className="list-social">
                                    <li><a target="_blank" href="#"><i className="fa-brands fa-facebook"></i></a></li>

                                    <li><a target="_blank" href="#"><i className="fa-brands fa-instagram"></i></a></li>

                                    <li><a target="_blank" href="#"><i className="fa-brands fa-yelp"></i></a></li>

                                    <li><a target="_blank" href="#"><i className="fa-brands fa-google"></i></a></li>
                                </ul>
                            </div>
                        </div>
                        <div className="col-xl-3 order-md-1">
                            <iframe
                                src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d6656.390733666901!2d-112.122804!3d33.470264!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b13991b9f1f33%3A0x59ea72d6ec048e5e!2s2923%20W%20Holly%20St%2C%20Phoenix%2C%20AZ%2085009!5e0!3m2!1sen!2sus!4v1684460750885!5m2!1sen!2sus"
                                width="100%" height="300" style={{border:"0"}} allowFullScreen="" loading="lazy"
                                referrerPolicy="no-referrer-when-downgrade"></iframe>
                        </div>
                    </div>
                </div>
            </div>
            <div className="footer-absolute">
                <div className="container-lg">
                    <div className="row">
                        <div className="col-lg-12">
                            <div className="text-center py-2 fs-6">
                                <span className="d-block">© 2023 <strong>WOC Print</strong></span>
                                <span className="small d-block">Designed by
                                    <a target="_blank"
                                       href="https://wocprint.com/">
                                        <strong>WOC PRINT &amp; WEB DESIGN</strong>
                                    </a>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
        </>
    )
}

export default FooterComponent