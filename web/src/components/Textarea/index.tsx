import React, { TextareaHTMLAttributes } from "react";

import "./styles.css";

// TextareaHTMLAttributes -> Faz com que o componente herde todas as características do Textarea.
interface TextareaProps extends TextareaHTMLAttributes<HTMLTextAreaElement> {
    
    name: string;
    label: string;

}

// Function Component
const Textarea: React.FC<TextareaProps>  = ( { name, label, ...rest } ) => { // ...rest -> seriam todas as funcionalidades não citadas.

    return (

        <div className = "textarea-block">
                        
            <label htmlFor = { name }> { label } </label>

            <textarea id = { name } {...rest} />

        </div> 

    );

}

export default Textarea;