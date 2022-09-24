import React from 'react'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { UploadFile } from '..'
import { hideUploader } from '../../store/reducers/upload'

const Uploader: React.FC = () => {
  const dispatch = useAppDispatch()
  const files = useAppSelector((state) => state.upload.files)
  const isVisible = useAppSelector((state) => state.upload.isVisible)

  const closeUploaderHandler = () => {
    dispatch(hideUploader())
  }

  return (
    isVisible && (
      <div className='uploader'>
        <div className='uploader__header'>
          <div className='uploader__title'>Загрузки</div>
          <button className='uploader__close' onClick={closeUploaderHandler}>
            X
          </button>
        </div>
        {files.map((file) => (
          <UploadFile key={file.id} file={file} />
        ))}
      </div>
    )
  )
}

export default Uploader
