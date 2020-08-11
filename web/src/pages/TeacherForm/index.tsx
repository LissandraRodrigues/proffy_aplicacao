import React, { useState, FormEvent } from "react";
import { useHistory } from "react-router-dom";

import Input from "../../components/Input";
import PageHeader from "../../components/PageHeader";
import Select from "../../components/Select";
import Textarea from "../../components/Textarea";

import warningIcon from "../../assets/images/icons/warning.svg"

import api from "../../services/api";

import "./styles.css";

function TeacherForm() {
    
    // Para direcionar o usuário após o cadastro.
    const history = useHistory();

    const [ name, setName ] = useState("");
    const [ avatar, setAvatar ] = useState("");
    const [ whatsapp, setWhatsapp ] = useState("");
    const [ bio, setBio ] = useState("");

    const [ subject, setSubject ] = useState("");
    const [ cost, setCost ] = useState("");

    const [ scheduleItems, setScheduleItems ] = useState([

        // Valor original de cada horário.
        {

            week_day: 0,
            from: "",
            to: "",

        }

    ]);

    function addNewScheduleItem() {

        setScheduleItems([

            // Horário anterior.
            ...scheduleItems,

            // Novo horário.
            {

                week_day: 0,
                from: "",
                to: "",
    
            }

        ]);

    }

    function setScheduleItemValue(position: number, field: string, value: string) {

        const updatedScheduleItems = scheduleItems.map((scheduleItem, index) => {

            if (index === position) {

                // Retorna o array com o week_day alterado.
                return { ...scheduleItem, [field]: value };

            }

            return scheduleItem;

        })

        setScheduleItems(updatedScheduleItems);

    }

    function handleCreateClass(e: FormEvent) {
        
        // e-> evento

        e.preventDefault();

        api.post("classes", {

            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost: Number(cost),
            schedule: scheduleItems

        }).then(() => {

            alert("Cadastro realizado com sucesso!");

            // Envia o usuário para a Home após o cadastro.
            history.push("/");

        }).catch(() => {

            alert("Erro ao cadastrar!");

        })

    } 

    return (

        <div id = "page-teacher-form" className = "container">

            <PageHeader 
            
                title = "Que incrível que você quer dar aulas"
                description = "O primeiro passo é preencher esse formulário de inscrição."

            />

            <main>

                <form onSubmit = { handleCreateClass } >

                    <fieldset>

                        <legend>

                            Seus dados

                        </legend>

                        <Input
                        
                            name = "name"
                            label = "Nome completo"
                            value = { name }
                            onChange = {(e) => { setName(e.target.value) }}
                        
                        />

                        <Input
                        
                            name = "photo"
                            label = "Foto de perfil (URL)"
                            placeholder = "https://"
                            value = { avatar }
                            onChange = {(e) => { setAvatar(e.target.value) }}
                        
                        />

                        <Input
                        
                            name = "whatsapp"
                            label = "WhatsApp"
                            value = { whatsapp }
                            onChange = {(e) => { setWhatsapp(e.target.value) }}
                        
                        />

                        <Textarea

                            name = "bio"
                            label = "Biografia"
                            value = { bio }
                            onChange = {(e) => { setBio(e.target.value) }}

                        />

                    </fieldset>

                    <fieldset>

                        <legend>

                            Sobre a aula

                        </legend>

                        <Select
                        
                            name = "subject"
                            label = "Matéria"
                            value = { subject }
                            onChange = {(e) => { setSubject(e.target.value) }}
                            options = {[

                                { value: "Artes", label: "Artes" },
                                { value: "Biologia", label: "Biologia" },
                                { value: "Educação Física", label: "Educação Física" },
                                { value: "História", label: "História" },
                                { value: "Geografia", label: "Geografia" },
                                { value: "Filosofia", label: "Filosofia" },
                                { value: "Sociologia", label: "Sociologia" },
                                { value: "Português", label: "Português" },
                                { value: "Redação", label: "Redação" },
                                { value: "Inglês", label: "Inglês" },
                                { value: "Espanhol", label: "Espanhol" },
                                { value: "Física", label: "Física" },
                                { value: "Química", label: "Química" },
                                { value: "Matemática", label: "Matemática" },
                                
                            ]}
                        
                        />

                        <Input
                        
                            name = "cost"
                            label = "Custo da sua hora por aula"
                            placeholder = "R$"
                            value = { cost }
                            onChange = {(e) => { setCost(e.target.value) }}
                        
                        />

                    </fieldset>

                    <fieldset>

                        <legend>

                            Horários disponíveis

                            <button type = "button" onClick = { addNewScheduleItem } >

                                + Novo horário

                            </button>

                        </legend>
                        
                        {/* O index retorna a posição no array. */}
                        { scheduleItems.map((scheduleItem, index) =>  { 

                            return (

                                <div key = { scheduleItem.week_day } className = "schedule-item">

                                    <Select
                                    
                                        name = "week_day"
                                        label = "Dia da semana"
                                        value = { scheduleItem.week_day } // No dele estava 'scheduleItem', pode dar erro.
                                        onChange = { e => setScheduleItemValue(index, "week_day", e.target.value) }
                                        options = {[

                                            { value: "0", label: "Domingo" },
                                            { value: "1", label: "Segunda-feira" },
                                            { value: "2", label: "Terça-feira" },
                                            { value: "3", label: "Quarta-feira" },
                                            { value: "4", label: "Quinta-feira" },
                                            { value: "5", label: "Sexta-Feira" },
                                            { value: "6", label: "Sábado" },
                                            
                                        ]}
                                
                                    />

                                    <Input
                                    
                                        name = "from" label = "De"
                                        type = "time"
                                        value = { scheduleItem.from } // No dele estava 'scheduleItem', pode dar erro.
                                        onChange = { e => setScheduleItemValue(index, "from", e.target.value) }
                                     
                                    />

                                    <Input
                                    
                                        name = "to" label = "Até" 
                                        type = "time"
                                        value = { scheduleItem.to } // No dele estava 'scheduleItem', pode dar erro.
                                        onChange = { e => setScheduleItemValue(index, "to", e.target.value) }
                                    
                                    />

                                    {/* state -> para manipular um valor */} 
                                    {/* React -> interface declarativa, montada a partir do JS */} 

                                </div>  

                            );

                        })}

                    </fieldset>

                    <footer>

                    <p>

                        <img src = { warningIcon } alt = "Aviso importante"/>

                        Importante! <br />
                        Preencha todos os dados.

                    </p>

                    <button type = "submit">

                        Salvar cadastro

                    </button>

                </footer>

                </form>

            </main>

        </div>

    )

}

export default TeacherForm;