import { type FC } from 'react';
import { type ControllerFieldState } from 'react-hook-form';

type Props = {
  fieldState: ControllerFieldState;
};

const ErrorDisplay: FC<Props> = ({ fieldState }) => {
  if (!fieldState.error) return null;

  return (
    <small className="p-error mt-1 block">{fieldState.error.message}</small>
  );
};

export default ErrorDisplay;
