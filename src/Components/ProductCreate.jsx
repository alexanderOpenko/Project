import React, {useEffect} from "react";

const Option = (props) => {

    return <div key={props.key}>
        <span>Option name</span>
        <input name="option_name"/>

        <div className={'optionsValues'}>
            <span>Option values</span>

            <input name="option_value" className={'optionsValue'}/>
        </div>
    </div>
}

class ProductCreate extends React.Component {
    constructor(props) {
        super(props);

        this.state = {
          options: 0
        }
    }

    addOptValue = (e) => {
        const currentInput = e.currentTarget
        const parent = currentInput.closest('.optionsValues')
        const input = document.createElement("input")
        input.classList.add('optionsValue')
        input.addEventListener('change', this.addOptValue)

        if (currentInput.value) {
            parent.append(input)
        } else {
            currentInput.remove()
        }
    }

    check = () => {
        document.querySelectorAll('.optionsValue').forEach(el => {
            el.addEventListener('change', this.addOptValue)
        })
    }

    addOption = () => {
        if (this.state.options < 3) {
            this.setState({
                options: this.state.options + 1
            }, () => {  this.check()})
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

                    {Array.apply(0, Array(this.state.options)).map(function (u, i)  {
                        return Option({key:i});
                    })}
                </div>

                <div className={"Variants"}>
                </div>

            </form>
        </div>

    }
}

export default ProductCreate;