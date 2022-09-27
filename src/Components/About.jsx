import React from "react"
import { useState } from "react"
import AboutStore from "./sections/aboutStore"
import Collections from "./sections/collections"
import Contacts from "./sections/Contacts"
import OurSponsors from "./sections/ourSponsors"

const About = () => {
    const [activeAboutItem, setActiveAboutItem] = useState('About store')

    const aboutNavToggle = (el) => {
        setActiveAboutItem(el)
    }

    return (<>
        <div className="about">
            <div className="about_navigation">
                <div className="about_nav-list">
                    {navList.map((el, i) => {
                        return <div key={i}
                            className='about_nav-list-item'
                            onClick={() => aboutNavToggle(el)}
                            style={{color:activeAboutItem === el ? 'darkorange' : ''}}
                        >
                            {el}
                        </div>
                    })}
                </div>
            </div>

            <div className="about-content">
                <div className={activeAboutItem !== 'About store' ? 'hidden' : ''}>
                    <AboutStore />
                </div>

                <div className={activeAboutItem !== 'Collections' ? 'hidden' : ''}>
                    <Collections />
                </div>

                <div className={activeAboutItem !== 'Our sponsors' ? 'hidden' : ''}>
                    <OurSponsors />
                </div>

                <div className={activeAboutItem !== 'Contacts' ? 'hidden' : ''}>
                    <Contacts /> 
                </div>
                <div></div>
            </div>
        </div>
    </>
    )
}

const navList = ['About store', 'Collections', 'Contacts', 'Our sponsors']

export default About