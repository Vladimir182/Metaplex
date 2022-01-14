import { useEffect, useMemo, useState } from "react";

export function useFileReader(
  file?: File | null | string
): [
  sourceUrl: string | null,
  setSourUrl: (url: string | null) => void,
  read: (f: File) => void
] {
  const [sourceUrl, setSourceUrl] = useState<string | null>(
    typeof file === "string" ? file : null
  );

  const reader = useMemo(() => {
    const reader = new FileReader();
    reader.onload = () => {
      if (!reader.result) {
        return;
      } else if (typeof reader.result === "string") {
        setSourceUrl(reader.result);
      } else {
        try {
          const blob = new Blob([new Uint8Array(reader.result)], {
            type: "video/mp4",
          });
          const str = URL.createObjectURL(blob);
          setSourceUrl(str);
        } catch {}
      }
    };
    reader.onerror = () => setSourceUrl(null);
    return reader;
  }, []);

  useEffect(() => {
    if (file instanceof File) {
      if (reader.readyState !== 1) {
        reader.readAsDataURL(file);
      }
    }

    if (typeof file === "string") {
      setSourceUrl(file);
    }
  }, [file, reader]);

  return [sourceUrl, setSourceUrl, (file: File) => reader.readAsDataURL(file)];
}
