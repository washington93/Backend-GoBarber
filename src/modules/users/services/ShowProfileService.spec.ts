import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import ShowProfileService from '@modules/users/services/ShowProfileService'
import AppError from '@shared/errors/AppError'

let fakeUsersRepository: FakeUsersRepository
let showProfileService: ShowProfileService

describe('UpdateProfile', () => {
  beforeEach(() => {
    fakeUsersRepository = new FakeUsersRepository()

    showProfileService = new ShowProfileService(fakeUsersRepository)
  })

  it('should be able show the profile', async () => {
    const user = await fakeUsersRepository.create({
      name: 'Peter Park',
      email: 'peter.parker@example.com',
      password: '123456',
    })

    const profile = await showProfileService.execute({
      user_id: user.id,
    })

    await expect(profile.name).toBe('Peter Park')
    await expect(profile.email).toBe('peter.parker@example.com')
  })

  it('should not be able show the profile from non-existing user', async () => {
    expect(
      showProfileService.execute({
        user_id: 'non-existing-user-id',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })
})
