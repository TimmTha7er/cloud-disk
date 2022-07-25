import React from 'react'
import { useDispatch } from 'react-redux'

import { deleteAvatar, uploadAvatar } from '../store/actions/user'

const Profile: React.FC = () => {
  const dispatch = useDispatch()

  const onDeleteAvatarBtnClick = () => {
    dispatch(deleteAvatar())
  }

  const inputChooseFileChangeHandler = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const file: File = (event.target.files as FileList)[0]

    dispatch(uploadAvatar(file))
  }

  return (
    <div className='profile'>
      <button className='profile__btn btn' onClick={onDeleteAvatarBtnClick}>
        Удалить аватар
      </button>
      <input
        className='profile__input'
        accept='image/*'
        onChange={inputChooseFileChangeHandler}
        type='file'
        placeholder='Загрузить аватар'
      />
    </div>
  )
}

export default Profile
