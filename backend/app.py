import configparser
from pathlib import Path
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from sqlalchemy import create_engine, String, Integer
from sqlalchemy.orm import sessionmaker, Mapped, mapped_column, declarative_base
from sqlalchemy.exc import IntegrityError

# 1. 初始化 ConfigParser
config = configparser.ConfigParser()
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

# 定義資料庫模型
class User(Base):
    __tablename__ = "users"
    id: Mapped[int] = mapped_column(Integer, primary_key=True, index=True)
    account_id: Mapped[str] = mapped_column(String(255), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(255), nullable=False)

app = FastAPI()

class LoginRequest(BaseModel):
    account: str
    password: str

@app.post("/login")
def login(request: LoginRequest):
    db = SessionLocal()
    try:
        # 1. 先根據 account_id 尋找使用者
        user = db.query(User).filter(User.account_id == request.account).first()

        if not user:
            # 情況 A: 使用者不存在 -> 自動註冊
            new_user = User(account_id=request.account, password=request.password)
            db.add(new_user)
            db.commit()
            return {"status": "pass", "message": "User not found, registered and logged in"}

        # 情況 B: 使用者存在 -> 檢查密碼
        if user.password == request.password:
            return {"status": "pass", "message": "Login successful"}
        else:
            # 情況 C: 使用者存在但密碼錯誤 -> 封鎖/拒絕
            raise HTTPException(status_code=401, detail="not pass")
            
    except Exception as e:
        db.rollback()
        if isinstance(e, HTTPException):
            raise e
        raise HTTPException(status_code=500, detail=str(e))
    finally:
        db.close()