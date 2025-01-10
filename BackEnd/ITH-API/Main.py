from fastapi import FastAPI, HTTPException,Depends
from fastapi.middleware.cors import CORSMiddleware
from fastapi.responses import JSONResponse
from Routes.UserRoutes import router as user_router


app = FastAPI(
    title="ITH API SERVICE",
    description="Web service for IT hepldeck system",
    version="1.0.0"
)
app.include_router(user_router)

# Allowed origins (you can specify the exact domains or use '*' for all)
origins = [
    "http://localhost:1000",  # Frontend running locally
    "http://example.com",     # Specific domain
    "*",                      # Allow all origins (use with caution in production)
]

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,  # List of allowed origins
    allow_credentials=True,  # Allow cookies to be sent with requests
    allow_methods=["*"],     # HTTP methods to allow (GET, POST, etc.)
    allow_headers=["*"],     # HTTP headers to allow
)