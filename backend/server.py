from fastapi import FastAPI, APIRouter, HTTPException, Query
from fastapi.responses import FileResponse, PlainTextResponse
from dotenv import load_dotenv
from starlette.middleware.cors import CORSMiddleware
from motor.motor_asyncio import AsyncIOMotorClient
import os
import logging
from pathlib import Path
from pydantic import BaseModel, Field
from typing import List, Optional, Dict, Any
import uuid
from datetime import datetime
from services.character_parser import CharacterParser

ROOT_DIR = Path(__file__).parent
load_dotenv(ROOT_DIR / '.env')

# MongoDB connection
mongo_url = os.environ['MONGO_URL']
client = AsyncIOMotorClient(mongo_url)
db = client[os.environ['DB_NAME']]

# Create the main app without a prefix
app = FastAPI()

# Create a router with the /api prefix
api_router = APIRouter(prefix="/api")

# Initialize character parser
character_parser = CharacterParser()

# Define Models
class StatusCheck(BaseModel):
    id: str = Field(default_factory=lambda: str(uuid.uuid4()))
    client_name: str
    timestamp: datetime = Field(default_factory=datetime.utcnow)

class StatusCheckCreate(BaseModel):
    client_name: str

class CharacterContent(BaseModel):
    subtitle: Optional[str] = None
    text: str

class CharacterSection(BaseModel):
    title: str
    content: List[CharacterContent]

class Character(BaseModel):
    id: str
    name: str
    title: str
    sections: List[CharacterSection]
    file_path: Optional[str] = None
    word_count: Optional[int] = None
    section_count: Optional[int] = None

class CharacterList(BaseModel):
    characters: List[Character]
    total: int

class CharacterMetrics(BaseModel):
    total_characters: int
    total_sections: int
    total_words: int
    avg_sections_per_character: float
    avg_words_per_character: float
    most_common_sections: Dict[str, int]
    character_types: Dict[str, int]
    common_themes: List[Dict[str, Any]]
    section_diversity: int
    unique_sections: List[str]

class CharacterSimilarity(BaseModel):
    character1: str
    character2: str
    common_sections: List[str]
    unique_to_char1: List[str]
    unique_to_char2: List[str]
    content_similarities: List[Dict[str, Any]]
    overall_similarity: float

# Character file endpoints
@api_router.get("/characters/file/{filename}")
async def get_character_file(filename: str):
    """Get character file content"""
    try:
        # Construct the file path
        characters_dir = ROOT_DIR / "data" / "characters" / "characters"
        file_path = characters_dir / filename
        
        if not file_path.exists():
            raise HTTPException(status_code=404, detail="Character file not found")
        
        # Read and return the file content
        with open(file_path, 'r', encoding='utf-8') as f:
            content = f.read()
        
        return PlainTextResponse(content=content, media_type="text/plain; charset=utf-8")
        
    except FileNotFoundError:
        raise HTTPException(status_code=404, detail="Character file not found")
    except Exception as e:
        logger.error(f"Error reading character file {filename}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error reading character file")

@api_router.get("/characters/files")
async def list_character_files():
    """List all available character files"""
    try:
        characters_dir = ROOT_DIR / "data" / "characters" / "characters"
        
        if not characters_dir.exists():
            raise HTTPException(status_code=404, detail="Characters directory not found")
        
        files = []
        for file_path in characters_dir.glob("*_Perfil.txt"):
            files.append({
                "filename": file_path.name,
                "size": file_path.stat().st_size,
                "modified": file_path.stat().st_mtime
            })
        
        return {
            "files": files,
            "total": len(files)
        }
        
    except Exception as e:
        logger.error(f"Error listing character files: {str(e)}")
        raise HTTPException(status_code=500, detail="Error listing character files")

# Character endpoints
@api_router.get("/characters", response_model=CharacterList)
async def get_characters(
    search: Optional[str] = Query(None, description="Search term for character name or content"),
    limit: Optional[int] = Query(50, description="Maximum number of characters to return")
):
    """Get all characters or search characters"""
    try:
        if search:
            characters_data = character_parser.search_characters(search)
        else:
            characters_data = character_parser.get_all_characters()
        
        # Apply limit
        if limit:
            characters_data = characters_data[:limit]
        
        characters = [Character(**char) for char in characters_data]
        
        return CharacterList(
            characters=characters,
            total=len(characters)
        )
        
    except Exception as e:
        logger.error(f"Error getting characters: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving characters")

@api_router.get("/characters/metrics", response_model=CharacterMetrics)
async def get_character_metrics():
    """Get metrics and analytics about all characters"""
    try:
        metrics_data = character_parser.get_character_metrics()
        
        if not metrics_data:
            raise HTTPException(status_code=404, detail="No character data found for metrics")
        
        return CharacterMetrics(**metrics_data)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting character metrics: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving character metrics")

@api_router.get("/characters/similarity/{char1_id}/{char2_id}", response_model=CharacterSimilarity)
async def get_character_similarity(char1_id: str, char2_id: str):
    """Get similarity analysis between two characters"""
    try:
        similarity_data = character_parser.find_similarities_between_characters(char1_id, char2_id)
        
        if not similarity_data:
            raise HTTPException(status_code=404, detail="One or both characters not found")
        
        return CharacterSimilarity(**similarity_data)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting character similarity: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving character similarity")

@api_router.get("/characters/{character_id}", response_model=Character)
async def get_character(character_id: str):
    """Get a specific character by ID"""
    try:
        character_data = character_parser.get_character_by_id(character_id)
        
        if not character_data:
            raise HTTPException(status_code=404, detail="Character not found")
        
        return Character(**character_data)
        
    except HTTPException:
        raise
    except Exception as e:
        logger.error(f"Error getting character {character_id}: {str(e)}")
        raise HTTPException(status_code=500, detail="Error retrieving character")

@api_router.get("/characters/search/{query}", response_model=CharacterList)
async def search_characters_by_query(
    query: str,
    limit: Optional[int] = Query(50, description="Maximum number of characters to return")
):
    """Search characters by query"""
    try:
        characters_data = character_parser.search_characters(query)
        
        # Apply limit
        if limit:
            characters_data = characters_data[:limit]
        
        characters = [Character(**char) for char in characters_data]
        
        return CharacterList(
            characters=characters,
            total=len(characters)
        )
        
    except Exception as e:
        logger.error(f"Error searching characters: {str(e)}")
        raise HTTPException(status_code=500, detail="Error searching characters")

# Health check endpoint
@api_router.get("/health")
async def health_check():
    """Health check endpoint"""
    try:
        # Check if character parser can load characters
        characters = character_parser.get_all_characters()
        
        return {
            "status": "healthy",
            "message": "Character parser is working",
            "characters_loaded": len(characters),
            "timestamp": datetime.utcnow()
        }
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        return {
            "status": "unhealthy",
            "message": str(e),
            "timestamp": datetime.utcnow()
        }

# Original endpoints
@api_router.get("/")
async def root():
    return {"message": "Character Viewer API - Enhanced with metrics and similarity analysis"}

@api_router.post("/status", response_model=StatusCheck)
async def create_status_check(input: StatusCheckCreate):
    status_dict = input.dict()
    status_obj = StatusCheck(**status_dict)
    _ = await db.status_checks.insert_one(status_obj.dict())
    return status_obj

@api_router.get("/status", response_model=List[StatusCheck])
async def get_status_checks():
    status_checks = await db.status_checks.find().to_list(1000)
    return [StatusCheck(**status_check) for status_check in status_checks]

# Include the router in the main app
app.include_router(api_router)

app.add_middleware(
    CORSMiddleware,
    allow_credentials=True,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)

# Configure logging
logging.basicConfig(
    level=logging.INFO,
    format='%(asctime)s - %(name)s - %(levelname)s - %(message)s'
)
logger = logging.getLogger(__name__)

@app.on_event("shutdown")
async def shutdown_db_client():
    client.close()