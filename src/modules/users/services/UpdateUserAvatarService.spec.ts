import FakeStorageProvider from '@shared/container/providers/StorageProvider/fakes/FakeStorageProvider'
import FakeUsersRepository from '@modules/users/repositories/fakes/FakeUsersRepository'
import UpdateUserAvatarService from '@modules/users/services/UpdateUserAvatarService'
import AppError from '@shared/errors/AppError'

describe('UpdateUserAvatar', () => {
  it('should be able to update avatar', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    )

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'avatar.jpg',
    })

    expect(user.avatar).toBe('avatar.jpg')
  })

  it('should not be able to update avatar from non existing user', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    )

    expect(
      updateUserAvatar.execute({
        user_id: 'non-existing-user',
        avatarFileName: 'avatar.jpg',
      }),
    ).rejects.toBeInstanceOf(AppError)
  })

  it('should delete old avatar when updating new one', async () => {
    const fakeUsersRepository = new FakeUsersRepository()
    const fakeStorageProvider = new FakeStorageProvider()

    const deleteFile = jest.spyOn(fakeStorageProvider, 'deleteFile')

    const updateUserAvatar = new UpdateUserAvatarService(
      fakeUsersRepository,
      fakeStorageProvider,
    )

    const user = await fakeUsersRepository.create({
      name: 'John Doe',
      email: 'johndoe@example.com',
      password: '123456',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'oldAvatar.jpg',
    })

    await updateUserAvatar.execute({
      user_id: user.id,
      avatarFileName: 'newAvatar.jpg',
    })

    expect(deleteFile).toHaveBeenCalledWith('oldAvatar.jpg')

    expect(user.avatar).toBe('newAvatar.jpg')
  })
})
