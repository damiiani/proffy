import { Request, Response } from 'express'

import convertHourToMinutes from '../utils/convertHourToMinutes'
import db from '../database/connection'

interface ClassSchedule {
  week_day?: number
  subject?: string
  time?: string
}

interface ScheduleItem {
  week_day: number
  from: string
  to: string
  class_id: number
}

export default class ClassController {
  async create (req: Request, res: Response) {
    const {
      name, avatar, whatsapp, bio, subject, cost, schedule
    } = req.body

    const trx = await db.transaction()

    try {
      const [user_id] = await trx('users').insert({
        name, avatar, whatsapp, bio
      })

      const [class_id] = await trx('classes').insert({
        subject, cost, user_id
      })

      const classSchedule = schedule.map((scheduleItem: ScheduleItem) => {
        return {
          week_day: scheduleItem.week_day,
          from: convertHourToMinutes(scheduleItem.from),
          to: convertHourToMinutes(scheduleItem.to),
          class_id
        }
      })

      await trx('class_schedule').insert(classSchedule)

      await trx.commit()

      return res.status(201).json()
    } catch (err) {
      await trx.rollback()

      return res.status(400).json({ err: 'Unexpected error while creating a new class' })
    }
  }

  async index (req: Request, res: Response) {
    const { week_day, subject, time }: ClassSchedule = req.query

    if (!week_day || !subject || !time) {
      return res.status(400).json({ err: 'Missing filters to search classes' })
    }

    const timeInMinutes = convertHourToMinutes(time)

    console.log(timeInMinutes)

    const classes = await db('classes')
      .whereExists(function () {
        this.select('class_schedule.*')
          .from('class_schedule')

          .whereRaw('`class_schedule`.`week_day` = ??', [Number(week_day)])
          .whereRaw('`class_schedule`.`from` <= ??', [timeInMinutes])
          .whereRaw('`class_schedule`.`to` > ??', [timeInMinutes])

          .whereRaw('`class_schedule`.`class_id` = `classes`.`id`')
      })
      .where('classes.subject', '=', subject)
      .join('users', 'classes.user_id', '=', 'users.id')
      .select(['classes.*', 'users.*'])

    return res.json(classes)
  }
}
