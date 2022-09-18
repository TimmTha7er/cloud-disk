import React from 'react'

import { setSort, setView } from '../../store/reducers/file'
import { FilesSort, FilesView } from '../../models/file'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'

const FileOrder: React.FC = () => {
  const dispatch = useAppDispatch()
  const currentSort = useAppSelector((state) => state.files.sort)

  const viewClickHandler = (viewType: FilesView) => () => {
    dispatch(setView(viewType))
  }

  const fileSortHandler = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value as FilesSort

    dispatch(setSort(value))
  }

  return (
    <>
      <select value={currentSort} onChange={fileSortHandler} className='disk__select'>
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
