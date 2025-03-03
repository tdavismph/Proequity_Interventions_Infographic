// Main data variables
let data = [];
let countries = [];
let interventions = [];
let selectedIntervention = null;

// DOM Elements
const loadingEl = document.getElementById('loading');
const errorEl = document.getElementById('error');
const contentEl = document.getElementById('content');
const interventionSelectEl = document.getElementById('intervention-select');
const rankingsContainerEl = document.getElementById('rankings-container');
const interventionTitleEl = document.getElementById('intervention-title');
const avgRankEl = document.getElementById('avg-rank');
const rationaleTextEl = document.getElementById('rationale-text');
const comparisonTableEl = document.getElementById('comparison-table');

// Color mapping function based on ranking (1 = best/darkest, 5 = worst/lightest)
function getRankColor(rank) {
    const colors = {
        1: '#1e3a8a', // Dark blue for best rank
        2: '#3b82f6',
        3: '#93c5fd',
        4: '#bfdbfe',
        5: '#dbeafe', // Light blue for worst rank
    };
    return colors[rank] || '#f1f5f9';
}

// Format rationale text for better readability
function formatRationale(text, countries) {
    if (!text) return '';
    
    // Split the text by country names
    let formattedText = text;
    
    countries.forEach(country => {
        const countryPattern = new RegExp(`${country}:`, 'g');
        formattedText = formattedText.replace(countryPattern, `<span class="country-highlight">${country}:</span>`);
    });
    
    return formattedText;
}

// Render the rankings by country
function renderRankings(selectedData) {
    rankingsContainerEl.innerHTML = '';
    
    // Iterate through each rank (1-5)
    for (let rank = 1; rank <= 5; rank++) {
        // Get countries with this rank for the selected intervention
        const countriesWithRank = countries.filter(country => selectedData[country] === rank);
        
        // Skip if no countries have this rank
        if (countriesWithRank.length === 0) continue;
        
        // Create priority group container
        const priorityGroup = document.createElement('div');
        priorityGroup.className = 'priority-group';
        
        // Create priority header
        const priorityHeader = document.createElement('div');
        priorityHeader.className = 'priority-header';
        
        const priorityBadge = document.createElement('div');
        priorityBadge.className = 'priority-badge';
        priorityBadge.style.backgroundColor = getRankColor(rank);
        priorityBadge.textContent = rank;
        
        const priorityLabel = document.createElement('div');
        priorityLabel.className = 'priority-label';
        priorityLabel.textContent = rank === 1 ? 'Highest Priority' : 
                                   rank === 5 ? 'Lowest Priority' : 
                                   `Priority ${rank}`;
        
        priorityHeader.appendChild(priorityBadge);
        priorityHeader.appendChild(priorityLabel);
        priorityGroup.appendChild(priorityHeader);
        
        // Create countries container
        const countriesContainer = document.createElement('div');
        countriesContainer.className = 'countries-container';
        
        // Add country items
        countriesWithRank.forEach(country => {
            const countryItem = document.createElement('div');
            countryItem.className = 'country-item';
            
            const countryBadge = document.createElement('div');
            countryBadge.className = 'country-badge';
            countryBadge.style.backgroundColor = getRankColor(rank);
            countryBadge.textContent = country;
            
            countryItem.appendChild(countryBadge);
            countriesContainer.appendChild(countryItem);
        });
        
        priorityGroup.appendChild(countriesContainer);
        rankingsContainerEl.appendChild(priorityGroup);
    }
}

// Render the selected intervention info
function renderInterventionInfo(selectedData) {
    interventionTitleEl.textContent = selectedData['Pro-Equtiy Intervention'];
    avgRankEl.textContent = selectedData['Avg. Rank'];
    rationaleTextEl.innerHTML = formatRationale(selectedData['Rationale'], countries);
}

// Render the comparison table
function renderComparisonTable() {
    // Create table header
    const thead = comparisonTableEl.querySelector('thead');
    thead.innerHTML = '';
    
    const headerRow = document.createElement('tr');
    
    const interventionHeader = document.createElement('th');
    interventionHeader.textContent = 'Intervention';
    headerRow.appendChild(interventionHeader);
    
    const avgRankHeader = document.createElement('th');
    avgRankHeader.textContent = 'Avg. Rank';
    avgRankHeader.className = 'center';
    headerRow.appendChild(avgRankHeader);
    
    countries.forEach(country => {
        const countryHeader = document.createElement('th');
        countryHeader.textContent = country;
        countryHeader.className = 'center';
        headerRow.appendChild(countryHeader);
    });
    
    thead.appendChild(headerRow);
    
    // Create table body
    const tbody = comparisonTableEl.querySelector('tbody');
    tbody.innerHTML = '';
    
    // Sort data by average rank
    const sortedData = [...data].sort((a, b) => a['Avg. Rank'] - b['Avg. Rank']);
    
    sortedData.forEach(row => {
        const tableRow = document.createElement('tr');
        
        // Highlight selected intervention
        if (row['Pro-Equtiy Intervention'] === selectedIntervention) {
            tableRow.className = 'selected';
        }
        
        const interventionCell = document.createElement('td');
        interventionCell.textContent = row['Pro-Equtiy Intervention'];
        tableRow.appendChild(interventionCell);
        
        const avgRankCell = document.createElement('td');
        avgRankCell.textContent = row['Avg. Rank'];
        avgRankCell.className = 'center font-bold';
        tableRow.appendChild(avgRankCell);
        
        countries.forEach(country => {
            const rankCell = document.createElement('td');
            rankCell.className = 'center';
            
            const rankBadge = document.createElement('div');
            rankBadge.className = 'rank-badge';
            rankBadge.style.backgroundColor = getRankColor(row[country]);
            rankBadge.textContent = row[country];
            
            rankCell.appendChild(rankBadge);
            tableRow.appendChild(rankCell);
        });
        
        tbody.appendChild(tableRow);
    });
}

// Update the UI when intervention selection changes
function handleInterventionChange() {
    selectedIntervention = interventionSelectEl.value;
    
    // Find the selected intervention data
    const selectedData = data.find(row => row['Pro-Equtiy Intervention'] === selectedIntervention);
    
    // Update the UI
    renderRankings(selectedData);
    renderInterventionInfo(selectedData);
    renderComparisonTable();
}

// Initialize the intervention select dropdown
function initializeInterventionSelect() {
    interventionSelectEl.innerHTML = '';
    
    interventions.forEach(intervention => {
        const interventionData = data.find(row => row['Pro-Equtiy Intervention'] === intervention);
        const option = document.createElement('option');
        option.value = intervention;
        option.textContent = `${intervention} (Avg. Rank: ${interventionData['Avg. Rank']})`;
        interventionSelectEl.appendChild(option);
    });
    
    // Set initial selection
    interventionSelectEl.value = selectedIntervention;
    
    // Add event listener
    interventionSelectEl.addEventListener('change', handleInterventionChange);
}

// Process the data
function processData(rawData) {
    data = rawData;
    
    // Extract interventions
    interventions = data.map(row => row['Pro-Equtiy Intervention']);
    
    // Get country names (all columns except first, last two)
    countries = Object.keys(data[0])
        .filter(key => key !== 'Pro-Equtiy Intervention' && key !== 'Avg. Rank' && key !== 'Rationale');
    
    // Set initial selected intervention
    selectedIntervention = interventions[0];
    
    // Initialize UI
    initializeInterventionSelect();
    
    // Find the selected intervention data
    const selectedData = data.find(row => row['Pro-Equtiy Intervention'] === selectedIntervention);
    
    // Render UI components
    renderRankings(selectedData);
    renderInterventionInfo(selectedData);
    renderComparisonTable();
    
    // Hide loading, show content
    loadingEl.style.display = 'none';
    contentEl.classList.remove('hidden');
}

// Load and initialize data
async function initializeData() {
    try {
        // First, try to load the Excel file
        const response = await fetch('Final_Intervention_Rankings_by_Country.xlsx');
        
        if (response.ok) {
            const arrayBuffer = await response.arrayBuffer();
            
            // Parse Excel data
            const workbook = XLSX.read(new Uint8Array(arrayBuffer), { type: 'array' });
            
            // Get first sheet
            const sheetName = workbook.SheetNames[0];
            const sheet = workbook.Sheets[sheetName];
            
            // Convert to JSON
            const jsonData = XLSX.utils.sheet_to_json(sheet);
            
            processData(jsonData);
        } else {
            // If Excel file fails to load, use sample data
            console.log('Excel file not found, using sample data instead');
            processData(SAMPLE_DATA);
        }
    } catch (error) {
        console.error('Error loading data:', error);
        
        // Fallback to sample data
        console.log('Using sample data due to error');
        processData(SAMPLE_DATA);
    }
}

// Initialize the application
document.addEventListener('DOMContentLoaded', () => {
    initializeData();
});
