import React from "react";
import { Box, Text, Avatar, HStack } from "@gluestack-ui/themed-native-base";
import { StatusBar, View, FlatList } from "react-native";
import { format } from "date-fns";
import { eoLocale } from "date-fns/locale/eo";
import { CardArtist } from "@/src/components/Cards/Artist";

interface PropsFooter {
  uriImageArtist: string;
  nameArtist: string;
  realeaseDate: string;
  totalTracks: string;
  copyrights: Array<string>;
  releaseArtist: Array<string>;
}

export function Footer({
  uriImageArtist,
  nameArtist,
  realeaseDate,
  totalTracks,
  copyrights,
  releaseArtist,
}: PropsFooter): React.JSX.Element {
  return (
    <View style={{ paddingHorizontal: 10 }}>
      <Box style={{ paddingVertical: 8 }}>
        <Text color="white" fontSize="md" fontWeight="bold">
          {format(new Date(realeaseDate), "do 'de' MMMM yyyy", {
            locale: eoLocale,
          })}
        </Text>
        <Text color="white" fontSize="md" fontWeight="bold">
          {totalTracks + " músicas"}
        </Text>
      </Box>

      <Box style={{ paddingVertical: 4 }}>
        <HStack justifyContent="start" paddingY="4">
          <Avatar
            bg="green.500"
            size="sm"
            source={{
              uri: uriImageArtist,
            }}
          ></Avatar>
          <Text fontSize="lg" marginLeft="2" fontWeight="bold" color="white">
            {nameArtist}
          </Text>
        </HStack>
      </Box>

      <Box style={{ paddingVertical: 4 }}>
        <Text fontSize="lg" fontWeight="bold" color="white">
          Mais que talvez você goste
        </Text>

        <FlatList
          style={{ paddingTop: StatusBar.currentHeight }}
          data={releaseArtist}
          keyExtractor={(item) => String(item.id)}
          showsVerticalScrollIndicator={false}
          showsHorizontalScrollIndicator={false}
          horizontal
          renderItem={({ item }) => (
            <CardArtist
              width={180}
              height={180}
              items={item}
              // navigation={navigation}
              // handleClick={() =>
              //   // navigation.navigate("home", {
              //   //   screen: "art",
              //   //   params: item,
              //   // })
              // }
            />
          )}
        />

        <Box paddingTop="4">
          {copyrights.map((value, idx: React.Key | null | undefined) => (
            <Text fontSize="md" fontWeight="bold" key={idx} color="white">
              {value.text}
            </Text>
          ))}
        </Box>
      </Box>
    </View>
  );
}
