const baseUrl = "http://localhost:3000";
const pagesToCrawl = ["/", "/about", "/courses", "/faculty", "/gallery", "/blog", "/contact"];
const allFoundLinks = new Map();

async function runAudit() {
  console.log("=== SUPER CROWN FOUNDATION — LINK HEALTH AUDIT ===");
  console.log("Auditing pages:", pagesToCrawl.join(", "));

  for (const page of pagesToCrawl) {
    try {
      const res = await fetch(baseUrl + page);
      const html = await res.text();
      console.log(`Page: ${page.padEnd(10)} | Status: ${res.status} | Bytes: ${html.length}`);

      // Extract href values
      const regex = /href=["']([^"']+)["']/g;
      let match;
      while ((match = regex.exec(html)) !== null) {
        const href = match[1];
        if (!allFoundLinks.has(href)) {
          allFoundLinks.set(href, new Set());
        }
        allFoundLinks.get(href).add(page);
      }
    } catch (err) {
      console.error(`Failed to crawl ${page}:`, err.message);
    }
  }

  console.log(`\nDiscovered ${allFoundLinks.size} unique link targets.`);

  const results = {
    internalOk: [],
    internalBroken: [],
    external: [],
    anchors: [],
    protocols: [],
  };

  for (const [link, sources] of allFoundLinks.entries()) {
    const sourceList = Array.from(sources).join(", ");
    if (link.startsWith("#")) {
      results.anchors.push({ link, sources: sourceList });
    } else if (link.startsWith("tel:") || link.startsWith("mailto:")) {
      results.protocols.push({ link, sources: sourceList });
    } else if (link.startsWith("http://") || link.startsWith("https://")) {
      if (link.startsWith(baseUrl)) {
        const path = link.replace(baseUrl, "");
        try {
          const res = await fetch(link);
          if (res.ok) results.internalOk.push({ link: path, status: res.status });
          else results.internalBroken.push({ link: path, status: res.status, sources: sourceList });
        } catch {
          results.internalBroken.push({ link: path, status: "NETWORK_ERROR", sources: sourceList });
        }
      } else {
        results.external.push({ link, sources: sourceList });
      }
    } else if (link.startsWith("/")) {
      try {
        const res = await fetch(baseUrl + link);
        if (res.ok) results.internalOk.push({ link, status: res.status });
        else results.internalBroken.push({ link, status: res.status, sources: sourceList });
      } catch {
        results.internalBroken.push({ link, status: "NETWORK_ERROR", sources: sourceList });
      }
    }
  }

  console.log(`\n--- INTERNAL WORKING LINKS (${results.internalOk.length}) ---`);
  results.internalOk.forEach((r) => console.log(`  ✓ [HTTP ${r.status}] ${r.link}`));

  console.log(`\n--- INTERNAL BROKEN LINKS (${results.internalBroken.length}) ---`);
  if (results.internalBroken.length === 0) {
    console.log("  ★ 100% HEALTHY: Zero broken internal links found!");
  } else {
    results.internalBroken.forEach((r) =>
      console.log(`  ✗ [STATUS ${r.status}] ${r.link} (Found on: ${r.sources})`)
    );
  }

  console.log(`\n--- IN-PAGE ANCHORS (${results.anchors.length}) ---`);
  results.anchors.forEach((r) => console.log(`  # ${r.link} (on ${r.sources})`));

  console.log(`\n--- PROTOCOL SHORTCUTS (${results.protocols.length}) ---`);
  results.protocols.forEach((r) => console.log(`  ☎ ${r.link} (on ${r.sources})`));

  console.log(`\n--- EXTERNAL LINKS (${results.external.length}) ---`);
  results.external.forEach((r) => console.log(`  ↗ ${r.link}`));
}

runAudit();
