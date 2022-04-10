// A tiny wrapper around fetch(), borrowed from
// https://github.com/reduxjs/redux-essentials-example-app/blob/tutorial-steps/src/api/client.js
// https://kentcdodds.com/blog/replace-axios-with-a-simple-custom-fetch-wrapper

interface Data {
  body?: {}
  headers?: {}
}

interface Config {
  method: 'GET' | 'POST'
  headers: {}
  body?: string
}

interface Response<T> {
  status: number
  result: T
  headers: Headers
  url: string
}

const BASE_URL = '/api/beta'

export async function client<T> (endpoint: string, data: Data = {}): Promise<Response<T>> {
  const { body, ...customConfig } = data
  const headers = { 'Content-Type': 'application/json' }

  const config: Config = {
    method: (body != null) ? 'POST' : 'GET',
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers
    }
  }

  if (body !== undefined) {
    config.body = JSON.stringify(body)
  }

  const url = BASE_URL + endpoint
  let result
  try {
    const response = await window.fetch(url, config)
    result = await response.json()
    if (response.ok) {
      return {
        status: response.status,
        result,
        headers: response.headers,
        url: response.url
      }
    }
    throw new Error(response.statusText)
  } catch (err: any) {
    return await Promise.reject(err.message ?? result)
  }
}

client.get = async function <T>(endpoint: string, customConfig = {}) {
  return await client<T>(endpoint, { ...customConfig })
}

client.post = async function <T>(endpoint: string, body: {}, customConfig = {}) {
  return await client<T>(endpoint, { ...customConfig, body })
}
