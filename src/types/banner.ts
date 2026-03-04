export type BannerSize = 'hero' | 'inline-large' | 'inline-small';

export interface Banner {
  id: string;
  imageUrl: string;
  altText: string;
  size: BannerSize;
  linkTo?: string;
  position: number;
}
