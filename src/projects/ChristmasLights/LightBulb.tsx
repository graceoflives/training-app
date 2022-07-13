import {
    Box, darken, lighten
} from "@mui/material";
import { keyframes, styled } from "@mui/system";

interface ILightBulbProps {
    size: number;
    color: string;
    isOn: boolean;
    delay: string;
}

const spin = (color: string, size: number) => keyframes`
  from {
    background-color: ${lighten(color, 0.5)};
    box-shadow: 0 0 ${size / 20}px ${size / 20}px ${lighten(color, 0.9)};
  }
  to {
    background-color: ${color};
    box-shadow: 0 0 0px 0px ${color};
  }
`;

const LightBulb = styled(Box)<ILightBulbProps>(({ size, color, isOn, delay }) => ({
    width: size,
    aspectRatio: "1",
    borderRadius: "50%",
    backgroundColor: isOn ? color : darken(color, 0.5),
    animation: isOn ? `1s ease-in-out ${delay} infinite alternate ${spin(color, size)}` : "unset"
})); 

export default LightBulb;