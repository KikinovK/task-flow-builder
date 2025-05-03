import { X } from 'lucide-react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, EdgeProps } from '@xyflow/react';
import Button from './ui/Button';
import { useAppDispatch } from '../hooks/redux';
import { useCallback } from 'react';
import { removeEdge } from '../store/edgesSlice';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd }: EdgeProps) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  const dispatch = useAppDispatch();

  const onDelete = useCallback(
      () => {
        dispatch(removeEdge(id));
      },
      [id, dispatch]
    );

  return (
    <>
      <BaseEdge
        path={edgePath}
        markerEnd={markerEnd}
      />
      <EdgeLabelRenderer>
        <div
          className="absolute transform -translate-x-1/2 -translate-y-1/2 pointer-events-auto"
          style={{
            left: (sourceX + targetX) / 2,
            top: (sourceY + targetY) / 2,
          }}
        >
          <Button variant='secondary' size='sm' onClick={onDelete}>
            <X size={8}/>
          </Button>
        </div>
      </EdgeLabelRenderer>

    </>
  );
};

export default CustomEdge;
