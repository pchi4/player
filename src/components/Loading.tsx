import { Center, Box, Spinner } from "@gluestack-ui/themed-native-base";

export const Loading = () => {
  return (
    <Center bg="rgb(24, 26, 27)">
      <Box padding="4/5" bg="rgb(24, 26, 27)">
        <Spinner size="xl" color="green" />
      </Box>
    </Center>
  );
};
