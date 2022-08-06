import React from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { uploadFile } from '../../store/actions/file'

const UploadButton: React.FC = () => {
  const dispatch = useAppDispatch()
  const currentDir = useAppSelector((state) => state.files.currentDir)

  const fileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore: Unreachable code error
    const files: File[] = [...event.target.files]

    files.forEach((file) => dispatch(uploadFile(file, currentDir)))
  }

  return (
    <div className='disk__upload'>
      <label htmlFor='disk__upload-input' className='disk__upload-label'>
        Загрузить файл
      </label>
      <input
        multiple={true}
        onChange={fileUploadHandler}
        type='file'
        id='disk__upload-input'
        className='disk__upload-input'
      />
    </div>
  )
}

export default UploadButton
