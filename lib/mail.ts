/**
 * A link that opens a Gmail compose window addressed to `to`.
 *
 * A `mailto:` link only works when the browser has an email program set up,
 * and otherwise shows a "pick an app" dialog. This opens Gmail on the web
 * directly, in a new tab, with the recipient (and optionally a subject and
 * message) already filled in.
 */
export function gmailComposeUrl({
  to,
  subject,
  body,
}: {
  to: string;
  subject?: string;
  body?: string;
}): string {
  const params = new URLSearchParams({ view: "cm", fs: "1", to });
  if (subject) params.set("su", subject);
  if (body) params.set("body", body);
  return `https://mail.google.com/mail/?${params.toString()}`;
}
