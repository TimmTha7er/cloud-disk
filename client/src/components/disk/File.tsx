import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import dirLogo from '../../assets/img/dir.svg'
import fileLogo from '../../assets/img/file.svg'
import { pushToStack, setCurrentDir } from '../../store/actions/file'
import { deleteFile, downloadFile } from '../../store/actions/file'
import sizeFormat from '../../utils/sizeFormat'
import { RootState } from '../../store'
import { IFile } from '../../models/file'

interface FileProps {
  file: IFile
}

// @ts-ignore: Unreachable code error
const File: React.FC<FileProps> = ({ file }) => {
  const dispatch = useDispatch()
  const currentDir = useSelector((state: RootState) => state.files.currentDir)
  const fileView = useSelector((state: RootState) => state.files.view)

  const openDirHandler = () => {
    if (file.type === 'dir') {
      dispatch(pushToStack(currentDir))
      dispatch(setCurrentDir(file._id))
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

  if (fileView === 'plate') {
    return (
      <div className='file-plate' onClick={openDirHandler}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=''
          className='file-plate__img'
        />
        <div className='file-plate__name'>{file.name}</div>
        <div className='file-plate__btns'>
          {file.type !== 'dir' && (
            <button
              onClick={downloadClickHandler}
              className='file-plate__btn file-plate__download'
            >
              download
            </button>
          )}
          <button
            onClick={deleteClickHandler}
            className='file-plate__btn file-plate__delete'
          >
            delete
          </button>
        </div>
      </div>
    )
  }

  if (fileView === 'list') {
    return (
      <div className='file' onClick={() => openDirHandler()}>
        <img
          src={file.type === 'dir' ? dirLogo : fileLogo}
          alt=''
          className='file__img'
        />
        <div className='file__name'>{file.name}</div>
        {/* @ts-ignore: Unreachable code error */}
        <div className='file__date'>{file.date.slice(0, 10)}</div>
        {/*  @ts-ignore: Unreachable code error */}
        <div className='file__size'>{sizeFormat(file.size)}</div>

        {file.type !== 'dir' && (
          <button
            className='file__btn file__download'
            onClick={(event) => downloadClickHandler(event)}
          >
            скачать
          </button>
        )}
        <button
          className='file__btn file__delete'
          onClick={(event) => deleteClickHandler(event)}
        >
          удалить
        </button>
      </div>
    )
  }
}

export default File
