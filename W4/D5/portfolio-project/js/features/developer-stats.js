// developer-stats.js

document.addEventListener("DOMContentLoaded", function () {

  const stats = [
    { label: "Projects", value: 5 },
    { label: "Skills", value: 8 },
    { label: "Repositories", value: 10 },
    { label: "Experience", value: "Fresher" }
  ];

  const container = document.getElementById("developer-stats");
  if (!container) return;

  container.innerHTML = "";

  stats.forEach(stat => {
    const card = document.createElement("div");

    // ✅ Clean card with hover movement only
    card.className = `
      bg-white border border-gray-200 p-6 rounded-lg text-center
      transition duration-300 ease-in-out
      hover:-translate-y-1 hover:shadow-xl
    `;

    card.innerHTML = `
      <h2 class="text-3xl font-bold text-blue-600">${stat.value}</h2>
      <p class="mt-2 text-gray-600 font-medium">${stat.label}</p>
    `;

    container.appendChild(card);
  });

});