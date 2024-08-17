import React from "react";
import {
  SafeAreaView,
  SectionList,
  Dimensions,
  TouchableOpacity,
  StatusBar,
  View,
  ImageBackground,
} from "react-native";
import { ScrollView, FlatList } from "react-native-gesture-handler";
import { useStateValue } from "@/src/context/State";
import {
  Image,
  Center,
  Box,
  Text,
  Avatar,
  HStack,
} from "@gluestack-ui/themed-native-base";
import { useGetArtist } from "./hooks";
import ParallaxScrollView from "@/src/components/ParallaxScrollView";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import Controller from "@/src/screens/Controller";
import { Feather } from "@expo/vector-icons";
import { router } from "expo-router";

const { width, height } = Dimensions.get("screen");

export default function Artist() {
  const formatingFollowers = (followers: any) => {
    var followers = followers.toFixed(3).split(".");
    followers[0] = followers[0].split(/(?=(?:...)*$)/).join(".");
    return followers.join(",");
  };

  const [context, dispatch] = useStateValue().reducer;

  return (
    <>
      <ParallaxScrollView
        heigth={250}
        headerBackgroundColor={{ light: "#D0D0D0", dark: "#353636" }}
        headerImage={
          <>
            <ImageBackground
              source={{
                uri: context.artist.images[0].url,
              }}
              alt="ArtWork albuns"
              style={{ width: width, height: width }}
            >
              <TouchableOpacity
                style={{ top: "10%" }}
                onPress={() => router.back()}
              >
                <Feather name={"arrow-left"} size={40 % 100} color="#FFFFFF" />
              </TouchableOpacity>
            </ImageBackground>
          </>
        }
      >
        <ThemedText type="title">{context.artist.name}</ThemedText>
        <ThemedText>All about the artist</ThemedText>

        <Box style={{ flex: 1 }}>
          <View style={{ paddingVertical: 10 }}>
            <ThemedText type="title">
              {formatingFollowers(context.artist.followers.total)}
            </ThemedText>
            <ThemedText type="subtitle">OUVINTES MENSAIS</ThemedText>
          </View>

          <View style={{ paddingVertical: 8 }}>
            <ThemedText type="subtitle" style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              consequuntur, quasi repudiandae maiores provident assumenda vel,
              accusantium minima quod hic voluptates accusamus debitis ipsum
              eaque tempora recusandae inventore minus fuga.
            </ThemedText>
          </View>
          <View style={{ paddingVertical: 8 }}>
            <ThemedText type="subtitle" style={{ textAlign: "justify" }}>
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Beatae
              consequuntur, quasi repudiandae maiores provident assumenda vel,
              accusantium minima quod hic voluptates accusamus debitis ipsum
              eaque tempora recusandae inventore minus fuga.
            </ThemedText>
          </View>
        </Box>
      </ParallaxScrollView>
      <SafeAreaView>
        <Controller />
      </SafeAreaView>
    </>
  );
}
{
  // <Box style={{ flex: 1 }}>
  //   <ScrollView>
  //     <Box
  //       style={{
  //         height: "100%",
  //         paddingBottom: context.currentSound ? 90 : 0,
  //       }}
  //       backgroundColor="#212224"
  //       paddingX="4"
  //     >
  //        <SafeAreaView>
  //         <Box style={{ flex: 1 }}>
  //           <Center>
  //             <Image
  //               marginTop="10%"
  //               source={{
  //                 uri: route.params.images[0].url,
  //               }}
  //               alt="ArtWork albuns"
  //               width={width / 1.2}
  //               height={width / 1.2}
  //             />
  //           </Center>
  //         </Box>
  //         <Box style={{ flex: 1 }}>
  //           <Box paddingY="4">
  //             <Text color="white" fontSize="3xl" fontWeight="bold">
  //               {formatingFollowers(route.params.followers.total)}
  //             </Text>
  //             <Text color="white" fontSize="md" fontWeight="bold">
  //               OUVINTES MENSAIS
  //             </Text>
  //           </Box>
  //           <Box paddingY="4">
  //             <Text color="white" fontSize="md" fontWeight="bold">
  //               Lorem ipsum dolor sit amet consectetur adipisicing elit.
  //               Beatae consequuntur, quasi repudiandae maiores provident
  //               assumenda vel, accusantium minima quod hic voluptates
  //               accusamus debitis ipsum eaque tempora recusandae inventore
  //               minus fuga.
  //             </Text>
  //           </Box>
  //           <Box paddingY="4">
  //             <Text color="white" fontSize="md" fontWeight="bold">
  //               Lorem ipsum dolor sit amet consectetur adipisicing elit.
  //               Beatae consequuntur, quasi repudiandae maiores provident
  //               assumenda vel, accusantium minima quod hic voluptates
  //               accusamus debitis ipsum eaque tempora recusandae inventore
  //               minus fuga.
  //             </Text>
  //           </Box>
  //           <Box>
  //             <HStack justifyContent="start" paddingY="4">
  //               <Avatar
  //                 bg="green.500"
  //                 size="sm"
  //                 source={{
  //                   uri: route.params.images[0].url,
  //                 }}
  //               ></Avatar>
  //               <Text
  //                 fontSize="lg"
  //                 marginLeft="2"
  //                 fontWeight="bold"
  //                 color="white"
  //               >
  //                 {`Postado por ${route.params.name}`}
  //               </Text>
  //             </HStack>
  //           </Box>
  //         </Box>
  //       </SafeAreaView>
  //     </Box>
  //   </ScrollView>
  // </Box>
}
