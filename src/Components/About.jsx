import React from "react"
import { useEffect } from "react"
import { connect } from "react-redux"
import { setAboutPageActiveTab } from "../Redux-reducers/contentReducer"
import AboutStore from "./sections/aboutStore"
import Collections from "./sections/collections"
import Contacts from "./sections/Contacts"
import OurSponsors from "./sections/ourSponsors"

const About = (props) => {
    useEffect (() => {
        window.scrollTo(0, 0)
    })

    const aboutNavToggle = (el) => {
        props.store.dispatch(setAboutPageActiveTab(el))
    }

    return (<>
        <div className="about">
            <div className="about_navigation">
                <div className="about_nav-list">
                    {navList.map((el, i) => {
                        return <div key={i}
                            className='about_nav-list-item'
                            onClick={() => aboutNavToggle(el)}
                            style={{color: props.activeTab === el ? 'darkorange' : ''}}
                        >
                            {el}
                        </div>
                    })}
                </div>
            </div>

            <div className="about-content">
                <div className={props.activeTab !== 'About store' ? 'hidden' : ''}>
                    <AboutStore />
                </div>

                <div className={props.activeTab !== 'Collections' ? 'hidden' : ''}>
                    <Collections />
                </div>

                <div className={props.activeTab !== 'Our sponsors' ? 'hidden' : ''}>
                    <OurSponsors />
                </div>

                <div className={props.activeTab !== 'Contacts' ? 'hidden' : ''}>
                    <Contacts /> 
                </div>
                <div></div>
            </div>
        </div>
    </>
    )
}

const navList = ['About store', 'Collections', 'Contacts', 'Our sponsors']

const mapStateToProps = (state) => {
    return({
        activeTab: state.contentReducer.activeTab
    })
}

export default connect(mapStateToProps, {})(About)