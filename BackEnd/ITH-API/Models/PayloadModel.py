from typing import Any
from dataclasses import dataclass
from pydantic import BaseModel

@dataclass
class UserModel(BaseModel):
    USER_USERNAME : str = None
    USER_PASSWORD : str = None
    USER_CHANGEPASS : str = None
    USER_EXPIRED : str = None

    @staticmethod
    def fc_UserModel(obj: Any) -> "UserModel":
        _USER_USERNAME = str(obj.get("USER_USERNAME"))
        _USER_PASSWORD = str(obj.get("USER_PASSWORD"))
        _USER_CHANGEPASS = str(obj.get("USER_CHANGEPASS"))
        _USER_EXPIRED = str(obj.get("USER_EXPIRED"))

        return UserModel()