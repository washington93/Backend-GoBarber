import { startOfHour } from 'date-fns'
import { injectable, inject } from 'tsyringe'

import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import IAppointmentsepository from '@modules/appointments/repositories/IAppointmentsRepositorio'

import AppError from '@shared/errors/AppError'

interface IRequest {
  provider_id: string
  date: Date
}

@injectable()
class CreateAppointmentService {
  constructor(
    @inject('AppointmensRepository')
    private appointmentsRepository: IAppointmentsepository,
  ) {}

  public async execute({ date, provider_id }: IRequest): Promise<Appointment> {
    const appointmentDate = startOfHour(date)

    const findAppointmentInSameDate = await this.appointmentsRepository.findByDate(
      appointmentDate,
    )

    if (findAppointmentInSameDate) {
      throw new AppError('This appointment is alread booked')
    }

    const appointment = await this.appointmentsRepository.create({
      provider_id,
      date: appointmentDate,
    })

    return appointment
  }
}

export default CreateAppointmentService
