import { Button, Center, Text, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

export default function NotFound() {
  return (
    <Center h="100vh">
      <VStack>
        <Text fontSize="2xl">죄송합니다. 페이지를 이용할 수 없습니다.</Text>

        <Text color="gray.400">
          클릭하신 링크가 잘못되었거나 페이지가 삭제되었을 수 있습니다.
        </Text>
        <Button variant="outline" as={Link} to="/">
          돌아가기
        </Button>
      </VStack>
    </Center>
  );
}
