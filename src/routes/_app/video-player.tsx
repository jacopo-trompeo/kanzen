import { createFileRoute } from "@tanstack/react-router";

export const Route = createFileRoute("/_app/video-player")({
  component: VideoPlayerPage,
});

function VideoPlayerPage() {
  return <div>Hello "/_app/video-player"!</div>;
}
