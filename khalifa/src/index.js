// Fetch JSON Data
fetch("src/data.json")
    .then(response => response.json())
    .then(data => {
        const caliphs = data.caliphs;
        const tabsHead = document.getElementById("tabsHead");
        const tabsContent = document.getElementById("tabsContent");
        const tabImage = document.getElementById("tabImage");
        const noResults = document.getElementById("noResults"); // For "No Results" message

        caliphs.forEach((caliph, index) => {
            // Creating Tab Head
            const tabHead = document.createElement("div");
            tabHead.classList.add("tab-head");
            tabHead.textContent = caliph.name?.english || "Unknown";
            tabHead.dataset.index = index;
            if (index === 0) tabHead.classList.add("active");
            tabsHead.appendChild(tabHead);

            // Creating Tab Content
            const tabBody = document.createElement("div");
            tabBody.classList.add("tab-body");

            // Handling missing fields safely
            const notableContributions = caliph.notable_contributions 
                ? caliph.notable_contributions.join(", ") 
                : "N/A";

            const hadithContent = caliph.hadith && caliph.hadith.length > 0
                ? `"${caliph.hadith[0].narration}" - ${caliph.hadith[0].source}`
                : "No hadith available";

            tabBody.innerHTML = `
                <h2>${caliph.name?.english || "Unknown"} (${caliph.name?.arabic || "N/A"})</h2>
                <p><strong>Title:</strong> ${caliph.title || "N/A"}</p>
                <p><strong>Role:</strong> ${caliph.position?.role || "N/A"}</p>
                <p><strong>Reign:</strong> ${caliph.position?.reign?.start || "N/A"} - ${caliph.position?.reign?.end || "N/A"}</p>
                <p><strong>Notable Contributions:</strong> ${notableContributions}</p>
                <p><strong>Hadith:</strong> ${hadithContent}</p>
            `;

            if (index === 0) {
                tabBody.classList.add("active");
                if (caliph.image) tabImage.src = caliph.image;
            }
            tabsContent.appendChild(tabBody);

            // Tab Click Event
            tabHead.addEventListener("click", () => {
                document.querySelectorAll(".tab-head").forEach(t => t.classList.remove("active"));
                document.querySelectorAll(".tab-body").forEach(c => c.classList.remove("active"));

                tabHead.classList.add("active");
                tabBody.classList.add("active");

                // Update Image Safely
                if (caliph.image) {
                    tabImage.src = caliph.image;
                } else {
                    tabImage.src = "default-image.jpg"; // Use a placeholder image if missing
                }
            });
        });
    })
    .catch(error => console.error("Error loading JSON data:", error));

// Search Functionality
function searchTabs() {
    const input = document.getElementById("searchInput").value.toLowerCase().trim();
    const tabs = document.querySelectorAll(".tab-head");
    let hasResults = false;

    tabs.forEach(tab => {
        const tabText = tab.textContent.toLowerCase();
        if (tabText.includes(input)) {
            tab.style.display = "block";
            hasResults = true;
        } else {
            tab.style.display = "none";
        }
    });

    // Show "No Results" message if no match is found
    const noResults = document.getElementById("noResults");
    if (noResults) {
        noResults.style.display = hasResults ? "none" : "block";
    }
}

// Attach keyup event listener
document.getElementById("searchInput").addEventListener("keyup", searchTabs);
