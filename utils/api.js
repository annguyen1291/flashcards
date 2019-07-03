import { AsyncStorage } from 'react-native'

const DESK_STORAGE_KEY = 'DESK_STORAGE_KEY'


function setDummyData () {
  const dummyData = {'desk': [{question: 'a', answer: 'b'}, {question: 'c', answer: 'd'}, {question: 'e', answer: 'f'}, {question: 'g', answer: 'h'}]}
  
  AsyncStorage.setItem(DESK_STORAGE_KEY, JSON.stringify(dummyData))
  
  return dummyData
}

export function fetchDeskResults () {
  return AsyncStorage.getItem(DESK_STORAGE_KEY)
    .then((desks) => {
      return desks === null
        ? setDummyData()       
        : JSON.parse(desks)
    })
}

export function submitDesk ({ deskID, desk }) {
  return AsyncStorage.mergeItem(DESK_STORAGE_KEY, JSON.stringify({
    [deskID]: desk
  }))
}