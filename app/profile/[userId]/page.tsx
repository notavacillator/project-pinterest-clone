import React from 'react'

export default function Profile({ params }: { params: { userId: string } }) {
  return (
    <>
      <div>page</div>
      <div>My Post: {params.userId}</div>
    </>
  )
}
