import { Request, Response } from "express";

import db from "../database/connection";

import convertHourToMinutes from "../utils/convertHourToMinutes";

interface ScheduleItem {

    week_day: number;
    from: string;
    to: string;

}

export default class ClassesController {

    // Index normalmente é utilizado para listagem de itens.
    async index(request: Request, response: Response) {

        const filters = request.query;

        const subject = filters.subject as string;

        const week_day = filters.week_day as string;

        const time = filters.time as string;

        // alterei -> filters.week_day
        if (!week_day || !subject || !time){

            return response.status(400).json({

                error: "Missing filters to search classes"

            })

        }

        const timeInMinutes = convertHourToMinutes(time);

        const classes = await db("classes")

            .whereExists(function() {

                this.select("class_schedule.*")
                
                    .from("class_schedule")
                    .whereRaw("`class_schedule`.`class_id` = `classes`.`id`") // Busca o usuário da aula pelo o id.
                    .whereRaw("`class_schedule`.`week_day` = ??", [Number(week_day)]) // Verifica se o usuário dá aula no dia requisitado. // ?? -> referência a entrada de um parâmetro.
                    .whereRaw("`class_schedule`.`from` <= ??", [timeInMinutes]) // Verifica se início dispoível da aula é inferior ou igual ao procurado.
                    .whereRaw("`class_schedule`.`to` > ??", [timeInMinutes]) // Verifica se o término disponível da aula é superior ao procurado.

            })

            .where("classes.subject", "=", subject)
            .join("users", "classes.user_id", "=", "users.id")
            .select(["classes.*", "users.*"]); // * -> Todos os dados da tabela classes e users.

        return response.json(classes);
    }

    async create(request: Request, response: Response) {

        // Desestruturação.
        const {

            name,
            avatar,
            whatsapp,
            bio,
            subject,
            cost,
            schedule,

        } = request.body;

        // Faz com que, caso alguma parte da inserção falhe, tudo que já tinha ido, ser deletado.
        const trx = await db.transaction();

        try {


            // Usuário ou Professor.
            const insertedUsersIds = await trx("users").insert({  

                name,
                avatar,
                whatsapp,
                bio,

            });

            const user_id = insertedUsersIds[0];

            // Aula do professor.
            const insertedClassesIds = await trx("classes").insert({

            subject,
            cost,
            user_id,  

            });

            const class_id = insertedClassesIds[0]; 

            // Horário das aulas do professor.
            const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {

                return {

                    class_id,

                    week_day: scheduleItem.week_day,

                    from: convertHourToMinutes(scheduleItem.from),

                    to: convertHourToMinutes(scheduleItem.to),

                };

            })

            await trx("class_schedule").insert(classSchedule);

            // Inseri tudo no banco de dados.
            await trx.commit();

            // 201 -> significa armazenado com sucesso.
            return response.status(201).send();

        } catch (err) {

            // Desfaz qualquer alteração que tenha acontecido no BD.
            await trx.rollback();

            return response.status(400).json({

                error: "Unexpected error while creating new class" 

            })

        }

    };

}