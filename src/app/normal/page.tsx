// swrを使わず、axiosとuseEffectでデータを取得するサンプル

"use client"
import { Joke } from "@/types"
import axios from "axios"
import { useEffect, useState } from "react"

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

  // 第2引数に空配列を渡すことで、初回マウント時のみ実行される
  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    fetchJoke()
  }, [])

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div>
      <h1>Random Joke (without SWR)</h1>
      <div>{joke?.setup}</div>
      <div>{joke?.punchline}</div>
    </div>
  )
}

export default Page
