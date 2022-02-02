import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { createDir, getFiles } from '../../actions/file'
import FileList from './fileList/FileList'
import './disk.css'
import { setPopupDisplay } from '../../reducers/fileReducer'
import Popup from './Popup'

const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  const createDirHanler = () => {
    dispatch(setPopupDisplay('flex'))
  }

  return (
    <div className='disk'>
      <div className='disk__btns'>
        <button className='disk__back'>Назад</button>
        <button className='disk__create' onClick={() => createDirHanler()}>Создать папку</button>
      </div>
      <FileList />
      <Popup />
    </div>
  )
}

export default Disk
