import { SxProps, Theme } from '@mui/material';
import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CloseIcon from '@mui/icons-material/Close';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import CancelOutlinedIcon from '@mui/icons-material/CancelOutlined';

export type IconT =
  | 'PLUS'
  | 'CLOSE'
  | 'CROSS'
  | 'VISIBILITY'
  | 'VISIBILITY-OFF';

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
    default:
      return <></>;
  }
};
