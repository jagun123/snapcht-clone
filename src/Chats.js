import { Avatar } from '@material-ui/core'
import React, { useEffect, useState } from 'react'
import SearchIcon from '@material-ui/icons/Search';
import ChatBubbleIcon from '@material-ui/icons/ChatBubble';
import './Chats.css'
import { auth, db } from './firebase';
import Chat from './Chat';
import { selectuser } from './features/appSlice';
import { useDispatch, useSelector } from 'react-redux';
import RadioButtonUncheckedRoundedIcon from '@material-ui/icons/RadioButtonUncheckedRounded';
import { useHistory } from 'react-router-dom';
import { resetCameraImage } from './features/cameraSlice';
function Chats() {

    const [posts, Setposts] = useState([])
    const user = useSelector(selectuser)
    const history = useHistory()
  const dispatch = useDispatch()

       useEffect(() => {
       db.collection('posts')
       .orderBy('timestamp', 'desc')
       .onSnapshot((snapshot) =>
       
        Setposts(
            snapshot.docs.map((doc) => ({
               
                 id: doc.id,
                 data: doc.data(),
            }))
        )
       
       )
       }, [])

       const takesnap = () => {
           dispatch(resetCameraImage())
           history.push('/')
       }


    return (
        <div className = 'chats'>
        <div className = 'chats__header'>
            <Avatar src={user.profilepic} onClick={()=> auth.signOut()} className = 'chats__avatar'/>
            <div className = 'chats__search'>
                <SearchIcon className = 'chats__searchIcon'/>
                <input placeholder = 'friends' type = 'text' />
               </div>
                <ChatBubbleIcon  className='chats__chatICon' />
            </div>

            <div className = 'chat__posts'>
                   {posts.map(
                        ({
                            id,
                            data: {profilepic, username, timestamp, read ,imageUrl}
                        }) =>(
                            <Chat 
                                key={id}
                                id={id}
                                username={username}
                                timestamp={timestamp}
                                imageUrl={imageUrl}
                                read={read}
                                profilepic={profilepic}
                         />
                        )
                    )}
            </div>

            <RadioButtonUncheckedRoundedIcon
                className='chats__takepicIcon'
                onClick={takesnap}
                fontSize='large'
            />
        </div>

    )
}

export default Chats
