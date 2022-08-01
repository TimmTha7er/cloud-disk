import React, { useEffect, useState } from 'react'
import { useDispatch } from 'react-redux'
import { useLocation } from 'react-router-dom'

import { setFileView, setCurrentDir, getFiles } from '../../store/actions/file'
import { FilesSort, FilesView } from '../../models/file'

const FileOrder: React.FC = () => {
  const dispatch = useDispatch()
  const location = useLocation()

  const [sort, setSort] = useState<FilesSort>(FilesSort.type)

  useEffect(() => {
    const currentDir = location.pathname.slice(1)
    
    dispatch(getFiles(currentDir, sort))
    dispatch(setCurrentDir(currentDir || null))
  }, [location.pathname, sort])

  const viewClickHandler = (viewType: FilesView) => () => {
    dispatch(setFileView(viewType))
  }

  const fileSortHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as FilesSort

    setSort(value)
  }

  return (
    <>
      <select
        value={sort}
        onChange={fileSortHandler}
        className='disk__select'
      >
        <option value={FilesSort.name}>По имени</option>
        <option value={FilesSort.type}>По типу</option>
        <option value={FilesSort.date}>По дате</option>
      </select>
      <button
        className='disk__plate'
        onClick={viewClickHandler(FilesView.plate)}
      />
      <button
        className='disk__list'
        onClick={viewClickHandler(FilesView.list)}
      />
    </>
  )
}

export default FileOrder
