import { useQuery } from "react-query";
import apiInstance from "@/src/services/api";

const getAlbums = async (): Promise<Array<any> | undefined> => {
  try {
    const response = await apiInstance.get("/me/albums");
    return response.data;
  } catch (error) {}
};

export const useGetAlbums = () => {
  return useQuery({
    queryKey: ["getAlbums"],
    queryFn: async () => await getAlbums(),
    refetchOnWindowFocus: false,
  });
};
