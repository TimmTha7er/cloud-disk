import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { getFiles, searchFiles, setLoading } from '../../store/actions/file'
import { RootState } from '../../store'

const Search = () => {
  const dispatch = useDispatch()

  const [searchName, setSearchName] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<number>(0)

  const currentDir = useSelector((state: RootState) => state.files.currentDir)

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
