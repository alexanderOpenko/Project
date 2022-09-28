import React from "react"
import { NavLink } from "react-router-dom"
import icons from "../../Assets/icons"
const Contacts = () => {


    return (<div className="contacts">
        <div className="centered">
            <div className="contacts_info">
                {contactsColumns.map((el, i) => {
                    return <div key={i} className="info_column">
                        {el.map((column, ci) => {
                            return <div key={ci} className="info_column-wrapper">
                                {column.title &&
                                    <h2 className="info_column-title">
                                        {column.title}
                                    </h2>
                                }

                                {(column.icon || column.message) &&                            
                                    <h4 className="info_message">
                                        {column.link && 
                                        <a className='info_message-link' href={column.link} target='blank'>
                                        </a>
                                        }
                                        {column.icon && icons(column.icon)}
                                        {column.message && column.message}
                                    </h4>
                                }
                            </div>
                        })}
                    </div>
                })
                }
            </div>
        </div>
    </div>)
}

const contactsColumns = [
    [
        { title: 'Call us:', icon: 'phone', message: '(010) 010-010-1' },
        { title: 'E-MAIL:', icon: 'email', message: 'streetershop@gmail.com' }
    ],
    [
        { title: 'Our social media:' },
        { icon: 'instagram', message: 'instagram', link: 'https://www.instagram.com/' },
        { icon: 'pinterest', message: 'pinterest', link: 'https://pinterest.com/' },
        { icon: 'facebook', message: 'facebook', link: 'https://facebook.com/' },
        { icon: 'tiktok', message: 'tiktok', link: 'https://tiktok.com/' }
    ]
]

export default Contacts