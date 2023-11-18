import { Comments } from "./Comments";

export interface Cafe {
  name: string;
  images: string[];
  description: string;
  addressLink: string;
  id: number;
  address: string;
  distanceFromCentre: number;
  url: string;
  cafeId: string;
  hasCoworking: boolean;
  district: string;
  comments: Comments[]
}
