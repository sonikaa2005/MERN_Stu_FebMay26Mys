function handleScrollProgress() {
  const progressBar = document.getElementById("scroll-progress");

  if (!progressBar) return;

  const scrollTop = window.scrollY;

  const totalHeight =
    document.documentElement.scrollHeight - window.innerHeight;

  if (totalHeight <= 0) return;

  const percent = (scrollTop / totalHeight) * 100;

  progressBar.style.width = percent + "%";
}

// attach event
window.addEventListener("scroll", handleScrollProgress);