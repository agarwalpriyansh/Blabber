import {useQuery , useQueryClient} from '@tanstack/react-query';
import {useState} from 'react';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outGoingRequest, setOutGoingRequest] = useState([]);

  const {data , isLoading} = useQuery({
    queryKey: ["friends"],
    queryFn: getUserFriends,
  })

  return (
    <div>
      
    </div>
  )
}

export default HomePage
