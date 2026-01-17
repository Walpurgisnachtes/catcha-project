import configparser
from pathlib import Path
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, Column, String, Integer
from sqlalchemy.ext.declarative import declarative_base
from sqlalchemy.orm import sessionmaker

# 1. 初始化 ConfigParser
config = configparser.ConfigParser()

# 取得目前檔案所在目錄，確保路徑正確
config_path = Path(__file__).parent / "config.ini"
config.read(config_path)

# 2. 從 [CONFIG] 區塊讀取變數
sql_user = config['CONFIG']['SQL_ACCOUNT']
sql_password = config['CONFIG']['SQL_PASSWORD']
sql_host = config.get('CONFIG', 'SQL_HOST', fallback='localhost')
sql_port = config.get('CONFIG', 'SQL_PORT', fallback='5432')
sql_db = config['CONFIG']['SQL_DATABASE']

# 3. 動態組合 DATABASE_URL
DATABASE_URL = f"postgresql://{sql_user}:{sql_password}@{sql_host}:{sql_port}/{sql_db}"
engine = create_engine(DATABASE_URL)
SessionLocal = sessionmaker(autocommit=False, autoflush=False, bind=engine)
Base = declarative_base()

# 2. 定義資料庫模型 (對應你的 users 表)
class User(Base):
    __tablename__ = "users"
    id = Column(Integer, primary_key=True, index=True)
    account_id = Column(String, unique=True)
    password = Column(String)

app = FastAPI()

# 定義請求體格式
class LoginRequest(BaseModel):
    account: str
    password: str

@app.post("/login")
def login(request: LoginRequest):
    db = SessionLocal()
    # 3. 查詢資料庫
    user = db.query(User).filter(
        User.account_id == request.account, 
        User.password == request.password
    ).first()
    db.close()

    if user:
        return {"status": "pass", "message": "Login successful"}
    else:
        raise HTTPException(status_code=401, detail="not pass")

# 啟動命令: uvicorn main:app --host 0.0.0.0 --port 8000