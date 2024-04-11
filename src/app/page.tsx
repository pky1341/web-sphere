import Image from "next/image";
import Carausel from "@/components/ui/Carausel";

const allImage:string[]=[
  '/images/photos/1t.jpg',
  '/images/photos/2t.jpg',
  '/images/photos/3t.jpg',
  '/images/photos/4t.jpg',
  '/images/photos/5t.jpg',
];
export default function Home() {
  return (
    <main>
      <Carausel images={allImage} />
    </main>
  );
}
