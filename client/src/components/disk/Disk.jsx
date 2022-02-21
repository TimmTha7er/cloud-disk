import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles, uploadFile } from '../../actions/file'
import FileList from './fileList/FileList'
import './disk.css'
import Popup from './Popup'
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer'
import { useState } from 'react'
import Uploader from './uploader/Uploader'

const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)
  const dirStack = useSelector((state) => state.files.dirStack)
  const [dragEnter, setDragEnter] = useState(false)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'))
  }

  const backClickHandler = () => {
    const backDirId = dirStack.pop()

    dispatch(setCurrentDir(backDirId))
  }

  const fileUploadHandler = (event) => {
    const files = [...event.target.files]

    files.forEach((file) => dispatch(uploadFile(file, currentDir)))
  }

  const dragEnterHandler = (event) => {
    event.preventDefault()
    setDragEnter(true)
  }

  const dragOverHandler = dragEnterHandler

  const dragLeaveHandler = (event) => {
    event.preventDefault()
    setDragEnter(false)
  }

  const dropHandler = (event) => {
    event.preventDefault()

    let files = [...event.dataTransfer.files]

    files.forEach((file) => dispatch(uploadFile(file, currentDir)))

    setDragEnter(false)
  }

  return !dragEnter ? (
    <div
      className='disk'
      onDragEnter={dragEnterHandler}
      onDragLeave={dragLeaveHandler}
      onDragOver={dragOverHandler}
    >
      <div className='disk__btns'>
        <button className='disk__back' onClick={() => backClickHandler()}>
          Назад
        </button>
        <button className='disk__create' onClick={() => showPopupHandler()}>
          Создать папку
        </button>
        <div className='disk__upload'>
          <label htmlFor='disk__upload-input' className='disk__upload-label'>
            Загрузить файл
          </label>
          <input
            multiple={true}
            onChange={(event) => fileUploadHandler(event)}
            type='file'
            id='disk__upload-input'
            className='disk__upload-input'
          />
        </div>
      </div>
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
