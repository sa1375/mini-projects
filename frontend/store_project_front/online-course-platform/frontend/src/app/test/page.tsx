'use client'
import { useEffect, useState } from 'react'

export default function TestPage() {
  const [message, setMessage] = useState('Loading...')

  useEffect(() => {
    fetch('http://localhost:8000/api/test/')
      .then(res => res.json())
      .then(data => setMessage(data.message))
      .catch(() => setMessage('Failed to fetch'))
  }, [])

  return (
    <div className="p-8">
      <h1 className="text-xl font-bold">Backend Message:</h1>
      <p className="mt-2">{message}</p>
    </div>
  )
}

