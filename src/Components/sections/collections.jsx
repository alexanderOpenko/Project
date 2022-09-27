import React from "react"

const Collections = () => {
    return (<div className="about_collections">
        <div className="centered">
        <h1 className="about_title">
            Our collections
        </h1>

        <p className="about_desription">
            In our collections we strive to meet the needs of our customers as quickly as possible.
        </p>

        <div className="about_collections-image">
            <img src={require('../../Assets/main_grey_straight.jpg')} />

            <h1 className="about_collections-title">
                JEANS
            </h1>
        </div>

        <div className="about_collections-image">
            <img src={require('../../Assets/2326C-55M-040-1_26.webp')} />

            <h1 className="about_collections-title">
                T-SHIRTS
            </h1>
        </div>

        <div className="about_collections-image">
            <img src={require('../../Assets/img_02.jpg')} />

            <h1 className="about_collections-title">
                HOODIES
            </h1>
        </div>
        </div>
    </div>
    )
}

export default Collections