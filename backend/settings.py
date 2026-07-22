from pydantic_settings import BaseSettings
from typing import Optional

import os

print("=" * 50)
print("Current Working Directory:", os.getcwd())
print("Env file exists:", os.path.exists(".env"))
print("OD from os.getenv:", os.getenv("SHO_ODSCRAP_URL"))
print("=" * 50)

class Settings(BaseSettings):
    DATABASE_URL: str

    JOBWORK_REPORT_URL: Optional[str] = None
    TRB_MASTER_URL: Optional[str] = None
    DGBB_MASTER_URL: Optional[str] = None
    TRACEABILITY_MASTER_URL: Optional[str] = None
    MO_DATA_URL: Optional[str] = None
    RINGWT_TRANSITBUFFER_URL: Optional[str] = None
    XA_SCRAP_URL: Optional[str] = None
    SHO_ODSCRAP_URL: Optional[str] = None
    SHO_FACESCRAP_URL: Optional[str] = None

    class Config:
        env_file = ".env"


settings = Settings()