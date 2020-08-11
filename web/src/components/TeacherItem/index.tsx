import React from "react";

import whatsappIcon from "../../assets/images/icons/whatsapp.svg";

import api from "../../services/api";

import "./styles.css";

export interface Teacher {

    id: number;
    name: string;
    avatar: string;
    whatsapp: string;
    bio: string;
    subject: string;
    cost: string;

}

interface TeacherItemProps {

    teacher: Teacher;

}

const TeacherItem: React.FC<TeacherItemProps> = ( { teacher }) => {

    function createNewConnection(){

        api.post("connections", {

            user_id: teacher.id,

        });

    }

    return (

        <article className = "teacher-item">

            <header>

                <img src = { teacher.avatar } alt = "Foto de perfil" />

                <div>

                    <strong>

                        { teacher.name }

                    </strong>

                    <span>

                        { teacher.subject }

                    </span>

                </div>

            </header>

            <p>

                { teacher.bio }

            </p>

            <footer>

                <p>

                    Preço/hora:

                    <strong>

                        R$ { teacher.cost }

                    </strong>

                </p>

                <a 
                
                    target = "_blank" // Faz com que a página do Whatsapp seja aberta em outra página.
                    onClick = { createNewConnection } 
                    href = {`https://wa.me/${teacher.whatsapp}`}  >

                    <img src = { whatsappIcon } alt = "Ícone do Whatsapp"/>

                    Entrar em contato

                </a>

            </footer>

        </article>

    );

}

export default TeacherItem;