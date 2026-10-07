-- Kilkenny joins the finder. Fresh installs already include it in 0004.
-- ADD VALUE cannot be used in the same transaction, so the backfill
-- of existing pubs is 0009.

alter type public.stout_drink add value if not exists 'kilkenny';
