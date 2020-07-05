import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import AppError from '@shared/errors/AppError'

let fakeAppointmentRepository: FakeAppointmentRepository
let CreateAppointment: CreateAppointmentService

describe('CreateAppointment', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    CreateAppointment = new CreateAppointmentService(fakeAppointmentRepository)
  })

  it('should be able to create a new appointment', async () => {
    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '123456789',
      user_id: '123456',
    })

    expect(appointment).toHaveProperty('id')
  })

  it('should not be able to create two appointment on the same time', async () => {
    const appointmentDate = new Date(2020, 4, 10, 11)

    await CreateAppointment.execute({
      date: appointmentDate,
      provider_id: '123456789',
      user_id: '123456',
    })

    expect(
      CreateAppointment.execute({
        date: appointmentDate,
        provider_id: '123456789',
        user_id: '123456',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
