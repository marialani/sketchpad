import React, { useState, useEffect, useCallback, useRef } from "react";
import Name from "./Name";
import Canvas from "./Canvas";
import ColourPicker from "./ColourPicker";
import RefreshButton from "./RefreshButton";
import useWindowSize from "./WindowSize";
import randomColor from "randomcolor";
import hexToRGBA from "../utils/hexToRGBA";

export default function Paint() {
  const [colors, setColors] = useState([]);
  const [activeColor, setActiveColor] = useState(null);
  const getColors = useCallback(() => {
    const baseColor = randomColor().slice(1);
    fetch(`https://www.thecolorapi.com/scheme?hex=${baseColor}&mode=monochrome`)
      .then((res) => res.json())
      .then((res) => {
        setColors(res.colors.map((color) => color.hex.value));
        setActiveColor(res.colors[0].hex.value);
      })
      .catch((err) => console.log(err));
  }, []);
  useEffect(getColors, []);

  const [visible, setVisible] = useState(false);
  let timeoutId = useRef();
  const [windowWidth, windowHeight] = useWindowSize(() => {
    setVisible(true);
    clearTimeout(timeoutId.current);
    timeoutId.current = setTimeout(() => setVisible(false), 500);
  });

  return (
    <div className="app">
      <header
        style={{
          borderTop: `10px groove ${activeColor}`,
          borderBottom: `10px groove ${activeColor}`,
          position: "relative",
          padding: 0,
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            overflow: "hidden",
            margin: 0,
            backgroundImage: `radial-gradient(white 85%, ${activeColor})`,
            maxHeight: "40vh",
          }}
        >
          <div
            style={{
              position: "relative",
              display: "flex",
              maxHeight: "10vh",
              height: "10vh",
              alignItems: "flex-end",
              // marginTop: "2rem",
            }}
          >
            <img
              src="colour-wheel.gif"
              alt="colour wheel"
              style={{
                height: "75%",
                width: "auto",
                // position: "absolute",
                left: "0",
                bottom: "0",
                // zIndex: "-1",
                marginRight: "1.3rem",
              }}
            />
            <h1
              style={{
                fontSize: "3rem",
                color: `${activeColor}`,
                // textDecoration: `underline ${activeColor}`,
                WebkitTextStroke: "black 0.2px",
                textAlign: "center",
                width: "100%",
                fontFamily: "Cabin Sketch, cursive",
                marginBottom: "0",
              }}
            >
              SKETCHPAD
            </h1>
            <img
              src="pencil.gif"
              alt="pencil"
              style={{
                height: "100%",
                // position: "absolute",
                right: "0",
                bottom: "0",
                // zIndex: "-1",
              }}
            />
          </div>
          <p
            style={{
              textAlign: "center",
              fontFamily: "Caveat Brush, cursive",
              fontSize: "1rem",
              margin: 0,
              width: "60%",
              padding: "1rem",
              maxHeight: "20vh",
              color: "black",
              WebkitTextStroke: "0.1px white",
              textShadow: "1px 1px 2px white",
              // background: `linear-gradient(180deg, white 0%, ${activeColor} 100%)`,
              backgroundImage: `radial-gradient(${
                activeColor && hexToRGBA(activeColor)
              }, transparent 75%), linear-gradient(180deg, white 0%, transparent 100%)`,
            }}
          >
            Pick a colour and get sketching!
            <br />
            You will be given 5 shades of one colour, use the refresh button to
            generate a new base colour.
            <br />
            Want to keep a copy of your sketch?
            <br />
            Right click/bring up the context menu on your artwork and save it as
            a picture to your device!
          </p>
          <div style={{ width: "100%" }}>
            <Name />
          </div>

          <div
            style={{
              marginTop: "10px",
              display: "flex",
              justifyContent: "space-evenly",
              width: "50%",
              alignSelf: "center",
              margin: "1rem 0 0.5rem 0",
              alignItems: "center",
            }}
          >
            <div style={{ fontFamily: "Cabin Sketch, cursive" }}>
              YOUR COLOUR IS:{" "}
              <span
                style={{ textDecoration: `underline double ${activeColor}` }}
              >
                {activeColor}
              </span>
            </div>
            <div style={{ display: "flex" }}>
              <ColourPicker
                colors={colors}
                activeColor={activeColor}
                setActiveColor={setActiveColor}
              />
              <RefreshButton cb={getColors} />
            </div>
          </div>
        </div>
      </header>
      {activeColor && (
        <Canvas color={activeColor} height={window.innerHeight} />
      )}
      <div className={`window-size ${visible ? "" : "hidden"}`}>
        {windowWidth} x {windowHeight}
      </div>
    </div>
  );
}
