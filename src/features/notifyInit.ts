export const InitNotify: MyNotifyOptions = {
  width: '350px',
  position: 'right-bottom',
  fontSize: '16px',
  timeout: 3000,
  cssAnimationDuration: 300,
  distance: '40px',
  opacity: 0.8,
  borderRadius: '2px',
};

export type MyNotifyOptions = {
  width: string;
  position:
    | 'right-bottom'
    | 'right-top'
    | 'left-top'
    | 'left-bottom'
    | 'center-top'
    | 'center-bottom'
    | 'center-center'
    | undefined;
  fontSize: string;
  timeout: number;
  distance: string;
  borderRadius: string;
  opacity: number;
  cssAnimationDuration: number;
};
