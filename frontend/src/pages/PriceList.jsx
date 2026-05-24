import { useEffect, useMemo, useState } from "react";
import { Search } from "lucide-react";
import * as api from "@/lib/api";
import PageHeader from "@/components/PageHeader";
import EmptyState from "@/components/EmptyState";
import { formatRp, formatRelativeId } from "@/lib/utils";

export default function PriceList() {
  const [prices, setPrices] = useState([]);
  const [sources, setSources] = useState([]);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("Semua");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const categories = useMemo(() => {
    const values = new Set(prices.map((price) => price.category).filter(Boolean));
    return ["Semua", ...Array.from(values).sort()];
  }, [prices]);

  useEffect(() => {
    let ignore = false;

    async function load() {
      setLoading(true);
      setError("");
      try {
        const [sourceResponse, priceResponse] = await Promise.all([
          api.getPriceSources(),
          api.getExternalPrices({ search, category }),
        ]);

        if (!ignore) {
          setSources(sourceResponse.data || []);
          setPrices(priceResponse.data || []);
        }
      } catch (err) {
        if (!ignore) {
          setError(err?.response?.data?.message || err.message || "Price list tidak bisa dimuat.");
          setPrices([]);
        }
      } finally {
        if (!ignore) {
          setLoading(false);
        }
      }
    }

    const timeout = window.setTimeout(load, 200);
    return () => {
      ignore = true;
      window.clearTimeout(timeout);
    };
  }, [search, category]);

  return (
    <div>
      <PageHeader
        breadcrumbs={[{ label: "Beranda", to: "/" }, { label: "Price List" }]}
        kicker="04 / Referensi Harga"
        title="Price List"
        subtitle="Daftar harga referensi dari sumber eksternal atau data seed. Harga final tetap mengikuti kondisi material dan tempat setor."
      />

      <div className="grid gap-3 mb-5 md:grid-cols-[1fr_220px]">
        <div className="relative">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Cari item atau kode harga..."
            className="ds-input pl-9"
          />
        </div>
        <select
          value={category}
          onChange={(event) => setCategory(event.target.value)}
          className="ds-input"
          aria-label="Filter kategori price list"
        >
          {categories.map((item) => (
            <option key={item} value={item}>
              {item}
            </option>
          ))}
        </select>
      </div>

      {sources.length > 0 && (
        <div className="mb-5 rounded border border-border bg-card p-4">
          <div className="kicker mb-2">Sumber Harga</div>
          <div className="grid gap-2 md:grid-cols-2">
            {sources.map((source) => (
              <div key={source.id} className="rounded border border-border bg-background p-3">
                <div className="text-sm font-bold text-foreground">{source.name}</div>
                <div className="text-xs text-muted-foreground mt-1">
                  {[source.type, source.area].filter(Boolean).join(" - ")}
                </div>
                {source.last_checked_at && (
                  <div className="text-xs text-muted-foreground mt-1">
                    Dicek {formatRelativeId(source.last_checked_at)}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}

      {error && (
        <div className="rounded border border-destructive/30 bg-destructive/10 px-4 py-3 text-sm text-destructive mb-5">
          {error}
        </div>
      )}

      {loading ? (
        <div className="space-y-3">
          {Array.from({ length: 4 }).map((_, index) => (
            <div key={index} className="h-20 rounded border border-border bg-card animate-pulse" />
          ))}
        </div>
      ) : prices.length === 0 ? (
        <EmptyState
          icon={Search}
          title="Belum ada harga"
          description="Coba ubah kata kunci atau kategori."
        />
      ) : (
        <div className="rounded border border-border bg-card overflow-hidden">
          <table className="w-full text-sm">
            <thead className="bg-muted/60">
              <tr className="kicker">
                <th className="px-4 py-2.5 text-left font-medium">Item</th>
                <th className="px-4 py-2.5 text-right font-medium">Harga</th>
              </tr>
            </thead>
            <tbody>
              {prices.map((price, index) => (
                <tr key={price.id} className={index === 0 ? "" : "border-t border-border"}>
                  <td className="px-4 py-3">
                    <div className="font-semibold text-foreground">{price.item_name}</div>
                    <div className="text-[11px] text-muted-foreground mt-0.5">
                      {[price.category, price.external_code, price.source?.name].filter(Boolean).join(" - ")}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right font-bold tabular-nums text-primary whitespace-nowrap">
                    {formatRp(price.price)}
                    <span className="text-foreground/55 text-xs font-medium">/{price.unit || "Kg"}</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}
