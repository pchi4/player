import React from "react";
import { Box, Text, Avatar, HStack } from "@gluestack-ui/themed-native-base";
import { StatusBar, View, FlatList } from "react-native";
import { format } from "date-fns";
import { eoLocale } from "date-fns/locale/eo";
import { CardArtist } from "@/src/components/Cards/Artist";
import { ThemedText } from "@/src/components/ThemedText";

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
      <Box style={{ paddingVertical: 20 }}>
        <ThemedText type="subtitle" numberOfLines={1}>
          {format(new Date(realeaseDate), "do 'de' MMMM yyyy", {
            locale: eoLocale,
          })}{" "}
        </ThemedText>

        <ThemedText type="subtitle" numberOfLines={1}>
          {totalTracks + " músicas"}
        </ThemedText>
      </Box>

      <Box style={{ paddingVertical: 4 }}>
        <ThemedText type="subtitle" numberOfLines={1}>
          Mais que talvez você goste
        </ThemedText>

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
            <ThemedText type="default" key={idx} numberOfLines={1}>
              {value?.text}
            </ThemedText>
          ))}
        </Box>
      </Box>
    </View>
  );
}
