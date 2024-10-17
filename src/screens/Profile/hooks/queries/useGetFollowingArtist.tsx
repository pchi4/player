import { useQuery } from "react-query";
import apiInstance from "@/src/services/api";

const fetchingFollowingArtist = async (): Promise<Array<any> | undefined> => {
  try {
    const result = await apiInstance.get("/me/following?type=artist");
    return result.data;
  } catch (error) {}
};

export const useGetFollowingArtist = () => {
  return useQuery({
    queryKey: ["getFollowingArtist"],
    queryFn: async () => await fetchingFollowingArtist(),
    refetchOnWindowFocus: false,
  });
};
