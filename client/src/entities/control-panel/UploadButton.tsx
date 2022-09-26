import React from 'react'
import useUploadFile from '../../shared/api/file/uploadFile'

import { useAppSelector } from '../../shared/hooks/redux'

const UploadButton: React.FC = () => {
  const { uploadFile } = useUploadFile()
  const currentDir = useAppSelector((state) => state.files.currentDir)

  const fileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files: File[] = event.target.files ? [...event.target.files]: []

    files.forEach(async (file) => await uploadFile({ file, dirId: currentDir }))
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
