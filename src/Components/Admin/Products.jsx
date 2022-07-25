import React from "react";
import $ from "jquery";
import icons from "../../Pictures/icons";
import request from "../../Api/api";

const Option = (props) => {
    return <div className='optionField' key={props.key}>
        <div className="productField">
            <span className='fieldTitle'>Option name</span>
            <input className='fieldInput' name="option_name[]"/>
        </div>

        <div className='optionsValues'>
            <span className='fieldTitle'>Option values</span>

            <div className='optionsValuesWrapper'>
                <input data-option={props.key} name={'option-' + props.key + '[]'} onChange={props.checkOptForEmptiness} className='optionsValue fieldInput'/>

                <div data-option={props.key} onClick={props.deleteOptValue}
                     className='deleteOptValue'
                >
                    <svg viewBox="0 0 20 20" className="trashIcon" focusable="false" aria-hidden="true"> <path d="M8 3.994c0-1.101.895-1.994 2-1.994s2 .893 2 1.994h4c.552 0 1 .446 1 .997a1 1 0 0 1-1 .997h-12c-.552 0-1-.447-1-.997s.448-.997 1-.997h4zm-3 10.514v-6.508h2v6.508a.5.5 0 0 0 .5.498h1.5v-7.006h2v7.006h1.5a.5.5 0 0 0 .5-.498v-6.508h2v6.508a2.496 2.496 0 0 1-2.5 2.492h-5c-1.38 0-2.5-1.116-2.5-2.492z"></path> </svg>
                </div>
            </div>
        </div>
    </div>
}

class Products extends React.Component {
    opt1 = []
    opt2 = []
    opt3 = []
    singleOptVariantsDeleted = false
    twoOptVariantsDeleted = false
    variantsFields = []

    constructor(props) {
        super(props);
        this.state = {
            options: 0,
        }
    }

    handleButtonClick = (e) => {
        e.preventDefault()
        const form = document.querySelector('#addProduct')
        const dataForm = new FormData(form)

        request('create_product.php', false, false, 'POST', dataForm)
    }

    element = (tag, classes = [], attr = [], content) => {
        const node = document.createElement(tag)

        if (Object.keys(attr).length) {
            for (let key in attr) {
                node.setAttribute(`${key}`, `${attr[key]}`)
            }
        }

        if (classes.length) {
            node.classList.add(...classes)
        }

        if (content) {
            node.innerHTML = content
        }

        return node
    }

    InputImageChangeHandler = (e) => {
        const elem = e.target
        const variant = elem.closest('.variantField')
        const imagesContainer = variant.querySelector('.variantImagesContainer')
        const variantFiles = Array.from(elem.files)

        variantFiles.forEach( el => {
            const reader = new FileReader()
            const variantImage = this.element('img', ['variantImage'])
            const imageContainer = this.element('div', ['variantImageContainer'])
            const removeImage = this.element('span', ['removeVariantImage'], {}, '&times;')
            removeImage.addEventListener('click',  this.removeVariantImage)

            reader.onload = ev => {
                const src = ev.target.result
                variantImage.setAttribute('src', `${src}`)
                removeImage.dataset.file = el.name
                imageContainer.append(variantImage, removeImage)
                imagesContainer.append(imageContainer)
            }

            reader.readAsDataURL(el)
        })
    }

    addProductImage = (e) => {
        const input = document.querySelector('.productImageInput')
        input.click()
    }

    removeProdImage = (e) => {
        const elem = e.target
        const imgWrapper = elem.closest('.prodImageWrap')
        const fileName = elem.dataset.file
        const dt = new DataTransfer()
        const input = document.querySelector('.productImageInput')
        const { files } = input

        imgWrapper.remove()

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            if (fileName !== file.name)
                dt.items.add(file)
        }

        input.files = dt.files
    }

    productImagesChangeHandler = (e) => {
        const prodPhotosContainer = document.querySelector('.productPhotos_container')
        const input = document.querySelector('.productImageInput')
        const files = Array.from(input.files)

        if (files.length > 5) {
            alert("Only 5 files accepted.")
            return
        }

        files.forEach( el => {
            const reader = new FileReader()
            const prodImageWrap = this.element('div', ['prodImageWrap'])
            const prodImage = this.element('img', ['prodImage'], {src:'', alt: ''})
            const removeImage = this.element('span', ['removeProdImage'], {}, '&times;')
            removeImage.addEventListener('click', this.removeProdImage)

            reader.onload = ev => {
                const src = ev.target.result
                prodImage.setAttribute('src', `${src}`)
                removeImage.dataset.file = el.name
                prodImageWrap.append(prodImage, removeImage)
            }

            reader.readAsDataURL(el)
            prodPhotosContainer.append(prodImageWrap)
        })
    }

    removeVariantImage = (e) => {
        e.stopPropagation();
        const elem = e.target
        const imgWrapper = elem.closest('.variantImageContainer')
        const fileName = elem.dataset.file

        const dt = new DataTransfer()
        const input = document.querySelector('.variantImages')
        const { files } = input

        imgWrapper.remove()

        for (let i = 0; i < files.length; i++) {
            const file = files[i]
            if (fileName !== file.name)
                dt.items.add(file)
        }

        input.files = dt.files
    }

    createVariantField = (variantTitle, variantOptions, variantsLength) => {
        const variantsContainer = document.querySelector('.productVariants')
        const variantsParent = document.querySelector('.productVariants')
        const fields = variantsParent.querySelectorAll('.variantField')

        if (this.opt2.length && !this.singleOptVariantsDeleted) {
            fields.forEach(el => {
                el.remove()
            })

            this.singleOptVariantsDeleted = true
        }

        if (this.opt3.length && !this.twoOptVariantsDeleted) {
            fields.forEach(el => {
                el.remove()
            })

            this.twoOptVariantsDeleted = true
        }

        const variantField = this.element('div', ['variantField'], {name: 'variant_field'})
        const hiddenInput = this.element('input', [], {type: 'hidden', value: variantTitle, name: 'modification[]'})
        const hiddenOptionsInput = this.element('input', ['hiddenInputWithOptions'], {
            name: 'options[]',
            value: variantOptions
        })
        const spanTitle = this.element('span', ['variantTitle', 'varField'], {}, variantTitle)
        const priceInput = this.element('input', ['fieldInput', 'priceInput', 'varField'], {name: 'price[]', type: 'number'})
        const priceTitle = this.element('span', [], {}, 'price')
        const qtyInput = this.element('input', ['fieldInput', 'qtyInput', 'varField'], {name: 'qty[]', type: 'number'})
        const qtyTitle = this.element('span', [], {}, 'quantity')
        const fileInput = this.element('input', ['hidden', 'variantImages'], {name: `variant-images-${variantsLength}[]`, type: 'file', multiple: 'multiple', accept: '.png, .jpg, .jpeg, .webp, .gif'})
        const addImage = this.element('span', ['addVariantImage'], {}, '<p>Add image</p>')
        const imagesContainer = this.element('div', ['variantImagesContainer'])

        function triggerInputFile() {
            fileInput.click()
        }

        fileInput.addEventListener('change', this.InputImageChangeHandler)
        addImage.querySelector('p').addEventListener('click', triggerInputFile)
        addImage.append(imagesContainer)

        variantField.append(hiddenInput, spanTitle, addImage, fileInput, priceTitle, priceInput, qtyTitle, qtyInput, hiddenOptionsInput)

        variantsParent.append(variantField)
        variantsContainer.classList.remove('hidden')
    }

    createVariant = () => {
        for (let firstEl of this.opt1) {
            if (this.opt2.length) {
                for (let secondEl of this.opt2) {
                    if (this.opt3.length) {
                        for (let thirdEl of this.opt3) {
                            const variantTitle = firstEl + '/' + secondEl + '/' + thirdEl
                            let variantOptions = ''
                            variantOptions += firstEl
                            variantOptions += `, ${secondEl}`
                            variantOptions += `, ${thirdEl}`

                            if (!this.variantsFields.includes(variantTitle)) {
                                this.variantsFields.push(variantTitle)
                                const variantsLength = this.variantsFields.length

                                this.createVariantField(variantTitle, variantOptions, variantsLength)
                            }
                        }
                    } else {
                        const variantTitle = firstEl + '/' + secondEl
                        let variantOptions = ''
                        variantOptions += firstEl
                        variantOptions += `, ${secondEl}`

                        if (!this.variantsFields.includes(variantTitle)) {
                            this.variantsFields.push(variantTitle)
                            const variantsLength = this.variantsFields.length

                            this.createVariantField(variantTitle, variantOptions, variantsLength)
                        }
                    }
                }
            } else {
                const variantTitle = firstEl
                let variantOptions = ''
                variantOptions += firstEl

                if (!this.variantsFields.includes(variantTitle)) {
                    this.variantsFields.push(variantTitle)
                    const variantsLength = this.variantsFields.length

                    this.createVariantField(variantTitle, variantOptions, variantsLength)
                }
            }

        }
    }

    deleteOptValue = (e) => {
        const element = e.currentTarget
        const option = element.dataset.option
        const parent = element.closest('.optionsValuesWrapper')
        const optionsParent = parent.closest('.optionsValues')
        const deleteArg = parent.querySelector('.deleteOptValue').dataset.value

        if (optionsParent.querySelectorAll('.optionsValuesWrapper').length === 2) {
            optionsParent.append(this.inputWrapper(option))
        }

        parent.remove()
        this.deleteVariant(deleteArg)
        this.deleteArrayOpt(deleteArg, option)
    }

    deleteArrayOpt = (deleteArg, option) => {
        var valuesArray = ''

        if (option === '1') {
            valuesArray = this.opt1
        } else if (option === '2') {
            valuesArray = this.opt2
        } else if (option === '3') {
            valuesArray = this.opt3
        }

        const deleteIndex = valuesArray.indexOf(deleteArg)

        valuesArray.splice(deleteIndex, 1)

        this.variantsFields = this.variantsFields.filter(el => !el.includes(deleteArg))
    }

    deleteVariant = (deleteArg) => {
        const variantConntainer = document.querySelector('.productVariants')
        const fields = document.querySelectorAll('.variantField')

        fields.forEach(el => {
            const title = el.querySelector('.variantTitle').innerHTML

            if (title.includes(deleteArg)) {
                el.remove()
            }
        })

        if(!fields.length) {
            variantConntainer.classList.add('hidden')
        }
    }

    checkOptForEmptiness = (e) => {
        if (!e.currentTarget.value) {
            this.deleteOptValue(e)
        }
    }

    inputWrapper = (dataOpt) => {
        const icon = icons('trash')

        const inputWrapper = this.element('div', ['optionsValuesWrapper'])
        const deleteOptIcon = this.element('div', ['deleteOptValue'], {'data-option': dataOpt}, icon)
        const input = this.element('input', ['optionsValue', 'fieldInput'], {'data-option': dataOpt, name:`option-${dataOpt}[]`})

        deleteOptIcon.addEventListener('click', this.deleteOptValue)
        input.addEventListener('change', this.addOptValue)
        input.addEventListener('input', this.checkOptForEmptiness)

        inputWrapper.append(input)
        inputWrapper.append(deleteOptIcon)

        return inputWrapper
    }

    addOptValue = (e) => {
        const currentInput = e.currentTarget
        const inputValue = e.currentTarget.value
        const dataOpt = e.currentTarget.dataset.option
        const parent = currentInput.closest('.optionsValues')
        const inputParent = currentInput.closest('.optionsValuesWrapper')
        var valuesArray = ''

        const inputWrapper = this.inputWrapper(dataOpt)

        const buttonPerInput = inputParent.querySelector('.deleteOptValue')

        if (buttonPerInput.dataset.value) {
            if (inputValue !== buttonPerInput.dataset.value) {
                const deleteArg = buttonPerInput.dataset.value

                this.deleteVariant(deleteArg)
                this.deleteArrayOpt(deleteArg, dataOpt)
            }
        }

        if (dataOpt === '1') {
            valuesArray = this.opt1
        } else if (dataOpt === '2') {
            valuesArray = this.opt2
        } else if (dataOpt === '3') {
            valuesArray = this.opt3
        }

        buttonPerInput.dataset.value = inputValue

        if (parent.lastChild.querySelector('.optionsValue').value) {
            parent.append(inputWrapper)
        }

        if (!inputValue) {
            return
        }

        valuesArray.push(inputValue)
        this.createVariant()
    }

    check = () => {
        document.querySelectorAll('.optionsValue').forEach(el => {
            el.addEventListener('change', this.addOptValue)
        })
    }

    addOption = () => {
        const optionFields = document.querySelector('.optionFields')

        if (optionFields.firstChild) {
            const lastChild = optionFields.lastChild
            const value = lastChild.querySelector('.optionsValue').value

            if (!value) {
                return
            }
        }

        if (this.state.options < 3) {
            this.setState({
                options: this.state.options + 1
            }, () => {
                this.check()
            })
        }
    }

    render() {
        return <div className={'createProduct'}>
            <img className='createProduct-Background' src={require('../../Pictures/bg_admin.png')} alt=""/>

            <div className='createProduct-formContent'>
                <form id='addProduct'>
                    <div className="productDescription">
                        <div className="basicProductFields">
                            <div className="productField">
                                <span className='fieldTitle'>Product name</span>
                                <input className='fieldInput' type='text' name='product_name'/>
                            </div>

                            <div className="productField">
                                <span className='fieldTitle'>Collection</span>
                                <input className='fieldInput' type='text' name='collection'/>
                            </div>

                            <div className="productField">
                                <span className='fieldTitle'>Price</span>
                                <input className='fieldInput' type='text' name='prod_price'/>
                            </div>
                        </div>

                        <div className="productPhotos">
                            <input type="file" onChange={this.productImagesChangeHandler} name="productImages[]" multiple className="hidden productImageInput" accept=".png, .jpg, .jpeg, .gif"/>

                            <h2>Add product images</h2>

                            <div className="productPhotos_plus" onClick={this.addProductImage}>
                                +
                            </div>

                            <div className="productPhotos_container">

                            </div>
                        </div>
                    </div>

                    <div className={'productOptions'}>
                        <h2>Options</h2>

                        <div className="addOption">
                            <button type='button' className='stripBtn addOption-btn' onClick={this.addOption}>
                                &#43;
                            </button>

                            <span>Add options for your product</span>
                        </div>

                        <div className={'optionFields'}>
                            {Array.apply(0, Array(this.state.options)).map((u, i) => {
                                return Option({key: i + 1, checkOptForEmptiness: this.checkOptForEmptiness});
                            })}
                        </div>
                    </div>

                    <div className='productVariants hidden'>
                        <h2>Variants</h2>
                    </div>

                    <button onClick={this.handleButtonClick} className='productSubmit btn'>
                        Save
                    </button>
                </form>
            </div>
        </div>
    }
}

export default Products