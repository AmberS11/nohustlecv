import { useEffect, useState } from "react";
import { useRouter } from "next/router";
import generateCoverLetter from "../utils/generateCoverLetter";

export default function CoverLetterAI() {
  const router = useRouter();
  const { role, company } = router.query;

  const [coverLetter, setCoverLetter] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (role && company) {
      generateCoverLetter({ role, company }).then((text) => {
        setCoverLetter(text);
        setLoading(false);
      });
    }
  }, [role, company]);

  if (loading) return <p className="p-4">⏳ Generating cover letter...</p>;

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-6">
      <h1 className="text-2xl font-bold">Your AI-Generated Cover Letter</h1>
      <textarea
        rows={16}
        className="w-full p-4 border rounded resize-none"
        value={coverLetter}
        onChange={(e) => setCoverLetter(e.target.value)}
      />
      <div className="flex gap-4">
        <button
          className="bg-blue-600 text-white px-4 py-2 rounded"
          onClick={() => navigator.clipboard.writeText(coverLetter)}
        >
          📋 Copy
        </button>
        <button
          className="bg-green-600 text-white px-4 py-2 rounded"
          onClick={() => downloadPDF(coverLetter)}
        >
          ⬇️ Download PDF
        </button>
      </div>
    </div>
  );
}

function downloadPDF(text) {
  const blob = new Blob([text], { type: "application/pdf" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = "cover-letter.pdf";
  link.click();
  URL.revokeObjectURL(url);
}
