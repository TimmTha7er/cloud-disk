import React, { useState } from 'react'

import Alert from '../../shared/helpers/Alert'
import useCreateDir from '../../shared/api/file/createDir'
import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { setPopupDisplay } from '../../store/reducers/file'
import { IError } from '../../shared/models/error'

const Popup: React.FC = () => {
  let { mutate, errors } = useCreateDir()
  const dispatch = useAppDispatch()
  const popupDisplay = useAppSelector((state) => state.files.popupDisplay)
  const currentDir = useAppSelector((state) => state.files.currentDir)

  const [dirName, setDirName] = useState('')

  const createHandler = () => {
    mutate({ dirId: currentDir, name: dirName })
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
    <>
      {errors.map((error: IError, idx) => (
        <Alert
          key={idx}
          type='danger'
          className='alert alert_global'
          msg={error?.msg}
        />
      ))}

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
    </>
  )
}

export default Popup
