import {StaticImageData} from "next/image";
import Carausel from "@/components/ui/Carausel";
import img1 from "@/images/photos/1t.jpeg";
import img2 from "@/images/photos/2t.jpeg";
import img3 from "@/images/photos/3t.jpeg";
import img4 from "@/images/photos/4t.jpeg";
import img5 from "@/images/photos/5t.jpeg";
const allImage:StaticImageData[]=[
  img1,
  img2,
  img3,
  img4,
  img5,
];
export default function Home() {
  return (
    <main>
      <Carausel images={allImage} />
    </main>
  );
}
