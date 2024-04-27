import * as ImageManipulator from "expo-image-manipulator";

export const compressImage = async (uri) => {
  try {
    const compressedImage = await ImageManipulator.manipulateAsync(
      uri,
      [{ resize: { width: 1280, height: 1000 } }],
      { compress: 1, format: "jpeg" }
    );
    return compressedImage;
  } catch (error) {
    // console.error("Error compressing image:", error);
    throw new Error(error);
  }
};
