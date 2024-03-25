import { useState, useEffect } from "react"

/**
 * This is a custom React hook that detects if the user is on a mobile device.
 * @returns The `useDevice` hook returns a boolean value indicating whether the user is accessing the
 * website from a mobile device or not. It returns `true` if the user agent string contains "iPhone",
 * "iPad", "iPod", or "Android", and `false` otherwise.
 */

export default function useDevice() {
  const [isMobile, setIsMobile] = useState<boolean>()

  useEffect(() => {
    const isMobile = /iPhone|iPad|iPod|Android/i.test(window.navigator.userAgent)
    setIsMobile(isMobile)
  }, [])

  return isMobile
}
