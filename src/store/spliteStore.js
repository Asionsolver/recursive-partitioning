import { create } from 'zustand';
import { generateRandomColor } from '../utils/colors';

const createInitialNode = () => ({
    id: '0',
    color: generateRandomColor(),
    children: [],
    direction: null,
    sizes: []
});

const useStore = create((set) => ({
    root: createInitialNode(),

    splitNode: (nodeId, direction) => {
        set((state) => {
            const newRoot = { ...state.root };

            const findAndSplitNode = (node) => {
                if (node.id === nodeId) {
                    const newChild1 = {
                        id: `${node.id}-0`,
                        color: node.color,
                        children: [],
                        direction: null,
                        sizes: []
                    };

                    const newChild2 = {
                        id: `${node.id}-1`,
                        color: generateRandomColor(),
                        children: [],
                        direction: null,
                        sizes: []
                    };

                    node.children = [newChild1, newChild2];
                    node.direction = direction;
                    node.sizes = [50, 50];
                    return true;
                }

                return node.children.some(findAndSplitNode);
            };

            findAndSplitNode(newRoot);
            return { root: newRoot };
        });
    },

    removeNode: (nodeId, parentId) => {
        set((state) => {
            const newRoot = { ...state.root };

            const findAndRemoveNode = (node) => {
                if (node.id === parentId) {
                    const remainingChild = node.children.find(child => child.id !== nodeId);
                    node.color = remainingChild.color;
                    node.children = remainingChild.children;
                    node.direction = remainingChild.direction;
                    node.sizes = remainingChild.sizes;
                    return true;
                }

                return node.children.some(findAndRemoveNode);
            };

            findAndRemoveNode(newRoot);
            return { root: newRoot };
        });
    },

    updateSizes: (nodeId, newSizes) => {
        set((state) => {
            const newRoot = { ...state.root };

            const findAndUpdateNode = (node) => {
                if (node.id === nodeId) {
                    node.sizes = newSizes;
                    return true;
                }

                return node.children.some(findAndUpdateNode);
            };

            findAndUpdateNode(newRoot);
            return { root: newRoot };
        });
    }
}));

export default useStore;