import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { UploadFile } from '..'
import { hideUploader } from '../../store/actions/upload'
import { RootState } from '../../store'

const Uploader: React.FC = () => {
  const dispatch = useDispatch()
  
  const files = useSelector((state: RootState) => state.upload.files)
  const isVisible = useSelector((state: RootState) => state.upload.isVisible)

  const closeUploaderHandler = () => {
    dispatch(hideUploader())
  }

  return (
    isVisible && (
      <div className='uploader'>
        <div className='uploader__header'>
          <div className='uploader__title'>Загрузки</div>
          <button
            className='uploader__close'
            onClick={closeUploaderHandler}
          >
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
