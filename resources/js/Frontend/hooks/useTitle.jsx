import { useEffect } from "react";

export default function useTitle(pageTitle) {
  useEffect(() => {
    const projectTitle = "Transfer of Human Biological Samples (THBM)";
    const finalTitle = pageTitle ? `${pageTitle} | ${projectTitle}` : projectTitle;
    document.title = finalTitle;
  }, [pageTitle]);
}
