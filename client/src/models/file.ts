export interface IUploadFile {
	id: number,
  name: string
 	progress: number
}

export interface IFile {
	id: string,
  name: string
  type: string
  accessLink?: string
  size: number
  path?: string
  date: string
  user?: string
  parent?: string | null
  children?: [{ number: string }]
}

