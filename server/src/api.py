from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from src.agent import WaterIntakeAgent
from src.logger import log_message, log_error
from src.database import log_intake, get_intake_history


app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
agent = WaterIntakeAgent()


class WaterIntakeRequest(BaseModel):
    user_id: str
    intake_ml: int
    age: int
    gender: str
    activity_level: str
    curr_temp: str
    
# take req from frontend, log intake, analyze with agent, return analysis and log message    
@app.post("/log-intake")
async def log_water_intake(request: WaterIntakeRequest):
    log_intake(request.user_id, request.intake_ml)
    analysis = agent.analyze_intake(
       request.intake_ml, 
       request.age, 
       request.gender, 
       request.activity_level, 
       request.curr_temp
       )
    log_message(f"Logged intake for user {request.user_id}: {request.intake_ml} ml")
    return {"message": "Intake logged successfully", "analysis": analysis}
    
    
@app.get("/history/{user_id}")
async def get_history(user_id: str):
    history = get_intake_history(user_id)
    # log_message(f"Retrieved history for user {user_id}")
    return {"user_id": user_id, "history": history}