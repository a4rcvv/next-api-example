// useSWR() でデータを取得するサンプル

"use client"

import { Joke } from "@/types"
import axios from "axios"
import useSWR from "swr"

const useJoke = () => {
  const url = "https://official-joke-api.appspot.com/random_joke"
  const fetcher = async () => {
    console.log("fetching")
    const result = await axios.get<Joke>(url)
    console.log(`fetched: ${result.data.setup}, ${result.data.punchline}`)
    return result
  }
  return useSWR(url, fetcher)
}

export const Page = () => {
  const { data, error, isLoading } = useJoke()

  if (isLoading) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div>
      <h1>Random Joke (with SWR)</h1>
      <div>{data?.data.setup}</div>
      <div>{data?.data.punchline}</div>
    </div>
  )
}

export default Page
