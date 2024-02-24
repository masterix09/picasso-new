"use client";
import { CldUploadWidget } from "next-cloudinary";
import { createImage } from "@/actions/actions.clinica";
import { useSearchParams } from "next/navigation";
import { useStore } from "@/store/store";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { useEffect, useState } from "react";

export default function Page() {
  const [data, setData] = useState<{ url: string }[]>([]);
  const { idPiano } = useStore((state) => state);

  useEffect(() => {
    if (idPiano) {
      fetch(`/api/getImageByPiano/${idPiano}`, {
        method: "GET",
      })
        .then((data) => data.json())
        .then((data) => setData(data));
    }
  }, [idPiano]);

  let url: string[] = [];

  return (
    <div className="w-full">
      <div className="my-4">
        {/* <Label>Aggiungi immagine</Label>
        <Input
          id="picture"
          type="file"
          className="w-fit mt-2"
          onChange={() => handleFileChange}
        /> */}
        {idPiano && (
          <CldUploadWidget
            uploadPreset="b59i7h4w"
            onSuccess={async (results) => {
              console.log(results);
              //@ts-ignore
              // setUrl([...url, results.info.url]);
              url = [...url, results.info.url];
              // url = results.info.url;
              console.log(url);

              console.log(idPiano);

              if (idPiano !== null && idPiano !== undefined) {
                await createImage(url, idPiano);
              }
            }}
          >
            {({ open }) => {
              return <button onClick={() => open()}>Upload an Image</button>;
            }}
          </CldUploadWidget>
        )}
      </div>
      <Carousel
        opts={{
          align: "start",
        }}
        className=""
      >
        <CarouselContent>
          {data.map((item, index) => (
            <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
              <div className="p-1">
                <Card>
                  <CardContent className="flex aspect-square items-center justify-center p-6">
                    <span className="text-3xl font-semibold">{index + 1}</span>
                    <Image
                      src={item.url}
                      alt={item.url}
                      width={1000}
                      height={1000}
                      className="w-full h-full object-contain"
                    />
                  </CardContent>
                </Card>
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
