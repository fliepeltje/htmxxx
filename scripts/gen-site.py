import markdown2
from jinja2 import Template

template = Template("""
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

with open("readme.md") as readme:
    html = markdown2.markdown(readme.read(), extras=["fenced-code-blocks"])

index = template.render(html=html)
with open("public/index.html", "w") as index_f:
    index_f.write(index)