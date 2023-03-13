import os
import sys
from typing import Union
from fastapi import FastAPI
from pydantic import BaseModel

from io import StringIO 

from fastapi.middleware.cors import CORSMiddleware

class Item(BaseModel):
    fname: str
    lname: str
    email: str

app = FastAPI()

origins = ["*"]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.post("/add_entry/")
async def create_item(item: Item):
    
    with open("db.txt", "a") as f:
        f.write(f"{item.fname};{item.lname};{item.email}\n")

    return "Done"