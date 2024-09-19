import React, { useRef } from "react";
import "./Splash.css";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";

/** COORDENADAS */
/*
 -X || +Y || +X
 -X || -Y || +X
*/

export const Splash = () => {
  const container = useRef();
  const tl = useRef();

  useGSAP(
    () => {
      const letters = gsap.utils.toArray(".letter");
      const coint = container.current;
      debugger;
      tl.current = gsap
        .timeline({
          repeat: 100,
          yoyo: true,
        })
        .from(letters[0], {
          ease: "bounce.out",
          duration: 0.2,
          x: 1000,
          y: 0,
        })
        .from(letters[1], {
          ease: "bounce.out",
          duration: 0.3,
          x: 1000,
          y: 0,
          //   rotation: 360,
        })
        .from(letters[2], {
          ease: "bounce.out",
          duration: 0.4,
          x: 1000,
          y: 0,
        })
        .from(letters[3], {
          ease: "bounce.out",
          duration: 0.5,
          x: 1000,
          y: 0,
        })
        .from(letters[4], {
          ease: "bounce.out",
          duration: 0.5,
          x: 1000,
          y: 0,
        })
        .from(letters[5], {
          ease: "bounce.out",
          duration: 0.5,
          x: 1000,
          y: 0,
        })
        .to(coint, { opacity: "0.4", position: "absolute" })
        .from(letters, { color: "#fff", opacity: "0.8" }, "+=0.5");
    },
    { scope: container }
  );

  return (
    <main className="container-splash" ref={container}>
      <div className="letter letter_1">C</div>
      <div className="letter letter_2">E</div>
      <div className="letter letter_3">L</div>
      <div className="letter letter_4">S</div>
      <div className="letter letter_4">I</div>
      <div className="letter letter_4">A</div>
    </main>
  );
};
