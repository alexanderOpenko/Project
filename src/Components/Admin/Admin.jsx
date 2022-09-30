import React from "react"
import Products from "./Products"
import AdminMenu from "./AdminMenu"

class Admin extends React.Component {

    constructor(props) {
        super(props)
    }

    render() {
        return <div className='admin'>
            <AdminMenu/>
            <Products/>
        </div>
    }
}

export default Admin

