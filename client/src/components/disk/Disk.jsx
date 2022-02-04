import React from 'react'
import { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getFiles } from '../../actions/file'
import FileList from './fileList/FileList'
import './disk.css'
import { setCurrentDir, setPopupDisplay } from '../../reducers/fileReducer'
import Popup from './Popup'

const Disk = () => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state) => state.files.currentDir)
  const dirStack = useSelector((state) => state.files.dirStack)

  useEffect(() => {
    dispatch(getFiles(currentDir))
  }, [currentDir])

  const createDirHandle = () => {
    dispatch(setPopupDisplay('flex'))
  }

  const backClickHandle = () => {
    const backDirId = dirStack.pop()
    dispatch(setCurrentDir(backDirId))
  }

  return (
    <div className='disk'>
      <div className='disk__btns'>
        <button className='disk__back' onClick={() => backClickHandle()}>Назад</button>
        <button className='disk__create' onClick={() => createDirHandle()}>Создать папку</button>
      </div>
      <FileList />
      <Popup />
    </div>
  )
}

export default Disk
