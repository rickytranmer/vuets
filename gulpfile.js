const { 
	dest,
	src,
} = require('gulp')
const replace = require('gulp-replace')
const puppeteer = require('puppeteer')
const express = require('express')
const expressApp = express()
const URL = 'http://localhost:3001/'
const viteConfig = require('./vite.config.ts')
const buildDir = (viteConfig?.build?.outDir)||'build'

const getAppHTML = async ()=> {
	try {
		expressApp.use(express.static(buildDir))
		
		const server = expressApp.listen(3001)

		const browser = await puppeteer.launch()
		const page = await browser.newPage()
		// TODO - change URL based on html file
		await page.goto(URL)
		
		const htmlHandle = await page.$('#app')
		const html = await page.evaluate((app)=> app.innerHTML, htmlHandle)

		await htmlHandle.dispose()
		await browser.close()
		server.close()

		return html
	} catch (error) {
		console.error('Error getting #app.innerHTML from '+URL+'')
		return ''
	}
}

async function fillAppHTML() {
	// TODO - work for all .html files
  return src(buildDir+'/index.html')
    .pipe(replace('id="app"></div>', 'id="app">'+(await getAppHTML())+'</div>'))
    .pipe(dest(buildDir))
}

exports.fillAppHTML = fillAppHTML

exports.default = fillAppHTML