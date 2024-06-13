import nodeCron from 'node-cron';
import chalk from 'chalk';
import ora from 'ora';
import {appConfigs} from './configs';
import puppeteer from "puppeteer";
import {crawlConferencesByWebsiteId, getAllWebsiteWillCrawl} from "../services/crawl.service";
import moment from "moment/moment";

const url = "https://www.worldometers.info/world-population/";

async function scrapeWorldConference() {
    console.log(chalk.green("Running scheduled job"));
    const spinner = ora({
        text: "Launcing puppeteer",
        color: "blue",
        hideCursor: false,
    }).start();

    try {
        const date = Date.now();
        const websiteIds=await getAllWebsiteWillCrawl(date);
        const arrJobs=  websiteIds.map(id=>crawlConferencesByWebsiteId(    `${id}`))
        Promise.allSettled(arrJobs).then(a=>{
            spinner.succeed(`Page scraping successfull after ${Date.now() - date}ms`);
            spinner.clear();
        })
    } catch (error) {
        spinner.text = 'Scraping failed';
        spinner.fail();
        spinner.clear();
        console.log(error);
    }
}

const job = appConfigs.AUTO_START_JOB ? nodeCron.schedule(appConfigs.JOB_LOOP, scrapeWorldConference) : undefined;
export default job;
