import { IconType } from '@/types/enums/material-icon';

export default interface Props {
  icon: string;
  size: number;  // Allow any px value.
  type?: IconType;
  isHighlighted?: boolean;
}
