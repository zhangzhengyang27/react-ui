import classes from './MdxVideo.module.css';

interface VideoProps {
  src: string;
  className?: string;
}

export function MdxVideo({ src }: VideoProps) {
  return (
    <video
      src={src}
      className={classes.video}
      aria-label="演示视频"
      loop
      autoPlay
      muted
      playsInline
      controls
    />
  );
}
