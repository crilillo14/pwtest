import { chromium , type Browser, type Page } from "./node_modules/@playwright/test"; 
import { getProxy } from './config';
import * as fs from "fs"
import { env } from "process";
/* 

This scraping logic is only for the U Miami alumni page, 
where you basically have to get the first 12 li in the ul that contains the profiles, 
scroll down till you activate the data load, 
wait till the network transaction is done, 
and recursively get the next 12 li. 

TODO: 
[ ] insert fetched alumni to alumni DB. 
[ ] develop an updater 

*/

interface AlumniProfile {
    url: string, 
    name: string, 
}

export async function runLinkedinScrape(baseURL: string) {
    // get proxy first from config

    const proxyAddress : string = await getProxy();


    const browser : Browser = await chromium.launch({
      proxy: {
        server: proxyAddress,
        username: process.env.PROXY_USERNAME, 
        password: process.env.PROXY_PASSWORD,
      } , 
      headless: true // set to true in production
    });
    const page : Page = await browser.newPage();

    // only get the last 12
    const SELECTOR : string = "grid grid__col--lg-8 block org-people-profile-card__profile-card-spacing" 
    const suffix : string = ":nth-last-child(-n+12)"; 
    let scrapedData : AlumniProfile[] = [];


    try {



        await page.goto(baseURL); 
        await page.waitForSelector(SELECTOR) 

        // big boy eval : parsing page content
        
        const fetchedAlumni : AlumniProfile[] = await page.$$eval( SELECTOR + suffix, 
            (elements) => elements.map( element => ({
                name: element.querySelector<HTMLDivElement>("ember-view lt-line-clamp lt-line-clamp--single-line BEFuKteXeTCNsLeFZdKrWGvUcyRoKfnzlENEt-black")?.textContent?.trim() || "",
                url: element.querySelector<HTMLAnchorElement>("a.LoJdmTsykuKzNNXmKqlWKHuaZBApZAOCkc ")?.href || "",    
            }))
        );
        

        // insert into temporary array

        scrapedData = scrapedData.concat(fetchedAlumni);

        // TODO: if new alumni, insert into DB. import func from server/db/        
        
        console.log(scrapedData)
    }
    
    catch(error) {
        console.error('Scraping failed: ', error); 
     
    } finally {
        await browser.close(); 
    }
}

async function scrollToBottom(page : Page) {
    
}
