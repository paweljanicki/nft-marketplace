import { Box, Flex, Image, Loader } from "@mantine/core";

export function ImageLoader({
  width,
  height,
  src,
  alt,
}: {
  width: number;
  height: number;
  src: string;
  alt: string;
}): React.ReactElement {
  return (
    <Box w={width} h={height} pos="relative">
      <Flex
        justify="center"
        align="center"
        h={height}
        w={width}
        pos="absolute"
        style={{ zIndex: 10 }}
      >
        <Loader />
      </Flex>
      <Image
        style={{ zIndex: 20 }}
        pos="relative"
        radius="md"
        h={height}
        w={width}
        src={src}
        alt={alt}
      />
    </Box>
  );
}
