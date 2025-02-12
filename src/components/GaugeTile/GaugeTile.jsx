import * as React from "react";
import { GaugeComponent, PointerType } from "react-gauge-component";

export default function GaugeTile({ minVal, maxVal, currentVal, unitOfMeasurement }) {
  var uom = "";
  if (unitOfMeasurement === "c" || unitOfMeasurement === "C") {
    uom = "C";
  } else if (unitOfMeasurement === "f" || unitOfMeasurement === "F") {
    uom = "F";
  } else {
    uom = "n/a";
  }
  return (
    <>
      <GaugeComponent
        type="grafana"
        arc={{
          width: 0.2,
          padding: 0.005,
          cornerRadius: 1,
          // gradient: true,
          subArcs: [
            {
              limit: 15,
              color: "#EA4228",
              showTick: true,
              tooltip: {
                text: "Too low temperature!",
                style: {
                  zIndex: 1,
                },
              },
              // onClick: () => console.log("AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA"),
              // onMouseMove: () => console.log("BBBBBBBBBBBBBBBBBBBBBBBBBBBBBBBB"),
              // onMouseLeave: () => console.log("CCCCCCCCCCCCCCCCCCCCCCCCCCCCCCCC"),
            },
            {
              limit: 17,
              color: "#F5CD19",
              showTick: true,
              tooltip: {
                text: "Low temperature!",
                style: {
                  zIndex: 1,
                },
              },
            },
            {
              limit: 28,
              color: "#5BE12C",
              showTick: true,
              tooltip: {
                text: "OK temperature!",
                style: {
                  zIndex: 1,
                },
              },
            },
            {
              limit: 30,
              color: "#F5CD19",
              showTick: true,
              tooltip: {
                text: "High temperature!",
                style: {
                  zIndex: 1,
                },
              },
            },
            {
              color: "#EA4228",
              tooltip: {
                text: "Too high temperature!",
                style: {
                  zIndex: 1,
                },
              },
            },
          ],
        }}
        pointer={{
          color: "#345243",
          length: 0.8,
          width: 15,
          // elastic: true,
        }}
        labels={{
          valueLabel: { formatTextValue: (value) => value + "º" + uom },
          tickLabels: {
            type: "outer",
            defaultTickValueConfig: {
              formatTextValue: (value) => value + "º"+ uom,
              style: { fontSize: 12, fill: "#282c34" },
            },
            //below is some extra tick which we want
            ticks: [{ value: 13 }, { value: 22.5 }, { value: 32 }],
          },
        }}
        value={currentVal}
        minValue={minVal}
        maxValue={maxVal}
      />
    </>
  );
}
