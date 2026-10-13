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
    id: "p-01",
    url: "https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=1200&q=80",
    title: "Light in the Stone Corridor",
    caption: "Morning light intersecting architectural brutalism.",
    location: "Paris, France",
    year: "2024",
    aspectRatio: "portrait",
    camera: "Leica M6",
    film: "Kodak Tri-X 400",
  },
  {
    id: "p-02",
    url: "https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?auto=format&fit=crop&w=1200&q=80",
    title: "Monolithic Facade",
    caption: "Geometric glass and steel reflections at twilight.",
    location: "Berlin, Germany",
    year: "2024",
    aspectRatio: "portrait",
    camera: "Contax T2",
    film: "Ilford HP5 Plus",
  },
  {
    id: "p-03",
    url: "https://images.unsplash.com/photo-1507842229451-7f01be7f7b15?auto=format&fit=crop&w=1200&q=80",
    title: "The Silent Stacks",
    caption: "Archival library reading room, morning silence.",
    location: "Amsterdam, Netherlands",
    year: "2024",
    aspectRatio: "landscape",
    camera: "Ricoh GR III",
  },
  {
    id: "p-04",
    url: "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=1200&q=80",
    title: "Fog Over Concrete",
    caption: "Atmospheric perspective across modern urban structures.",
    location: "Kyoto, Japan",
    year: "2023",
    aspectRatio: "landscape",
    camera: "Fujifilm X-Pro3",
  },
  {
    id: "p-05",
    url: "https://images.unsplash.com/photo-1516450360452-9312f5e86fc7?auto=format&fit=crop&w=1200&q=80",
    title: "Archival Texture",
    caption: "Folded parchment and historical binding materiality.",
    location: "Oxford, UK",
    year: "2023",
    aspectRatio: "portrait",
    camera: "Hasselblad 500C/M",
    film: "Kodak Portra 160",
  },
  {
    id: "p-06",
    url: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?auto=format&fit=crop&w=1200&q=80",
    title: "Horizon at Dusk",
    caption: "Distant mountain ridge receding into evening mist.",
    location: "Swiss Alps",
    year: "2023",
    aspectRatio: "landscape",
    camera: "Leica M10",
  },
];
