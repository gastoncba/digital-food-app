import { Zoom, toast, ToastPosition, ToastTransition } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Confirmation } from '../Confirmation/Confirmation.component';

type ToastType = 'info' | 'success' | 'error' | 'warning' | 'confirmation';

interface ToastI {
  message: string;
  type?: ToastType;
  icon?: string | JSX.Element;
  position?: ToastPosition;
  autoClose?: number;
  transition?: ToastTransition;
  confirmOptions?: {
    color?: any;
    confirm: { onClick: (params?: any) => any; title?: string; style?: any };
    cancel?: { onClick?: (params?: any) => any; title?: string; style?: any };
  };
}

export const showToast = (input: ToastI) => {
  const {
    message,
    type,
    icon,
    position = 'top-center',
    autoClose = 5000,
    transition = Zoom,
    confirmOptions,
  } = input;

  switch (type) {
    case 'info':
      toast.info(message, { position, autoClose, transition });
      break;
    case 'success':
      toast.success(message, { position, autoClose, transition });
      break;
    case 'error':
      toast.error(message, { position, autoClose, transition });
      break;
    case 'warning':
      toast.warning(message, { position, autoClose, transition });
      break;
    case 'confirmation':
      if (confirmOptions) {
        toast(
          ({ closeToast }) => (
            <Confirmation
              description={{
                title: message,
                color: confirmOptions.color,
              }}
              confirm={confirmOptions.confirm}
              cancel={confirmOptions.cancel}
              onClose={() => closeToast()}
            />
          ),
          { autoClose: false, position, transition }
        );
      }
      break;
    default:
      toast(message, { position, autoClose, transition, icon: () => icon });
      break;
  }
};

export default showToast;
