import { useEffect, useRef } from "react"
import { useDispatch } from "react-redux"
import { play, setLoading } from "@/store/audioPlayerSlice"
import { useAppSelector } from "@/hooks/redux-hooks"
import SongInfo from "@/components/SongInfo/SongInfo"
import PlaybackControls from "@/components/PlaybackControls/PlaybackControls"
import styles from "./AudioPlayer.module.scss"

export default function AudioPlayer() {
	const audioRef = useRef<HTMLAudioElement>(null)
	const dispatch = useDispatch()
	const { queue, currentIndex, isPlaying, isLoading } = useAppSelector((state) => state.audioPlayer)
	const song = queue[currentIndex]

	const handleLoadSong = () => {
		dispatch(setLoading(false))
		dispatch(play())
		audioRef.current?.play()
	}

	useEffect(() => {
		if (isPlaying) {
			audioRef.current?.play()
		} else if (currentIndex !== -1) {
			audioRef.current?.pause()
		}
	}, [isPlaying, currentIndex, dispatch])

	if (!song) return

	return (
		<div className={styles.audioPlayer}>
			<SongInfo isLoading={isLoading} song={song} />
			<audio ref={audioRef} src={song.audio_url} onLoadedMetadata={handleLoadSong}></audio>
			<PlaybackControls />
			<div>Actions</div>
		</div>
	)
}
