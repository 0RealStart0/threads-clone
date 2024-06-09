import { Button, Grid, GridItem, Text } from "@chakra-ui/react";

export default function EditModalHeader({
  onClose,
  onClick,
  formRef,
  title,
  isLoading = false,
}) {
  function submit() {
    formRef.current.dispatchEvent(
      new Event("submit", { cancelable: true, bubbles: true })
    );
  }

  return (
    <Grid
      fontSize="17px"
      templateColumns="minmax(64px, 100px) 1fr minmax(64px, 100px)"
    >
      <GridItem
        colStart="1"
        alignItems="center"
        alignContent="center"
        textAlign="left"
      >
        {/* <Text cursor="pointer" onClick={onClose}>
          취소
        </Text> */}
        <Button onClick={onClose} variant="ghost" isLoading={isLoading}>
          취소
        </Button>
      </GridItem>
      <GridItem
        colStart="2"
        alignItems="center"
        alignContent="center"
        textAlign="center"
      >
        {title}
      </GridItem>
      <GridItem colStart="3" textAlign="right">
        {/* <Text
          alignItems="center"
          alignContent="center"
          textAlign="right"
          cursor="pointer"
          onClick={formRef ? submit : onClick}
          color="teal"
        >
          완료
        </Text> */}
        <Button
          colorScheme="teal"
          variant="ghost"
          onClick={formRef ? submit : onClick}
          isLoading={isLoading}
        >
          완료
        </Button>
      </GridItem>
    </Grid>
  );
}
