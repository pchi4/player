import React from "react";
import { getColors } from "react-native-image-colors";
import { Track, useActiveTrack } from "react-native-track-player";

export const useImageColors = () => {
  const [colors, setColors] = React.useState<object | null>({
    colorOne: { value: "", name: "" },
    colorTwo: { value: "", name: "" },
    colorThree: { value: "", name: "" },
    colorFour: { value: "", name: "" },
    rawResult: "",
  });
  const track = useActiveTrack();

  React.useEffect(() => {
    const fetchColors = async () => {
      const result = await getColors(track?.artwork, {
        fallback: "#228B22",
        cache: true,
        key: track?.artwork,
      });

      switch (result.platform) {
        case "android":
        case "web":
          setColors({
            colorOne: { value: result.lightVibrant, name: "lightVibrant" },
            colorTwo: { value: result.dominant, name: "dominant" },
            colorThree: { value: result.vibrant, name: "vibrant" },
            colorFour: { value: result.darkVibrant, name: "darkVibrant" },
            rawResult: JSON.stringify(result),
          });
          break;
        case "ios":
          setColors({
            colorOne: { value: result.background, name: "background" },
            colorTwo: { value: result.detail, name: "detail" },
            colorThree: { value: result.primary, name: "primary" },
            colorFour: { value: result.secondary, name: "secondary" },
            rawResult: JSON.stringify(result),
          });
          break;
        default:
          throw new Error("Unexpected platform");
      }
      setColors(colors);
    };

    fetchColors();
  }, [track?.artwork]);

  return { colors };
};
