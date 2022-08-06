import React, { useState } from 'react'

import { getFiles, searchFiles } from '../../store/actions/file'
import { useAppDispatch, useAppSelector } from '../../hooks/redux'
import { setLoading } from '../../store/reducers/file'

const Search = () => {
  const dispatch = useAppDispatch()
  const currentDir = useAppSelector((state) => state.files.currentDir)

  const [searchName, setSearchName] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<number>(0)

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchName(event.target.value)

    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    dispatch(setLoading(true))

    if (event.target.value !== '') {
      const timerId: ReturnType<typeof setTimeout> = setTimeout(
        (value) => {
          dispatch(searchFiles(value))
        },
        500,
        event.target.value
      )

      setSearchTimeout(Number(timerId))
    } else {
      dispatch(getFiles(currentDir))
    }
  }

  return (
    <input
      value={searchName}
      onChange={searchChangeHandler}
      className='navbar__search'
      type='text'
      placeholder='Название файла...'
    />
  )
}

export default Search
