import React from 'react'
import classNames from 'classnames'

import { useAppSelector } from '../../hooks/redux'
import { File } from '../../components'
import { FilesView, IFile } from '../../models/file'

const FileList: React.FC = () => {
  const files = useAppSelector((state) => state.files.files)
  const fileView = useAppSelector((state) => state.files.view)
  const loading = useAppSelector((state) => state.files.loading)

  if (loading) {
    return (
      <div className='loader'>
        <div className='loader__dual-ring'></div>
      </div>
    )
  }

  if (files.length === 0) {
    return <div className='loader'>Файлы не найдены</div>
  }

  return (
    <div
      className={classNames(
        { filelist: fileView === FilesView.list },
        { fileplate: fileView === FilesView.plate }
      )}
    >
      {fileView === FilesView.list && (
        <div className='filelist__header'>
          <div className='filelist__name'>Название</div>
          <div className='filelist__date'>Дата</div>
          <div className='filelist__size'>Размер</div>
        </div>
      )}

      {files.map((file: IFile) => (
        <File key={file.id} file={file} />
      ))}
    </div>
  )
}

export default FileList
