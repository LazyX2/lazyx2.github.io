const lp_container_left = '<div class="law-proposal">';
const lp_container_right = '</div>';
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
async function loadJsonFile(path) {
    try {
        const response = await fetch(path); 
        if (!response.ok) throw new Error(`HTTP error! status: ${response.status}`);
        
        const text = await response.json(); 
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
        if (line.startsWith("חלק") || line.startsWith("שאלה")) {
            lines[i] = "<h2>" + line + "</h2>";
        } else if (line.match(/^\d/)) {
            lines[i] = "<h3>" + line + "</h3>";
        } else {
            lines[i] = "<p>" + line + "</p>";
        }
    }
    text = lines.join("");

    return text;
}
async function showLaw(law) {
    const content = await loadTxtFile(law);
    const container = document.getElementById("law_proporsal");
    if (content)
        container.innerHTML = lp_container_left + formatLaw(content) + lp_container_right;
}

function formatCard(card) {
    const headers = card.map(obj => Object.keys(obj)[0]);
    const dataColumns = card.map(obj => Object.values(obj)[0]);
    
    const rowCount = dataColumns[0].length;

    let html = '<table border="1" style="width:100%; border-collapse: collapse; background-color: white;">';
    html += "<caption><h1>מבנה הפתק</h1></caption>";
    
    html += '<tr style="background-color: #eee;">';
    headers.forEach(header => {
        html += `<th style="padding: 10px; border: 1px solid #ddd;">${header}</th>`;
    });
    html += '</tr>';

    for (let i = 0; i < rowCount; i++) {
        html += '<tr>';
        for (let j = 0; j < dataColumns.length; j++) {
            html += `<td style="padding: 10px; border: 1px solid #ddd;">${dataColumns[j][i]}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    return html;
}
async function showCard(card) {
    const content = await loadTxtFile(card);
    const container = document.getElementById("vote-card");
    if (content) {
        const card = [].concat(JSON.parse(content));
        card.keys();      
        container.innerHTML = formatCard(card);
    }
}