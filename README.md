# crosser
A Reflected / Stored / DOM XSS Scanner based on Headless Chrome Node API via Puppeteer

[![asciicast](https://asciinema.org/a/7lUzAnPezMkk7lpoJ2Wyo94yi.svg)](https://asciinema.org/a/7lUzAnPezMkk7lpoJ2Wyo94yi)

## Installation

Install it with:

`npm i -g @phra/crosser`

or

`yarn add --global @phra/crosser`

## Usage

```
$ crosser --help
A Reflected / Stored / DOM XSS Scanner based on Headless Chrome Node API via Puppeteer

VERSION
  @phra/crosser/0.2.2-0 linux-x64 node-v9.11.1

USAGE
  $ crosser [COMMAND]

COMMANDS
  help       display help for crosser
  reflected  checks for reflected xss
  stored     checks for stored xss

```

```
$ crosser reflected --help
checks for reflected xss

USAGE
  $ crosser reflected

OPTIONS
  -h, --help     show CLI help
  -u, --url=url  url to connect

EXAMPLE
  $ crosser reflected -u "http://localhost:4200/vuln/"

```

```
$ crosser stored --help
checks for stored xss

USAGE
  $ crosser stored

OPTIONS
  -a, --post=post  url to connect
  -b, --pre=pre    url to connect
  -h, --help       show CLI help
  -u, --url1=url1  url to connect
  -x, --url2=url2  url to connect

EXAMPLE
  $ crosser stored -u "http://localhost:4200/stored1/" -x "http://localhost:4200/stored2/" --pre "document.querySelector('#vuln').value = `<PAYLOAD>`; 
  document.querySelector('#button').click();" --post "document.querySelector('#button').click();"
```
