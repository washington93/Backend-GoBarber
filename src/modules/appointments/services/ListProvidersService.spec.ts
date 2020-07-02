import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ListProvidersService from '@modules/appointments/services/ListProvidersService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let listProviders: ListProvidersService

describe('ListProviders', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    listProviders = new ListProvidersService(fakeUsersRepository)
  })

  it('should be able to list the providers', async () => {
    const user01 = await fakeUsersRepository.create({
      name: 'Peter Park',
      email: 'peter.parker@example.com',
      password: '123456',
    })

    const user02 = await fakeUsersRepository.create({
      name: 'Mary Jane',
      email: 'mary.jane@example.com',
      password: '123456',
    })

    const loggedUser = await fakeUsersRepository.create({
      name: 'Tio Ben',
      email: 'tio.ben@example.com',
      password: '123456',
    })

    const providers = await listProviders.execute({
      user_id: loggedUser.id,
    })

    expect(providers).toEqual([user01, user02])
  })
})
