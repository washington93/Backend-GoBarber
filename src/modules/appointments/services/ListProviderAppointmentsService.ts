import { inject, injectable } from 'tsyringe'
// import { getDaysInMonth, getDate } from 'date-fns'

import Appontment from '@modules/appointments/infra/typeorm/entities/Appointment'

import IAppointmentsRepository from '@modules/appointments/repositories/IAppointmentsRepositorio'

interface IRequest {
  provider_id: string
  day: number
  month: number
  year: number
}

@injectable()
class ListProviderAppointmentService {
  constructor(
    @inject('AppointmentsRepository')
    private appointmentRepository: IAppointmentsRepository,
  ) {}

  public async execute({
    provider_id,
    day,
    month,
    year,
  }: IRequest): Promise<Appontment[]> {
    const appointments = await this.appointmentRepository.findAllInDayFromProvider(
      {
        provider_id,
        day,
        month,
        year,
      },
    )
    return appointments
  }
}

export default ListProviderAppointmentService
