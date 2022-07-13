import React, {useEffect} from "react"
import {Field, reduxForm} from "redux-form"
import {NavLink} from "react-router-dom";

const CollectionForm = (props) => {
    const product = props.prod

    const variantChange = (e) => {
        const value = e.target.value
        setSizeOptionsStatus(value)
    }

    const setSizeOptionsStatus = (colorValue) => {
        const sizeInputs = document.querySelectorAll('.sizeInput')
        sizeInputs.forEach(el => {
            el.classList.remove('inactiveOption')
            el.removeAttribute('disabled', 'disabled')
        })

        const defaultColorOptValue = colorValue ? colorValue : document.querySelector('.colorInput[checked]').value

        const mods = product.modifications.filter(mod => {
            return mod.mod_title.includes(defaultColorOptValue)
        })

        mods.forEach(mod => {
            sizeInputs.forEach(el => {
                if (mod.mod_title.includes("/" + el.value) && Number(mod.qty) === 0) {
                    el.classList.add('inactiveOption')
                    el.setAttribute('disabled', 'disabled')
                }
            })
        })
    }

    useEffect(() => {
        setSizeOptionsStatus()
    })


    const require = (v) => {
        if (!v) {
            return true
        } else {
            document.querySelector('.sizeFields').style.borderColor = 'black'
        }
    }

    const inputRadio = (field) => {
        const hasError = field.meta.touched && field.meta.error

        if (hasError) {
            document.querySelector('.sizeFields').style.borderColor = 'red'
        }

        return <input {...field.input}
                      checked={field.val === field.input.value}
                      className='sizeInput hidden-input'
                      type='radio'
                      value={field.val}/>
    }

    return <form id='1' onSubmit={props.handleSubmit}>
        <NavLink to={'/rfr'}>
        </NavLink>
        <div className='ImageWrapper'>
            <img src={props.main_photo}/>

            <div className="productSizesAndSubmit">
                {props.sizeIndex !== -1 ?
                    <div className="productSizeOptions">
                        <div className="sizeFields">
                            {product.options[props.sizeIndex].map((el, i) => {
                                return <label key={i} className='optionSizeField'>
                                    <Field component={inputRadio}
                                           validate={[require]}
                                           name={'size-' + product.id}
                                           val={el}/>

                                    <div>{el}</div>
                                </label>
                            })}
                            <span className="sizeFieldsTitle">Sizes</span>
                        </div>
                    </div>
                    : false}

                <button type="submit" className="submit stripBtn" value="submit">
                    +
                </button>
            </div>
        </div>

        <div className='productInfo'>
            <div className='productName'>{product.name}</div>
            <div className='productPrice'>{props.price} $</div>

            <div className="productOptions">
                {props.colorIndex !== -1 ?
                    <div className='productColorOptions'>
                        <div className="productColorOptions_wrapper">
                            {product.options[props.colorIndex].map((el, i) => {

                                return <label key={i} className='optionColorField'>
                                    {props.varTitle.includes(el) ?

                                        <input type='radio' defaultChecked className='colorInput hidden-input'
                                               name={'color-' + product.id}
                                               value={el} onChange={variantChange}/>
                                        :
                                        <input type='radio' className='hidden-input' name={'color-' + product.id}
                                               value={el} onChange={variantChange}/>
                                    }

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
                    : false
                }
            </div>
        </div>
    </form>
}

export default reduxForm({form: 'collection-form'})(CollectionForm)