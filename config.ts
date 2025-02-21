import * as fs from "fs"
import * as path from "path";

async function loadProxylist(filepath : string) : Promise<string> {
    try {
        const absolutePath = path.resolve(filepath);
        const data = await fs.promises.readFile(absolutePath, 'utf-8');
        return data;
      } catch (error: any) {
        throw new Error(`Error reading file: ${error.message}`);
      }
}
  

export async function getProxy() : Promise<string> {


    const path : string = "./proxies_list.txt"
    const proxyIndex = Math.floor((Math.random() * 400)); 
    
    try {
        const proxydata = await loadProxylist(path); 
        let proxies = proxydata.split("\n"); 

        return proxies[proxyIndex]; 
        
    } catch(error) {
        console.error("Couldn't fetch proxy list" , error);
        return ""; 
    }



}

export const proxy = getProxy();
