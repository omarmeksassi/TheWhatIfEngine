# The What If Insights Engine

The What If Insights Engine is a data-driven platform designed to help humanitarian and development organizations collect, process, and analyze beneficiary data to generate actionable insights. The platform bridges offline and online data collection, automates cleaning and tagging, and uses AI-powered sentiment analysis to amplify the voices of those in need.

## Features
- **Offline and Online Data Collection**: Capture data in remote areas with no connectivity and integrate online data from external platforms.
- **Data Cleaning and Tagging**: Automated tools to merge, clean, and tag data for meaningful analysis.
- **Sentiment Analysis**: Leverages AI to analyze beneficiary sentiment and identify trends.
- **User-Friendly Dashboard**: Real-time visualization of actionable insights.

## Technologies
- **Backend**: FastAPI, SQLAlchemy, HuggingFace Transformers
- **Frontend**: React.js (coming soon)
- **Mobile App**: Flutter (coming soon)
- **Database**: PostgreSQL (or SQLite for development)
- **Deployment**: Docker and Docker Compose

## Getting Started

### Prerequisites
- Python 3.9+
- Docker and Docker Compose
- Node.js (for frontend development)
- Flutter SDK (for mobile development)

### Setup

#### Backend
1. Navigate to the `backend/` directory:
    ```bash
    cd backend
    ```
2. Install dependencies:
    ```bash
    pip install -r requirements.txt
    ```
3. Run the application:
    ```bash
    uvicorn app.main:app --reload
    ```
4. Access the API documentation at `http://localhost:8000/docs`.

#### Frontend (coming soon)
- Navigate to the `frontend/` directory and follow the setup instructions in `frontend/README.md`.

#### Mobile App (coming soon)
- Navigate to the `mobile/` directory and follow the setup instructions in `mobile/README.md`.

### Docker Deployment
To deploy the entire stack using Docker:
1. Navigate to the root directory of the project.
2. Run Docker Compose:
    ```bash
    docker-compose up --build
    ```
3. Access the backend at `http://localhost:8000` and other services as defined.

## File Structure
```
TheWhatIf-Insights-Engine/
├── backend/                # Backend code (API and processing)
├── frontend/               # Frontend code (Dashboard)
├── mobile/                 # Mobile app code
├── docs/                   # Documentation and guides
├── docker-compose.yml      # Docker Compose for the full stack
└── README.md               # Project overview
```

## Contributing
We welcome contributions from the community! Please fork the repository, make your changes, and submit a pull request. For major changes, open an issue to discuss your ideas first.

## License
This project is licensed under the MIT License. See the `LICENSE` file for details.

## Contact
For questions or support, reach out to [team@thewhatif.org](mailto:team@thewhatif.org).
