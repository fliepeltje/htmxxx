public-dir:
	mkdir -p public

gen-site: public-dir
	jq --slurp --raw-input  '{"md": "\(.)"}' < readme.md | curl -H "Content-Type: application/json" --data @- https://htmxxx-builder.fly.dev/gen-site -o public/index.html

minify: public-dir
	jq --slurp --raw-input  '{"js": "\(.)"}' < src/script.js | curl -H "Content-Type: application/json" --data @- https://htmxxx-builder.fly.dev/minify -o public/script.min.js

deploy: gen-site minify
	fly deploy