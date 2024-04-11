import { StaticImageData } from "next/image";
import Carousel from "@/components/ui/Carausel";
import img1 from "@/images/photos/1t.jpeg";
import img2 from "@/images/photos/2t.jpeg";
import img3 from "@/images/photos/3t.jpeg";
import img4 from "@/images/photos/4t.jpeg";
import img5 from "@/images/photos/5t.jpeg";
import img6 from "@/images/photos/6t.png";
import img7 from "@/images/photos/7t.png";
const allImage: StaticImageData[] = [img1, img2, img3, img4, img5, img6,img7];
const ctnImg: StaticImageData[]=[img7];
import Content from "@/components/ui/Content";
export default function Home() {
  return (
    <main>
      <Carousel images={allImage}  />
      <Content 
      title="Welcome to web-sphere"
      desc="Learn C Pro! Confused on which course to take? I have got you covered. Browse courses and find out the best course for you. Its free! Code With Harry is my attempt to teach basics and those coding techniques to people in short time which took me ages to learn."
      imageSrc={ctnImg}
      imgWidth={500}
      imgHeight={300}
      />
    </main>
  );
}
