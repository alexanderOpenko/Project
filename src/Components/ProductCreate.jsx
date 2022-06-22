import React from "react";

const Option = (props) => {
    return <div className={'optionField'} key={props.key}>
        <span>Option name</span>
        <input name="option_name[]"/>

        <div className={'optionsValues'}>
            <span>Option values</span>

            <div className={'optionsValuesWrapper'}>
                <input data-option={props.key} onChange={props.checkOptForEmptiness} className={'optionsValue'}/>
                <button type='button' data-option={props.key} onClick={props.deleteOptValue}
                        className='deleteOptValue'>-
                </button>
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
                console.log('Success:', result)
            })
    }

    setOptionNames = () => {
        const selects = document.querySelectorAll('.hiddenSelectWithOptions')

        selects.forEach((el, i) => {
            el.setAttribute('name', 'options-' + (i + 1) + '[]')
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

        const variantField = this.element('fieldset', ['variantField'],{name: 'variant_field'})
        const hiddenInput = this.element('input',[], {type: 'hidden', value: variantTitle, name: 'modification[]'})
        const hiddenSelect = this.element('select', ['hiddenSelectWithOptions'],{name: 'options-', multiple: 'multiple'})
        const spanTitle = this.element('span', ['variantTitle'], {}, variantTitle)
        const priceInput = this.element('input', [], {name:'price', type:'number'})
        const qtyInput = this.element('input', [], {name:'qty', type:'number'})

        variantOptions.forEach(el => {
            const opt = this.element('option', [], {value: el, selected: 'selected'}, el)

            hiddenSelect.append(opt)
        })

        variantField.append(hiddenInput, spanTitle, priceInput, qtyInput, hiddenSelect)

        variantsParent.append(variantField)

        this.setOptionNames()
    }

    createVariant = () => {
        for (let firstEl of this.opt1) {
            if (this.opt2.length) {
                for (let secondEl of this.opt2) {
                    if (this.opt3.length) {
                        for (let thirdEl of this.opt3) {
                            const variantTitle = firstEl + '/' + secondEl + '/' + thirdEl
                            const variantOptions = []
                            variantOptions.push(firstEl)
                            variantOptions.push(secondEl)
                            variantOptions.push(thirdEl)

                            if (!this.variantsFields.includes(variantTitle)) {
                                this.variantsFields.push(variantTitle)
                                const variantsLength = this.variantsFields.length

                                this.createVariantField(variantTitle, variantOptions, variantsLength)
                            }
                        }
                    } else {
                        const variantTitle = firstEl + '/' + secondEl
                        const variantOptions = []
                        variantOptions.push(firstEl)
                        variantOptions.push(secondEl)

                        if (!this.variantsFields.includes(variantTitle)) {
                            this.variantsFields.push(variantTitle)
                            const variantsLength = this.variantsFields.length

                            this.createVariantField(variantTitle, variantOptions, variantsLength)
                        }
                    }
                }
            } else {
                const variantTitle = firstEl
                const variantOptions = []
                variantOptions.push(firstEl)

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
        const deleteArg = parent.querySelector('button').dataset.value

        if (optionsParent.querySelectorAll('.optionsValuesWrapper').length === 1) {
            if (!optionsParent.querySelector('.optionsValuesWrapper').querySelector('.optionsValue').value) {
                optionsParent.append(this.inputWrapper(option))
            }
        }

        parent.remove()
        this.deleteVariant(deleteArg)
        this.deleteArrayOpt(deleteArg, option)

        this.setOptionNames()
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

        this.variantsFields = this.variantsFields.filter( el => !el.includes(deleteArg))
        console.log(this.variantsFields, 'this.variantsFields')
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
        const inputWrapper = this.element('div', ['optionsValuesWrapper'])
        const button = this.element('button', ['deleteOptValue'], {type: 'button', 'data-option': dataOpt}, '&#8856;')
        const input = this.element('input', ['optionsValue'], {'data-option': dataOpt})

        button.addEventListener('click', this.deleteOptValue)
        input.addEventListener('change', this.addOptValue)
        input.addEventListener('input', this.checkOptForEmptiness)
        inputWrapper.append(input)
        inputWrapper.append(button)

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

        const buttonPerInput = inputParent.querySelector('button')

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
            <form id='addProduct'>
                <div className="productField">
                    <span>Product name</span>
                    <input type='text' name='product_name'/>
                </div>

                <div className="productField">
                    <span>collection</span>
                    <input type='text' name='colletion'/>
                </div>

                <div className="productField">
                     <span>Price</span>
                     <input type='text' name='prod_price'/>
                </div>

                <div className={'productOptions'}>
                    <h2>Options</h2>

                    <p>Add options for your product</p>
                    <button type='button' onClick={this.addOption}>
                        +
                    </button>

                    <div className={'optionFields'}>
                        {Array.apply(0, Array(this.state.options)).map((u, i) => {
                            return Option({key: i + 1, checkOptForEmptiness: this.checkOptForEmptiness});
                        })}
                    </div>
                </div>

                <div className={"productVariants"}>

                </div>

                <button onClick={this.handleButtonClick} className='productSubmit'>
                    submit
                </button>
            </form>
        </div>
    }
}

export default ProductCreate;

