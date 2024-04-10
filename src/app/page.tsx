import Image from "next/image";
import Carausel from '@/components/ui/Carausel';
const dummyImages: string[] = [
  'https://source.unsplash.com/random/1920x1080/?wallpaper,landscape',
  'https://source.unsplash.com/random/1920x1080/?wallpaper,landscape',
  'https://source.unsplash.com/random/1920x1080/?wallpaper,landscape',
  'https://source.unsplash.com/random/1920x1080/?wallpaper,landscape',
  'https://source.unsplash.com/random/1920x1080/?wallpaper,landscape',
];
export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <Carausel images={dummyImages} />
    </main>
  );
}
