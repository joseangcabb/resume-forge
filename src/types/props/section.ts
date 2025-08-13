import type { AstroComponentFactory } from 'astro/runtime/server';
import type MaterialIconProps from '@/types/props/material-icon';

export default interface Props {
  Icon: AstroComponentFactory<MaterialIconProps>;
  iconProps: MaterialIconProps;
}
