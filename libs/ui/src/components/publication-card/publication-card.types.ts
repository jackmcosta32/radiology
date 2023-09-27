// TODO: Move to an entity package
export interface TUser {
  email: string;
  lastName: string;
  firstName: string;
}

// TODO: Move to an entity package
export interface TPublication {
  title: string;
  createdAt?: Date;
  updatedAt?: Date;
  authors?: TUser[];
  publishedAt?: Date;
  description?: string;
}

export interface PublicationCardProps
  extends React.HTMLAttributes<HTMLDivElement> {
  publication: TPublication;
}
