// Main JavaScript for MediNex Application

// Global variables
let symptomAnalyzer = new SymptomAnalyzer();
let currentStep = 1;
let selectedFacilityType = 'all';
let userLocation = null;

// Initialize the application
document.addEventListener('DOMContentLoaded', function() {
    initializeApp();
    populateSymptoms();
    setupEventListeners();
    displayMockFacilities();
});

// Initialize application
function initializeApp() {
    console.log('MediNex Application Initialized');
    
    // Set up mobile menu toggle
    const mobileMenuBtn = document.getElementById('mobileMenuBtn');
    const mobileMenu = document.getElementById('mobileMenu');
    
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', function() {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Setup event listeners
function setupEventListeners() {
    // Symptom search functionality
    const symptomSearch = document.getElementById('symptomSearch');
    if (symptomSearch) {
        symptomSearch.addEventListener('input', function(e) {
            filterSymptoms(e.target.value);
        });
    }
}

// Populate symptoms in the symptom checker
function populateSymptoms() {
    const symptomGrid = document.getElementById('symptomGrid');
    if (!symptomGrid) return;

    // Clear existing symptoms
    symptomGrid.innerHTML = '';

    // Create symptom buttons
    Object.keys(SYMPTOMS_DATABASE).forEach(symptomId => {
        const symptom = SYMPTOMS_DATABASE[symptomId];
        const button = document.createElement('button');
        button.type = 'button';
        button.className = 'symptom-btn p-3 text-left border border-gray-200 rounded-lg hover:border-health-primary hover:bg-blue-50 transition-colors';
        button.setAttribute('data-symptom', symptomId);
        button.innerHTML = `
            <div class="flex items-center space-x-2">
                <i class="fas fa-plus text-health-primary"></i>
                <span class="text-sm font-medium">${symptom.name}</span>
            </div>
            <p class="text-xs text-gray-500 mt-1">${symptom.description}</p>
        `;
        
        button.addEventListener('click', function() {
            toggleSymptom(symptomId, this);
        });
        
        symptomGrid.appendChild(button);
    });
}

// Filter symptoms based on search
function filterSymptoms(searchTerm) {
    const symptomButtons = document.querySelectorAll('.symptom-btn');
    const term = searchTerm.toLowerCase();

    symptomButtons.forEach(button => {
        const symptomId = button.getAttribute('data-symptom');
        const symptom = SYMPTOMS_DATABASE[symptomId];
        const matchesSearch = symptom.name.toLowerCase().includes(term) || 
                            symptom.description.toLowerCase().includes(term);
        
        button.style.display = matchesSearch ? 'block' : 'none';
    });
}

// Toggle symptom selection
function toggleSymptom(symptomId, buttonElement) {
    const isSelected = symptomAnalyzer.selectedSymptoms.includes(symptomId);
    
    if (isSelected) {
        // Remove symptom
        symptomAnalyzer.removeSymptom(symptomId);
        buttonElement.classList.remove('bg-health-primary', 'text-white', 'border-health-primary');
        buttonElement.classList.add('border-gray-200');
        buttonElement.querySelector('i').className = 'fas fa-plus text-health-primary';
    } else {
        // Add symptom
        symptomAnalyzer.addSymptom(symptomId);
        buttonElement.classList.add('bg-health-primary', 'text-white', 'border-health-primary');
        buttonElement.classList.remove('border-gray-200');
        buttonElement.querySelector('i').className = 'fas fa-check text-white';
    }
    
    updateSelectedSymptoms();
}

// Update selected symptoms display
function updateSelectedSymptoms() {
    const selectedSymptomsDiv = document.getElementById('selectedSymptoms');
    if (!selectedSymptomsDiv) return;

    if (symptomAnalyzer.selectedSymptoms.length === 0) {
        selectedSymptomsDiv.innerHTML = '<p class="text-gray-500 italic">No symptoms selected yet</p>';
        return;
    }

    const symptomsHtml = symptomAnalyzer.selectedSymptoms.map(symptomId => {
        const symptom = SYMPTOMS_DATABASE[symptomId];
        return `
            <span class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-health-primary text-white mr-2 mb-2">
                ${symptom.name}
                <button onclick="removeSelectedSymptom('${symptomId}')" class="ml-2 text-white hover:text-gray-200">
                    <i class="fas fa-times text-xs"></i>
                </button>
            </span>
        `;
    }).join('');

    selectedSymptomsDiv.innerHTML = symptomsHtml;
}

// Remove selected symptom
function removeSelectedSymptom(symptomId) {
    symptomAnalyzer.removeSymptom(symptomId);
    
    // Update the button appearance
    const button = document.querySelector(`[data-symptom="${symptomId}"]`);
    if (button) {
        button.classList.remove('bg-health-primary', 'text-white', 'border-health-primary');
        button.classList.add('border-gray-200');
        button.querySelector('i').className = 'fas fa-plus text-health-primary';
    }
    
    updateSelectedSymptoms();
}

// Step navigation functions
function nextStep(currentStepNumber) {
    if (!validateStep(currentStepNumber)) {
        return;
    }

    // Hide current step
    document.getElementById(`step${currentStepNumber}`).classList.add('hidden');
    
    // Show next step
    const nextStepNumber = currentStepNumber + 1;
    document.getElementById(`step${nextStepNumber}`).classList.remove('hidden');
    
    // Update step indicators
    updateStepIndicators(nextStepNumber);
    
    // Handle step-specific logic
    if (nextStepNumber === 2) {
        // Store user info when moving to step 2
        const age = document.getElementById('ageRange').value;
        const gender = document.getElementById('gender').value;
        symptomAnalyzer.setUserInfo(age, gender);
    } else if (nextStepNumber === 3) {
        // Perform analysis when moving to step 3
        performAnalysis();
    }
    
    currentStep = nextStepNumber;
}

function previousStep(currentStepNumber) {
    // Hide current step
    document.getElementById(`step${currentStepNumber}`).classList.add('hidden');
    
    // Show previous step
    const prevStepNumber = currentStepNumber - 1;
    document.getElementById(`step${prevStepNumber}`).classList.remove('hidden');
    
    // Update step indicators
    updateStepIndicators(prevStepNumber);
    
    currentStep = prevStepNumber;
}

// Validate step before proceeding
function validateStep(stepNumber) {
    if (stepNumber === 1) {
        const age = document.getElementById('ageRange').value;
        const gender = document.getElementById('gender').value;
        
        if (!age || !gender) {
            alert('Please select both age range and gender before continuing.');
            return false;
        }
    } else if (stepNumber === 2) {
        if (symptomAnalyzer.selectedSymptoms.length === 0) {
            alert('Please select at least one symptom before continuing.');
            return false;
        }
    }
    return true;
}

// Update step indicators
function updateStepIndicators(activeStep) {
    // Reset all indicators
    for (let i = 1; i <= 3; i++) {
        const indicator = document.getElementById(`step${i}-indicator`);
        if (i <= activeStep) {
            indicator.className = 'flex items-center justify-center w-10 h-10 rounded-full bg-health-primary text-white font-semibold';
        } else {
            indicator.className = 'flex items-center justify-center w-10 h-10 rounded-full bg-gray-200 text-gray-500 font-semibold';
        }
    }
    
    // Update progress bars
    document.getElementById('progress1-2').style.width = activeStep > 1 ? '100%' : '0%';
    document.getElementById('progress2-3').style.width = activeStep > 2 ? '100%' : '0%';
}

// Perform symptom analysis
function performAnalysis() {
    const analysisResults = symptomAnalyzer.analyzeSymptoms();
    const emergencyWarnings = symptomAnalyzer.getEmergencyWarnings();
    
    displayAnalysisResults(analysisResults, emergencyWarnings);
}

// Display analysis results
function displayAnalysisResults(results, emergencyWarnings) {
    const resultsDiv = document.getElementById('analysisResults');
    if (!resultsDiv) return;

    let html = '';

    // Emergency warning if applicable
    if (emergencyWarnings.hasEmergencySymptoms) {
        html += `
            <div class="bg-red-50 border border-red-200 rounded-lg p-6 mb-6">
                <div class="flex items-start space-x-3">
                    <i class="fas fa-exclamation-triangle text-red-500 text-xl mt-1"></i>
                    <div>
                        <h4 class="text-lg font-semibold text-red-800 mb-2">⚠️ Seek Immediate Medical Attention</h4>
                        <p class="text-red-700 mb-3">${emergencyWarnings.message}</p>
                        <div class="bg-red-100 p-3 rounded border">
                            <p class="font-medium text-red-800">Emergency Contact:</p>
                            <p class="text-red-700">Call 911 or go to your nearest emergency room immediately</p>
                        </div>
                    </div>
                </div>
            </div>
        `;
    }

    // Analysis results
    html += `<h4 class="text-xl font-semibold text-gray-800 mb-4">Analysis Results</h4>`;
    
    if (results.conditions.length > 0) {
        html += `
            <div class="mb-6">
                <p class="text-gray-600 mb-4">${results.message}</p>
                <div class="space-y-4">
        `;

        results.conditions.forEach(result => {
            const condition = result.condition;
            html += `
                <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
                    <div class="flex justify-between items-start mb-3">
                        <h5 class="text-lg font-semibold text-gray-800">${condition.name}</h5>
                        <span class="bg-health-primary text-white px-3 py-1 rounded-full text-sm font-medium">
                            ${result.confidence}% match
                        </span>
                    </div>
                    
                    <p class="text-gray-600 mb-4">${condition.description}</p>
                    
                    <div class="grid md:grid-cols-2 gap-4 mb-4">
                        <div>
                            <h6 class="font-medium text-gray-800 mb-2">Severity: 
                                <span class="text-${getSeverityColor(condition.severity)}">${condition.severity}</span>
                            </h6>
                            <h6 class="font-medium text-gray-800">Duration: ${condition.duration}</h6>
                        </div>
                        <div>
                            <h6 class="font-medium text-gray-800 mb-2">Contagious: 
                                <span class="${condition.contagious ? 'text-red-600' : 'text-green-600'}">
                                    ${condition.contagious ? 'Yes' : 'No'}
                                </span>
                            </h6>
                        </div>
                    </div>

                    <div class="mb-4">
                        <h6 class="font-medium text-gray-800 mb-2">Precautionary Measures:</h6>
                        <ul class="text-gray-600 space-y-1">
                            ${condition.precautions.map(precaution => `<li class="flex items-start space-x-2">
                                <i class="fas fa-check-circle text-health-secondary mt-1 text-sm"></i>
                                <span class="text-sm">${precaution}</span>
                            </li>`).join('')}
                        </ul>
                    </div>

                    <div class="bg-yellow-50 border border-yellow-200 rounded p-4">
                        <h6 class="font-medium text-yellow-800 mb-2">When to Seek Medical Help:</h6>
                        <ul class="text-yellow-700 space-y-1">
                            ${condition.when_to_seek_help.map(warning => `<li class="flex items-start space-x-2">
                                <i class="fas fa-exclamation-circle text-yellow-600 mt-1 text-sm"></i>
                                <span class="text-sm">${warning}</span>
                            </li>`).join('')}
                        </ul>
                    </div>
                </div>
            `;
        });

        html += `</div></div>`;
    } else {
        html += `
            <div class="bg-gray-50 border border-gray-200 rounded-lg p-6 text-center">
                <i class="fas fa-info-circle text-gray-400 text-3xl mb-3"></i>
                <h5 class="text-lg font-medium text-gray-700 mb-2">No Clear Matches Found</h5>
                <p class="text-gray-600">Your symptoms don't clearly match common conditions in our database. 
                We recommend consulting with a healthcare professional for proper evaluation.</p>
            </div>
        `;
    }

    // General health disclaimer
    html += `
        <div class="mt-6 bg-blue-50 border border-blue-200 rounded-lg p-6">
            <div class="flex items-start space-x-3">
                <i class="fas fa-info-circle text-blue-500 text-xl"></i>
                <div>
                    <h5 class="font-semibold text-blue-800 mb-2">Important Medical Disclaimer</h5>
                    <p class="text-blue-700 text-sm">
                        This analysis is for informational purposes only and should not be considered as medical advice, 
                        diagnosis, or treatment recommendation. Always consult with qualified healthcare professionals 
                        for proper medical evaluation and treatment.
                    </p>
                </div>
            </div>
        </div>
    `;

    resultsDiv.innerHTML = html;
}

// Get severity color for display
function getSeverityColor(severity) {
    const colorMap = {
        'mild': 'green-600',
        'mild_to_moderate': 'yellow-600',
        'moderate': 'yellow-600',
        'severe': 'red-600',
        'variable': 'gray-600',
        'chronic': 'purple-600'
    };
    return colorMap[severity] || 'gray-600';
}

// Reset symptom checker
function resetChecker() {
    symptomAnalyzer = new SymptomAnalyzer();
    currentStep = 1;
    
    // Reset form
    document.getElementById('ageRange').value = '';
    document.getElementById('gender').value = '';
    
    // Reset symptom buttons
    document.querySelectorAll('.symptom-btn').forEach(button => {
        button.classList.remove('bg-health-primary', 'text-white', 'border-health-primary');
        button.classList.add('border-gray-200');
        button.querySelector('i').className = 'fas fa-plus text-health-primary';
    });
    
    // Reset steps
    document.getElementById('step1').classList.remove('hidden');
    document.getElementById('step2').classList.add('hidden');
    document.getElementById('step3').classList.add('hidden');
    
    // Reset step indicators
    updateStepIndicators(1);
    updateSelectedSymptoms();
}

// Clinic Finder Functions

// Get user's current location
function getCurrentLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            function(position) {
                userLocation = {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                };
                document.getElementById('locationInput').value = 'Current Location';
                console.log('Location obtained:', userLocation);
            },
            function(error) {
                alert('Unable to retrieve location. Please enter your location manually.');
                console.error('Geolocation error:', error);
            }
        );
    } else {
        alert('Geolocation is not supported by this browser.');
    }
}

// Filter facilities by type
function filterFacilities(type) {
    selectedFacilityType = type;
    
    // Update filter buttons
    document.querySelectorAll('.facility-filter').forEach(button => {
        button.classList.remove('bg-health-primary', 'text-white');
        button.classList.add('bg-gray-200', 'text-gray-700');
    });
    
    event.target.classList.add('bg-health-primary', 'text-white');
    event.target.classList.remove('bg-gray-200', 'text-gray-700');
}

// Search for medical facilities
function searchFacilities() {
    const location = document.getElementById('locationInput').value;
    
    if (!location) {
        alert('Please enter a location or use current location.');
        return;
    }

    // Filter facilities based on selected type
    let filteredFacilities = MOCK_FACILITIES;
    if (selectedFacilityType !== 'all') {
        filteredFacilities = MOCK_FACILITIES.filter(facility => 
            facility.type === selectedFacilityType
        );
    }

    displayFacilities(filteredFacilities);
    updateMap(filteredFacilities);
}

// Display mock facilities on page load
function displayMockFacilities() {
    displayFacilities(MOCK_FACILITIES);
}

// Display facilities in the results list
function displayFacilities(facilities) {
    const facilityList = document.getElementById('facilityList');
    if (!facilityList) return;

    if (facilities.length === 0) {
        facilityList.innerHTML = `
            <div class="text-center py-8">
                <i class="fas fa-search text-gray-400 text-3xl mb-3"></i>
                <p class="text-gray-600">No facilities found matching your criteria.</p>
            </div>
        `;
        return;
    }

    const html = facilities.map(facility => `
        <div class="border border-gray-200 rounded-lg p-6 hover:shadow-lg transition-shadow">
            <div class="flex justify-between items-start mb-3">
                <div>
                    <h5 class="text-lg font-semibold text-gray-800">${facility.name}</h5>
                    <div class="flex items-center space-x-2 mt-1">
                        <span class="bg-${getFacilityTypeColor(facility.type)} text-white px-2 py-1 rounded text-xs font-medium uppercase">
                            ${facility.type}
                        </span>
                        <div class="flex items-center space-x-1">
                            <i class="fas fa-star text-yellow-500"></i>
                            <span class="text-sm text-gray-600">${facility.rating}/5</span>
                        </div>
                    </div>
                </div>
                <div class="text-right">
                    <p class="text-sm font-medium text-gray-700">${facility.distance}</p>
                    <p class="text-xs text-gray-500">away</p>
                </div>
            </div>

            <div class="grid md:grid-cols-2 gap-4 mb-4">
                <div>
                    <div class="flex items-start space-x-2 mb-2">
                        <i class="fas fa-map-marker-alt text-gray-400 mt-1"></i>
                        <p class="text-sm text-gray-600">${facility.address}</p>
                    </div>
                    <div class="flex items-center space-x-2">
                        <i class="fas fa-phone text-gray-400"></i>
                        <a href="tel:${facility.phone}" class="text-sm text-health-primary hover:underline">${facility.phone}</a>
                    </div>
                </div>
                <div>
                    <div class="mb-2">
                        <i class="fas fa-clock text-gray-400 mr-2"></i>
                        <span class="text-sm text-gray-600">
                            ${facility.hours.emergency ? `Emergency: ${facility.hours.emergency}` : facility.hours.general}
                        </span>
                    </div>
                    ${facility.hours.general && facility.hours.emergency ? `
                        <div class="ml-5">
                            <span class="text-sm text-gray-600">General: ${facility.hours.general}</span>
                        </div>
                    ` : ''}
                </div>
            </div>

            <div class="mb-4">
                <h6 class="font-medium text-gray-800 mb-2">Services:</h6>
                <div class="flex flex-wrap gap-2">
                    ${facility.services.map(service => `
                        <span class="bg-gray-100 text-gray-700 px-2 py-1 rounded text-xs">${service}</span>
                    `).join('')}
                </div>
            </div>

            <div class="flex flex-wrap gap-2">
                <button onclick="getDirections('${facility.id}')" class="bg-health-primary text-white px-4 py-2 rounded font-medium text-sm hover:bg-blue-700 transition-colors flex items-center space-x-2">
                    <i class="fas fa-directions"></i>
                    <span>Get Directions</span>
                </button>
                <button onclick="callFacility('${facility.phone}')" class="bg-health-secondary text-white px-4 py-2 rounded font-medium text-sm hover:bg-green-700 transition-colors flex items-center space-x-2">
                    <i class="fas fa-phone"></i>
                    <span>Call Now</span>
                </button>
                <button onclick="viewOnMap('${facility.id}')" class="bg-gray-600 text-white px-4 py-2 rounded font-medium text-sm hover:bg-gray-700 transition-colors flex items-center space-x-2">
                    <i class="fas fa-map"></i>
                    <span>View on Map</span>
                </button>
            </div>
        </div>
    `).join('');

    facilityList.innerHTML = html;
}

// Get facility type color
function getFacilityTypeColor(type) {
    const colorMap = {
        'hospital': 'red-500',
        'clinic': 'blue-500',
        'pharmacy': 'green-500',
        'emergency': 'red-600'
    };
    return colorMap[type] || 'gray-500';
}

// Update map display (mock implementation)
function updateMap(facilities) {
    const mapContainer = document.getElementById('mapContainer');
    if (!mapContainer) return;

    // Mock map implementation - would integrate with Google Maps API
    mapContainer.innerHTML = `
        <div class="w-full h-full bg-gray-200 rounded-lg flex items-center justify-center">
            <div class="text-center text-gray-600">
                <i class="fas fa-map-marked-alt text-4xl mb-4"></i>
                <p class="font-medium">Interactive Map View</p>
                <p class="text-sm">Showing ${facilities.length} facilities</p>
                <p class="text-xs mt-2">Google Maps integration would display here</p>
            </div>
        </div>
    `;
}

// Get directions to facility
function getDirections(facilityId) {
    const facility = MOCK_FACILITIES.find(f => f.id === facilityId);
    if (facility) {
        // In a real implementation, this would open Google Maps
        const address = encodeURIComponent(facility.address);
        const url = `https://www.google.com/maps/dir/?api=1&destination=${address}`;
        window.open(url, '_blank');
    }
}

// Call facility
function callFacility(phoneNumber) {
    window.location.href = `tel:${phoneNumber}`;
}

// View facility on map
function viewOnMap(facilityId) {
    const facility = MOCK_FACILITIES.find(f => f.id === facilityId);
    if (facility) {
        // Mock map focus - would integrate with Google Maps API
        alert(`Focusing map on ${facility.name} at ${facility.address}`);
    }
}

// Utility function for smooth scrolling
function scrollToSection(sectionId) {
    const element = document.getElementById(sectionId);
    if (element) {
        element.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
        });
    }
}