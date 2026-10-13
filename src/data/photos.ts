export interface Photo {
  id: string;
  url: string;
  title: string;
  caption: string;
  location: string;
  year: string;
  aspectRatio: "square" | "portrait" | "landscape";
  camera?: string;
  film?: string;
}

export const initialPhotos: Photo[] = [
  {
    id: "photo-001",
    url: "https://terrific-ptarmigan-453.eu-west-1.convex.cloud/api/storage/0348b92f-eca4-463f-abcb-26b3ba6a9071",
    title: "001",
    caption: "",
    location: "Amsterdam, Netherlands",
    year: "2023",
    aspectRatio: "landscape",
    camera: "Leica M10",
  },
];
