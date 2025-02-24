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

            // Optimized Styling
            Object.assign(tabBody.style, {
                padding: "24px",
                border: "1px solid #ddd",
                borderRadius: "10px",
                backgroundColor: "#ffffff",
                boxShadow: "0 5px 10px rgba(0, 0, 0, 0.15)",
                fontFamily: "Arial, sans-serif",
                color: "#222",
                lineHeight: "1.6",
                maxWidth: "600px",
                margin: "20px auto",
            });

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
                tabImage.src = caliph.image || "default-image.jpg"; // Use placeholder if missing
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
        tab.style.display = tabText.includes(input) ? "block" : "none";
        if (tabText.includes(input)) hasResults = true;
    });

    // Show "No Results" message if no match is found
    if (noResults) {
        noResults.style.display = hasResults ? "none" : "block";
    }
}

// Attach keyup event listener
document.getElementById("searchInput").addEventListener("keyup", searchTabs);
