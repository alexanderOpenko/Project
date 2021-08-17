import React from 'react'
import s from './Navbar.module.css'
import Menu from './Menu.jsx'
import ReactDom from 'react-dom'

class Navbar extends React.Component {

constructor (props) {

    super(props)
    this.widthDisplay = React.createRef()
    this.state = {
        manuApear: false
    }
}

componentDidMount() {
    this.widthDisplay = this.widthDisplay.current
    this.widthContent = this.widthDisplay.offsetWidth 
}

componentDidUpdate() {
    this.widthDisplay = this.widthDisplay.current
    this.widthContent = this.widthDisplay.offsetWidth 
}

   
menuAppear = (props) => {
    if(props === true) { this.setState({menuAppear : false}) } else
     this.state.menuAppear ?
       this.setState({menuAppear : false}) :  
       this.setState({menuAppear : true}) 
     }
    
render() { 
    return(<>
    <div ref={this.widthDisplay} className = {s.navbar} >
    {this.widthContent > 768 ?
    <button  onMouseEnter ={this.menuAppear} >
            <div className={s.bar}></div>
            <div className={s.barmiddle}></div>
            <div className={s.bar}></div>
    </button> 
    : 
    <button onClick ={this.menuAppear} >
            <div className={s.bar}></div>
            <div className={s.barmiddle}></div>
            <div className={s.bar}></div>
    </button>

    }      
 </div>
        <div className = {this.state.menuAppear ? s.menuAppear : s.menuFade}  >
        <span >
            <Menu menuAppear={this.menuAppear} />
        </span>
        </div>
       </> 
    )
    
}

}

export default Navbar