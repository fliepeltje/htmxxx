import markdown2
import uvicorn
from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.requests import Request
from fastapi.responses import PlainTextResponse, HTMLResponse
from jinja2 import Template
from jsmin import jsmin

app = FastAPI()

site_template = Template("""
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Htmxxx</title>
</head>
<body> 
{{ html|safe }}
</body>                    
<style>
    body {
        width: 400px;
        margin: 0 auto;
    }
</style>
</html>
""")

@app.get("/wake-up", response_class=PlainTextResponse)
async def wake_up():
    return "woke"

class Minify(BaseModel):
    js: str

@app.post("/minify", response_class=PlainTextResponse)
async def minify(minify: Minify):
    return jsmin(minify.js)

class Markdown(BaseModel):
    md: str

@app.post("/gen-site", response_class=HTMLResponse)
async def gen_site(md: Markdown):
    downer = markdown2.Markdown(extras=["fenced-code-blocks"])
    html = downer.convert(md.md)
    return site_template.render(html=html)

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)