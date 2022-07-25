import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFiles } from '../../store/actions/file'
import { setFileView } from '../../store/actions/file'
import { RootState } from '../../store'
import { FilesSort, FilesView } from '../../models/file'

const FileOrder: React.FC = () => {
  const dispatch = useDispatch()

  const currentDir = useSelector((state: RootState) => state.files.currentDir)

  const [sort, setSort] = useState<FilesSort>(FilesSort.type)

  useEffect(() => {
    dispatch(getFiles(currentDir, sort))
  }, [currentDir, sort])

  const viewClickHandler = (viewType: FilesView) => () => {
    dispatch(setFileView(viewType))
  }

  return (
    <>
      <select
        value={sort}
        onChange={(e) => setSort(e.target.value as FilesSort)}
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
