from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import sqlalchemy as sa
from sqlalchemy.orm import sessionmaker
from transformers import pipeline

# Database Setup
DATABASE_URL = "sqlite:///./test.db"  # Use PostgreSQL in production
engine = sa.create_engine(DATABASE_URL)
metadata = sa.MetaData()

# Define database schema
beneficiary_data = sa.Table(
    "beneficiary_data", metadata,
    sa.Column("id", sa.Integer, primary_key=True),
    sa.Column("data", sa.Text, nullable=False),
    sa.Column("tags", sa.Text),
    sa.Column("sentiment", sa.Text),
)
metadata.create_all(engine)
Session = sessionmaker(bind=engine)

# Initialize FastAPI app
app = FastAPI()

# Sentiment Analysis Pipeline
sentiment_analyzer = pipeline("sentiment-analysis")

# Data Model for API
class BeneficiaryData(BaseModel):
    data: str
    tags: List[str] = []

class DataResponse(BaseModel):
    id: int
    data: str
    tags: List[str]
    sentiment: str

# API Endpoints
@app.post("/upload/", response_model=DataResponse)
def upload_data(item: BeneficiaryData):
    # Analyze sentiment
    sentiment_result = sentiment_analyzer(item.data)[0]
    sentiment = f"{sentiment_result['label']} ({sentiment_result['score']:.2f})"

    # Save to database
    session = Session()
    new_entry = beneficiary_data.insert().values(
        data=item.data,
        tags=", ".join(item.tags),
        sentiment=sentiment
    )
    result = session.execute(new_entry)
    session.commit()
    session.close()

    return DataResponse(
        id=result.lastrowid,
        data=item.data,
        tags=item.tags,
        sentiment=sentiment
    )

@app.get("/data/{data_id}/", response_model=DataResponse)
def get_data(data_id: int):
    session = Session()
    query = sa.select([beneficiary_data]).where(beneficiary_data.c.id == data_id)
    result = session.execute(query).fetchone()
    session.close()

    if not result:
        raise HTTPException(status_code=404, detail="Data not found")

    return DataResponse(
        id=result[0],
        data=result[1],
        tags=result[2].split(", "),
        sentiment=result[3]
    )

@app.get("/data/", response_model=List[DataResponse])
def list_data():
    session = Session()
    query = sa.select([beneficiary_data])
    results = session.execute(query).fetchall()
    session.close()

    return [
        DataResponse(
            id=row[0],
            data=row[1],
            tags=row[2].split(", "),
            sentiment=row[3]
        ) for row in results
    ]
        