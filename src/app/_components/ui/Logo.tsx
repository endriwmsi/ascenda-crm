"use client";

import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

const Logo = () => {
  const { theme } = useTheme();

  const [mounted, setMounted] = useState(false);

  // Garante que o tema esteja pronto
  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Renderiza um placeholder enquanto o tema não é definido
    return <div className="w-[130px]"></div>;
  }

  const fillColor = theme === "dark" ? "#ffffff" : "#000000";

  return (
    <div className="w-[130px]">
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="65 180.742 420 108.515">
        <g data-paper-data='{"isGlobalGroup":true,"bounds":{"x":65,"y":180.74248927038627,"width":420,"height":108.51502145922746}}'>
          <g data-paper-data='{"isPrimaryText":true}'>
            <path
              d="m85.55 263.517-3.894 24.443H65l9.734-57.466q4.831-12.763 18.386-19.036L88 247.943h11.826l-5.985-41.604q-9.95 3.678-16.8 10.816l5.985-35.115h21.92l15.862 94.672q-7.715-7.932-18.603-13.195zm20.405 24.443-2.957-19.18q13.844 7.716 19.684 19.18z"
              data-paper-data='{"glyphName":"A","glyphIndex":0,"firstGlyphOfWord":true,"word":1}'
              fill={fillColor}
            />
            <path
              d="M181.951 261.642q.145 5.552-1.298 10.239-8.58-11.897-20.91-22.785-2.883-2.667-14.132-13.339-7.282-7.066-10.671-12.834 4.47-8.94 12.33-17.521v1.37q0 7.355 6.272 14.78 2.38 2.886 7.067 6.778 5.623 4.687 7.426 6.49 5.913 5.985 9.085 11.68 1.515 2.668 2.452 4.976 2.307 5.696 2.38 10.166m-49.102-43.045q-2.019-5.409-2.019-11.465 0-14.492 9.734-21.92 5.984-4.47 14.853-4.47 8.58 0 14.637 3.822 4.759 2.956 7.643 8.292 2.884 5.263 3.533 12.185l-15.358 2.812q-.649-6.488-3.75-10.094-2.162-2.596-6.344-2.596-3.245 0-5.336 2.091l-.072.072q-10.383 9.735-17.521 21.27m45.785 58.187a38 38 0 0 1-2.38 3.749q-3.893 5.336-11.03 7.499-3.75 1.226-8.87 1.226-9.372 0-15.502-4.687-5.19-3.822-8.147-10.31-3.03-6.634-3.533-15.07l15.213-1.082q1.01 9.23 4.831 13.411 2.956 3.172 6.634 2.956 5.263-.144 8.364-5.119 1.586-2.523 1.586-7.066 0-1.225-.216-2.452 8.147 8.509 13.05 16.945"
              data-paper-data='{"glyphName":"S","glyphIndex":1,"word":1}'
              fill={fillColor}
            />
            <path
              d="M215.695 289.258q-10.527 0-17.881-7.427-7.427-7.355-7.427-17.882v-17.81q4.254-12.04 15.719-18.025v35.691q0 3.821 2.667 6.49 2.452 2.451 6.201 2.523h24.515q-1.874 5.047-5.984 9.085-7.355 7.355-17.81 7.355m7.427-20.694q1.298-2.09 1.298-4.759V249.24h16.511v14.781q0 2.308-.36 4.543zm-32.735-62.37q0-10.526 7.427-17.953 7.426-7.354 17.881-7.354 10.599 0 17.954 7.426 7.282 7.427 7.282 17.882v12.113H224.42v-12.402q0-3.82-2.668-6.489-2.74-2.74-6.561-2.74-3.75 0-6.418 2.74-2.667 2.668-2.667 6.49v17.376q-9.518 4.182-15.719 12.69z"
              data-paper-data='{"glyphName":"C","glyphIndex":2,"word":1}'
              fill={fillColor}
            />
            <path
              d="M250.088 287.96v-15.863h45.497v15.863zm0-20.117V221.48q4.254-12.474 15.935-18.675v24.082h21.559v16.08h-21.559v24.875zm0-85.875h45.497v16.007h-29.562q-9.662 4.254-15.935 13.05v.433z"
              data-paper-data='{"glyphName":"E","glyphIndex":3,"word":1}'
              fill={fillColor}
            />
            <path
              d="m322.912 181.968 21.199 71.022v.072q9.517-10.239 15.934-23.362v58.26h-17.16l-21.92-67.85q-9.66 9.807-16.006 22.497v-60.639zm21.199 0h15.934v36.556q-4.614 15.502-15.934 28.697zM320.966 287.96h-16.007v-33.456q4.47-14.709 16.007-27.471z"
              data-paper-data='{"glyphName":"N","glyphIndex":4,"word":1}'
              fill={fillColor}
            />
            <path
              d="M394.583 272.097q3.75 0 6.417-2.74 2.596-2.74 2.596-6.49v-55.374q0-3.822-2.668-6.562-2.668-2.667-6.345-2.667h-9.662q-9.662 4.254-15.935 12.978v.505-29.779h25.092q10.455 0 17.81 7.427 7.282 7.425 7.282 17.81v55.374q0 10.454-7.355 17.882-7.354 7.5-17.737 7.499h-25.092v-15.863zm-9.662-4.254h-15.935v-46.074q4.182-12.546 15.935-18.675z"
              data-paper-data='{"glyphName":"D","glyphIndex":5,"word":1}'
              fill={fillColor}
            />
            <path
              d="m447.867 263.517-3.894 24.443h-16.655l9.734-57.466q4.83-12.763 18.386-19.036l-5.12 36.485h11.825l-5.984-41.604q-9.951 3.678-16.8 10.816l5.984-35.115h21.92l15.862 94.672q-7.715-7.932-18.602-13.195zm20.405 24.443-2.956-19.18q13.844 7.716 19.684 19.18z"
              data-paper-data='{"glyphName":"A","glyphIndex":6,"lastGlyphOfWord":true,"word":1}'
              fill={fillColor}
            />
          </g>
        </g>
      </svg>
    </div>
  );
};

export default Logo;