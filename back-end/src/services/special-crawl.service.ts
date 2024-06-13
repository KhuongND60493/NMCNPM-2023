import {fetchDataFromYamlCcfddl} from './sub-services/ccfddl'
import {createOrUpdateConferences} from "./conference.service";

export async function ccfddlCrawlService(urlWebsite: string, websiteId: number, currentTime: string) {
    const rs = await fetchDataFromYamlCcfddl(urlWebsite, websiteId, new Date().getFullYear(), currentTime);
    rs && void createOrUpdateConferences(rs);
}
