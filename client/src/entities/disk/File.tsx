import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import classNames from 'classnames'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { setCurrentDir } from '../../store/reducers/file'
import dirLogo from '../../shared/assets/img/dir.svg'
import fileLogo from '../../shared/assets/img/file.svg'
import sizeFormat from '../../shared/utils/sizeFormat'
import { FilesView, IFile } from '../../shared/models/file'
import FileService from '../../services/FileService'
import useDeleteFile from '../../shared/api/file/deleteFile'

interface FileProps {
  file: IFile
}

const File: React.FC<FileProps> = ({ file }) => {
  const { mutate, errors, isLoading } = useDeleteFile()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const fileView = useAppSelector((state) => state.files.view)

  const openDirHandler = () => {
    if (file.type === 'dir') {
      navigate(`${file.id}`)
      dispatch(setCurrentDir(file.id))
    }
  }

  const downloadClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation()

    FileService.downloadFile(file)
  }

  const deleteClickHandler = (event: React.MouseEvent) => {
    event.stopPropagation()

    mutate({ fileId: file.id })
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
