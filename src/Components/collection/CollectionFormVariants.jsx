import React, { useEffect, useState } from "react"
import { NavLink } from "react-router-dom"
import LazyLoad from 'react-lazyload'

const CollectionFormVariants = (props) => {
    const product = props.prod
    const [ActiveStateSizeOptions, setActiveStateSizeOptions] = useState('')
    const [variantImage, setVariantImage] = useState('')
    const [defaultColorOption, setDefaultColorOption] = useState('')
    const [sizeInputValue, setSizeInputValue] = useState('')
    const [varId, setVarId] = useState(false)
    // const [imageInvisible, makeImageInvisible] = useState('')
    const [preloaderVisibility, setPreloaderVisibility] = useState('')

    const variantChange = (e) => {
        const thisProduct = document.getElementById(`${product.id}`)
        const sizeSelectPlaceholder = thisProduct.querySelector('.sizeFieldsTitle')
        const value = e.target.value
        const colorOpt = 'opt' + (props.colorIndex + 1)
        const firstVariantByChangedColorOption = product.modifications.find(el => { return el[colorOpt] === value })
        setVarId(firstVariantByChangedColorOption.mod_id)
        const variantImage = firstVariantByChangedColorOption.mod_images[0]
        // makeImageInvisible('invisible')
        setPreloaderVisibility('')
        setTimeout(() => {
            setTimeout(() => {
                setPreloaderVisibility(' invisible')
                // makeImageInvisible('')
            }, 1500)
            setVariantImage(variantImage)
        }, 300)

        setDefaultColorOption(value)
        setSizeOptionsStatus(value)
        setSizeInputValue('')

        sizeSelectPlaceholder.innerHTML = 'Sizes'
        thisProduct.querySelector('.sizeFields').style.borderColor = 'black'
    }

    const setSizeOptionsStatus = (color) => {
        const thisProduct = document.getElementById(`${product.id}`)

        const sizeInputs = thisProduct.querySelectorAll('.sizeInput')
        sizeInputs.forEach(el => {
            el.classList.remove('inactiveOption')
            el.removeAttribute('disabled')
        })

        const colorOpt = 'opt' + (props.colorIndex + 1)
        const sizeOpt = 'opt' + (props.sizeIndex + 1)
        const mods = product.modifications.filter(mod => {
            return mod[colorOpt] === color
        })

        mods.forEach(mod => {
            sizeInputs.forEach(el => {
                if ((mod[sizeOpt] === el.value) && Number(mod.qty) === 0) {
                    el.classList.add('inactiveOption')
                    el.setAttribute('disabled', 'disabled')
                }
            })
        })
    }

    useEffect(() => {
        setPreloaderVisibility('')
        setTimeout(() => {
            setPreloaderVisibility(' invisible')
        }, 2000)

        setVariantImage(props.main_photo)
        setDefaultColorOption(props.firstVariantColor)
        setSizeOptionsStatus(props.firstVariantColor)
    }, [product.id])

    const sizeButtonAction = (e) => {
        const thisProduct = document.getElementById(`${product.id}`)
        const sizeSelectPlaceholder = thisProduct.querySelector('.sizeFieldsTitle')

        const radioButtonSizeValue = e.target.value
        const colorOpt = 'opt' + (props.colorIndex + 1)
        const sizeOpt = 'opt' + (props.sizeIndex + 1)
        const selectedVariant = product.modifications.find(el => {
            return el[colorOpt] === defaultColorOption && el[sizeOpt] === radioButtonSizeValue
        })
        setVarId(selectedVariant.mod_id)

        setSizeInputValue(radioButtonSizeValue)
        sizeSelectPlaceholder.innerHTML = radioButtonSizeValue

        setActiveStateSizeOptions('')
        thisProduct.querySelector('.sizeFields').style.borderColor = 'black'
    }

    const submitProdCartForm = (e) => {
        e.preventDefault()
        const formData = {}
        const target = e.target
        const checkedSize = target.querySelector('[name = size]:checked')
        formData.product_id = target.querySelector('[name = product_id]').value
        formData.variant_id = varId
        const currentProdCart = document.getElementById(target.querySelector('[name = product_id]').value)

        if (!checkedSize) {
            currentProdCart.querySelector('.sizeFields').style.borderColor = 'red'
            return
        }

        props.submit(formData)
    }

    return <form id={product.id} onSubmit={submitProdCartForm}>
        <input className='hidden-input' readOnly name={'product_id'} value={product.id} />
        <input className='hidden-input' readOnly name={'variant_id'} />

        <NavLink to={{
            pathname: `/collection/${props.collectionPath}/${product.id}`,
            aboutProps: {
                variant_id: varId
            }
        }}>
        </NavLink>

        <div className='ImageWrapper'>
            <div className={"preloaderWrapper" + preloaderVisibility}>
                <img className='product_imgPreloader' src={require('../../Assets/Preloader.gif')} />
            </div>

            <LazyLoad>
                <img src={variantImage}
                //  className={imageInvisible} 
                 />
            </LazyLoad>

            <div className="productSizesAndSubmit">
                {props.sizeIndex >= 0 ?
                    <div className={"productSizeOptions " + ActiveStateSizeOptions}
                        onMouseEnter={() => setActiveStateSizeOptions('activeSizeOptions')}
                        onMouseLeave={() => setActiveStateSizeOptions('')}
                    >
                        <div className="sizeFields">
                            <div className="sizeFieldsTitle">Sizes</div>

                            {product.options[props.sizeIndex].map((el, i) => {
                                return <label key={i} className='optionSizeField'>
                                    <input
                                        checked={sizeInputValue === el}
                                        className='sizeInput hidden-input'
                                        name='size'
                                        type='radio'
                                        value={el}
                                        onChange={sizeButtonAction}
                                    />

                                    <div>{el}</div>
                                </label>
                            })}
                        </div>
                    </div>
                    : false}

                <button type="submit" className="stripBtn productCartSubmitButton" value="submit">
                    +
                </button>
            </div>
        </div>

        <div className='productInfo'>
            <div className='productName'>{product.name}</div>
            <div className='productPrice'>{props.price} $</div>

            <div className="productOptions">
                {(props.colorIndex >= 0 && product.options[props.colorIndex].length > 1) ?

                    <div className='productColorOptions'>
                        <div className="productColorOptions_wrapper">
                            {product.options[props.colorIndex].map((el, i) => {

                                return <label key={i} className='optionColorField'>
                                    <input checked={defaultColorOption === el}
                                        className='colorInput hidden-input'
                                        type='radio'
                                        name={'color'}
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
                    </div>
                    :
                    <input className='hidden' name={'color-' + product.id} /> // if only one color for variants
                }
            </div>
        </div>
    </form>
}

export default CollectionFormVariants
