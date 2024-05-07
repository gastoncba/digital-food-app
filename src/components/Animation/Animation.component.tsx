import { motion } from 'framer-motion';

export type animationType = 'BOOM' | 'SLICE';

interface AnimationProps {
  children: React.ReactNode;
  type: animationType;
  duration?: number;
}

export const Animation: React.FC<AnimationProps> = ({
  children,
  type,
  duration,
}) => {
  switch (type) {
    case 'SLICE':
      return (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: duration || 0.5, delay: 1 }}
        >
          {children}
        </motion.div>
      );
    case 'BOOM':
      return (
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: duration || 0.5 }}
        >
          {children}
        </motion.div>
      );
    default:
      return <></>;
  }
};
