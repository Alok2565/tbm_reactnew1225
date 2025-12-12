import React from "react";
import useTitle from "../hooks/useTitle";
import HomeSlider from "../components/HomeSlider";

function Home() {
    useTitle("Home");
    return (
        <>
            <div>
                <div>
                    {" "}
                    <HomeSlider />
                </div>
                <section className="introduction padd-25">
                    <div className="container py-2">
                        <div className="row intro">
                            <div className="col-md-12"></div>
                        </div>
                    </div>
                </section>
            </div>
        </>
    );
}

export default Home;
