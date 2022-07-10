import React from 'react'
import {NavLink} from 'react-router-dom'
import './MapPageContent.css'

const MapPageContent = (props) => {
    return <>
        <div className='collection'>
            {props.elementsObject.map((elem, i) => {
                return <div key={i} className='collectionElement' data-element='sale-element'>
                    {/*<NavLink to={props.url + Number(props.elementsObject.indexOf(elem))}>*/}
                    <img src={elem.main_photo}/>

                    <div className='productInfo'>
                        <div className='productName'>{elem.name}</div>
                        <div className='productPrice'>{elem.price} $</div>

                        <div className='productColorOptions'>
                            <div className="productColorOptions_wrapper">
                            {elem.opt1.map(el => {
                                return <label className='optionColorField'>
                                        <input type='radio' name={'product-' + elem.id} value={el}/>

                                        <div className="titleColor">
                                            <div className="titleColor_border">
                                                <div className={'titleColor_background ' + el}></div>
                                            </div>

                                            <div className="rotateArrow"></div>
                                            <div className="titleColor_info">
                                                {el}
                                            </div>
                                        </div>
                                    </label>
                            })}
                            </div>
                        </div>
                    </div>
                    {/*</NavLink>*/}
                </div>
            })}
        </div>
    </>
}

export default MapPageContent