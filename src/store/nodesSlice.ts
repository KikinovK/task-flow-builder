import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { TaskNodeType } from '../types/flow';

export interface NodesState {
  nodes: TaskNodeType[];
}

const initialState: NodesState = {
  nodes: [],
};

const nodesSlice = createSlice({
  name: 'nodes',
  initialState,
  reducers: {
    setNodes(state, action: PayloadAction<TaskNodeType[]>) {
      state.nodes = action.payload;
    },
    addNode(state, action: PayloadAction<TaskNodeType>) {
      state.nodes.push(action.payload);
    },
    updateNode(state, action: PayloadAction<{ id: string; label: string }>) {
      const node = state.nodes.find((n) => n.id === action.payload.id);
      if (node) {
        node.data.label = action.payload.label;
      }
    },
    deselectAllNodes(state) {
      state.nodes.forEach((node) => {
        node.selected = false;
      });
    },
  },
});

export const { setNodes, addNode, updateNode, deselectAllNodes } = nodesSlice.actions;
export default nodesSlice.reducer;
