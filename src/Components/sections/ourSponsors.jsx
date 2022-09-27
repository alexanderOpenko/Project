import React from "react"

const ourSponsors = () => {
    return (<div className="sponsors">
        <h1 className="about_title">
            We work with:
        </h1>

        <div className="sponsors_list">
            <div className="sponsors_list-item">
                <img src={require('../../Assets/logo1.png')} />
            </div>
            <div className="sponsors_list-item">
                <img src={require('../../Assets/logo2.jpeg')} />
            </div>
            <div className="sponsors_list-item">
                <img src={require('../../Assets/logo3.jpeg')} />
            </div>
            <div className="sponsors_list-item">
                <img src={require('../../Assets/brand4.webp')} />
            </div>
            <div className="sponsors_list-item">
                <img src={require('../../Assets/logo5.jpeg')} />
            </div>
        </div>
    </div>)
}

export default ourSponsors