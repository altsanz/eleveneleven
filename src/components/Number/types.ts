export interface DigitMetadata {
  digit: string;
  reveal: boolean;
}
export interface NumberWrapperProps {
  number: number;
  onComplete: () => void;
}
