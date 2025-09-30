### Install bun globally
```
$npm install -g bun
```
Create Executable file using bun
```
$bun build index.js --compile --outfile test_file
```
### Install pm2 as local dependency
```
$npm install pm2 --dev
```
Rum pm2 from local dependency
```
$./node_modules/pm2/bin/pm2 start -f --watch --interpreter none ./test_file
```
Check pm2 list
```
$./node_modules/pm2/bin/pm2 list
```
### Run the executable file
```
./test_file
```
### Troubleshoot

[PM2 with Executable file](https://github.com/vercel/pkg/issues/438)
