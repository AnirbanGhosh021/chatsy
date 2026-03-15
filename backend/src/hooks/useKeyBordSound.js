const keyStockSounds = [
  new Audio("/sound/key1.mp3"),
  new Audio("/sound/key2.mp3"),
]

function useKeyBordSound() {
  const playRandomKeyStockSound = () => {
    const randomsound =
      keyStockSounds[Math.floor(Math.random() * keyStockSounds.length)]

    randomsound.currentTime = 0

    randomsound
      .play()
      .catch(error => console.log("Audio play failed:", error))
  }

  return { playRandomKeyStockSound }
}

export default useKeyBordSound