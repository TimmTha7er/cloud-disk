import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import dirLogo from '../../assets/img/dir.svg'
import fileLogo from '../../assets/img/file.svg'
import { setCurrentDir } from '../../store/actions/file'
import { deleteFile, downloadFile } from '../../store/actions/file'
import sizeFormat from '../../utils/sizeFormat'
import { RootState } from '../../store'
import { FilesView, IFile } from '../../models/file'

interface FileProps {
  file: IFile
}

const File: React.FC<FileProps> = ({ file }) => {
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const fileView = useSelector((state: RootState) => state.files.view)

  const openDirHandler = () => {
    if (file.type === 'dir') {
      navigate(`${file.id}`)

      dispatch(setCurrentDir(file.id))
    }
  }

  const downloadClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    downloadFile(file)
  }

  const deleteClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation()
    dispatch(deleteFile(file))
  }

  return (
    <div
      className={classNames('file', {
        file_plate: fileView === FilesView.plate,
      })}
      onClick={openDirHandler}
    >
      <img
        src={file.type === 'dir' ? dirLogo : fileLogo}
        alt=''
        className='file__img'
      />
      <div className='file__name'>{file.name}</div>

      <div className='file__date'>{file.date.slice(0, 10)}</div>
      <div className='file__size'>{sizeFormat(file.size)}</div>

      <div className='file__btns'>
        {file.type !== 'dir' && (
          <button
            onClick={downloadClickHandler}
            className='file__btn file__download btn btn_sm'
          >
            скачать
          </button>
        )}
        <button
          onClick={deleteClickHandler}
          className='file__btn file__delete btn btn_sm'
        >
          удалить
        </button>
      </div>
    </div>
  )
}

export default File
