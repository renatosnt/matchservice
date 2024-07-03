export interface Service {
  id: number;
  image?: string;
  title: string;
  description: string;
  provider?: string;
}

export interface ServiceModalProps {
  open: boolean;
  handleClose: () => void;
  service?: Service | null;
  handleConfirm: () => void;
  text?: string;
  rate?: boolean;
}
