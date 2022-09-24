import React, { useEffect } from 'react'
import classNames from 'classnames'
import { useIsFetching } from '@tanstack/react-query'

import { useAppDispatch, useAppSelector } from '../../shared/hooks/redux'
import { File } from '..'
import { FilesView, IFile } from '../../shared/models/file'
import useGetFiles from '../../shared/api/file/getFiles'
import { setCurrentDir } from '../../store/reducers/file'
import { useLocation } from 'react-router-dom'

const FileList: React.FC = () => {
  const dispatch = useAppDispatch()
  const location = useLocation()
  const isFetching = useIsFetching(['files'])
  const sort = useAppSelector((state) => state.files.sort)
  const { refetch, errors, isLoading, data: response } = useGetFiles({ sort })

  const fileView = useAppSelector((state) => state.files.view)

  useEffect(() => {
    const currentDir = location.pathname.slice(1)

    dispatch(setCurrentDir(currentDir || null))
    refetch()
  }, [location.pathname])

  if (isLoading || isFetching) {
    return (
      <div className='loader'>
        <div className='loader__dual-ring'></div>
      </div>
    )
  }

  if (response?.data.length === 0) {
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

      {response?.data.map((file: IFile) => (
        <File key={file.id} file={file} />
      ))}
    </div>
  )
}

export default FileList
