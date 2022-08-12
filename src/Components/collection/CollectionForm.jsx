import React, {useEffect, useState} from "react"
import {connect} from 'react-redux'
import {Field, reduxForm, change} from "redux-form"
import {NavLink} from "react-router-dom";

const CollectionForm = (props) => {
    const sizeSelectPlaceholder = document.querySelector('.sizeFieldsTitle')
    const [ActiveStateSizeOptions, setActiveStateSizeOptions] = useState('')
    const [variantImage, setVariantImage] = useState(props.main_photo)
    const [defaultColorOption, setDefaultColorOption] = useState('')
    const [changedSizeOption, setChangedSizeOption] = useState('')

    const product = props.prod

    const variantChange = (e) => {
        const thisProduct = document.getElementById(`${product.id}`)
        const value = e.target.value
        const colorOpt = 'opt' + (props.colorIndex + 1)
        const firstVariantByChangedColorOption = product.modifications.find(el => {return el[colorOpt] === value})
        const variantImage = firstVariantByChangedColorOption.mod_images[0]
        setVariantImage(variantImage)
        setDefaultColorOption(value)
        props.change('size-' + product.id, '')

        setChangedSizeOption('')
        sizeSelectPlaceholder.innerHTML = 'Sizes'
        thisProduct.querySelector('.sizeFields').style.borderColor = 'black'
    }

    const setSizeOptionsStatus = () => {
        const thisProduct = document.getElementById(`${product.id}`)
        const sizeInputs = thisProduct.querySelectorAll('.sizeInput')

        const mods = defaultColorOption ?
            product.modifications.filter(mod => {
                return mod.mod_title.includes(defaultColorOption + "/")
            })
        :
            product.modifications

        mods.forEach(mod => {
            sizeInputs.forEach(el => {
                if (mod.mod_title.includes("/" + el.value) && Number(mod.qty) === 0) {
                    el.classList.add('inactiveOption')
                    el.setAttribute('disabled', 'disabled')
                }
            })
        })
    }

    const setDefaultColor = () => {
        props.change('product-' + product.id, product.id)

        if (!defaultColorOption) {
            product.options[props.colorIndex].map(el => {
                if (props.varTitle.includes(el)) {
                    setDefaultColorOption(el)
                    props.change('color-' + product.id, el)
                }
            })
        }
    }

    useEffect(() => {
        setDefaultColorOption('')
    }, [props.prod])

    useEffect(() => {
        if (props.colorIndex !== -1) {
            setDefaultColor()
        }
        setSizeOptionsStatus()
    }, )

    const sizeButtonAction = (e) => {
        const radioButtonSizeValue = e.target.value

        sizeSelectPlaceholder.innerHTML = radioButtonSizeValue
        setChangedSizeOption(radioButtonSizeValue)

        inactiveSizeOptions()
        document.querySelector('.sizeFields').style.borderColor = 'black'
    }

    const activeSizeOptions = () => {
        setActiveStateSizeOptions('activeSizeOptions')
    }

    const inactiveSizeOptions = () => {
        setActiveStateSizeOptions('')
    }

    const inputRadio = (field) => {

        return <input {...field.input}
                      checked={field.val === changedSizeOption}
                      className='sizeInput hidden-input'
                      type='radio'
                      value={field.val}/>
    }

    const input = (field) => {
            return <input {...field.input}
                          checked={field.input.value === field.val}
                          className='colorInput hidden-input'
                          type='radio'
                          value={field.val}/>
    }

    return <form id={product.id} onSubmit={props.handleSubmit} >
        <NavLink to={'/rfr'}>
        </NavLink>
        <div className='ImageWrapper'>
            <img src={variantImage}/>

            <div className="productSizesAndSubmit">
                {props.sizeIndex !== -1 ?
                    <div className={"productSizeOptions " + ActiveStateSizeOptions} onMouseEnter={activeSizeOptions}
                         onMouseLeave={inactiveSizeOptions}>
                        <div className="sizeFields">
                            <div className="sizeFieldsTitle">Sizes</div>

                            {product.options[props.sizeIndex].map((el, i) => {
                                return <label key={i} className='optionSizeField'>
                                    <Field component={inputRadio}
                                           name={'size-' + product.id}
                                           val={el}
                                           onChange={sizeButtonAction}/>

                                    <div>{el}</div>
                                </label>
                            })}
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
                {props.colorIndex !== -1 && product.options[props.colorIndex].length > 1 ?

                    <div className='productColorOptions'>
                        <Field component='input' className='hidden-input' name={'product-' + product.id}/>

                        <div className="productColorOptions_wrapper">
                            {product.options[props.colorIndex].map((el, i) => {

                                return <label key={i} className='optionColorField'>
                                        <Field component={input}
                                               name={'color-' + product.id}
                                               val={el}
                                               onChange={variantChange}/>

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
                    :
                    <Field component='input' name={'color-' + product.id}/> // if only one color for variants
                }
            </div>
        </div>
    </form>
}

const mapDispatchToProps = (dispatch) => {
    return {change: (name, value) => dispatch(change('collection-form', name, value))}
}

export default reduxForm({form: 'collection-form'})(CollectionForm)
connect(mapDispatchToProps)(CollectionForm)
