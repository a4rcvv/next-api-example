// useSWRMutation() で遅延読み込みを行うサンプル

"use client"

import { Joke } from "@/types"
import { Button } from "@mui/material"
import axios from "axios"
import useSWRMutation from "swr/mutation"

const useJokeMutation = () => {
  const url = "https://official-joke-api.appspot.com/random_joke"
  const fetcher = async () => {
    console.log("fetching")
    const result = await axios.get<Joke>(url)
    console.log(`fetched: ${result.data.setup}, ${result.data.punchline}`)
    return result
  }
  return useSWRMutation(url, fetcher)
}

export const Page = () => {
  const { trigger, data, error, isMutating } = useJokeMutation()

  if (isMutating) return <div>Loading...</div>
  if (error) return <div>Error: {error}</div>
  return (
    <div>
      <h1>Random Joke (with SWR, lazy loading)</h1>
      <div>{data?.data.setup}</div>
      <div>{data?.data.punchline}</div>
      <Button onClick={() => trigger()}>Load Joke</Button>
    </div>
  )
}

export default Page
