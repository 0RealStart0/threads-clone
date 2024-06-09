import { Grid, GridItem, IconButton } from "@chakra-ui/react";
import { VscComment, VscHeart, VscSend, VscSync } from "react-icons/vsc";

export default function PostActions() {
  return (
    <>
      <Grid templateColumns="40px 40px 40px 40px">
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <IconButton
            size="sm"
            icon={<VscHeart size={20} />}
            isRound={true}
            variant="ghost"
            colorScheme="red"
          ></IconButton>
        </GridItem>
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <IconButton
            size="sm"
            icon={<VscComment size={20} />}
            isRound={true}
            variant="ghost"
            colorScheme="teal"
          ></IconButton>
        </GridItem>
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <IconButton
            size="sm"
            icon={<VscSync size={20} />}
            isRound={true}
            variant="ghost"
            colorScheme="teal"
          ></IconButton>
        </GridItem>
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <IconButton
            size="sm"
            icon={<VscSend size={20} />}
            isRound={true}
            variant="ghost"
            colorScheme="teal"
          ></IconButton>
        </GridItem>
      </Grid>
    </>
  );
}
