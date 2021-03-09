# app-demo-store

## API Docs
https://documenter.getpostman.com/view/269628/Tz5jefpG

## Restore database
docker exec -it app-demo-store-db mongorestore -u admin --password=vGg%ENFsEz%9WrR+Ft2W --authenticationDatabase=admin --db=test /data/dump/test/

## Dump database
docker exec -it app-demo-store-db mongodump -u admin --password=vGg%ENFsEz%9WrR+Ft2W --authenticationDatabase=admin --db=test --out=/data/dump/



