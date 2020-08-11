import React, { InputHTMLAttributes } from "react";

import "./styles.css";

// InputHTMLAttributes -> Faz com que o componente herde todas as características do Input.
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
    
    name: string;
    label: string;

}

// Function Component
const Input: React.FC<InputProps>  = ( { name, label, ...rest } ) => { // ...rest -> seriam todas as funcionalidades não citadas.

    return (

        <div className = "input-block">
                        
            <label htmlFor = { name }> { label } </label>

            <input type = "text" id = { name } {...rest} />

        </div> 

    );

}

export default Input;