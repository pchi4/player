import { useQuery } from "react-query";
import apiInstance from "@/src/services/api";

const fetchingTopTracks = async (): Promise<Array<any> | undefined> => {
  try {
    const result = await apiInstance.get("/me/top/tracks");
    return result.data;
  } catch (error) {}
};

export const useGetTopTracks = () => {
  return useQuery({
    queryKey: ["getTopTracks"],
    queryFn: async () => await fetchingTopTracks(),
    refetchOnWindowFocus: false,
  });
};
