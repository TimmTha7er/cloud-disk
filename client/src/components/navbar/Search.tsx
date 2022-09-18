import React, { useState } from 'react'

import useSearchFile from '../../hooks/file/searchFile'
import useGetFiles from '../../hooks/file/getFiles'
import { useAppSelector } from '../../hooks/redux'

const Search = () => {
  const [searchName, setSearchName] = useState<string>('')
  const [searchTimeout, setSearchTimeout] = useState<number>(0)
  const { refetch: searchFiles } = useSearchFile({ search: searchName })
  // const sort = useAppSelector((state) => state.files.sort)
  const { refetch: getFiles, data: response } = useGetFiles({})

  const searchChangeHandler = (event: React.ChangeEvent<HTMLInputElement>) => {
    const currentValue = event.target.value.trim()

    setSearchName(currentValue)

    if (searchTimeout) {
      clearTimeout(searchTimeout)
    }

    if (event.target.value === '') {
      getFiles()

      return
    }

    // debounce
    const timerId: ReturnType<typeof setTimeout> = setTimeout(
      (_) => {
        console.log('search')
        searchFiles()
      },
      500,
      currentValue
    )

    setSearchTimeout(Number(timerId))
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
