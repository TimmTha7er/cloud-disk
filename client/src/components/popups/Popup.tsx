import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { setPopupDisplay } from '../../store/actions/file'
import { createDir } from '../../store/actions/file'
import { RootState } from '../../store'

const Popup: React.FC = () => {
  const [dirName, setDirName] = useState('')
  const popupDisplay = useSelector((state: RootState) => state.files.popupDisplay)
  const currentDir = useSelector((state: RootState) => state.files.currentDir)
  const dispatch = useDispatch()

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
      className="popup"
      onClick={closePopupHandler}
      style={{ display: popupDisplay }}
    >
      <div
        className="popup__content"
        onClick={(event) => event.stopPropagation()}
      >
        <div className="popup__header">
          <div className="popup__title">Создать новую папку</div>
          <button className="popup__close btn" onClick={closePopupHandler}>
            X
          </button>
        </div>
        <input
          type="text"
          placeholder="Введите название папки..."
          value={dirName}
          onChange={dirNameChangeHandler}
          className="popup__input"
        />
        <button className="popup__create btn" onClick={createHandler}>
          Создать
        </button>
      </div>
    </div>
  )
}

export default Popup
