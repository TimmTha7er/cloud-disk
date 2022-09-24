import React, { useEffect } from 'react'

import useUploadAvatar from '../shared/api/user/uploadAvatar'
import useDeleteAvatar from '../shared/api/user/deleteAvatar'
import Alert from '../shared/helpers/Alert'

const Profile: React.FC = () => {
  const { mutate: uploadAvatar } = useUploadAvatar()
  const { mutate: deleteAvatar } = useDeleteAvatar()

  useEffect(() => {
    console.log('profile')
  }, [])

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
      {/* TODO: */}
      {/* {errors.map((err) => (
        // @ts-ignore: Unreachable code error
        <Alert className='sign-in__message' type='danger' msg={err?.msg} />
      ))} */}

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
