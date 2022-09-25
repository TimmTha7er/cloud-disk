import React from 'react'

import useUploadAvatar from '../shared/api/user/uploadAvatar'
import useDeleteAvatar from '../shared/api/user/deleteAvatar'
import { useAppSelector } from '../shared/hooks/redux'

const Profile: React.FC = () => {
  const avatar = useAppSelector((state) => state.user.currentUser?.avatar)
  const { mutate: uploadAvatar } = useUploadAvatar()
  const { mutate: deleteAvatar } = useDeleteAvatar()

  const onDeleteAvatarBtnClick = () => {
    deleteAvatar()
  }

  const inputChooseFileChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File = (event.target.files as FileList)[0]

    uploadAvatar({ file })
  }

  return (
    <div className='profile'>
      {avatar && (
        <button className='profile__btn btn' onClick={onDeleteAvatarBtnClick}>
          Удалить аватар
        </button>
      )}
      {!avatar && (
        <input
          className='profile__input'
          accept='image/*'
          onChange={inputChooseFileChangeHandler}
          type='file'
          placeholder='Загрузить аватар'
        />
      )}
    </div>
  )
}

export default Profile
