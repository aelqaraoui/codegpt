import os
import sys
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

from io import StringIO 

class Item(BaseModel):
    code: str

app = FastAPI()


@app.post("/items/")
async def create_item(item: Item):
    codeOut = StringIO()
    codeErr = StringIO()

    # capture output and errors
    sys.stdout = codeOut
    sys.stderr = codeErr

    exec(item.code)

    # restore stdout and stderr
    sys.stdout = sys.__stdout__
    sys.stderr = sys.__stderr__

    return {
        "output":   codeOut.getvalue(),
        "error":   codeErr.getvalue(),
    }