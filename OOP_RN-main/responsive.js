import { Dimensions } from "react-native";

const widthMobileUI = 414;
const heightMobileUI = 896;

export const responsiveWidth = (width) => {
    return (Dimensions.get('window').width * width) / widthMobileUI
};

export const responsiveHeight = (height) => {
    return (Dimensions.get('window').height * height) / heightMobileUI
};
