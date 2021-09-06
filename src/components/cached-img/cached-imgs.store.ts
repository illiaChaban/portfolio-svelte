import { derived, get, readable, writable } from 'svelte/store'
import type { BlobUrl } from '../../types/generic'

type HomeArtKeys = 'mountain' | 'bus'
export type ImageStoreKeys = HomeArtKeys
type ImageStore = Partial<Record<ImageStoreKeys, HTMLImageElement>>

export const images$ = (() => {
  const store$ = writable<ImageStore>({})
  const {update} = store$
  const set = (
    key: ImageStoreKeys, 
    img: HTMLImageElement
  ) => update(record => ({...record, [key]: img}))

  const getFromStore = (key: ImageStoreKeys) => {
    let lastValue = get(store$)[key]

    return readable<HTMLImageElement | undefined>(lastValue, (set) => {
      const unsubscribe = store$.subscribe((values) => {
        const value = values[key]
        if (lastValue !== value) {
          lastValue = value
          set(value)
        }
      })

      return unsubscribe
    })
  }

  return {set, get: getFromStore}
})()