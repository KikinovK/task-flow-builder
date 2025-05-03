import { configureStore } from '@reduxjs/toolkit';
import nodesReducer, { NodesState } from './nodesSlice';
import edgesReducer, { EdgesState } from './edgesSlice';

const STORAGE_KEY = 'appState';

export interface RootState {
  nodes: NodesState;
  edges: EdgesState;
}

const loadState = () => {
  try {
    const serializedState = localStorage.getItem(STORAGE_KEY);
    if (serializedState === null) {
      return undefined;
    }
    return JSON.parse(serializedState) as RootState | undefined;
  } catch (err) {
    console.error('Error loading state from localStorage:', err);
    return undefined;
  }
};

const saveState = (state: RootState) => {
  try {
    const serializedState = JSON.stringify(state);
    localStorage.setItem(STORAGE_KEY, serializedState);
  } catch (err) {
    console.error('Error saving state to localStorage:', err);
  }
};

const persistedState = loadState();

export const store = configureStore({
  reducer: {
    nodes: nodesReducer,
    edges: edgesReducer,
  },
  preloadedState: persistedState,
});

store.subscribe(() => {
  saveState(store.getState() as RootState);
});

export type AppDispatch = typeof store.dispatch;
