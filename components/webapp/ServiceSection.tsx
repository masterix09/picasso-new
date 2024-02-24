"use client";

import React, { FC, useRef } from "react";
import styles from "@/style/ServiceSection/ServiceSection.module.scss";
import Image from "next/image";
import Link from "next/link";
import { useIsSM } from "@/utils/useWindowSizes";
import { ESliderSection, TSliderProps } from "@/enum/types";
import Slider from "./Slider";

type ServiceSectionProps = {
  handleNavigation: () => void;
};

const ServiceSection: FC<ServiceSectionProps> = ({ handleNavigation }) => {
  const card: TSliderProps[] = [
    {
      image: "Conservativa_Centro_Picasso.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet.",
    },
    {
      image: "Endodonzia_Centro_Picasso.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      image: "Gnatologia_Centro_Picasso.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      image: "Igiene dentale_Centro_Picasso.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      image: "Implantologia_Centro_Picasso.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      image: "Ortodonzia_Centro_Picasso.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      image: "Parodontologia_Centro_Picasso.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      image: "Pedodonzia_Centro_Picasso.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
    {
      image: "Protesi_Centro_Picasso.svg",
      text: "Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet. Lorem ipsum dolor sit amet",
    },
  ];

  return (
    <section className={styles.container}>
      <div className={styles.innerContainer}>
        <div className={styles.textArea}>
          <div>
            <h1 className={styles.title}>La soluzione</h1>
          </div>
          <h1 className={styles.title}>Ad ogni tua esigenza</h1>
          <p className={styles.description}>
            Centro Picasso fornisce i migliori servizi in ambito odontoiatrico,
            da trattamenti di terapia e igiene dentale a interventi di
            chirurgia. Per sapere di più su tutti i servizi vai alla sezione
            dedicata
          </p>
        </div>
        <div className={styles.customerArea}>
          <div className={styles.sectionLink}>
            <div className={styles.link} onClick={handleNavigation}>
              <div className={styles.cta}>
                <p>Scopri cosa dicono di noi</p>
                <Image
                  src="/images/Centro_Picasso_icon_freccia.svg"
                  alt="freccia dei servizi"
                  width={50}
                  height={50}
                />
              </div>
            </div>
          </div>
          <div className={styles.dateIcon}>
            <div className={styles.icon}>
              <Image
                src="/images/Centro_Picasso_icon_Clienti.svg"
                alt="icona dei clienti soddisfatti"
                width={useIsSM() ? 35 : 75}
                height={useIsSM() ? 35 : 75}
              />
              <div>
                <p className={styles.percentage}>2345</p>
              </div>
              <div>
                <p className={styles.text}>Clienti soddisfatti</p>
              </div>
            </div>
            <div className={styles.icon}>
              <Image
                src="/images/Centro_Picasso_icon_Smile.svg"
                alt="icona dei sorrisi perfetti"
                width={useIsSM() ? 35 : 75}
                height={useIsSM() ? 35 : 75}
              />
              <div>
                <p className={styles.percentage}>100%</p>
              </div>
              <div>
                <p className={styles.text}>Sorrisi perfetti</p>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.containerSlider}>
        <Slider
          slidesPerViewMobile={1}
          slidesPerViewDesktop={3}
          card={card}
          cardType={ESliderSection.HOME_SERVICE}
          pagination={true}
        />
      </div>
    </section>
  );
};

export default ServiceSection;
