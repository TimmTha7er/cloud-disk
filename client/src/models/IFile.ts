export interface IFile {
	_id: string,
  name: string
  type: string
  accessLink?: string
  size?: number
  path?: string
  date?: Date
  user?: string
  parent?: string | null
  children?: [{ number: string }]
}
