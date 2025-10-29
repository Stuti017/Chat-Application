import React from 'react'
import { useSelector } from 'react-redux'
import ScrollableFeed from "react-scrollable-feed"
import {isSameSenderMargin, isSameUser } from '../utils/logics'
import "../pages/home.css"
function MessageHistory({ messages }) {
  const activeUser = useSelector((state) => state.activeUser)

  return (
    <>
      <ScrollableFeed className='scrollbar-hide'>
        {messages &&
          messages.map((m, i) => (

            <div className='flex items-center gap-x-[6px]' key={m._id} >
              <span className='tracking-wider text-[15px]  font-medium'
                style={{
                  backgroundColor: `${m.sender._id === activeUser.id ? "#007AFF" : "#268d61"
                    }`,
                  marginLeft: isSameSenderMargin(messages, m, i, activeUser.id),
                  marginTop: isSameUser(messages, m, i, activeUser.id) ? 3 : 10,
                  borderRadius: `${m.sender._id === activeUser.id ? "10px 10px 0px 10px" : "10px 10px 10px 0"}`,
                  padding: "10px 18px",
                  maxWidth: "460px",
                  color: `${m.sender._id === activeUser.id ? "#fff" : "#fff"}`
                }}
              >
                {m.message}
              </span>
            </div>
          ))
        }

      </ScrollableFeed >
    </>
  )
}

export default MessageHistory