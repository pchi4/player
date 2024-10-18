import { useQuery } from "react-query";
import apiInstance from "@/src/services/api";

const getTopTracks = async (id: string): Promise<Array<any> | undefined> => {
  try {
    const response = await apiInstance.get(`/artists/${id}/top-tracks`);
    return response.data;
  } catch (error) {}
};

export const useGetToptracksArtist = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["getArtistAlbums", { id }],
    queryFn: async () => await getTopTracks(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
