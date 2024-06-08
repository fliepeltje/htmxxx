import markdown2
import uvicorn
from fastapi import FastAPI
from fastapi.requests import Request
from fastapi.responses import PlainTextResponse
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
<body> {{ html|safe }} </body>                    
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

@app.post("/minify", response_class=PlainTextResponse)
async def minify(request: Request):
    js = await request.body()
    return jsmin(js)

@app.post("/gen-site", response_class=PlainTextResponse)
async def gen_site(request: Request):
    md = await request.body()
    html = markdown2.markdown(md, extras=["fenced-code-blocks"])
    index = site_template.render(html=html)
    return index

if __name__ == "__main__":
    uvicorn.run(app, host="0.0.0.0", port=8080)