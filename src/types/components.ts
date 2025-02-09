import { ReactNode } from "react";

export interface BaseProps {
  className?: string;
  children?: ReactNode;
}

export interface WithLoading {
  loading?: boolean;
}

export interface WithError {
  error?: string;
}

export type BaseComponentProps = BaseProps & WithLoading & WithError;
