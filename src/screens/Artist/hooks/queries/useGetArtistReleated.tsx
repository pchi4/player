import { useQuery } from "react-query";
import apiInstance from "@/src/services/api";

const getRelatedArtists = async (
  id: string
): Promise<Array<any> | undefined> => {
  try {
    const response = await apiInstance.get(`/artists/${id}/related-artists`);
    return response.data;
  } catch (error) {}
};

export const useGetRelatedArtist = ({ id }: { id: string }) => {
  return useQuery({
    queryKey: ["getArtistAlbums", { id }],
    queryFn: async () => await getRelatedArtists(id),
    enabled: !!id,
    refetchOnWindowFocus: false,
  });
};
