import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import './fileList.css'
import { useSelector } from 'react-redux'
import File from './file/File'
import { RootState } from '../../../store'
import { IFile } from '../../../models/file'

const FileList: React.FC = () => {
  const files = useSelector((state: RootState) => state.files.files)
  const fileView = useSelector((state: RootState) => state.files.view)

  if (files.length === 0) {
    return <div className='loader'>Файлы не найдены</div>
  }

  if (fileView === 'plate') {
    return (
      <div className='fileplate'>
        {files.map((file: IFile) => (
          <File key={file._id} file={file} />
        ))}
      </div>
    )
  }

  // list
  return (
    <div className='filelist'>
      <div className='filelist__header'>
        <div className='filelist__name'>Название</div>
        <div className='filelist__date'>Дата</div>
        <div className='filelist__size'>Размер</div>
      </div>

      <TransitionGroup>
        {files.map((file) => (
          <CSSTransition
            key={file._id}
            timeout={500}
            classNames={'file'}
            exit={false}
          >
            <File file={file} />
          </CSSTransition>
        ))}
      </TransitionGroup>
    </div>
  )
}

export default FileList
