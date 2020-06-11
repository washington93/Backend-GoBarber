import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository'
import CreateAppointmentService from '@modules/appointments/services/CreateAppointmentService'
import AppError from '@shared/errors/AppError'

describe('CreateAppointment', () => {
  it('should be able to create a new appointment', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const CreateAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    )
    const appointment = await CreateAppointment.execute({
      date: new Date(),
      provider_id: '123456789',
    })

    expect(appointment).toHaveProperty('id')
  })

  it('should not be able to create two appointment on the same time', async () => {
    const fakeAppointmentRepository = new FakeAppointmentRepository()
    const CreateAppointment = new CreateAppointmentService(
      fakeAppointmentRepository,
    )

    const appointmentDate = new Date(2020, 4, 10, 11)

    await CreateAppointment.execute({
      date: appointmentDate,
      provider_id: '123456789',
    })

    expect(
      CreateAppointment.execute({
        date: appointmentDate,
        provider_id: '123456789',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
