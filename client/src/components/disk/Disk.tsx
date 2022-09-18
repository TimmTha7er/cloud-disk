import React, { useState } from 'react'

import { useAppSelector } from '../../hooks/redux'
import { ControlPanel, FileList, Uploader } from '../../components'
import Popup from '../popups/Popup'
import Alert from '../helpers/Alert'
import useUploadFile from '../../hooks/file/uploadFile'

const Disk: React.FC = () => {
  const { uploadFile } = useUploadFile()
  const currentDir = useAppSelector((state) => state.files.currentDir)
  const currentUser = useAppSelector((state) => state.user.currentUser)

  const [dragEnter, setDragEnter] = useState<boolean>(false)

  const dragEnterHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragEnter(true)
  }

  const dragOverHandler = dragEnterHandler

  const dragLeaveHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()
    setDragEnter(false)
  }

  const dropHandler = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault()

    const files = [...event.dataTransfer.files]

    files.forEach(async (file) => await uploadFile({ file, dirId: currentDir }))

    setDragEnter(false)
  }

  return !dragEnter ? (
    <div
      className='disk'
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
    >
      {!currentUser?.isActivated && (
        <Alert
          className='disk__alert'
          type='success'
          msg={'Пожалуйста, подтвердите свой адрес электронной почты.'}
        />
      )}

      {/* {errors.map((err) => (
        <Alert className='disk__alert' type='danger' msg={err?.msg} />
      ))} */}

      <ControlPanel />
      <FileList />
      <Popup />
      <Uploader />
    </div>
  ) : (
    <div
      className='drop-area'
      onDrop={dropHandler}
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
    >
      Перетащите файлы сюда
    </div>
  )
}

export default Disk
