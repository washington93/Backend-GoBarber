// import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import FakeAppointmentRepository from '@modules/appointments/repositories/fakes/FakeAppointmentRepository'
import ListProviderAppointmentsService from '@modules/appointments/services/ListProviderAppointmentsService'
// import AppError from '@shared/errors/AppError'

// let fakeUsersRepository: FakeUsersRepository
let fakeAppointmentRepository: FakeAppointmentRepository
let listProviderAppointments: ListProviderAppointmentsService

describe('ListProviderAppointmentService', () => {
  beforeEach(() => {
    fakeAppointmentRepository = new FakeAppointmentRepository()
    listProviderAppointments = new ListProviderAppointmentsService(
      fakeAppointmentRepository,
    )
  })

  it('should be able to list the appointments on a specfic day', async () => {
    const appointment1 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 14, 0, 0),
    })

    const appointment2 = await fakeAppointmentRepository.create({
      provider_id: 'provider',
      user_id: 'user',
      date: new Date(2020, 4, 20, 15, 0, 0),
    })

    const availability = await listProviderAppointments.execute({
      provider_id: 'provider',
      year: 2020,
      month: 5,
      day: 20,
    })

    expect(availability).toEqual([appointment1, appointment2])
  })
})
