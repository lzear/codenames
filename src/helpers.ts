import { ChangeEvent, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import type { NavigateFunction } from 'react-router-dom'

export const seedString = (): string =>
  `?seed=${Math.random().toString(36).slice(7)}`

export const useSeed = (): [NavigateFunction, string | null] => {
  const navigate = useNavigate()
  const urlParameters = new URLSearchParams(window.location.search)
  const seed = urlParameters.get('seed')
  useEffect(() => {
    if (!seed) navigate(seedString(), { replace: true })
  }, [seed, navigate])
  return [navigate, seed]
}

export const onFileChange = (
  event: ChangeEvent<HTMLInputElement>,
): Promise<string> => {
  const reader = new FileReader()
  const { files } = event.target
  if (!files || files.length === 0) throw new Error('no file')
  return new Promise<string>((resolve) => {
    const file = files[0]
    reader.onloadend = () => {
      if (reader.result) resolve(reader.result as string)
    }
    reader.readAsDataURL(file)
  })
}
