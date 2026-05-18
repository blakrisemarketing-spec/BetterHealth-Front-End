import { Helmet } from "react-helmet-async";

export default function StructuredData({ data }) {
  if (!data) return null;

  const json = JSON.stringify(data);

  return (
    <Helmet>
      <script type="application/ld+json">{json}</script>
    </Helmet>
  );
}
