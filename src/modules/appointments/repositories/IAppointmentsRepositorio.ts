import Appointment from '@modules/appointments/infra/typeorm/entities/Appointment'
import ICreateAppointmentDTO from '@modules/appointments/dtos/ICreateAppointmentsDTO'
import IFindAllMonthFromProviderDTO from '@modules/appointments/dtos/IFindAllMonthFromProviderDTO'

export default interface IAppointmentsRepository {
  create(data: ICreateAppointmentDTO): Promise<Appointment>
  findByDate(date: Date): Promise<Appointment | undefined>
  findAllInMonthFromProvider(
    data: IFindAllMonthFromProviderDTO,
  ): Promise<Appointment[]>
}
