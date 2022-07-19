import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { Input } from '../../components'
import { setPopupDisplay } from '../../store/actions/file'
import { createDir } from '../../store/actions/file'
import { RootState } from '../../store'

const Popup: React.FC = () => {
  const [dirName, setDirName] = useState('')
  const popupDisplay = useSelector((state: RootState) => state.files.popupDisplay)
  const currentDir = useSelector((state: RootState) => state.files.currentDir)
  const dispatch = useDispatch()

  function createHandler() {
    dispatch(createDir(currentDir, dirName))
    setDirName('')
    dispatch(setPopupDisplay('none'))
  }

  return (
    <div
      className='popup'
      onClick={() => dispatch(setPopupDisplay('none'))}
      style={{ display: popupDisplay }}
    >
      <div
        className='popup__content'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='popup__header'>
          <div className='popup__title'>Создать новую папку</div>
          <button
            className='popup__close btn'
            onClick={() => dispatch(setPopupDisplay('none'))}
          >
            X
          </button>
        </div>
        <Input
          type='text'
          placeholder='Введите название папки...'
          value={dirName}
          setValue={setDirName}
          className='popup__input'
        />
        <button className='popup__create btn' onClick={() => createHandler()}>
          Создать
        </button>
      </div>
    </div>
  )
}

export default Popup
