import React, { useEffect, useState } from 'react'
import { Field, reduxForm } from "redux-form"

export const productSizeError = (sizeErrorText = 'Please select size') => {
    document.querySelector('.product__size-select-warning').innerHTML = sizeErrorText
}

const ProductForm = (props) => {
    const [defaultColorOption, setDefaultColorOption] = useState('')

    useEffect(() => {
        if (props.product.params) {
            if (props.sizeIndex !== undefined) {
                props.change('sizeRequire', true)
            }

            setDefaultColor()
        }

        setSizeOptionsStatus()
        props.change('product_id', props.product.id)
    })

    const setDefaultColor = () => {
        if (!defaultColorOption) {
            const colorOpt = 'opt' + (props.colorIndex + 1)
            setDefaultColorOption(props.product.firstVariant[colorOpt])
        }
    }

    const setSizeOptionsStatus = () => {
        const sizeInputs = document.querySelector('.product').querySelectorAll('.sizeInput')
        sizeInputs.forEach(el => {
            el.classList.remove('inactiveOption')
            el.removeAttribute('disabled')
        })

        const colorOpt = 'opt' + (props.colorIndex + 1)
        const sizeOpt = 'opt' + (props.sizeIndex + 1)
        const mods = props.product.modifications.filter(mod => {
            return mod[colorOpt] === defaultColorOption
        })

        mods.forEach(mod => {
            sizeInputs.forEach(el => {

                if ((mod[sizeOpt] === el.value) && (mod.qty == 0)) {
                    el.classList.add('inactiveOption')
                    el.setAttribute('disabled', 'disabled')
                }
            })
        })
    }

    const variantChange = (e) => {
        productSizeError('')
        const value = e.target.value
        const colorOpt = 'opt' + (props.colorIndex + 1)
        const firstVariantByChangedColorOption = props.product.modifications.find(el => { return el[colorOpt] === value })
        const variantImages = firstVariantByChangedColorOption.mod_images
        props.changeVariantImages(variantImages)
        setDefaultColorOption(value)
        props.change('product_size', '')

        document.querySelector('.product__size-placeholder').innerHTML = 'Sizes'
    }

    const customInput = (field) => {
        return <input {...field.input}
            className='sizeInput hidden-input'
            type='radio'
            value={field.val}
        />
    }

    const setSizeAction = (e) => {
        productSizeError('')
        const sizeValue = e.target.value
        const colorOpt = 'opt' + (props.colorIndex + 1)
        const sizeOpt = 'opt' + (props.sizeIndex + 1)
        const selectedVariant = props.product.modifications.find(el => {
            return el[colorOpt] === defaultColorOption && el[sizeOpt] === sizeValue
        })
        props.change('variant_id', selectedVariant.mod_id)

        document.querySelector('.product__size-placeholder').innerHTML = sizeValue
        props.setSizeSelectState('')
    }

    return <>
        <form onSubmit={props.handleSubmit}>
            <Field component='input' type="text" className='hidden-input' name='product_id' />
            <Field component='input' type="text" className='hidden-input' name='variant_id' />
            <Field component='input' type="text" className='hidden-input' name='sizeRequired' />

            {props.colorIndex >= 0 &&
                <div className="product__color-options">
                    {props.product.options[props.colorIndex].map((el, i) => {
                        return <label key={i} className='optionColorField'>
                            <input
                                checked={defaultColorOption === el}
                                className='colorInput hidden-input'
                                type='radio'
                                name='color'
                                value={el}
                                onChange={variantChange}
                            />

                            <div className="titleColor">
                                <div className="titleColor_border">
                                    <div className={'titleColor_background ' + el}>
                                    </div>
                                </div>

                                <div className="rotateArrow">
                                </div>
                                <div className="titleColor_info">
                                    {el}
                                </div>
                            </div>
                        </label>
                    })}
                </div>
            }

            {props.sizeIndex !== undefined &&

                <div className='product__size-options'>
                    <div className='product__size-select-wrapper'>
                        <div className={'product__size-select' + props.sizeSelectState}>
                            <div className="product__size-placeholder"
                                onClick={(e) => {
                                    e.stopPropagation()
                                    props.setSizeSelectState(' product__size-select-active')
                                }}
                            >
                                Sizes
                            </div>

                            <div className="product__size-arrow">
                            </div>

                            {props.product.options[props.sizeIndex].map((el, i) => {
                                return <label key={i}
                                    className='size-option'
                                >
                                    <Field
                                        className='sizeInput hidden-input'
                                        name='product_size'
                                        val={el}
                                        component={customInput}
                                        onChange={setSizeAction}
                                    />

                                    <div>{el}</div>
                                </label>
                            })}
                        </div>

                        <div className='product__size-select-warning'>
                        </div>
                    </div>
                </div>
            }

            <button type='submit' className='product__submit btn'>
                Add to cart
            </button>
        </form>
    </>
}

export default reduxForm({ form: 'productForm' })(ProductForm)


