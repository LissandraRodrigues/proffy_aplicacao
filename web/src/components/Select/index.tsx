import React, { SelectHTMLAttributes } from "react";

import "./styles.css";

// SelectHTMLAttributes -> Faz com que o componente herde todas as características do Select.
interface SelectProps extends SelectHTMLAttributes<HTMLSelectElement> {
    
    name: string;
    label: string;
    options: Array<{ // options tem como tipo, object

        value: string;
        label: string;

    }>;

}

// Function Component
const Select: React.FC<SelectProps>  = ( { name, label, options, ...rest } ) => { // ...rest -> seriam todas as funcionalidades não citadas.

    return (

        <div className = "select-block">
                        
            <label htmlFor = { name }> { label } </label>

            <select value = "" id = { name } { ...rest } > 

                <option value = "" disabled hidden > Selecione uma opção </option>
                
                { options.map(option => {
                    
                    // key é como se fosse um identificador único do React. Necessário quando trabalhamos com array e map e se não tiver, dá erro.
                    return <option key = { option.value } value = { option.value }> { option.label } </option>

                }) }
                
            </select>

        </div> 

    );

}

export default Select;