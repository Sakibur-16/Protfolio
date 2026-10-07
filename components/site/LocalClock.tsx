"use client";

import { useEffect, useState } from "react";

const formatter = new Intl.DateTimeFormat("en-US", {
  hour: "numeric",
  minute: "2-digit",
  timeZone: "Asia/Dhaka",
});

/** Local time in Dhaka. Empty on the server so the markup never mismatches; fills in once mounted. */
export function LocalClock() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const tick = () => setTime(formatter.format(new Date()));
    tick();
    const id = window.setInterval(tick, 20_000);
    return () => window.clearInterval(id);
  }, []);

  return (
    <span className="meta hidden whitespace-nowrap lg:inline" aria-label={time ? `Local time in Dhaka, ${time}` : undefined}>
      Dhaka · {time || " "}
    </span>
  );
}
