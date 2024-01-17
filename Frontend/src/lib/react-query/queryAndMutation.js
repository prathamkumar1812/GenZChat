import{
    useQuery,
    useMutation,
    useQueryClient,
    useInfiniteQuery,
    
} from '@tanstack/react-query';
import { fetchMessages } from '../server/api';


export const useInfinitemessage=(chatId)=>{
    return useInfiniteQuery({
       queryKey:["message",chatId],
       queryFn:({pageParam=1})=>fetchMessages({chatId,pageParam}),
       staleTime:10000,
       getNextPageParam:(lastPage)=>{
        if (lastPage && lastPage.message.length === 0) {
            return undefined;
          }
        return lastPage.prevOffset+1;  
       },
    })

    
}