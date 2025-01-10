from fastapi import APIRouter, HTTPException
from Controllers.UserController import UserController
from Models.PayloadModel import UserModel

router = APIRouter(
    prefix="/User",
    tags=["USER-Controller"],
)

@router.post("/AuthLogin")
def AuthLogin(USER_DATA : UserModel):
    AuthResponse = UserController.AuthLogin(USER_DATA)
    if AuthResponse['status'] == 200:
        return AuthResponse['data']
    elif AuthResponse['status'] == 404:
        raise HTTPException(status_code=404, detail="Data not found")
    elif AuthResponse['status'] == 500:
        raise HTTPException(status_code=500, detail=AuthResponse['message'])
    else:
        raise HTTPException(status_code=400, detail="Bad request")

@router.post("/FetchUser")
def FetchUser(USER_DATA : UserModel):
    FetchResponse = UserController.FetchUser(USER_DATA)
    if FetchResponse['status'] == 200:
        return FetchResponse['data']
    elif FetchResponse['status'] == 404:
        raise HTTPException(status_code=404, detail="Data not found")
    elif FetchResponse['status'] == 500:
        raise HTTPException(status_code=500, detail=FetchResponse['message'])
    else: 
        raise HTTPException(status_code=400, detail="Bad request")
    
@router.post("/UpdateUser")
def UpdateUser(USER_DATA : UserModel):
    UpdateResponse = UserController.UpdateUser(USER_DATA)
    if UpdateResponse['status'] == 200:
        return UpdateResponse['status']
    elif UpdateResponse['status'] == 500:
        raise HTTPException(status_code=500, detail=UpdateResponse['message'])
    else:
        raise HTTPException(status_code=400, detail="Bad request")