import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Edge } from '@xyflow/react';

export interface EdgesState {
  edges: Edge[];
}

const initialState: EdgesState = {
  edges: [],
};

const edgesSlice = createSlice({
  name: 'edges',
  initialState,
  reducers: {
    setEdges(state, action: PayloadAction<Edge[]>) {
      state.edges = action.payload;
    },
    addEdge(state, action: PayloadAction<Edge>) {
      state.edges.push(action.payload);
    },
    removeEdge(state, action: PayloadAction<string>) {
      state.edges = state.edges.filter((edge) => edge.id !== action.payload);
    },
  },
});

export const { setEdges, addEdge, removeEdge } = edgesSlice.actions;
export default edgesSlice.reducer;
