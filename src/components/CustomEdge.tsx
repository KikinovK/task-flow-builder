import { X } from 'lucide-react';
import { BaseEdge, EdgeLabelRenderer, getBezierPath, EdgeProps } from '@xyflow/react';
import Button from './ui/Button';

const CustomEdge = ({ id, sourceX, sourceY, targetX, targetY, markerEnd, data }: EdgeProps) => {
  const [edgePath] = getBezierPath({ sourceX, sourceY, targetX, targetY });

  const onDelete = () => {
    if (data?.onDelete && typeof data?.onDelete === 'function') {
      data.onDelete(id);
    }
  };

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
