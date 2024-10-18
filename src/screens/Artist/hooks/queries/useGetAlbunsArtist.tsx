import { useQuery } from "react-query";
import apiInstance from "@/src/services/api";

const getAlbumsArtist = async (id: string): Promise<Array<any> | undefined> => {
  try {
    const response = await apiInstance.get(`/artists/${id}/albums`);
    return response.data;
  } catch (error) {}
};

export const useGetAlbumsArtist = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["getArtistAlbums", { id }],
    queryFn: async () => await getAlbumsArtist(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
