import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import type { AppDispatch, RootState } from './store'

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>()
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

export function addKeyAndValue(
  array: Array<any>,
  key: string,
  value: any
): Array<any> {
  const newArrayWithChoosed = array.map((form) => {
    const newObject = { ...form, [key]: value }
    Object.preventExtensions(newObject)
    return newObject
  })
  return newArrayWithChoosed
}
