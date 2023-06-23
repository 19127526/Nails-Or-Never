import MainLayout from "@/components/layout/main";

const Test = () => {
    return (
        <>
        <section className="section-wrap section-banner">
            <div className="banner-slider flickity-enabled is-draggable" tabIndex="0">
                <div className="flickity-viewport" style={{height: "745px", touchAction: "pan-y"}}>
                    <div className="flickity-slider" style={{left: "0px", transform: "translateX(-200%)"}}>
                        <div className="banner-item" style={{position: "absolute", left: "0px", transform: "translateX(300%)"}}
                             aria-hidden="true">
                            <div className="banner-content">
                                <div className="container-lg">
                                    <div className="row justify-content-center align-items-center gx-5">
                                        <div className="col-lg-6 order-2 order-lg-1 text-center text-lg-start">
                                            <h2 className="banner-title">Eyebrows Permanent Makeup</h2>
                                            <div className="banner-img-group mb-4 mb-sm-5">
                                                <div className="row justify-content-center g-3">
                                                    <div className="col-4 col-lg-4">
                                                        <div className="ratio ratio-16x9">
                                                            <div>
                                                                <img
                                                                    src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/eyebrows-1.jpg"
                                                                    loading="lazy"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4 col-lg-4">
                                                        <div className="ratio ratio-16x9">
                                                            <div>
                                                                <img
                                                                    src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/eyebrows-2.jpg"
                                                                    loading="lazy"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4 col-lg-4">
                                                        <div className="ratio ratio-16x9">
                                                            <div>
                                                                <img
                                                                    src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/eyebrows-3.jpg"
                                                                    loading="lazy"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="banner-link"
                                               href="https://w20.wocmarketing.com/services/#eyebrows-permanent-makeup">View
                                                more<i className="fa-solid fa-arrow-right ms-2"></i></a>
                                        </div>
                                        <div className="col-12 col-sm-8 col-md-6 col-lg-6 order-1 order-lg-2">
                                            <div className="ratio ratio-1x1">
                                                <div className="banner-img-wrap">
                                                    <div className="banner-img-border">
                                                        <div className="banner-img">
                                                            <img
                                                                src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/banner-img-1.jpg"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="banner-item" style={{position: "absolute", left: "0px", transform: "translateX(100%)"}}
                             aria-hidden="true">
                            <div className="banner-content">
                                <div className="container-lg">
                                    <div className="row justify-content-center align-items-center gx-5">
                                        <div className="col-lg-6 order-2 order-lg-1 text-center text-lg-start">
                                            <h2 className="banner-title">Full Set of Lashes</h2>
                                            <div className="banner-img-group mb-4 mb-sm-5">
                                                <div className="row justify-content-center g-3">
                                                    <div className="col-4 col-lg-4">
                                                        <div className="ratio ratio-16x9">
                                                            <div>
                                                                <img
                                                                    src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/lashes-1.jpg"
                                                                    loading="lazy"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4 col-lg-4">
                                                        <div className="ratio ratio-16x9">
                                                            <div>
                                                                <img
                                                                    src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/lashes-2.jpg"
                                                                    loading="lazy"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4 col-lg-4">
                                                        <div className="ratio ratio-16x9">
                                                            <div>
                                                                <img
                                                                    src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/lashes-3.jpg"
                                                                    loading="lazy"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="banner-link"
                                               href="https://w20.wocmarketing.com/services/#fullset-of-lashes">View more<i
                                                className="fa-solid fa-arrow-right ms-2"></i></a>
                                        </div>
                                        <div className="col-12 col-sm-8 col-md-6 col-lg-6 order-1 order-lg-2">
                                            <div className="ratio ratio-1x1">
                                                <div className="banner-img-wrap">
                                                    <div className="banner-img-border">
                                                        <div className="banner-img">
                                                            <img src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/banner-img-2.jpg"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div className="banner-item is-selected"
                             style={{position: "absolute", left: "0px", transform: "translateX(200%)"}}>
                            <div className="banner-content">
                                <div className="container-lg">
                                    <div className="row justify-content-center align-items-center gx-5">
                                        <div className="col-lg-6 order-2 order-lg-1 text-center text-lg-start">
                                            <h2 className="banner-title">Nails Enhancement</h2>
                                            <div className="banner-img-group mb-4 mb-sm-5">
                                                <div className="row justify-content-center g-3">
                                                    <div className="col-4 col-lg-4">
                                                        <div className="ratio ratio-16x9">
                                                            <div>
                                                                <img
                                                                    src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/acrylic-1.jpg"
                                                                    loading="lazy"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4 col-lg-4">
                                                        <div className="ratio ratio-16x9">
                                                            <div>
                                                                <img
                                                                    src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/acrylic-2.jpg"
                                                                    loading="lazy"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div className="col-4 col-lg-4">
                                                        <div className="ratio ratio-16x9">
                                                            <div>
                                                                <img
                                                                    src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/acrylic-3.jpg"
                                                                    loading="lazy"/>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                            <a className="banner-link"
                                               href="https://w20.wocmarketing.com/services/#nails-enhancement">View more<i
                                                className="fa-solid fa-arrow-right ms-2"></i></a>
                                        </div>
                                        <div className="col-12 col-sm-8 col-md-6 col-lg-6 order-1 order-lg-2">
                                            <div className="ratio ratio-1x1">
                                                <div className="banner-img-wrap">
                                                    <div className="banner-img-border">
                                                        <div className="banner-img">
                                                            <img
                                                                src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/banner-img-3.jpg"/>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <button className="flickity-button flickity-prev-next-button previous" type="button"
                        aria-label="Previous">
                    <svg className="flickity-button-icon" viewBox="0 0 100 100">
                        <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow"></path>
                    </svg>
                </button>
                <button className="flickity-button flickity-prev-next-button next" type="button" aria-label="Next">
                    <svg className="flickity-button-icon" viewBox="0 0 100 100">
                        <path d="M 10,50 L 60,100 L 70,90 L 30,50  L 70,10 L 60,0 Z" className="arrow"
                              transform="translate(100, 100) rotate(180) "></path>
                    </svg>
                </button>
            </div>
        </section>
        <section className="section-wrap section-about">
            <div className="container-lg">
                <div className="row justify-content-center align-items-center gy-5 gx-3 g-lg-5">
                    <div className="col-sm-9 col-md-8 col-lg-6">
                        <img className="img-fluid"
                             src="https://w20.wocmarketing.com/wp-content/themes/woctheme/assets/images/model-1.png"
                             loading="lazy"/>
                    </div>
                    <div className="col-lg-6">
                        <h3 className="sub-title fs-80">About us</h3>
                        <h2 className="title text-uppercase">Why Clients Choose Us</h2>
                        <p className="mb-3">At <strong>WOC Print</strong>, we have many years of experience in the
                            nail industry. Renowned for its friendly, unpretentious staff, esthetically pleasing and
                            soothing atmosphere and more notable for its qualified and certified professionals. You
                            will feel the difference the minute you walk through our door. </p>
                        <p>Our ultimate goal is to treat every customer with first class service. From our
                            specialized treatments and state of the art equipment, to the small touches that will
                            enhance your overall experience – we are confident that you leave feeling pampered,
                            satisfied and looking fantastic.</p>
                        <a href="https://w20.wocmarketing.com/about-us">
                            <button className="button button-lg mt-5">Read more</button>
                        </a>
                    </div>
                </div>
            </div>
        </section>
        <section className="section-wrap section-services">
            <div className="container-lg">
                <div className="heading-flex mb-4">
                    <h2 className="title text-uppercase">Services for<br/>the best clients</h2>
                    <h3 className="sub-title">Our services</h3>
                </div>
                <div className="row justify-content-center gy-4 gx-3 gx-sm-4 g-lg-5">
                    <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                        <div className="service-item">
                            <a className="service-img-link"
                               href="https://w20.wocmarketing.com/services/#eyebrows-permanent-makeup">
                                <div className="service-img-wrap">
                                    <div className="service-img">
                                        <img
                                            src="https://w20.wocmarketing.com/wp-content/themes/woctheme/gos-cms/uploads/3ead9fdf8cc.jpg"
                                            alt="Eyebrows Permanent Makeup"/>
                                    </div>
                                </div>
                            </a>
                            <a className="service-link"
                               href="https://w20.wocmarketing.com/services/#eyebrows-permanent-makeup">
                                <h4 className="service-title">Eyebrows Permanent Makeup</h4>
                            </a>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                        <div className="service-item">
                            <a className="service-img-link"
                               href="https://w20.wocmarketing.com/services/#lips-blush">
                                <div className="service-img-wrap">
                                    <div className="service-img">
                                        <img
                                            src="https://w20.wocmarketing.com/wp-content/themes/woctheme/gos-cms/uploads/311736666.jpg"
                                            alt="Lips Blush"/>
                                    </div>
                                </div>
                            </a>
                            <a className="service-link" href="https://w20.wocmarketing.com/services/#lips-blush">
                                <h4 className="service-title">Lips Blush</h4>
                            </a>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                        <div className="service-item">
                            <a className="service-img-link"
                               href="https://w20.wocmarketing.com/services/#all-other-brows-lips-services">
                                <div className="service-img-wrap">
                                    <div className="service-img">
                                        <img
                                            src="https://w20.wocmarketing.com/wp-content/themes/woctheme/gos-cms/uploads/232478806.jpg"
                                            alt="All Other Brows/Lips Services"/>
                                    </div>
                                </div>
                            </a>
                            <a className="service-link"
                               href="https://w20.wocmarketing.com/services/#all-other-brows-lips-services">
                                <h4 className="service-title">All Other Brows/Lips Services</h4>
                            </a>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                        <div className="service-item">
                            <a className="service-img-link"
                               href="https://w20.wocmarketing.com/services/#full-set-of-lashes">
                                <div className="service-img-wrap">
                                    <div className="service-img">
                                        <img
                                            src="https://w20.wocmarketing.com/wp-content/themes/woctheme/gos-cms/uploads/9d6743f7.jpg"
                                            alt="Full Set of Lashes"/>
                                    </div>
                                </div>
                            </a>
                            <a className="service-link"
                               href="https://w20.wocmarketing.com/services/#full-set-of-lashes">
                                <h4 className="service-title">Full Set of Lashes</h4>
                            </a>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                        <div className="service-item">
                            <a className="service-img-link"
                               href="https://w20.wocmarketing.com/services/#wax-tint-lift">
                                <div className="service-img-wrap">
                                    <div className="service-img">
                                        <img
                                            src="https://w20.wocmarketing.com/wp-content/themes/woctheme/gos-cms/uploads/ag1456ra156eb.jpg"
                                            alt="Wax, Tint &amp; Lift"/>
                                    </div>
                                </div>
                            </a>
                            <a className="service-link" href="https://w20.wocmarketing.com/services/#wax-tint-lift">
                                <h4 className="service-title">Wax, Tint &amp; Lift</h4>
                            </a>
                        </div>
                    </div>
                    <div className="col-6 col-md-4 col-lg-4 col-xl-3">
                        <div className="service-item">
                            <a className="service-img-link"
                               href="https://w20.wocmarketing.com/services/#nails-enhancement">
                                <div className="service-img-wrap">
                                    <div className="service-img">
                                        <img
                                            src="https://w20.wocmarketing.com/wp-content/themes/woctheme/gos-cms/uploads/3917e4f5fcc.jpg"
                                            alt="Nails Enhancement"/>
                                    </div>
                                </div>
                            </a>
                            <a className="service-link"
                               href="https://w20.wocmarketing.com/services/#nails-enhancement">
                                <h4 className="service-title">Nails Enhancement</h4>
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        </>
    )
}

Test.Layout = MainLayout

export default Test