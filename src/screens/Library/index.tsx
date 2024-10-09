import React, { useEffect, useState } from "react";
import { FlatList } from "react-native";
import { Box } from "@gluestack-ui/themed-native-base";

import { CardLibrary } from "@/src/components/Cards/index";
import { useGetPlaytlist } from "./hooks/useGetPlaytlist";
import { Loading } from "@/src/components/Loading";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateValue } from "@/src/context/State";
import { Header } from "@/src/components/Header";

export default function Library(): React.JSX.Element {
  const [context, dispatch] = useStateValue().reducer;
  const { data, isError, isLoading, isFetching } = useGetPlaytlist();
  const [profile, setProfile] = useState<object | undefined>();

  async function getProfile() {
    try {
      const returnedProfile = await AsyncStorage.getItem("profile");
      setProfile(JSON.parse(returnedProfile));
    } catch (error) {
      console.log("Não é possivel pegar o perfil");
    }
  }

  useEffect(() => {
    getProfile();
  }, []);

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <Box justifyContent="space-between">
      <FlatList
        data={data?.items}
        numColumns={3}
        ListHeaderComponent={<Header imageProfile={profile?.images[0].url} />}
        keyExtractor={(item, idx) => String(idx)}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ gap: 10 }}
        columnWrapperStyle={{ gap: 10 }}
        stickyHeaderIndices={[0]}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item }) => (
          <CardLibrary
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
            Width={null}
            Height={null}
          />
        )}
      />
    </Box>
  );
}
