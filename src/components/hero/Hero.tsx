import React from "react";
import pilla from "../../assets/img/pilla.jpg";
import fokepernyo from "../../assets/img/fokepernyo.png";
import arckezeles from "../../assets/img/arckezeles.png";
import HeroImage from "./HeroImage";

export default function Hero() {
  return (
    <section className="w-full flex flex-col  bg-hero-pattern md:justify-between md:flex-row-reverse">
      <div className="relative h-60 w-full md:w-1/2 md:h-80">
        <HeroImage src={arckezeles} alt={"Arckezelés"} />
        <HeroImage src={pilla} alt={"Szempilla"} />
        <HeroImage src={fokepernyo} alt={"Főképernyő"} />
      </div>
      <div className="flex flex-col justify-center items-center w-full p-5 md:w-2/5 ">
        <fieldset className="border-4 p-4 border-slate-900">
          <legend className="px-2 text-2xl">Új</legend>
          Tavaszi újdonság
        </fieldset>
        <p className="py-4 md:w-1/2 p-4">
          Látogass el szalonunkba és fedezd fel a tavaszi felfrissülés érzését!
        </p>
        <button className="text-brown-100 bg-brown-300 mx-auto block py-2 px-4 rounded">
          IDŐPONTFOGLALÁS
        </button>
      </div>
    </section>
  );
}
