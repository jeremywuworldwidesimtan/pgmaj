import { roadmap } from "./roadmap";

export default function RoadmapPage() {
  return (
    <div>
      <div>
          <h1 className="text-3xl font-bold">Roadmap</h1>
          <p>Here you can find the upcoming features and plans.</p>
      </div>
      <div className="mt-4">
        {
            roadmap.map((entry, index) => (
              <div key={index} className="mb-4">
                <hr className="my-4" />
                <h2 className="text-2xl font-bold">Plans for {entry.version}</h2>
                <ul className="list-disc list-inside flex flex-col gap-2 mt-2">
                  {entry.features.map((feature, featureIndex) => (
                    <li key={featureIndex}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))
        }
      </div>
    </div>
  );
}