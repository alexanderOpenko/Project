import React from "react";
import $ from "jquery";

const Option = (props) => {
    return <div className={'optionField'} key={props.key}>
        <span>Option name</span>
        <input name="option_name[]"/>

        <div className={'optionsValues'}>
            <span>Option values</span>

            <div className={'optionsValuesWrapper'}>
                <input data-option={props.key} onChange={props.checkOptForEmptiness} className={'optionsValue'}/>
                <button type='button' data-option={props.key} onClick={props.deleteOptValue} className='deleteOptValue'>-</button>
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
        const data = new FormData(form);

        let obj = {};
        for (let [key, value] of data) {
            if (obj[key] !== undefined) {
                if (!Array.isArray(obj[key])) {
                    obj[key] = [obj[key]];
                }
                obj[key].push(value);
            } else {
                obj[key] = value;
            }
        }

    }

    createVariantField = (variantTitle) => {
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

        const variantField = document.createElement('div')
        const hiddenInput = document.createElement('input')
        const spanTitle = document.createElement('span')
        const priceInput = document.createElement('input')
        const qtyInput = document.createElement('input')

        variantField.classList.add('variantField')
        hiddenInput.setAttribute('type', 'hidden')
        hiddenInput.setAttribute('value', variantTitle)
        hiddenInput.setAttribute('name', 'modification[]')
        spanTitle.classList.add('variantTitle')
        spanTitle.innerHTML = variantTitle
        priceInput.setAttribute('name', 'price')
        priceInput.setAttribute('type', 'number')
        qtyInput.setAttribute('name', 'qty')
        qtyInput.setAttribute('type', 'number')

        variantField.append(hiddenInput, spanTitle, priceInput, qtyInput)

        variantsParent.append(variantField)
    }

    createVariant = () => {
        for (let firstEl of this.opt1) {
            if (this.opt2.length) {
                for (let secondEl of this.opt2) {
                    if (this.opt3.length) {
                        for (let thirdEl of this.opt3) {
                            const variantTitle = firstEl + '/' + secondEl + '/' + thirdEl

                            if (!this.variantsFields.includes(variantTitle)) {
                                this.variantsFields.push(variantTitle)
                                this.createVariantField(variantTitle)
                            }
                        }
                    } else {
                        const variantTitle = firstEl + '/' + secondEl

                        if (!this.variantsFields.includes(variantTitle)) {
                            this.variantsFields.push(variantTitle)
                            this.createVariantField(variantTitle)
                        }
                    }
                }
            } else {
                const variantTitle = firstEl

                if (!this.variantsFields.includes(variantTitle)) {
                    this.variantsFields.push(variantTitle)
                    this.createVariantField(variantTitle)
                }
            }

        }
    }

    deleteOptValue = (e) => {
        const element = e.currentTarget
        const valuesArrayIndex = element.dataset.option
        const parent = element.closest('.optionsValuesWrapper')
        const deleteArg = parent.querySelector('button').dataset.value

        parent.remove()
        this.deleteVariant(deleteArg)
        this.deleteArrayOpt(deleteArg, valuesArrayIndex)
    }

    checkOptForEmptiness = (e) => {
        if (!e.currentTarget.value) {
            this.deleteOptValue(e)
        }
    }

    deleteArrayOpt = (deleteArg, index) => {
        const variantsToDelete = []
        var valuesArray = ''

        if (index === '1') {
            valuesArray = this.opt1
        } else if (index === '2') {
            valuesArray = this.opt2
        } else if (index === '3') {
            valuesArray = this.opt3
        }

        const deleteIndex = valuesArray.indexOf(deleteArg)

        valuesArray.splice(deleteIndex, 1)

        this.variantsFields.forEach(el => {
            if (el.includes(deleteArg)) {
                variantsToDelete.push(el)
            }
        })

        for(let i = 0; i < variantsToDelete.length; i++) {
            const value = variantsToDelete[i]
            const deleteIndex = this.variantsFields.indexOf(value)

            this.variantsFields.splice(deleteIndex, 1)
        }
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

    addOptValue = (e) => {
        const currentInput = e.currentTarget
        const inputValue = e.currentTarget.value
        const dataOpt = e.currentTarget.dataset.option
        const parent = currentInput.closest('.optionsValues')
        const inputParent = currentInput.closest('.optionsValuesWrapper')

        const inputWrapper = document.createElement("div")
        const button = document.createElement("button")
        const input = document.createElement("input")
        var valuesArray = ''

        inputWrapper.classList.add('optionsValuesWrapper')
        button.classList.add('deleteOptValue')
        button.setAttribute('type', 'button')
        button.dataset.option = dataOpt
        button.innerHTML = '-'
        button.addEventListener('click', this.deleteOptValue)
        inputWrapper.append(input)
        inputWrapper.append(button)
        input.classList.add('optionsValue')
        input.dataset.option = dataOpt
        input.addEventListener('change', this.addOptValue)
        input.addEventListener('input', this.checkOptForEmptiness)

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
                <span>Product name</span>
                <input type={'text'} name={'product_name'}/>

                <div className={'productOptions'}>
                    <h2>Options</h2>

                    <p>Add options for your product</p>
                    <button type='button' onClick={this.addOption}>
                        +
                    </button>

                    <div className={'optionFields'}>
                        {Array.apply(0, Array(this.state.options)).map( (u, i) => {
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