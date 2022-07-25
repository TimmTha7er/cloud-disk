import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setCurrentDir, setPopupDisplay } from '../../store/actions/file'
import { RootState } from '../../store'
import { FileOrder, UploadButton } from '../../components'

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch()

  const dirStack = useSelector((state: RootState) => state.files.dirStack)

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'))
  }

  const backClickHandler = () => {
    const backDirId = dirStack.pop() || null

    dispatch(setCurrentDir(backDirId))
  }

  return (
    <div className='disk__btns'>
      <button className='disk__back btn' onClick={backClickHandler}>
        Назад
      </button>
      <button className='disk__create btn' onClick={showPopupHandler}>
        Создать папку
      </button>

      <UploadButton />
      <FileOrder />
    </div>
  )
}

export default ControlPanel
