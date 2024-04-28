import { SxProps, Theme } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';
import Menu from '@mui/icons-material/Menu';
import DragHandleIcon from '@mui/icons-material/DragHandle';
import MoreHorizTwoTone from '@mui/icons-material/MoreHorizTwoTone';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

export type IconT =
  | 'PLUS'
  | 'CLOSE'
  | 'CROSS'
  | 'VISIBILITY'
  | 'VISIBILITY-OFF'
  | 'MENU'
  | 'DRAG-HANDLE'
  | 'MORE-HORIZONT'
  | 'DELETE'
  | 'EDIT';

export interface IconProps {
  type: IconT;
  sx?: SxProps<Theme>;
  className?: string;
}

export const Icon: React.FunctionComponent<IconProps> = ({
  type,
  sx,
  className,
}) => {
  switch (type) {
    case 'PLUS':
      return <AddOutlinedIcon sx={sx} className={className} />;
    case 'CLOSE':
      return <CloseIcon sx={sx} className={className} />;
    case 'CROSS':
      return <CancelOutlinedIcon sx={sx} className={className} />;
    case 'VISIBILITY':
      return <Visibility sx={sx} className={className} />;
    case 'VISIBILITY-OFF':
      return <VisibilityOff sx={sx} className={className} />;
    case 'MENU':
      return <Menu sx={sx} className={className} />;
    case 'DRAG-HANDLE':
      return <DragHandleIcon sx={sx} className={className} />;
    case 'MORE-HORIZONT':
      return <MoreHorizTwoTone sx={sx} className={className} />;
    case 'EDIT':
      return <EditIcon sx={sx} className={className} />;
    case 'DELETE':
      return <DeleteIcon sx={sx} className={className} />;
    default:
      return <></>;
  }
};
