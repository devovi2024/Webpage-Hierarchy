
// Fetch JSON Data
fetch("src/data.json")
    .then(response => response.json())
    .then(data => {
        const caliphs = data.caliphs;
        const tabsHead = document.getElementById("tabsHead");
        const tabsContent = document.getElementById("tabsContent");
        const tabImage = document.getElementById("tabImage");

        caliphs.forEach((caliph, index) => {
            // Creating Tab Head
            const tabHead = document.createElement("div");
            tabHead.classList.add("tab-head");
            tabHead.textContent = caliph.name.english;
            tabHead.dataset.index = index;
            if (index === 0) tabHead.classList.add("active");
            tabsHead.appendChild(tabHead);

            // Creating Tab Content
            const tabBody = document.createElement("div");
            tabBody.classList.add("tab-body");
            tabBody.innerHTML = `
                <h2>${caliph.name.english} (${caliph.name.arabic})</h2>
                <p><strong>Title:</strong> ${caliph.title}</p>
                <p><strong>Role:</strong> ${caliph.position.role}</p>
                <p><strong>Reign:</strong> ${caliph.position.reign.start} - ${caliph.position.reign.end}</p>
                <p><strong>Notable Contributions:</strong> ${caliph.notable_contributions.join(", ")}</p>
                <p><strong>Hadith:</strong> "${caliph.hadith[0].narration}" - ${caliph.hadith[0].source}</p>
            `;
            if (index === 0) {
                tabBody.classList.add("active");
                tabImage.src = caliph.image;
            }
            tabsContent.appendChild(tabBody);

            // Tab Click Event
            tabHead.addEventListener("click", () => {
                document.querySelectorAll(".tab-head").forEach(t => t.classList.remove("active"));
                document.querySelectorAll(".tab-body").forEach(c => c.classList.remove("active"));
                tabHead.classList.add("active");
                tabBody.classList.add("active");
                tabImage.src = caliph.image;
            });
        });
    })
    .catch(error => console.error("Error loading JSON data:", error));
