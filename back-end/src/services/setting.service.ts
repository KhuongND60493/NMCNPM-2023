import { settingKeys } from "../app/configs";
import Setting from "../models/setting.model";
import job from "../app/job";

export async function updateStatusJobRun(status: boolean) {
  return await updateSettingValue(settingKeys.runJob, status ? "T" : "F");
}
export async function getDataAutoJob() {
  let rs = false;
  try {
    const setting = await Setting.findOne({
      where: { key: settingKeys.runJob },
    });
    if (setting) {
      rs = setting.value === "T";
    }
  } catch (e) {
  } finally {
    return rs;
  }
}

export async function startJob() {
  const setting = await Setting.findOne({ where: { key: settingKeys.runJob } });

  if (setting && setting.value === "T") {
    job?.start();
  }
}

async function updateSettingValue(key: string, value: string) {
  let rs = true;
  try {
    const setting = await Setting.findOne({ where: { key: key } });
    if (setting) {
      await setting.update({ value, updatedAt: new Date() });
    } else {
      const rsAdded = await Setting.create({ key, value });
      rs = rsAdded.id !== undefined;
    }
  } catch (e) {
    rs = false;
  } finally {
    return rs;
  }
}
