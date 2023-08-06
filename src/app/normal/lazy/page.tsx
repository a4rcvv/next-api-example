// swrを使わず遅延読み込みを行うサンプル
"use client"

import { Joke } from "@/types"
import { Button } from "@mui/material"
import axios from "axios"
import { useState } from "react"

export const Page = () => {
  const [joke, setJoke] = useState<Joke | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchJoke = async () => {
    console.log("fetching")
    const url = "https://official-joke-api.appspot.com/random_joke"
    setError(null)
    setJoke(null)
    setIsLoading(true)
    try {
      const response = await axios.get<Joke>(url)
      setJoke(response.data)
      console.log(`fetched: ${response.data.setup}, ${response.data.punchline}`)
    } catch (error) {
      setError(error)
    } finally {
      setIsLoading(false)
    }
  }

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div>
      <h1>Random Joke (without SWR, lazy loading)</h1>
      <div>{joke?.setup}</div>
      <div>{joke?.punchline}</div>
      <Button onClick={() => fetchJoke()}>Load Joke</Button>
    </div>
  )
}

export default Page
