import { createSlice } from '@reduxjs/toolkit';
import { generateRandomColor } from '../../utils/color';

const createInitialNode = () => ({
    id: '0',
    color: generateRandomColor(),
    children: [],
    direction: null,
    sizes: []
});

const paneSlice = createSlice({
    name: 'panes',
    initialState: {
        root: createInitialNode()
    },
    reducers: {
        splitPane: (state, action) => {
            const { nodeId, direction } = action.payload;

            const findAndSplitNode = (node) => {
                if (node.id === nodeId) {
                    node.children = [
                        {
                            id: `${node.id}-0`,
                            color: node.color,
                            children: [],
                            direction: null,
                            sizes: []
                        },
                        {
                            id: `${node.id}-1`,
                            color: generateRandomColor(),
                            children: [],
                            direction: null,
                            sizes: []
                        }
                    ];
                    node.direction = direction;
                    node.sizes = [50, 50];
                    return true;
                }

                if (node.children.length) {
                    return node.children.some(child => findAndSplitNode(child));
                }

                return false;
            };

            findAndSplitNode(state.root);
        },

        removePane: (state, action) => {
            const { nodeId, parentId } = action.payload;

            const findAndRemoveNode = (node) => {
                if (node.id === parentId) {
                    const remainingChild = node.children.find(child => child.id !== nodeId);
                    Object.assign(node, {
                        color: remainingChild.color,
                        children: remainingChild.children,
                        direction: remainingChild.direction,
                        sizes: remainingChild.sizes
                    });
                    return true;
                }

                if (node.children.length) {
                    return node.children.some(child => findAndRemoveNode(child));
                }

                return false;
            };

            findAndRemoveNode(state.root);
        },

        updatePaneSizes: (state, action) => {
            const { nodeId, newSizes } = action.payload;

            const findAndUpdateNode = (node) => {
                if (node.id === nodeId) {
                    node.sizes = newSizes;
                    return true;
                }

                if (node.children.length) {
                    return node.children.some(child => findAndUpdateNode(child));
                }

                return false;
            };

            findAndUpdateNode(state.root);
        }
    }
});

export const { splitPane, removePane, updatePaneSizes } = paneSlice.actions;
export default paneSlice.reducer;