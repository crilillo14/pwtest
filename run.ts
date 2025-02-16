import { runLinkedinScrape } from "./scraper";
import { exit } from "process";


async function main(baseURL: string) {

  try {
    await runLinkedinScrape(baseURL); 
    return process.exit(0);
  } catch (error)
  {
    console.error("scrape failed : " , error ); 
    exit();
  }; 
}
const baseURL : string = "https://www.linkedin.com/school/universityofmiami/people/"
main(baseURL);