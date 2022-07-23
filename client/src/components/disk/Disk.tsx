import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFiles, uploadFile } from '../../store/actions/file'
import { FileList, Uploader } from '../../components'
import Popup from './Popup'
import {
  setCurrentDir,
  setPopupDisplay,
  setFileView,
} from '../../store/actions/file'
import { RootState } from '../../store'
import Alert from '../authorization/Alert'
import { FilesSort, FilesView } from '../../models/file'

const Disk: React.FC = () => {
  const dispatch = useDispatch()
  
  const currentDir = useSelector((state: RootState) => state.files.currentDir)
  const loading = useSelector((state: RootState) => state.files.loading)
  const dirStack = useSelector((state: RootState) => state.files.dirStack)
  const currentUser = useSelector((state: RootState) => state.user.currentUser)

  const [dragEnter, setDragEnter] = useState<boolean>(false)
  const [sort, setSort] = useState<FilesSort>(FilesSort.type)

  useEffect(() => {
    dispatch(getFiles(currentDir, sort))
  }, [currentDir, sort])

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'))
  }

  const backClickHandler = () => {
    const backDirId = dirStack.pop() || null
      
    dispatch(setCurrentDir(backDirId))
  }

  const fileUploadHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    // @ts-ignore: Unreachable code error
    const files: File[] = [...event.target.files]

    files.forEach((file) => dispatch(uploadFile(file, currentDir)))
  }

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

    let files = [...event.dataTransfer.files]

    files.forEach((file) => dispatch(uploadFile(file, currentDir)))

    setDragEnter(false)
  }

  if (loading) {
    return (
      <div className='loader'>
        <div className='loader__dual-ring'></div>
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
      {!currentUser?.isActivated && (
        <Alert
          className="sign-in__message"
          type="success"
          msg={"Пожалуйста, подтвердите свой адрес электронной почты."}
        />
      )}

      <div className='disk__btns'>
        <button className='disk__back btn' onClick={backClickHandler}>
          Назад
        </button>
        <button className='disk__create btn' onClick={showPopupHandler}>
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
          onChange={(e) => setSort(e.target.value as FilesSort)}
          className='disk__select'
        >
          <option value={FilesSort.name}>По имени</option>
          <option value={FilesSort.type}>По типу</option>
          <option value={FilesSort.date}>По дате</option>
        </select>
        <button
          className='disk__plate'
          onClick={() => dispatch(setFileView(FilesView.plate))}
        />
        <button
          className='disk__list'
          onClick={() => dispatch(setFileView(FilesView.list))}
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
