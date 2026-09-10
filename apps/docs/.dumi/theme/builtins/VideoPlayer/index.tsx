import React from 'react'
import { AiFillPauseCircle, AiFillPlayCircle } from '../../icons'
import { clsx } from 'clsx'

import classes from './index.module.css'

const VideoPlayer: React.FC<React.HtmlHTMLAttributes<HTMLVideoElement>> = ({ className, ...restProps }) => {
    const videoRef = React.useRef<HTMLVideoElement>(null)
    const [playing, setPlaying] = React.useState(false)

    React.useEffect(() => {
        if (playing) {
            videoRef.current?.play()
        } else {
            videoRef.current?.pause()
        }
    }, [playing])

    return (
        <div
            className={clsx(classes.container, className)}
            tabIndex={0}
            role="button"
            title="play or pause"
            onClick={() => {
                setPlaying(!playing)
            }}
        >
            <div className={classes.holder}>
                <video ref={videoRef} className={classes.video} muted loop {...restProps} />
                <div className={classes.play}>{playing ? <AiFillPauseCircle /> : <AiFillPlayCircle />}</div>
            </div>
        </div>
    )
}

export default VideoPlayer
