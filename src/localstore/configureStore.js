import { createStore, applyMiddleware } from 'redux'
import { composeWithDevTools } from 'redux-devtools-extension'
import { persistStore, persistReducer } from 'redux-persist'
import storage from 'redux-persist/lib/storage' // defaults to localStorage for web
import thunk from 'redux-thunk'

import rootReducer from '../reducers/rootReducer'

const persistConfig = {
  key: 'root',
  storage,
  blacklist: ['auth', 'status',]
}

const middlewares = [thunk]
const persistedReducer = persistReducer(persistConfig, rootReducer)

export default () => {
  let store = createStore(persistedReducer, composeWithDevTools(applyMiddleware(...middlewares)))
  let persistor = persistStore(store)
  return { store, persistor }
}