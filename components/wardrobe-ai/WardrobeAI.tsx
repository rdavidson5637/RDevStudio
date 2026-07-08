"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import type { ItemWithUrl } from "@/lib/wardrobe/types";
import s from "./wardrobe.module.css";

interface GenerateResponse {
  count: number;
  outfits: number[][];
  items: ItemWithUrl[];
}

const MAX_RENDER = 30;

async function api(
  url: string,
  opts: { method?: string; body?: BodyInit; json?: boolean; adminToken?: string | null } = {},
) {
  const headers: Record<string, string> = {};
  if (opts.json) headers["Content-Type"] = "application/json";
  if (opts.adminToken) headers["x-admin-token"] = opts.adminToken;
  const res = await fetch(url, { method: opts.method || "GET", headers, body: opts.body });
  if (!res.ok) {
    let msg = `Request failed (${res.status})`;
    try {
      const b = await res.json();
      if (b.error) msg = b.details ? `${b.error}: ${b.details.join(", ")}` : b.error;
    } catch {
      /* ignore */
    }
    throw new Error(msg);
  }
  if (res.status === 204) return null;
  return res.json();
}

function Ghost({ item, className }: { item?: ItemWithUrl; className?: string }) {
  if (item?.image_url) {
    return (
      <div className={`${s.ghost} ${className ?? ""}`}>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src={item.image_url} alt={item.type} loading="lazy" />
      </div>
    );
  }
  return (
    <div className={`${s.ghost} ${s.ghostEmpty} ${className ?? ""}`}>{item ? item.layer : "no photo"}</div>
  );
}

function shortlistKey(ids: number[]) {
  return ids.slice().sort((a, b) => a - b).join("-");
}

function LineupCard({
  ids,
  itemsById,
  shortlisted,
  onToggleShortlist,
}: {
  ids: number[];
  itemsById: Record<number, ItemWithUrl>;
  shortlisted: boolean;
  onToggleShortlist: (ids: number[]) => void;
}) {
  const [verdict, setVerdict] = useState<{ score: number; feedback: string } | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [scoring, setScoring] = useState(false);

  async function getVerdict() {
    setScoring(true);
    setError(null);
    try {
      const r = await api("/api/wardrobe/score", {
        method: "POST",
        json: true,
        body: JSON.stringify({ item_ids: ids }),
      });
      setVerdict(r);
    } catch (e) {
      setError((e as Error).message);
    } finally {
      setScoring(false);
    }
  }

  return (
    <article className={s.lineup}>
      <div className={s.pieces}>
        {ids.map((id) => (
          <div className={s.piece} key={id}>
            <Ghost item={itemsById[id]} />
            <small>{itemsById[id]?.type ?? `#${id}`}</small>
          </div>
        ))}
      </div>
      <div className={s.actions}>
        <button className="btn-primary" onClick={getVerdict} disabled={scoring || Boolean(verdict)}>
          {scoring ? "Judging..." : verdict ? "Verdict in" : "Get the gaffer's verdict"}
        </button>
        <button className="btn-secondary" onClick={() => onToggleShortlist(ids)}>
          {shortlisted ? "Shortlisted" : "Shortlist"}
        </button>
      </div>
      {(verdict || error) && (
        <div className={s.verdict}>
          {verdict && (
            <>
              <div className={s.score}>
                {verdict.score}
                <span className={s.scoreOut}>/100</span>
              </div>
              <p style={{ marginTop: "0.4rem" }}>{verdict.feedback}</p>
            </>
          )}
          {error && <p className={s.err}>{error}</p>}
        </div>
      )}
    </article>
  );
}

export function WardrobeAI() {
  const [items, setItems] = useState<ItemWithUrl[]>([]);
  const [itemsById, setItemsById] = useState<Record<number, ItemWithUrl>>({});
  const [combos, setCombos] = useState<number[][]>([]);
  const [count, setCount] = useState(0);
  const [allowMismatch, setAllowMismatch] = useState(false);
  const [showLineups, setShowLineups] = useState(false);
  const [loadError, setLoadError] = useState<string | null>(null);

  // Admin
  const [adminToken, setAdminToken] = useState<string | null>(null);
  const [adminOpen, setAdminOpen] = useState(false);
  const [tokenInput, setTokenInput] = useState("");
  const [adminError, setAdminError] = useState<string | null>(null);
  const [uploading, setUploading] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);
  const typeRef = useRef<HTMLInputElement>(null);
  const colourRef = useRef<HTMLInputElement>(null);
  const layerRef = useRef<HTMLSelectElement>(null);
  const formalityRef = useRef<HTMLSelectElement>(null);

  // Shortlist (per visitor, localStorage)
  const [shortlist, setShortlist] = useState<string[]>([]);
  const lineupsRef = useRef<HTMLDivElement>(null);

  const loadWardrobe = useCallback(async () => {
    try {
      const q = allowMismatch ? "?allowFormalityMismatch=true" : "";
      const data: GenerateResponse = await api(`/api/wardrobe/generate${q}`);
      setItems(data.items);
      setItemsById(Object.fromEntries(data.items.map((i) => [i.id, i])));
      setCombos(data.outfits);
      setCount(data.count);
    } catch (e) {
      setLoadError((e as Error).message);
    }
  }, [allowMismatch]);

  useEffect(() => {
    setAdminToken(sessionStorage.getItem("wardrobe_admin"));
    try {
      setShortlist(JSON.parse(localStorage.getItem("wardrobe_shortlist") || "[]"));
    } catch {
      setShortlist([]);
    }
  }, []);

  useEffect(() => {
    loadWardrobe();
  }, [loadWardrobe]);

  function toggleShortlist(ids: number[]) {
    const k = shortlistKey(ids);
    setShortlist((prev) => {
      const next = prev.includes(k) ? prev.filter((x) => x !== k) : [...prev, k];
      localStorage.setItem("wardrobe_shortlist", JSON.stringify(next));
      return next;
    });
  }

  function generate() {
    setShowLineups(true);
    setTimeout(() => lineupsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" }), 50);
  }

  async function unlockAdmin() {
    setAdminError(null);
    if (!tokenInput) {
      setAdminError("Enter your admin token.");
      return;
    }
    try {
      const r = await api("/api/wardrobe/admin/check", { adminToken: tokenInput });
      if (!r.admin) throw new Error("Wrong token");
      sessionStorage.setItem("wardrobe_admin", tokenInput);
      setAdminToken(tokenInput);
      setTokenInput("");
    } catch (e) {
      setAdminError((e as Error).message || "Could not verify token");
    }
  }

  function logoutAdmin() {
    sessionStorage.removeItem("wardrobe_admin");
    setAdminToken(null);
    setAdminOpen(false);
  }

  async function upload() {
    setUploadError(null);
    const file = fileRef.current?.files?.[0];
    if (!file) {
      setUploadError("Pick a photo first.");
      return;
    }
    setUploading(true);
    try {
      const fd = new FormData();
      fd.append("image", file);
      const map: Record<string, string | undefined> = {
        type: typeRef.current?.value.trim(),
        colour: colourRef.current?.value.trim(),
        layer: layerRef.current?.value,
        formality: formalityRef.current?.value,
      };
      for (const [k, v] of Object.entries(map)) if (v) fd.append(k, v);
      await api("/api/wardrobe/items", { method: "POST", body: fd, adminToken });
      if (fileRef.current) fileRef.current.value = "";
      await loadWardrobe();
    } catch (e) {
      setUploadError((e as Error).message);
    } finally {
      setUploading(false);
    }
  }

  async function removeItem(id: number) {
    try {
      await api(`/api/wardrobe/items/${id}`, { method: "DELETE", adminToken });
      await loadWardrobe();
    } catch (e) {
      alert((e as Error).message);
    }
  }

  return (
    <div>
      {/* Scoreboard + controls */}
      <div className={s.scoreboard}>
        <div className={s.scoreCell}>
          <span className={s.scoreNum}>{items.length}</span>
          <span className={s.scoreCap}>Pieces</span>
        </div>
        <div className={s.scoreCell}>
          <span className={s.scoreNum}>{count}</span>
          <span className={s.scoreCap}>Possible line-ups</span>
        </div>
        <div className={s.scoreCell}>
          <span className={s.scoreNum}>Claude</span>
          <span className={s.scoreCap}>On styling</span>
        </div>
      </div>

      <div className={s.controls}>
        <button className="btn-primary" onClick={generate}>
          Generate line-ups
        </button>
        <label className={s.switch}>
          <input
            type="checkbox"
            checked={allowMismatch}
            onChange={(e) => setAllowMismatch(e.target.checked)}
          />{" "}
          Allow formality mismatches
        </label>
        <button
          className="btn-secondary"
          onClick={() => (adminToken ? logoutAdmin() : setAdminOpen((v) => !v))}
        >
          {adminToken ? "Admin ✓" : "Admin"}
        </button>
      </div>

      {/* SQUAD */}
      <section id="squad" style={{ marginTop: "1rem" }}>
        <p className="section-label">The squad</p>
        <h2 className="section-heading">The wardrobe</h2>
        <p className="lead-text" style={{ marginTop: "0.75rem", marginBottom: "1.5rem" }}>
          Tagged by AI on upload, backgrounds removed so it&apos;s just the clothes.
        </p>

        {/* Admin login */}
        {adminOpen && !adminToken && (
          <div className={s.adminPanel}>
            <p className="shell-label">Admin // unlock</p>
            <div className={s.field} style={{ marginTop: 10 }}>
              <input
                className={s.input}
                type="password"
                placeholder="Admin token"
                value={tokenInput}
                onChange={(e) => setTokenInput(e.target.value)}
              />
            </div>
            <button className="btn-primary" onClick={unlockAdmin}>
              Unlock
            </button>
            {adminError && <p className={s.err}>{adminError}</p>}
          </div>
        )}

        {/* Admin upload */}
        {adminToken && (
          <div className={s.adminPanel}>
            <p className="shell-label">Admin // add to squad</p>
            <div className={s.field} style={{ marginTop: 10 }}>
              <label>Garment photo (background removed automatically)</label>
              <input className={s.input} ref={fileRef} type="file" accept="image/jpeg,image/png,image/webp" />
            </div>
            <div className={s.adminGrid}>
              <div className={s.field}>
                <label>Type (optional - AI fills it)</label>
                <input className={s.input} ref={typeRef} type="text" placeholder="shirt" />
              </div>
              <div className={s.field}>
                <label>Colour</label>
                <input className={s.input} ref={colourRef} type="text" placeholder="navy" />
              </div>
              <div className={s.field}>
                <label>Layer</label>
                <select className={s.input} ref={layerRef} defaultValue="">
                  <option value="">auto</option>
                  <option value="base">base (top)</option>
                  <option value="mid">mid</option>
                  <option value="bottom">bottom</option>
                  <option value="outer">outer</option>
                  <option value="footwear">footwear</option>
                </select>
              </div>
              <div className={s.field}>
                <label>Formality</label>
                <select className={s.input} ref={formalityRef} defaultValue="">
                  <option value="">auto</option>
                  <option value="casual">casual</option>
                  <option value="smart-casual">smart-casual</option>
                  <option value="formal">formal</option>
                </select>
              </div>
            </div>
            <button className="btn-primary" onClick={upload} disabled={uploading}>
              {uploading ? "Removing background + tagging..." : "Add to squad"}
            </button>
            {uploadError && <p className={s.err}>{uploadError}</p>}
          </div>
        )}

        {loadError && <p className={s.err}>{loadError}</p>}
        {!loadError && items.length === 0 && <p className={s.empty}>No pieces yet</p>}
        <div className={s.grid}>
          {items.map((item) => (
            <article className={s.card} key={item.id}>
              <Ghost item={item} />
              <div className={s.meta}>
                <div className={s.name}>{item.type}</div>
                <div className={s.tags}>
                  <span className={s.tag}>{item.layer}</span>
                  <span className={s.tag}>{item.colour}</span>
                  <span className={s.tag}>{item.formality}</span>
                  {item.needs_review && <span className={`${s.tag} ${s.tagReview}`}>check tags</span>}
                </div>
              </div>
              {adminToken && (
                <button className={s.cardDel} onClick={() => removeItem(item.id)}>
                  Remove
                </button>
              )}
            </article>
          ))}
        </div>
      </section>

      {/* LINE-UPS */}
      <section id="lineups" ref={lineupsRef} style={{ marginTop: "3.5rem" }}>
        <p className="section-label">The line-ups</p>
        <h2 className="section-heading">Generated outfits</h2>
        {showLineups && count > 0 && (
          <p className="lead-text" style={{ marginTop: "0.5rem", marginBottom: "1.25rem" }}>
            {count} valid line-up{count === 1 ? "" : "s"}
            {count > MAX_RENDER ? ` (showing first ${MAX_RENDER})` : ""}
          </p>
        )}
        {!showLineups && <p className={s.empty}>Hit &quot;generate line-ups&quot; to build outfits</p>}
        {showLineups && (
          <div className={s.lineups}>
            {combos.slice(0, MAX_RENDER).map((ids, i) => (
              <LineupCard
                key={i}
                ids={ids}
                itemsById={itemsById}
                shortlisted={shortlist.includes(shortlistKey(ids))}
                onToggleShortlist={toggleShortlist}
              />
            ))}
          </div>
        )}
      </section>
    </div>
  );
}
