// Medical Data Database for MediNex
// This contains medical reference data for symptom analysis and condition matching

// Common symptoms database
const SYMPTOMS_DATABASE = {
    // Respiratory
    'cough': {
        category: 'respiratory',
        name: 'Cough',
        description: 'Persistent or recurring cough',
        severity_indicators: ['dry', 'productive', 'persistent', 'blood']
    },
    'shortness_of_breath': {
        category: 'respiratory',
        name: 'Shortness of Breath',
        description: 'Difficulty breathing or feeling breathless',
        severity_indicators: ['mild', 'moderate', 'severe', 'at_rest']
    },
    'chest_pain': {
        category: 'respiratory',
        name: 'Chest Pain',
        description: 'Pain or discomfort in the chest area',
        severity_indicators: ['sharp', 'dull', 'crushing', 'radiating']
    },
    'sore_throat': {
        category: 'respiratory',
        name: 'Sore Throat',
        description: 'Pain or irritation in the throat',
        severity_indicators: ['mild', 'moderate', 'severe', 'difficulty_swallowing']
    },
    'runny_nose': {
        category: 'respiratory',
        name: 'Runny Nose',
        description: 'Nasal discharge or congestion',
        severity_indicators: ['clear', 'colored', 'bloody', 'thick']
    },
    'sneezing': {
        category: 'respiratory',
        name: 'Sneezing',
        description: 'Frequent or persistent sneezing',
        severity_indicators: ['occasional', 'frequent', 'violent', 'with_discharge']
    },

    // Gastrointestinal
    'nausea': {
        category: 'gastrointestinal',
        name: 'Nausea',
        description: 'Feeling of sickness with inclination to vomit',
        severity_indicators: ['mild', 'moderate', 'severe', 'with_vomiting']
    },
    'vomiting': {
        category: 'gastrointestinal',
        name: 'Vomiting',
        description: 'Forceful expulsion of stomach contents',
        severity_indicators: ['occasional', 'frequent', 'projectile', 'blood']
    },
    'diarrhea': {
        category: 'gastrointestinal',
        name: 'Diarrhea',
        description: 'Loose or watery bowel movements',
        severity_indicators: ['mild', 'moderate', 'severe', 'bloody']
    },
    'constipation': {
        category: 'gastrointestinal',
        name: 'Constipation',
        description: 'Infrequent or difficult bowel movements',
        severity_indicators: ['mild', 'moderate', 'severe', 'chronic']
    },
    'abdominal_pain': {
        category: 'gastrointestinal',
        name: 'Abdominal Pain',
        description: 'Pain or discomfort in the stomach area',
        severity_indicators: ['cramping', 'sharp', 'dull', 'severe']
    },
    'loss_of_appetite': {
        category: 'gastrointestinal',
        name: 'Loss of Appetite',
        description: 'Reduced desire to eat',
        severity_indicators: ['mild', 'moderate', 'complete', 'with_weight_loss']
    },

    // Neurological
    'headache': {
        category: 'neurological',
        name: 'Headache',
        description: 'Pain in the head or neck area',
        severity_indicators: ['mild', 'moderate', 'severe', 'migraine']
    },
    'dizziness': {
        category: 'neurological',
        name: 'Dizziness',
        description: 'Feeling unsteady or lightheaded',
        severity_indicators: ['mild', 'moderate', 'severe', 'with_fainting']
    },
    'confusion': {
        category: 'neurological',
        name: 'Confusion',
        description: 'Difficulty thinking clearly or remembering',
        severity_indicators: ['mild', 'moderate', 'severe', 'disorientation']
    },
    'memory_problems': {
        category: 'neurological',
        name: 'Memory Problems',
        description: 'Difficulty remembering or cognitive issues',
        severity_indicators: ['short_term', 'long_term', 'progressive', 'sudden']
    },

    // Constitutional
    'fever': {
        category: 'constitutional',
        name: 'Fever',
        description: 'Elevated body temperature',
        severity_indicators: ['low_grade', 'moderate', 'high', 'persistent']
    },
    'chills': {
        category: 'constitutional',
        name: 'Chills',
        description: 'Feeling cold or shivering',
        severity_indicators: ['mild', 'moderate', 'severe', 'with_fever']
    },
    'fatigue': {
        category: 'constitutional',
        name: 'Fatigue',
        description: 'Extreme tiredness or exhaustion',
        severity_indicators: ['mild', 'moderate', 'severe', 'chronic']
    },
    'weakness': {
        category: 'constitutional',
        name: 'Weakness',
        description: 'Lack of physical strength',
        severity_indicators: ['mild', 'moderate', 'severe', 'localized']
    },
    'sweating': {
        category: 'constitutional',
        name: 'Sweating',
        description: 'Excessive perspiration',
        severity_indicators: ['mild', 'moderate', 'profuse', 'night_sweats']
    },
    'weight_loss': {
        category: 'constitutional',
        name: 'Weight Loss',
        description: 'Unintentional loss of body weight',
        severity_indicators: ['gradual', 'rapid', 'significant', 'unexplained']
    },

    // Musculoskeletal
    'muscle_aches': {
        category: 'musculoskeletal',
        name: 'Muscle Aches',
        description: 'Pain or soreness in muscles',
        severity_indicators: ['mild', 'moderate', 'severe', 'widespread']
    },
    'joint_pain': {
        category: 'musculoskeletal',
        name: 'Joint Pain',
        description: 'Pain in one or more joints',
        severity_indicators: ['mild', 'moderate', 'severe', 'stiffness']
    },
    'back_pain': {
        category: 'musculoskeletal',
        name: 'Back Pain',
        description: 'Pain in the back or spine',
        severity_indicators: ['lower', 'upper', 'radiating', 'chronic']
    },

    // Skin
    'rash': {
        category: 'skin',
        name: 'Rash',
        description: 'Changes in skin color, texture, or appearance',
        severity_indicators: ['localized', 'widespread', 'itchy', 'painful']
    },
    'itching': {
        category: 'skin',
        name: 'Itching',
        description: 'Sensation that causes desire to scratch',
        severity_indicators: ['mild', 'moderate', 'severe', 'widespread']
    },

    // Cardiovascular
    'palpitations': {
        category: 'cardiovascular',
        name: 'Palpitations',
        description: 'Feeling of rapid or irregular heartbeat',
        severity_indicators: ['occasional', 'frequent', 'persistent', 'with_pain']
    },

    // Psychiatric
    'anxiety': {
        category: 'psychiatric',
        name: 'Anxiety',
        description: 'Feelings of worry, nervousness, or unease',
        severity_indicators: ['mild', 'moderate', 'severe', 'panic']
    },
    'depression': {
        category: 'psychiatric',
        name: 'Depression',
        description: 'Persistent feelings of sadness or hopelessness',
        severity_indicators: ['mild', 'moderate', 'severe', 'thoughts_of_harm']
    },
    'insomnia': {
        category: 'psychiatric',
        name: 'Insomnia',
        description: 'Difficulty falling or staying asleep',
        severity_indicators: ['occasional', 'frequent', 'chronic', 'severe']
    }
};

// Medical conditions database with symptom patterns
const CONDITIONS_DATABASE = {
    'common_cold': {
        name: 'Common Cold',
        category: 'viral_respiratory',
        description: 'A viral infection of the upper respiratory tract',
        common_symptoms: ['runny_nose', 'sneezing', 'sore_throat', 'cough', 'mild_headache'],
        severity: 'mild',
        duration: '7-10 days',
        contagious: true,
        precautions: [
            'Rest and stay hydrated',
            'Use over-the-counter pain relievers for aches',
            'Gargle with salt water for sore throat',
            'Use a humidifier to ease congestion',
            'Wash hands frequently to prevent spread',
            'Stay home to avoid spreading to others'
        ],
        when_to_seek_help: [
            'Symptoms worsen after 7 days',
            'Fever above 101.3°F (38.5°C)',
            'Severe headache or sinus pain',
            'Difficulty breathing',
            'Persistent cough with blood'
        ]
    },
    'influenza': {
        name: 'Influenza (Flu)',
        category: 'viral_respiratory',
        description: 'A viral infection that attacks your respiratory system',
        common_symptoms: ['fever', 'chills', 'muscle_aches', 'fatigue', 'cough', 'headache'],
        severity: 'moderate',
        duration: '1-2 weeks',
        contagious: true,
        precautions: [
            'Rest and get plenty of sleep',
            'Drink plenty of fluids',
            'Take antiviral medications if prescribed early',
            'Use fever reducers for comfort',
            'Stay home until fever-free for 24 hours',
            'Practice good hygiene'
        ],
        when_to_seek_help: [
            'Difficulty breathing or shortness of breath',
            'Chest pain or pressure',
            'Persistent dizziness or confusion',
            'Severe vomiting',
            'Flu-like symptoms that improve then return with fever and worse cough'
        ]
    },
    'gastroenteritis': {
        name: 'Gastroenteritis (Stomach Flu)',
        category: 'gastrointestinal',
        description: 'Inflammation of the stomach and intestines',
        common_symptoms: ['nausea', 'vomiting', 'diarrhea', 'abdominal_pain', 'fever', 'fatigue'],
        severity: 'mild_to_moderate',
        duration: '1-3 days',
        contagious: true,
        precautions: [
            'Stay hydrated with clear fluids',
            'Rest and avoid solid foods initially',
            'Try BRAT diet (Bananas, Rice, Applesauce, Toast)',
            'Wash hands frequently',
            'Avoid dairy and caffeine',
            'Use oral rehydration solutions if needed'
        ],
        when_to_seek_help: [
            'Signs of severe dehydration',
            'Blood in vomit or stool',
            'High fever (over 102°F)',
            'Severe abdominal pain',
            'Unable to keep fluids down for 24 hours'
        ]
    },
    'tension_headache': {
        name: 'Tension Headache',
        category: 'neurological',
        description: 'Most common type of headache caused by muscle tension',
        common_symptoms: ['headache', 'muscle_aches', 'fatigue', 'mild_nausea'],
        severity: 'mild_to_moderate',
        duration: '30 minutes to several hours',
        contagious: false,
        precautions: [
            'Apply heat or cold to head, neck, or shoulders',
            'Practice relaxation techniques',
            'Get adequate sleep',
            'Stay hydrated',
            'Use over-the-counter pain relievers as directed',
            'Manage stress levels'
        ],
        when_to_seek_help: [
            'Sudden, severe headache unlike any before',
            'Headache with fever, stiff neck, confusion',
            'Headache with vision changes',
            'Headache after head injury',
            'Chronic daily headaches'
        ]
    },
    'anxiety_disorder': {
        name: 'Anxiety Disorder',
        category: 'mental_health',
        description: 'Persistent feelings of worry, fear, or unease',
        common_symptoms: ['anxiety', 'palpitations', 'sweating', 'shortness_of_breath', 'insomnia'],
        severity: 'variable',
        duration: 'chronic',
        contagious: false,
        precautions: [
            'Practice deep breathing exercises',
            'Regular physical exercise',
            'Maintain a healthy sleep schedule',
            'Limit caffeine and alcohol',
            'Practice mindfulness and meditation',
            'Connect with supportive friends and family'
        ],
        when_to_seek_help: [
            'Anxiety interferes with daily activities',
            'Panic attacks occur regularly',
            'Physical symptoms are severe',
            'Thoughts of self-harm',
            'Unable to cope with daily stress'
        ]
    },
    'urinary_tract_infection': {
        name: 'Urinary Tract Infection (UTI)',
        category: 'genitourinary',
        description: 'Infection in any part of the urinary system',
        common_symptoms: ['burning_urination', 'frequent_urination', 'pelvic_pain', 'cloudy_urine'],
        severity: 'mild_to_moderate',
        duration: '3-7 days with treatment',
        contagious: false,
        precautions: [
            'Drink plenty of water',
            'Urinate frequently and completely',
            'Wipe front to back',
            'Avoid irritating feminine products',
            'Take prescribed antibiotics completely',
            'Use heating pad for pelvic pain'
        ],
        when_to_seek_help: [
            'Blood in urine',
            'Fever or chills',
            'Nausea and vomiting',
            'Back or side pain',
            'Symptoms worsen or don\'t improve with treatment'
        ]
    },
    'allergic_reaction': {
        name: 'Allergic Reaction',
        category: 'immunological',
        description: 'Immune system response to a foreign substance',
        common_symptoms: ['rash', 'itching', 'sneezing', 'runny_nose', 'swelling'],
        severity: 'mild_to_severe',
        duration: 'minutes to days',
        contagious: false,
        precautions: [
            'Avoid known allergens',
            'Take antihistamines as directed',
            'Apply cool compresses to rashes',
            'Keep emergency epinephrine if prescribed',
            'Wear medical alert bracelet',
            'Read food and medication labels carefully'
        ],
        when_to_seek_help: [
            'Difficulty breathing or wheezing',
            'Swelling of face, lips, tongue, or throat',
            'Rapid pulse or dizziness',
            'Widespread rash or hives',
            'Severe allergic reaction (anaphylaxis)'
        ]
    }
};

// Mock clinic/facility data
const MOCK_FACILITIES = [
    {
        id: 'clinic_001',
        name: 'Lokmanya Tilak Municipal General Hospital',
        type: 'goverment hospital',
        address: 'Sion East, Mumbai Maharashtra 400022',
        phone: '02224076381',
        distance: '3.0 KM',
        rating: 4.5,
        hours: {
            emergency: '24/7',
            general: 'Mon-Fri: 8AM-6PM, Sat: 9AM-3PM'
        },
        services: ['Emergency Care', 'General Medicine', 'Cardiology', 'Radiology'],
        coordinates: { lat: 19.036355552167002, lng: 72.85994436331089 }
    },
    {
        id: 'clinic_002',
        name: 'K.J. Somaiya Hospital & Research Center',
        type: 'hospital',
        address: 'Sion East, Sion, Mumbai, Maharashtra 400022',
        phone: '02250954700',
        distance: '500 m',
        rating: 4.2,
        hours: {
            general: 'Mon-Fri: 9AM-5PM, Sat: 10AM-2PM'
        },
        services: ['Family Medicine', 'Pediatrics', 'Vaccinations', 'Annual Checkups'],
        coordinates: { lat: 19.047510220592727, lng: 72.8747430519889 }
    },
    {
        id: 'clinic_003',
        name: 'Care All Clinics',
        type: 'clinic',
        address: 'Chembur Camp, Mumbai, Maharashtra 400074',
        phone: '08104382686',
        distance: '4.8 km',
        rating: 4.0,
        hours: {
            general: 'Daily: 8AM-10PM'
        },
        services: ['Urgent Care', 'Minor Injuries', 'Lab Services', 'X-rays'],
        coordinates: { lat: 19.0467089257994, lng: 72.89614877150612 }
    },
    {
        id: 'pharmacy_001',
        name: 'CritiCare Asia Multi Specialty Hospital',
        type: 'pharmacy',
        address: 'Kurla West, Kurla, Mumbai, Maharashtra 400070',
        phone: '02267556755',
        distance: '0.8 miles',
        rating: 4.3,
        hours: {
            general: 'Mon-Fri: 8AM-8PM, Sat-Sun: 9AM-6PM'
        },
        services: ['Prescription Filling', 'Vaccinations', 'Health Screenings', 'Medical Supplies'],
        coordinates: { lat: 19.07704748466525, lng: 72.88595379345614 }
    },
    {
        id: 'hospital_001',
        name: 'CNV Healthcare Multi-Specialty Clinic',
        type: 'clinic',
        address: ' Wadala East, Mumbai, Maharashtra 400037  ',
        phone: '07718846426',
        distance: '5.0 km',
        rating: 4.7,
        hours: {
            emergency: 'No',
            general: '24/7'
        },
        services: ['Ear Nose', 'ENT', 'ICU', 'Maternity', 'Oncology', 'Neurology'],
        coordinates: { lat: 19.03803430556389, lng: 72.88002242088415 }
    },
    {
        id: 'emergency_001',
        name: 'Quick Emergency Center',
        type: 'emergency',
        address: 'Sion, Mumbai, Maharashtra 400022',
        phone: '02224063000',
        distance: '1.5 miles',
        rating: 4.1,
        hours: {
            emergency: '24/7'
        },
        services: ['Emergency Care'],
        coordinates: { lat: 19.036477378166232, lng: 72.85970567010386 }
    }
];

// Health tips and general advice
const HEALTH_TIPS = {
    general: [
        'Drink at least 8 glasses of water daily',
        'Get 7-9 hours of sleep each night',
        'Exercise for at least 30 minutes, 5 days a week',
        'Eat a balanced diet with fruits and vegetables',
        'Wash your hands frequently',
        'Schedule regular check-ups with your healthcare provider'
    ],
    emergency_signs: [
        'Difficulty breathing or shortness of breath',
        'Chest pain or pressure',
        'Severe abdominal pain',
        'Signs of stroke (face drooping, arm weakness, speech difficulty)',
        'Severe bleeding',
        'Loss of consciousness',
        'Severe allergic reaction'
    ],
    when_to_call_911: [
        'Life-threatening emergency',
        'Unconsciousness',
        'Severe difficulty breathing',
        'Chest pain with sweating',
        'Heavy bleeding that won\'t stop',
        'Severe head injury',
        'Poisoning or overdose'
    ]
};

// Symptom analysis logic
class SymptomAnalyzer {
    constructor() {
        this.selectedSymptoms = [];
        this.userAge = null;
        this.userGender = null;
    }

    setUserInfo(age, gender) {
        this.userAge = age;
        this.userGender = gender;
    }

    addSymptom(symptomId) {
        if (!this.selectedSymptoms.includes(symptomId)) {
            this.selectedSymptoms.push(symptomId);
        }
    }

    removeSymptom(symptomId) {
        this.selectedSymptoms = this.selectedSymptoms.filter(id => id !== symptomId);
    }

    analyzeSymptoms() {
        if (this.selectedSymptoms.length === 0) {
            return {
                conditions: [],
                message: 'No symptoms selected for analysis.'
            };
        }

        const possibleConditions = [];

        // Analyze each condition against selected symptoms
        Object.keys(CONDITIONS_DATABASE).forEach(conditionId => {
            const condition = CONDITIONS_DATABASE[conditionId];
            const matchScore = this.calculateMatchScore(condition);

            if (matchScore > 0) {
                possibleConditions.push({
                    id: conditionId,
                    condition: condition,
                    matchScore: matchScore,
                    confidence: this.calculateConfidence(matchScore, condition.common_symptoms.length)
                });
            }
        });

        // Sort by match score and confidence
        possibleConditions.sort((a, b) => {
            if (b.matchScore === a.matchScore) {
                return b.confidence - a.confidence;
            }
            return b.matchScore - a.matchScore;
        });

        return {
            conditions: possibleConditions.slice(0, 5), // Return top 5 matches
            totalSymptoms: this.selectedSymptoms.length,
            message: possibleConditions.length > 0 
                ? 'Based on your symptoms, here are some possible conditions to consider:'
                : 'No clear matches found. Please consult with a healthcare professional.'
        };
    }

    calculateMatchScore(condition) {
        let score = 0;
        condition.common_symptoms.forEach(symptom => {
            if (this.selectedSymptoms.includes(symptom)) {
                score++;
            }
        });
        return score;
    }

    calculateConfidence(matchScore, totalConditionSymptoms) {
        return Math.round((matchScore / totalConditionSymptoms) * 100);
    }

    getEmergencyWarnings() {
        const emergencySymptoms = [
            'chest_pain', 'shortness_of_breath', 'confusion', 
            'severe_headache', 'high_fever', 'difficulty_breathing'
        ];

        const foundEmergencySymptoms = this.selectedSymptoms.filter(
            symptom => emergencySymptoms.includes(symptom)
        );

        return foundEmergencySymptoms.length > 0 ? {
            hasEmergencySymptoms: true,
            symptoms: foundEmergencySymptoms,
            message: 'Some of your symptoms may require immediate medical attention. Consider seeking emergency care.'
        } : { hasEmergencySymptoms: false };
    }
}

// Export for use in main.js
if (typeof window !== 'undefined') {
    window.SYMPTOMS_DATABASE = SYMPTOMS_DATABASE;
    window.CONDITIONS_DATABASE = CONDITIONS_DATABASE;
    window.MOCK_FACILITIES = MOCK_FACILITIES;
    window.HEALTH_TIPS = HEALTH_TIPS;
    window.SymptomAnalyzer = SymptomAnalyzer;
}