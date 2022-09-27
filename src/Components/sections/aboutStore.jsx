import React from "react"

const AboutStore = () => {
    return (<div className="about_store">
        <div className="centered">
        <h1 className="about_title">
            About store
        </h1>

        <p className="about_desription">
            STREETER was founded in 2019 and he was born out of pure love for street culture.
        </p>

        <div className="about_store-image">
            <img src={require('../../Assets/525810-illuminated.jpeg')} />
        </div>

        <div className="about_img-offside">
            <div className="about_store-text">
                <div className="text_container">                   
                    <h1>100%</h1>
                   
                    <p className="body2">
                        Natural materials
                    </p>
                </div> 

                <div className="text_container">
                    <p className="body2">
                        Oriented towards ecologically conscious fashion.
                    </p>
                </div> 
            </div>

            <div className="about_store-image2 margin-left">
                <img src={require('../../Assets/0202.webp')} />
            </div>
        </div>
        </div>
    </div>
    )
}

export default AboutStore