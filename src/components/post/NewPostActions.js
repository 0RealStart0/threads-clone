import { Grid, GridItem, IconButton } from "@chakra-ui/react";
import {
  VscChromeRestore,
  VscComment,
  VscHeart,
  VscSend,
  VscSync,
} from "react-icons/vsc";
import { PiGifFill, PiImagesLight } from "react-icons/pi";

export default function NewPostActions() {
  return (
    <>
      <Grid templateColumns="40px 40px 40px 40px">
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <IconButton
            size="sm"
            icon={<PiImagesLight size={20} />}
            isRound={true}
            variant="ghost"
            colorScheme="gray"
          ></IconButton>
        </GridItem>
        <GridItem display="flex" justifyContent="center" alignItems="center">
          <IconButton
            size="sm"
            icon={<PiGifFill size={20} />}
            isRound={true}
            variant="ghost"
            colorScheme="gray"
          ></IconButton>
        </GridItem>
        {/* <GridItem display="flex" justifyContent="center" alignItems="center">
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
        </GridItem> */}
      </Grid>
    </>
  );
}
