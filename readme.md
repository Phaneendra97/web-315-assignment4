#### Credentials

- connect to ec2 terminal  ssh -i "coen315.pem" ubuntu@ec2-13-57-255-201.us-west-1.compute.amazonaws.com
- AWS creds: email-> phaneendra0897@gmail.com, pass -> KfxRf3hR#7Jqxg3D

#### Things needed to get server.js and bartapis.js working

- npm i express
- npm i xml2js
- npm i body-parser

- node server.js

#### apache config to support https and multiple subdomains

- add 000-default.conf to /etc/apache/sires-available
- add 000-default-le=ssl.conf to /etc/apache/sires-available 

#### how to make BART API calls (Task handled by NodeJS in bartapis.js)

- https://api.razlator.online/stations -> to get stations list (bartapis.js/stations)
- https://api.razlator.online/station/source/:source -> to get station details with :source parameter (bartapis.js/station/source/:source)
- https://api.razlator.online/trips/source/:srcaddr/dest/:destaddr -> to get trip details (bartapis.js/trips/source:sourceaddr/dest/:destaddr)

#### how to load UI

- In browser go to https://bart.razlator.online/

#### Directions API

- The API Key only supports requests from domain: razlator.online, so it needs to be changed if it has to be used elsewhere

#### Note

- NodeJS server.js is running in the background of AWS
