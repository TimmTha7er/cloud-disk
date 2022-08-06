import React, { useState } from 'react'

import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { createDir } from '../../store/actions/file'
import { setPopupDisplay } from '../../store/reducers/file'

const Popup: React.FC = () => {
  const dispatch = useAppDispatch()
  const popupDisplay = useAppSelector((state) => state.files.popupDisplay)
  const currentDir = useAppSelector((state) => state.files.currentDir)

  const [dirName, setDirName] = useState('')

  const createHandler = () => {
    dispatch(createDir(currentDir, dirName))
    setDirName('')
    dispatch(setPopupDisplay('none'))
  }

  const closePopupHandler = () => {
    dispatch(setPopupDisplay('none'))
  }

  const dirNameChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setDirName(event.target.value)
  }

  return (
    <div
      className='popup'
      onClick={closePopupHandler}
      style={{ display: popupDisplay }}
    >
      <div
        className='popup__content'
        onClick={(event) => event.stopPropagation()}
      >
        <div className='popup__header'>
          <div className='popup__title'>Создать новую папку</div>
          <button className='popup__close btn' onClick={closePopupHandler}>
            X
          </button>
        </div>
        <input
          type='text'
          placeholder='Введите название папки...'
          value={dirName}
          onChange={dirNameChangeHandler}
          className='popup__input'
        />
        <button className='popup__create btn' onClick={createHandler}>
          Создать
        </button>
      </div>
    </div>
  )
}

export default Popup
