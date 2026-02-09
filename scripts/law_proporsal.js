const lp_container_left = '<div class="law-proposal">';
const lp_container_right = '</div>';
const law_files = ["../assets/law_proporsals/correctionToThePM.txt"];
async function loadTxtFile(path) {
    try {
        const response = await fetch(path); 
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const text = await response.text(); 
        return text; 
    } catch (error) {
        console.error("Fetch failed for path:", path, error);
        return null;
    }
}
function formatLaw(text) {
    const lines = text.split("\n");
    lines[0] = "<h1>" + lines[0] + "</h1>";
    for (let i = 1; i < lines.length; i++) {
        const line = lines[i];
        if (line[0] === 'ח') {
            lines[i] = "<h2>" + line + "</h2>";
        } else {
            lines[i] = "<p>" + line + "</p>";
        }
    }
    text = lines.join("\n");

    return text;
}
async function showLaw(law) {
    const content = await loadTxtFile(law);
    const container = document.getElementById("law_proporsal");
    if (content)
        container.innerHTML = lp_container_left + formatLaw(content) + lp_container_right;
}
window.onload = async (e) => {
    const law_proporsals = document.querySelector("#law-proposals");
}