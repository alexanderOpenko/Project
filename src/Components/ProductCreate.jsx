import React from "react";

const Option = (props) => {
    return <div className={'optionField'} key={props.key}>
        <span>Option name</span>
        <input name="option_name[]"/>

        <div className={'optionsValues'}>
            <span>Option values</span>

            <input data-option={props.key} className={'optionsValue'}/>
        </div>
    </div>
}

const Variant = (props) => {
    return <div className={'variantField'}>
        <input type="hidden" value={props.title}/>
        <span>{props.title}</span>
        <input name='price'/>
        <input name='qty'/>
    </div>
}

class ProductCreate extends React.Component {
    opt1 = []
    opt2 = []
    opt3 = []

    constructor(props) {
        super(props);
        this.state = {
            options: 0,
        }
    }

    createVariant = (value, firstOptions, secondOptions) => {
        console.log('createvariant')
        var variants = []

        // function createVariant() {
        //     const variantsParent = document.querySelector('.productVariants')
        //
        //     variantsParent.append()
        // }

        if (!firstOptions.length && !secondOptions.length) {
            variants.push(value)
            //createVariant()
            console.log(variants)
            return
        }

        if (this.opt1.length === 1 && this.opt2.length === 1 && this.opt3.length === 1) {
            const singleVariant = this.opt1.concat(this.opt2, this.opt3).join('/')
            variants.push(singleVariant)
            //createVariant(singleVariant)
            return;
        }

        if (firstOptions.length) {
           firstOptions.map(el => {
                return variants.push(value + '/' + el) //not push, send to create 2opt variant
            })
        }

        if (secondOptions.length) {
           for (let i = 0, length = variants.length; i < length; i++) {
               secondOptions.map(el => {
                 return variants.push(variants[i] + '/' + el) //create 3opt variant, and remove 2opt variant
               })
           }
        }
       console.log(variants)
    }

    addOptValue = (e) => {
        const currentInput = e.currentTarget
        const dataOpt = e.currentTarget.dataset.option

        const parent = currentInput.closest('.optionsValues')
        const input = document.createElement("input")

        input.classList.add('optionsValue')
        input.dataset.option = dataOpt
        input.addEventListener('change', this.addOptValue)

        //add or remove input
        if (currentInput.value) {
            parent.append(input)
        } else {
            currentInput.remove()
        }

        //set values in arrays
        if (dataOpt === '1') {
            this.opt1.push(currentInput.value)
            this.createVariant(currentInput.value,  this.opt2, this.opt3)
        } else if (dataOpt === '2') {
            this.opt2.push(currentInput.value)
            this.createVariant(currentInput.value,  this.opt1, this.opt3)
        } else if (dataOpt === '3') {
            this.opt3.push(currentInput.value)
            this.createVariant(currentInput.value,  this.opt1, this.opt2)
        }
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
            <form>
                <span>Product name</span>
                <input type={'text'} name={'product_name'}/>

                <div className={'productOptions'}>
                    <h2>Options</h2>

                    <p>Add options for your product</p>
                    <button type='button' onClick={this.addOption}>
                        +
                    </button>

                    <div className={'optionFields'}>
                        {Array.apply(0, Array(this.state.options)).map(function (u, i) {
                            return Option({key: i + 1});
                        })}
                    </div>
                </div>

                <div className={"productVariants"}>

                </div>
            </form>
        </div>
    }
}

export default ProductCreate;