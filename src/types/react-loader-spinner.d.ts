declare module 'react-loader-spinner' {
  export interface RotatingLinesProps {
    strokeColor: string;
    ariaLabel: string;
    animationDuration: string;
    width: string;
    height: string;
    visible: boolean;
  }

  export const RotatingLines: React.FC<RotatingLinesProps>;
}