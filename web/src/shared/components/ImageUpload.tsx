import { useState } from "react";
import { Box, Group, Image, Text, rem } from "@mantine/core";
import { IconUpload, IconPhoto, IconX } from "@tabler/icons-react";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";

export function ImageUpload({
  onSelect,
}: {
  onSelect: (file: File) => void;
}): React.ReactElement {
  const [file, setFile] = useState<File | null>(null);

  return (
    <>
      <Dropzone
        onDrop={(files) => {
          setFile(files[0]);
          onSelect(files[0]);
          console.log("accepted files", files);
        }}
        onReject={(files) => console.log("rejected files", files)}
        maxSize={0.4 * 1024 ** 2}
        accept={IMAGE_MIME_TYPE}
        multiple={false}
      >
        <Group
          justify="center"
          gap="xl"
          mih={160}
          style={{ pointerEvents: "none" }}
        >
          <Dropzone.Accept>
            <IconUpload
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-blue-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Accept>
          <Dropzone.Reject>
            <IconX
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-red-6)",
              }}
              stroke={1.5}
            />
          </Dropzone.Reject>
          <Dropzone.Idle>
            <IconPhoto
              style={{
                width: rem(52),
                height: rem(52),
                color: "var(--mantine-color-dimmed)",
              }}
              stroke={1.5}
            />
          </Dropzone.Idle>

          <div>
            <Text size="lg" inline>
              Drag an image here or click to select a file
            </Text>
          </div>
        </Group>
      </Dropzone>
      {file && (
        <Box mt={16} pos="relative">
          <Image src={URL.createObjectURL(file)} alt="preview" />
        </Box>
      )}
    </>
  );
}
