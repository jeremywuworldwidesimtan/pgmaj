import { parseDate } from "@/app/lib/helper";
import { changelog } from "./changelog";

export default function ChangelogPage() {
  return (
    <div>
      <div>
          <h1 className="text-3xl font-bold">Changelog</h1>
          <p>Here you can find the latest updates and changes to the Knowledge Base.</p>
      </div>
      <div className="mt-4">
        {
            changelog.slice().reverse().map((entry, index) => (
              <div key={index} className="mb-4">
                <hr className="my-4" />
                <h2 className="text-2xl font-bold">{entry.version}</h2>
                <p className="text-sm text-muted-foreground">Released {parseDate(new Date(entry.date), "british", "short", "dot")}</p>
                <ul className="list-disc list-inside flex flex-col gap-2 mt-2">
                  {entry.changes.map((change, changeIndex) => (
                    <li key={changeIndex}>{change}</li>
                  ))}
                </ul>
              </div>
            ))
        }
      </div>
    </div>
  );
}