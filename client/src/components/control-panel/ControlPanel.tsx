import React from 'react'
import { useNavigate } from 'react-router-dom'

import { useAppDispatch } from '../../hooks/redux'
import { FileOrder, UploadButton } from '../../components'
import { setPopupDisplay } from '../../store/reducers/file'

const ControlPanel: React.FC = () => {
  const dispatch = useAppDispatch()
  const navigate = useNavigate()

  const showPopupHandler = () => {
    dispatch(setPopupDisplay('flex'))
  }

  const backClickHandler = () => {
    navigate(-1)
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
