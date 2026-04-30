export function initLoviewVideoObserver() {
  const videos = document.querySelectorAll(".loview-video");

  if (!videos.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const video = entry.target;

        if (entry.isIntersecting) {
          const playPromise = video.play();

          if (playPromise !== undefined) {
            playPromise.catch(() => {});
          }
        } else {
          video.pause();
        }
      });
    },
    {
      threshold: 0.3,
    }
  );

  videos.forEach((video) => {
    observer.observe(video);
  });
}