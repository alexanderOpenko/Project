import React from 'react'
import { NavLink } from 'react-router-dom'
import icons from "../../Assets/icons"
import { setAboutPageActiveTab } from '../../Redux-reducers/contentReducer'
import './footer.css'

const Footer = (props) => {
    const setActiveTab = (tab) => {
        window.location.hash = '/About'
        props.store.dispatch(setAboutPageActiveTab(tab))
    }

   return <>
        <div className='footer'>
            <div className="footer_wrapper">
                <div className='footer_logo'>
                    <div className='logo'>
                        <NavLink to='/'>
                            <h4 className='logo_body'>
                                streeter
                            </h4>
                        </NavLink>
                    </div>
                </div>

                <div className="footer_columns">
                    {footerColumns.map((el, i) => {
                        return <div key={i} className="footer_column">
                            {el.map((column, ci) => {
                                return <div key={ci} className="footer_column-item"
                                    onClick={() => {!column.link && setActiveTab(column.aboutProps)}}
                                    >
                                    {
                                        column.link &&
                                        <NavLink  to={{
                                            pathname: column.link,
                                            aboutProps: {
                                                activeTab: column.aboutProps
                                            }
                                        }}>
                                        </NavLink>
                                    }

                                    {
                                        column.title &&
                                        <h2 className="footer_column-title" >
                                            {column.title}
                                        </h2>
                                    }

                                    {
                                        column.message &&
                                        <h4 className="footer_column-message">
                                            {column.message}
                                        </h4>
                                    }
                                </div>
                            })}
                        </div>
                    })

                    }
                </div>

                <div className="footer_icons-wrapper">
                    <h2 className='footer_icons-title'>
                        Our social media:
                    </h2>

                    <div className='footer_icons'>
                        {socialMediaIcons.map((el, i) => {
                            return <div key={i} className='footer_icon'>
                                <a href={el.link} target='blank'>
                                    {icons(el.icon)}
                                </a>
                            </div>
                        })
                        }
                    </div>
                </div>
            </div>
        </div>

        <div className='footer_bottom'>
            <a href='https://github.com/alexanderOpenko/Project/tree/master'>github</a>
        </div>
    </>
}

const socialMediaIcons = [
    { icon: 'instagram', link: 'https://www.instagram.com/' },
    { icon: 'pinterest', link: 'https://pinterest.com/' },
    { icon: 'facebook', link: 'https://facebook.com/' },
    { icon: 'tiktok', link: 'https://tiktok.com/' }
]

const footerColumns = [
    [
        { title: 'Menu' },
        { message: 'T-SHIRTS', link: '/collection/T-shirts' },
        { message: 'JEANS', link: '/collection/Jeans' },
        { message: 'HOODIES', link: '/collection/Hoodies' },
    ],
    [
        { title: 'About store', aboutProps: 'About store' },
        { message: 'Collections', aboutProps: 'Collections' },
        { message: 'Contacts', aboutProps: 'Contacts' },
        { message: 'Our sponsors', aboutProps: 'Our sponsors' },
    ]
]

export default Footer