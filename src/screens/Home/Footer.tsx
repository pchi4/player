import {
  CardAlbum,
  CardNewsReleases,
  CardPlaylist,
} from "@/src/components/Cards";
import { ThemedText } from "@/src/components/ThemedText";
import { useStateValue } from "@/src/context/State";
import { Box } from "@gluestack-ui/themed-native-base";
import { router } from "expo-router";
import React from "react";
import { FlatList } from "react-native";

interface PropsFooter {
  profile: string;
  recents: Array<any>;
  playlists: Array<any>;
  newRealeases: Array<any>;
}

export function Footer({
  profile,
  recents,
  playlists,
  newRealeases,
}: PropsFooter): React.JSX.Element {
  const [context, dispatch] = useStateValue().reducer;

  return (
    <>
      <Box paddingTop="6" paddingBottom="6">
        <ThemedText type="title">Feito para {profile}</ThemedText>
      </Box>
      <FlatList
        data={recents?.filter((_, idx) => {
          return idx > 7;
        })}
        horizontal
        keyExtractor={(item, idx) => String(idx)}
        renderItem={({ item }) => (
          <CardAlbum width={250} height={250} items={item} />
        )}
      />

      <Box paddingTop="6" paddingBottom="6">
        <ThemedText type="title">Suas playlists</ThemedText>
      </Box>

      <FlatList
        data={playlists}
        keyExtractor={(item, idx) => String(idx)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <CardPlaylist
            Width={250}
            Height={250}
            items={item}
            navigation={router}
            handleClick={() => {
              dispatch({
                type: "setPlaylist",
                payload: {
                  playlist: item,
                },
              });
              router.push("/playlist/[details]");
            }}
          />
        )}
      />

      <Box paddingTop="6" paddingBottom="6">
        <ThemedText type="title">Novidades na área</ThemedText>
      </Box>

      <FlatList
        data={newRealeases}
        keyExtractor={(_item, idx) => String(idx)}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        horizontal
        renderItem={({ item }) => (
          <CardNewsReleases
            width={250}
            height={250}
            items={item}
            navigation={router}
          />
        )}
      />
    </>
  );
}
