import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles, uploadFile } from '../../store/actions/file'
import FileList from './fileList/FileList'
import './disk.css'
import Popup from './Popup'
import {
  setCurrentDir,
  setPopupDisplay,
  setFileView,
} from '../../store/actions/file'
import { useState } from 'react'
import Uploader from './uploader/Uploader'
import { RootState } from '../../store'

const Disk: React.FC = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state: RootState) => state.files.currentDir)
  const loader = useSelector((state: RootState) => state.app.loader)
  const dirStack = useSelector((state: RootState) => state.files.dirStack)
  const [dragEnter, setDragEnter] = useState(false)
  const [sort, setSort] = useState('type')

  useEffect(() => {
    dispatch(getFiles(currentDir, sort))
  }, [currentDir, sort])

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'))
  }

  const backClickHandler = () => {
    const backDirId = dirStack.pop()

    // @ts-ignore: Unreachable code error
    dispatch(setCurrentDir(backDirId))
  }

  const fileUploadHandler = (event: any) => {
    const files = [...event.target.files]

    files.forEach((file) => dispatch(uploadFile(file, currentDir)))
  }

  const dragEnterHandler = (event: any) => {
    event.preventDefault()
    setDragEnter(true)
  }

  const dragOverHandler = dragEnterHandler

  const dragLeaveHandler = (event: any) => {
    event.preventDefault()
    setDragEnter(false)
  }

  const dropHandler = (event: any) => {
    event.preventDefault()

    let files = [...event.dataTransfer.files]

    files.forEach((file) => dispatch(uploadFile(file, currentDir)))

    setDragEnter(false)
  }

  if (loader) {
    return (
      <div className='loader'>
        <div className='lds-dual-ring'></div>
      </div>
    )
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
            onChange={fileUploadHandler}
            type='file'
            id='disk__upload-input'
            className='disk__upload-input'
          />
        </div>
        <select
          value={sort}
          onChange={(e) => setSort(e.target.value)}
          className='disk__select'
        >
          <option value='name'>По имени</option>
          <option value='type'>По типу</option>
          <option value='date'>По дате</option>
        </select>
        <button
          className='disk__plate'
          onClick={() => dispatch(setFileView('plate'))}
        />
        <button
          className='disk__list'
          onClick={() => dispatch(setFileView('list'))}
        />
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
