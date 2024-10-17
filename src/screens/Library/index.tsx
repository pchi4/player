import React, { useEffect, useState } from "react";
import { FlatList, RefreshControl, SafeAreaView } from "react-native";
import { Box } from "@gluestack-ui/themed-native-base";
import { CardLibrary } from "@/src/components/Cards/index";
import { useGetPlaytlist } from "./hooks/useGetPlaytlist";
import { Loading } from "@/src/components/Loading";
import { router } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useStateValue } from "@/src/context/State";
import { Header } from "@/src/components/Header";
import Controller from "@/src/screens/Controller";

export default function Library(): React.JSX.Element {
  const [context, dispatch] = useStateValue().reducer;
  const [profile, setProfile] = useState<object | undefined>();
  const [refreshing, setRefreshing] = useState<boolean>(false);

  const {
    data,
    isLoading,
    isFetching,
    refetch: onRefetchingPlaylist,
  } = useGetPlaytlist();

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

  function onRefetch() {
    onRefetchingPlaylist();
    setRefreshing(true);
    setTimeout(() => {
      setRefreshing(false);
    }, 1000);
  }

  if (isLoading || isFetching) {
    return <Loading />;
  }

  return (
    <Box justifyContent="space-between">
      <FlatList
        data={data?.items}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefetch}
            tintColor="blue"
          />
        }
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

      <SafeAreaView>
        <Controller />
      </SafeAreaView>
    </Box>
  );
}
