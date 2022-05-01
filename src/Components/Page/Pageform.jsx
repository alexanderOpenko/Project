import React from 'react';
import { Field, reduxForm} from "redux-form";
import s from './Page.module.css'

export const required = (value) => {
    if (value) return undefined;
    return "Виберіть розмір";
}


const Select = (field) => {
   
   const hasError = field.meta.touched && field.meta.error;
    return<div >
    <select {...field.input} className={s.salePagesSelect} >
        {field.size.map( el =>{return <option value={el}>
            {el}
        </option>})} 
    </select>  
        <div>  {hasError ? 
            <span className ={s.selectError}>{field.meta.error}</span> : ''}
        </div>
        </div>            
}

const PageForm = (props) => {
   
return <div>
<form onSubmit={props.handleSubmit}>   
<Field 
    component={Select} 
    size={props.size}  name='size' 
    validate={[required]} 
/>  
<button>
    Придбати
</button>
</form>
</div>
}

export default  reduxForm({form: 'bay-form'})(PageForm);
/*()=> {
return  props.size.map(elem => { 
    return <td><input id={elem} type='checkbox' value ={elem} />
<label for={elem}> {elem}</label></td>})
}*/