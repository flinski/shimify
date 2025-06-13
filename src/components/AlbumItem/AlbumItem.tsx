import type { TApiFormattedAlbum } from "@/types/app"
import styles from "./AlbumItem.module.scss"

interface Props {
	album: TApiFormattedAlbum
}

export default function AlbumItem({ album }: Props) {
	const artists = album.artists.map((artist) => artist.name).join(" & ")

	return (
		<li className={styles.albumItem}>
			<div className={styles.albumCover}>
				<img src={album.cover_url} alt={album.title} />
			</div>
			<div className={styles.albumTitle}>{album.title}</div>
			<div className={styles.albumReleaseDateAndArtist}>
				<span className={styles.albumReleaseDate}>
					{new Date(album.release_date).getFullYear()}
				</span>
				<span> • </span>
				<span className={styles.albumArtist}>{artists}</span>
			</div>
		</li>
	)
}
