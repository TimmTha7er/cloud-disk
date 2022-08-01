import React from 'react'
import { useNavigate } from "react-router-dom";
import { useDispatch } from 'react-redux'

import { setPopupDisplay } from '../../store/actions/file'
import { FileOrder, UploadButton } from '../../components'

const ControlPanel: React.FC = () => {
  const dispatch = useDispatch()
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
