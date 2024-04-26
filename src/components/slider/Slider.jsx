import { animate, motion, useMotionValue } from "framer-motion";
import SliderCard from "./SliderCard";
import useMeasure from "react-use-measure";
import { useEffect, useState } from "react";

// Images
import szemoldok from "../../assets/img/szemoldok.png";
import arckezeles from "../../assets/img/arckezeles.png";
import szempilla from '../../assets/img/szempilla.png';
import elektro from '../../assets/img/elektro.jpg';

// Define the array of slides with numbers
const slides = [
  { 
    img: szempilla,
    text: "Szempilla Styling"
   },
   { 
    img: szemoldok,
    text: "Szemöldök Styling"
   },
   { 
    img: arckezeles,
    text: "Arckezelések"
   },
   { 
    img: elektro,
    text: "Elektrokozmetika"
   }
];

const SliderNumber = () => {
  const FAST_DURATION = 25;
  const SLOW_DURATION = 75;

  const [duration, setDuration] = useState(FAST_DURATION);
  let [ref, { width }] = useMeasure();

  const xTranslation = useMotionValue(0);

  const [mustFinish, setMustFinish] = useState(false);
  const [rerender, setRerender] = useState(false);


  useEffect(() => {
    let controls;
    let finalPosition = -width / 2 - 8;

    if (mustFinish) {
      controls = animate(xTranslation, [xTranslation.get(), finalPosition], {
        ease: "linear",
        duration: duration * (1 - xTranslation.get() / finalPosition),
        onComplete: () => {
          setMustFinish(false);
          setRerender(!rerender);
        },
      });
    } else {
      controls = animate(xTranslation, [0, finalPosition], {
        ease: "linear",
        duration: duration,
        repeat: Infinity,
        repeatType: "loop",
        repeatDelay: 0,
      });
    }

    return controls?.stop;
  }, [rerender, xTranslation, duration, width]);

  return (
    <main className="py-8">
      <motion.div
        className="absolute left-0 flex gap-4"
        style={{ x: xTranslation }}
        ref={ref}
        onHoverStart={() => {
          setMustFinish(true);
          setDuration(SLOW_DURATION);
        }}
        onHoverEnd={() => {
          setMustFinish(true);
          setDuration(FAST_DURATION);
        }}
      >
        {[...slides, ...slides, ...slides, ...slides].map(({img, text}, idx) => (
          <SliderCard image={img} key={idx} text={text}/>
        ))}
      </motion.div>
    </main>
  );
};

export default SliderNumber;
