import React, {useEffect} from "react";
import icons from "../Pictures/icons";

const Option = (props) => {
    return <div className='optionField' key={props.key}>
        <div className="productField">
            <span className='fieldTitle'>Option name</span>
            <input className='fieldInput' name="option_name[]"/>
        </div>

        <div className='optionsValues'>
            <span className='fieldTitle'>Option values</span>

            <div className='optionsValuesWrapper'>
                <input data-option={props.key} onChange={props.checkOptForEmptiness} className='optionsValue fieldInput'/>

                <div data-option={props.key} onClick={props.deleteOptValue}
                     className='deleteOptValue'
                >
                    <svg viewBox="0 0 20 20" className="trashIcon" focusable="false" aria-hidden="true"> <path d="M8 3.994c0-1.101.895-1.994 2-1.994s2 .893 2 1.994h4c.552 0 1 .446 1 .997a1 1 0 0 1-1 .997h-12c-.552 0-1-.447-1-.997s.448-.997 1-.997h4zm-3 10.514v-6.508h2v6.508a.5.5 0 0 0 .5.498h1.5v-7.006h2v7.006h1.5a.5.5 0 0 0 .5-.498v-6.508h2v6.508a2.496 2.496 0 0 1-2.5 2.492h-5c-1.38 0-2.5-1.116-2.5-2.492z"></path> </svg>
                </div>
            </div>
        </div>
    </div>
}

class ProductCreate extends React.Component {
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
        const form = document.querySelector('#addProduct');
        const dataForm = new FormData(form);

        let data = {};

        for (let [key, value] of dataForm) {
            if (data[key] !== undefined) {
                if (!Array.isArray(data[key])) {
                    data[key] = [data[key]];
                }
                data[key].push(value);
            } else {
                data[key] = value;
            }
        }

        fetch("http://localhost:8888/store/create_product.php", {
            method: "POST",
            credentials: 'include',
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: JSON.stringify(data)
        }).then((response) => response.json())
            .then((result) => {
                console.log(result, 'result')
            })
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

    changeHandler = (e) => {
        const elem = e.target
        const variant = elem.closest('.variantField')
        const variantImage = variant.querySelector('.variantImage')
        const file = elem.files[0]
        const imageField = variant.querySelector('.addVariantImage')
        const removeVarImage = variant.querySelector('.removeVariantImage')
        const reader = new FileReader()

        imageField.style.paddingTop = '11%'
        removeVarImage.style.display = 'block'
        variantImage.style.opacity = '1'

        reader.onload = ev => {
            const src = ev.target.result
            variantImage.setAttribute('src', `${src}`)
        }

        reader.readAsDataURL(file)
    }

    removeVariantImage = (e) => {
        e.stopPropagation();
        const elem = e.target
        const variant = elem.closest('.variantField')
        const variantImage = variant.querySelector('.variantImage')
        const imageField = variant.querySelector('.addVariantImage')
        const fileInput = variant.querySelector('.variantImages')

        variantImage.removeAttribute('src', )
        fileInput.value = ''
        //new DataTransfer
        imageField.style.paddingTop = '10px'
        elem.style.display = 'none'
        variantImage.style.opacity = '0'
    }

    createVariantField = (variantTitle, variantOptions) => {
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

        const variantField = this.element('fieldset', ['variantField'], {name: 'variant_field'})
        const hiddenInput = this.element('input', [], {type: 'hidden', value: variantTitle, name: 'modification[]'})
        const hiddenOptionsInput = this.element('input', ['hiddenInputWithOptions'], {
            name: 'options',
            value: variantOptions,
            multiple: 'multiple'
        })
        const spanTitle = this.element('span', ['variantTitle', 'varField'], {}, variantTitle)
        const priceInput = this.element('input', ['fieldInput', 'priceInput', 'varField'], {name: 'price', type: 'number'})
        const qtyInput = this.element('input', ['fieldInput', 'varField'], {name: 'qty', type: 'number'})
        const fileInput = this.element('input', ['hidden', 'variantImages'], {name: 'variant_images', type: 'file', accept: '.png, .jpg, .jpeg, .gif'})
        const variantImage = this.element('img', ['variantImage'])
        const addImage = this.element('span', ['addVariantImage', 'varField'], {}, 'Add image')
        const removeImage = this.element('span', ['removeVariantImage'], {}, '&times;')

        function triggerInputFile() {
            fileInput.click()
        }

       fileInput.addEventListener('change', this.changeHandler)
       addImage.addEventListener('click', triggerInputFile)
       addImage.append(variantImage, removeImage)
       removeImage.addEventListener('click', this.removeVariantImage)

        variantField.append(hiddenInput, spanTitle, addImage, fileInput, priceInput, qtyInput, hiddenOptionsInput)

        variantsParent.append(variantField)
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
        const fields = document.querySelectorAll('.variantField')

        fields.forEach(el => {
            const title = el.querySelector('.variantTitle').innerHTML

            if (title.includes(deleteArg)) {
                el.remove()
            }
        })
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
        const input = this.element('input', ['optionsValue', 'fieldInput'], {'data-option': dataOpt})

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
            <img className='createProduct-Background' src={require('../Pictures/bg_admin.png')} alt=""/>

            <div className='createProduct-formContent'>
                <form id='addProduct'>
                    <div className="productField">
                        <span className='fieldTitle'>Product name</span>
                        <input className='fieldInput' type='text' name='product_name'/>
                    </div>

                    <div className="productField">
                        <span className='fieldTitle'>Collection</span>
                        <input className='fieldInput' type='text' name='colletion'/>
                    </div>

                    <div className="productField">
                        <span className='fieldTitle'>Price</span>
                        <input className='fieldInput' type='text' name='prod_price'/>
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

                    <div className={"productVariants"}>
                        <h2>Variants</h2>

                        <div className='variantTitles'>
                            <div className='variantTitles-price varField'>Price</div>
                            <div className='varField'>Quantity</div>
                        </div>
                    </div>

                    <button onClick={this.handleButtonClick} className='productSubmit btn'>
                        Save
                    </button>
                </form>
            </div>
        </div>
    }
}

export default ProductCreate;

