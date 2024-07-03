export interface Service {
  id: number;
  image?: string;
  title: string;
  description: string;
  provider?: string;
  basePrice?: number;
  category?: string;
  createdAt?: Date;
  creatorProfileId?: string;
  locationCity?: string;
  locationState?: string;
}

export interface ServiceModalProps {
  open: boolean;
  handleClose: () => void;
  service?: Service | null;
  handleConfirm: () => void;
  text?: string;
  rate?: boolean;
}
