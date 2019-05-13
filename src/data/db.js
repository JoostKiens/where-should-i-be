import 'firebase'
import 'firebase/firestore'
import config from '@kaliber/config'
import firebase from 'firebase-admin'

export function db() {
  try {
    return firebase.firestore()
  } catch (e) {
    const { credentials, databaseURL } = config.server.firebase
    firebase.initializeApp({
      credential: firebase.credential.cert(credentials),
      databaseURL,
    })
    return firebase.firestore()
  }
}
