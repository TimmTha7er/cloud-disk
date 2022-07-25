import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { uploadFile } from '../../store/actions/file'
import { RootState } from '../../store'

const UploadButton: React.FC = () => {
  const dispatch = useDispatch()

  const currentDir = useSelector((state: RootState) => state.files.currentDir)

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
