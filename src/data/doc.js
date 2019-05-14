import { db } from '/data/db'
import { getWeather } from '/data/weather'
import { getTimesForDays, getUTCTimeForDaysAgo } from '/utils/date'
import { LOCATIONS } from '/constants'

const DAYS = 365
const LOCATION_IDS = Object.keys(LOCATIONS)

// @TOD move to webworkers where possible

export async function getDocs() {
  const docs = await getDocsForDays()
  const missingEntries = getMissingEntries(docs)
  if (missingEntries.length) {
    const missingDocs = await getMissingDocs(missingEntries)
    Array.prototype.push.apply(docs, missingDocs)
  }

  return docs
}

async function getMissingDocs(missingEntries) {
  return Promise.all(
    missingEntries.map(({ time, locationID }) =>
      getWeather({ time, locationID }).then(doc =>
        storeDoc({ doc, time, locationID })
      )
    )
  )
}

async function storeDoc({ doc, time, locationID }) {
  const id = `days/${locationID}-${time}`
  const docRef = db().doc(id)

  return docRef
    .set(doc)
    .then(() => doc)
    .catch(err => {
      throw new Error(err)
    })
}

function getDocsForDays() {
  return db()
    .collection('days')
    .where('time', '>=', getUTCTimeForDaysAgo(DAYS))
    .get()
    .then(snap => snap.docs.map(doc => doc.data()))
    .catch(error => console.error('Error getting documents: ', error))
}

function getMissingEntries(docs) {
  return getDesiredEntries().filter(
    ({ time, locationID }) =>
      !docs.find(x => x.time === time && x.locationID === locationID)
  )
}

function getDesiredEntries() {
  return getTimesForDays(DAYS)
    .map(time => LOCATION_IDS.map(locationID => ({ locationID, time })))
    .flat()
}
