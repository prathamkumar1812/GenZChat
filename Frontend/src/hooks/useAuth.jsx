import React from 'react'
import { useSelector,useDispatch} from 'react-redux'

function useAuth() {
    const auth = useSelector((state) => state.status)
    const [loading, setLoading] = React.useState(true)
    const dispatch = useDispatch()
    
    // console.log(auth)

    return auth
 
}

export default useAuth