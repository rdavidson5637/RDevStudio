"use client";

import { FormEvent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import Link from "next/link";
import { BELFAST_CITY_HALL } from "@/lib/stout-finder/types";
import { useAnonymousSession } from "@/hooks/useAnonymousSession";

const PinPickerMap = dynamic(() => import("./PinPickerMap"), { ssr: false });

type Duplicate = { slug: string; name: string; town: string | null };

export function AddPubForm() {
  const { ensure, error: sessionError } = useAnonymousSession();
  const [name, setName] = useState("");
  const [town, setTown] = useState("");
  const [county, setCounty] = useState<"Antrim" | "Down">("Antrim");
  const [address, setAddress] = useState("");
  const [postcode, setPostcode] = useState("");
  const [pin, setPin] = useState(BELFAST_CITY_HALL);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [done, setDone] = useState(false);
  const [duplicate, setDuplicate] = useState<Duplicate | null>(null);

  useEffect(() => {
    if (!navigator.geolocation) return;
    navigator.geolocation.getCurrentPosition((position) => {
      setPin({
        lat: position.coords.latitude,
        lng: position.coords.longitude,
      });
    });
  }, []);

  async function onSubmit(event: FormEvent) {
    event.preventDefault();
    setError(null);
    setDuplicate(null);
    const userId = await ensure();
    if (!userId) return;
    setSubmitting(true);
    try {
      const response = await fetch("/api/stout-finder/pubs", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          town,
          county,
          address,
          postcode,
          lat: pin.lat,
          lng: pin.lng,
        }),
      });
      const payload = (await response.json()) as {
        error?: string;
        message?: string;
        pub?: Duplicate;
      };
      if (response.status === 409 && payload.pub) {
        setDuplicate(payload.pub);
        return;
      }
      if (!response.ok) {
        setError(payload.error || "Could not submit that pub.");
        return;
      }
      setDone(true);
    } catch {
      setError("Could not submit that pub.");
    } finally {
      setSubmitting(false);
    }
  }

  if (done) {
    return (
      <p className="rounded-[10px] border border-border bg-raised p-4 text-sm text-secondary">
        Submitted for review. It will not appear on the map until it is approved.
      </p>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-5">
      <label className="block text-sm text-secondary">
        Name
        <input
          required
          value={name}
          onChange={(event) => setName(event.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
        />
      </label>
      <label className="block text-sm text-secondary">
        Town
        <input
          required
          value={town}
          onChange={(event) => setTown(event.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
        />
      </label>
      <label className="block text-sm text-secondary">
        County
        <select
          required
          value={county}
          onChange={(event) =>
            setCounty(event.target.value as "Antrim" | "Down")
          }
          className="mt-1 w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
        >
          <option value="Antrim">Antrim</option>
          <option value="Down">Down</option>
        </select>
      </label>
      <label className="block text-sm text-secondary">
        Address (optional)
        <input
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
        />
      </label>
      <label className="block text-sm text-secondary">
        Postcode (optional)
        <input
          value={postcode}
          onChange={(event) => setPostcode(event.target.value)}
          className="mt-1 w-full rounded-md border border-border bg-raised px-3 py-2 text-primary"
        />
      </label>

      <div>
        <p className="mb-2 text-sm text-secondary">
          Drag the pin to the door. Click the map to jump.
        </p>
        <PinPickerMap value={pin} onChange={setPin} />
      </div>

      {duplicate ? (
        <p className="rounded-[10px] border border-border bg-overlay p-3 text-sm text-secondary">
          Did you mean{" "}
          <Link
            href={`/stout-finder/${duplicate.slug}`}
            className="text-accent underline-offset-2 hover:underline"
          >
            {duplicate.name}
            {duplicate.town ? `, ${duplicate.town}` : ""}
          </Link>
          ?
        </p>
      ) : null}

      {sessionError ? <p className="text-sm text-destructive">{sessionError}</p> : null}
      {error ? <p className="text-sm text-destructive">{error}</p> : null}

      <button type="submit" className="btn-primary" disabled={submitting}>
        {submitting ? "Submitting" : "Submit for review"}
      </button>
    </form>
  );
}
