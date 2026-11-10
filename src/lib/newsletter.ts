import { FIXTURES, FOOD } from "@/content/guide";
import type { CommunityEvent } from "@/lib/community.functions";

export function currentMonthKey(date = new Date()) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}`;
}

export function composeNewsletter(events: CommunityEvent[], month = currentMonthKey()) {
  const lines = [
    `Stoke Fleming Guide — ${month}`,
    "",
    "An independent monthly note. It is not from the parish council.",
    "",
    "Dated events added by businesses and residents:",
  ];
  if (events.length === 0) {
    lines.push("Nothing dated has been submitted for the weeks ahead. The fixtures below still happen.");
  } else {
    for (const event of events) {
      lines.push(`• ${event.startsOn} ${event.startTime} — ${event.title}, ${event.place}. ${event.summary}`);
    }
  }
  lines.push("", "Through the year:");
  for (const fixture of FIXTURES) {
    lines.push(`• ${fixture.title}: ${fixture.when}. ${fixture.where}.`);
  }
  lines.push("", "Food, so you do not rely on a stale hour:");
  for (const place of FOOD.slice(0, 3)) {
    lines.push(`• ${place.name} — ${place.hours}`);
  }
  lines.push(
    "",
    "Tides are not calculated in this email. Use a Dartmouth tide table before you swim.",
    "To stop these notes, use the unsubscribe link on the live edition. This preview does not store your address on the server.",
  );
  return lines.join("\n");
}
