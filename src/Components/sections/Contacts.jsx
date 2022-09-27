import React from "react"
import icons from "../../Assets/icons"
const Contacts = () => {


    return (<div className="contacts">
        <div className="centered">
            <div className="contacts_info">
                {contactsColumns.map((el, i) => {
                    return <div className="info_column">
                        {el.map((column, ci) => {
                            return <>
                                {column.title &&
                                    <h2 className="info_column-title">
                                        {column.title}
                                    </h2>
                                }

                                {(column.icon || column.message) &&
                                <h4 className="info_message">
                                    {column.icon && icons(column.icon)}
                                    {column.message && column.message}
                                </h4>
                                }
                            </>
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
        { icon: 'instagram', message: 'instagram' },
        { icon: 'pinterest', message: 'pinterest' },
        { icon: 'facebook', message: 'facebook' },
        { icon: 'tiktok', message: 'tiktok' }
    ]
]

export default Contacts