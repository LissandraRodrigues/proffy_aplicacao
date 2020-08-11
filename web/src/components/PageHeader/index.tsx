import React from "react";

import { Link } from "react-router-dom";

import backIcon from "../../assets/images/icons/back.svg";

import logoImg from "../../assets/images/logo.svg";

import "./styles.css";

// Propriedades do Page Header.
interface PageHeaderProps {

    // Por default, é obrigatória.
    title: string;
    description?: string; // O ponto de interrogação faz com que a descrição não seja obrigatória.

}

// FC -> Function Component.

const PageHeader: React.FC<PageHeaderProps> = (props) => {

    return (

        <header className = "page-header">

                <div className = "top-bar-container"> 
                
                    <Link to = "/">
                    
                        <img src = { backIcon } alt = "Voltar"/>

                    </Link>

                    <img src = { logoImg } alt = "Proffy" />
                    
                </div>

                <div className = "header-content">

                    <strong>

                        { props.title }

                    </strong>

                    { props.description && <p> { props.description } </p> } {/* O p só acontece se a condição antes de && for true (ter conteúdo) */}

                    { props.children }

                </div>

           </header>

    );

}

export default PageHeader;