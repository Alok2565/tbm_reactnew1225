import { useState, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "../../assets/css/HomeSlider.css";
import { Link } from "react-router-dom";
import axios from "axios";

// Custom arrow components
function NextArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", right: "25px", zIndex: 2 }}
            onClick={onClick}
        />
    );
}

function PrevArrow(props) {
    const { className, style, onClick } = props;
    return (
        <div
            className={className}
            style={{ ...style, display: "block", left: "20px", zIndex: 2 }}
            onClick={onClick}
        />
    );
}

function HomeSlider() {
    const [sliders, setSliders] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get("http://127.0.0.1:8000/api/sliders");
                setSliders(res.data.data ?? []);
            } catch (error) {
                console.error("Error fetching sliders:", error);
                alert("Failed to fetch sliders. Please try again later.");
            }
        };
        fetchData();
    }, []);

    const bannerSettings = {
        infinite: sliders.filter(s => s.status === 1).length > 1,
        speed: 500,
        autoplay: true,
        autoplaySpeed: 5000,
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: true,
        dots: true,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
        responsive: [
            {
                breakpoint: 768,
                settings: {
                    arrows: true,
                    dots: true,
                },
            },
        ],
    };

    return (
        <div className="w-100 slider-wrapper" style={{ overflow: "hidden" }}>
            <Slider {...bannerSettings}>
    {sliders.length > 0 ? (
        sliders
            .filter(item => item.status === 1) 
            .map((item) => (
                <div key={item.id}>
                    <Link to="#">
                        <img
                            src={`http://127.0.0.1:8000/uploads/slider/${item.image}`}
                            alt={item.title}
                            className="img-fluid w-100"
                        />
                    </Link>
                </div>
            ))
    ) : (
        <p className="text-center">Loading sliders...</p>
    )}
</Slider>
        </div>
    );
}

export default HomeSlider;
// import { useEffect, useState } from "react";
// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import "../../assets/css/HomeSlider.css";
// import Banner1 from "../../assets/images/slider/ajadi_banner.jpg";
// import Banner2 from "../../assets/images/slider/sabka_banner.jpg";
// import Banner3 from "../../assets/images/slider/mann_kibaat.jpg";
// import { Link } from "react-router-dom";
// import axios from "axios";
// // Custom arrow components
// function NextArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "block", right: "25px", zIndex: 2 }}
//             onClick={onClick}
//         />
//     );
// }

// function PrevArrow(props) {
//     const { className, style, onClick } = props;
//     return (
//         <div
//             className={className}
//             style={{ ...style, display: "block", left: "20px", zIndex: 2 }}
//             onClick={onClick}
//         />
//     );
// }

// function HomeSlider() {
//     useEffect(() => {
//           const fetchData = async () => {
//               try {
//                   const res = await axios.get("http://127.0.0.1:8000/api/sliders");
//                   setSliders(res.data.data ?? []);
//               } catch (error) {
//                   ///console.error("Error fetching sliders:", error);
//                   alert("Failed to fetch sliders. Please try again later.");
//               }
//               };
//             fetchData();
//           }, []);
//     const bannerSettings = {
//         dots: true,
//         infinite: true,
//         speed: 500,
//         autoplay: true,
//         autoplaySpeed: 5000,
//         slidesToShow: 1,
//         slidesToScroll: 1,
//         arrows: true,
//         nextArrow: <NextArrow />,
//         prevArrow: <PrevArrow />,
//         responsive: [
//             {
//                 breakpoint: 768,
//                 settings: {
//                     arrows: true,
//                     dots: true,
//                 },
//             },
//         ],
//     };

//     return (
//         <div className="w-100 slider-wrapper" style={{ overflow: "hidden" }}>
//             <Slider {...bannerSettings}>
//                 <div>
//                     <Link to="#">
//                         <img
//                             src={Banner1}
//                             alt="Banner 1"
//                             className="img-fluid w-100"
//                         />
//                     </Link>
//                 </div>
//                 <div>
//                     <Link to="#">
//                         <img
//                             src={Banner2}
//                             alt="Banner 2"
//                             className="img-fluid w-100"
//                         />
//                     </Link>
//                 </div>
//                 <div>
//                     <Link to="#">
//                         <img
//                             src={Banner3}
//                             alt="Banner 3"
//                             className="img-fluid w-100"
//                         />
//                     </Link>
//                 </div>
//             </Slider>
//         </div>
//     );
// }
// export default HomeSlider;


