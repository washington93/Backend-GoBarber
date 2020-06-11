import { uuid } from 'uuidv4'
import { isEqual } from 'date-fns'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositorio'
import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO'

class AppointmentRepository implements IAppointmentsRepository {
  private appointments: Appointment[] = []

  public async findByDate(date: Date): Promise<Appointment | undefined> {
    const findeAppointment = this.appointments.find(appointment =>
      isEqual(appointment.date, date),
    )

    return findeAppointment
  }

  public async create({
    provider_id,
    date,
  }: ICreateAppointmentDTO): Promise<Appointment> {
    const appointment = new Appointment()

    Object.assign(appointment, { id: uuid, date, provider_id })

    this.appointments.push(appointment)

    return appointment
  }
}

export default AppointmentRepository
