import React from 'react'
import ReactLoading from "react-loading";
function Loading({ type = 'cylon', color = '#28ceba'}) {
  return (
    <center className="">
      <ReactLoading
        type={type}
        color={color}
        delay={1}
      />
    </center>
  )
}

export default Loading