import { useRef } from 'react';

const useResizeHandler = ({ containerRef, node, isDragging, setIsDragging, onSizeUpdate }) => {
    const dragStartPos = useRef(0);
    const initialSizes = useRef(node.sizes);

    const handleMouseDown = (e) => {
        setIsDragging(true);
        dragStartPos.current = node.direction === 'vertical' ? e.clientX : e.clientY;
        initialSizes.current = [...node.sizes];

        const handleMouseMove = (e) => {
            if (!isDragging || !containerRef.current) return;

            const container = containerRef.current;
            const containerRect = container.getBoundingClientRect();
            const currentPos = node.direction === 'vertical' ? e.clientX : e.clientY;
            const startPos = dragStartPos.current;
            const totalSize = node.direction === 'vertical' ? containerRect.width : containerRect.height;
            const delta = ((currentPos - startPos) / totalSize) * 100;

            const newSizes = [
                initialSizes.current[0] + delta,
                initialSizes.current[1] - delta
            ];

            if (newSizes[0] >= 10 && newSizes[1] >= 10) {
                onSizeUpdate(newSizes);
            }
        };

        const handleMouseUp = () => {
            setIsDragging(false);
            window.removeEventListener('mousemove', handleMouseMove);
            window.removeEventListener('mouseup', handleMouseUp);
        };

        window.addEventListener('mousemove', handleMouseMove);
        window.addEventListener('mouseup', handleMouseUp);
    };

    return { handleMouseDown };
};

export default useResizeHandler;