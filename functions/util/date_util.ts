import { datetime } from "ptera/mod.ts";
import type { Event } from "google-calendar-api";
import * as logger from "logger";

// 今日の0時と24時を取得する
export function getTodayStartAndEnd(): { start: Date; end: Date } {
  const now = datetime();
  const today = datetime(
    {
      year: now.year,
      month: now.month,
      day: now.day,
    },
  );
  const afterDay = today.add({ day: 1 });
  const startAndEnd = {
    start: today.toJSDate(),
    end: afterDay.toJSDate(),
  };
  logger.info(`today: ${Deno.inspect(startAndEnd, { compact: false })}`);
  return startAndEnd;
}

export function formatEventDate(event: Event) {
  const startTime = datetime(event.start?.dateTime);
  const endTime = datetime(event.end?.dateTime);
  // 終日イベントの場合は時刻を表示しなし
  // ex: `2023-01-01`表示となり時刻がのらないため、そこで判別する
  if (startTime.hour === endTime.hour) {
    return "終日";
  }
  return `${startTime.format("HH:mm")} - ${endTime.format("HH:mm")}`;
}
