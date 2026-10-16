export function JsonLd({ data }: { data: object }) {
  // "<" escapado impede que um texto com "</script>" feche a tag antes da hora.
  const json = JSON.stringify(data).replace(/</g, "\\u003c");
  return <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: json }} />;
}
