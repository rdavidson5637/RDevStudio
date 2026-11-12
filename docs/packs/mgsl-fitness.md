# MGSL fitness pack

Open `~/Desktop/mgsl hub` (package `mgsl-hq`, live at mgsl.online). One prompt per new Cursor Agent chat, in order. This upgrades the trainer already in the repo. Do not start a new app.

Already built: `/today`, `/train`, `/body`, `/mgsl`, password login, the fixed programme in `supabase/migrations/0001_init.sql`, sets with kg and RIR, a rest timer in `src/lib/useRestTimer.ts`, bodyweight and waist, Dexie outbox in `src/lib/db/local.ts`, Serwist, Recharts. Guitar, theory and MGSL planner items stay. The `/mgsl` audio and video page stays.

Login stays the password already on the site. No magic link, no Google, no public sign-up. It is one user.

Skills: read `~/.claude/skills/redesign-existing-projects/SKILL.md` and `~/.claude/skills/web-design-guidelines/SKILL.md` when a prompt says so. Do not use design-taste. It is for marketing pages, not this app. Schema prompts read `~/.claude/skills/supabase-postgres-best-practices/SKILL.md` first. The project skill from M1 wins on colour and copy.

| # | What | Needs first |
| --- | --- | --- |
| M1 | Project skill and Grenadine shell | - |
| M2 | Schema | M1 |
| M3 | Templates and builder | M2 |
| M4 | Week calendar and football | M2 |
| M5 | Logging, progression, deload | M3 |
| M6 | Progress | M2, M5 |
| M7 | Cardio and offline queue | M2 |
| M8 | PR card and personal challenges | M6 |

---

## M1 Project skill and Grenadine shell

```text
MGSL hub, ~/Desktop/mgsl hub. Read ~/.claude/skills/redesign-existing-projects/SKILL.md. Visual shell only. Do not change training behaviour, schema, or auth in this prompt. No new npm dependencies. No design-taste skill.

1. Branch off the current HEAD: git checkout -b fitness/planner

2. Write .cursor/skills/mgsl/SKILL.md. Frontmatter name mgsl. Description: use for any UI or schema work in this app. Body:

   One user. Password login stays. Do not add Google, magic link, or public sign-up.
   Grenadine, exact:
   - deep slate #112F2C page background, and text on pink or ochre
   - naples #FBE6A0 primary text
   - naples muted #CFC7A3 secondary
   - naples faint #B9B392 captions, only if AA passes
   - slate 2 #183E3A panels and inputs
   - slate 3 #1E4A45 hover and raised panels
   - grenadine #F48067 the one accent (primary button, the active tab, one highlight)
   - grenadine light #F79A85 hover
   - grenadine deep #D75C42 icons on both dark and light
   - ochre #E2B540 alerts and the PR card ground
   - ochre ink #2C4A3A muted text on ochre
   - lines: naples at 18% and 35%
   Text on grenadine or ochre is #112F2C.
   Type: Atkinson Hyperlegible for UI, Big Shoulders Display for the big kg numbers only. Both through next/font. No system font stack. No third family.
   kg only. No pounds toggle.
   Keep /mgsl (audio and video), guitar and theory planner items, and the tab bar: Today, Train, Body, MGSL.
   Copy: plain, short, no em dashes. No invented PRs.
   RLS: every user row is user_id = auth.uid(). Do not weaken policies.
   App UI, not a marketing site: no noise, gradients, pill badges, fade-up, or scale-on-hover. Hover changes colour only. prefers-reduced-motion.
   Offline writes go through the Dexie outbox. Do not add a second queue.

3. src/app/globals.css. Replace the :root colours with the tokens above. Map --background, --surface, --surface-2, --foreground, --muted, --border, --accent, --accent-foreground. Add faint, ochre, ochre-ink, accent-deep as variables. --accent-foreground is #112F2C. Delete the prefers-color-scheme: light block so the app stays dark. Completed sets use ochre, not a new green. Errors use grenadine deep.

4. Load Atkinson_Hyperlegible (400, 700) and Big_Shoulders_Display (800) in src/app/layout.tsx with next/font/google. Point the sans variable at Atkinson. Use Big Shoulders only on the large weight and PR figures. Remove the system font stack in @theme.

5. Tab bar (src/components/TabBar.tsx): active tab grenadine, others naples muted. Min height 44px. Do not add tabs.

6. Measure contrast: naples, muted and faint on deep slate and slate 2; deep slate on grenadine; deep slate on ochre. If faint fails AA, lighten it toward naples and record the hex in the skill. Primary buttons at least 18px bold if deep slate on grenadine is under 4.5:1.

7. npm run build && npm run lint && npm test. Click nothing that needs a schema change. /today, /train, /body and /mgsl still render.

Done when: build, lint and tests pass, the contrast list is in the reply, and this is committed.
```

## M2 Schema

```text
MGSL hub, fitness/planner. Read the mgsl skill and ~/.claude/skills/supabase-postgres-best-practices/SKILL.md before writing SQL. Read supabase/migrations/0001_init.sql, src/types/database.ts, src/lib/programme.ts and src/lib/db/local.ts. New migration file. Do not edit 0001 if it has already been applied. Do not drop sessions or set_entries. kg only. One user, RLS owner-only.

Goal: programmes you can build, templates, a library, a calendar, manual cardio, photos. Old logs still attach to the current block.

1. Exercises. The current exercises table ties every row to a day_code. Add user_id uuid null references auth.users. Null means a shared library row. Make day_code nullable for library rows that are not in the old programme. Existing rows stay valid. RLS: authenticated can select where user_id is null or user_id = auth.uid(). Insert, update, delete only where user_id = auth.uid(). No policy that lets this user edit the shared rows.

2. programmes: id, user_id, name, kind check (custom, template), template_key text null, is_active boolean, deload_every_n_weeks int not null default 6, created_at. One active programme per user (partial unique index). RLS owner-only.

3. programme_sessions: id, programme_id, user_id, name, weekday int null, sort_order. These are the days inside a programme, not calendar dates. RLS owner-only.

4. session_exercises: id, programme_session_id, user_id, exercise_key, sort_order, sets int, rep_low, rep_high, rest_sec, target_kg numeric null, superset_group text null. RLS owner-only. Index (programme_session_id, sort_order).

5. Keep programme_days, programme_weeks and the existing sessions table. Add a template_key current_block by seeding one programmes row that mirrors the current programme_days, so old sessions remain readable. Do this in the seed script (scripts/seed.ts or a new script), not by guessing week dates. If the seed cannot see auth.users, write the SQL so it runs for the existing user and say how to run it.

6. Templates, seeded as programmes with kind template and is_active false, or as shared rows with user_id null if you put templates in their own table. Pick one and document it. Three templates, real exercises from the library, not lorem:
   - push pull legs, 6 days
   - upper/lower, 4 days
   - 5/3/1, 4 days, with the usual percentages stored on session_exercises (note them in a comment). Do not invent a fifth programme.
   The current block is a fourth template_key, current_block, copied from what is already seeded.

7. calendar_rules: user_id, kind check (football_train, match), weekday int, start_time time null, end_time time null, title, active boolean. Unique (user_id, kind, weekday). Seed, for this user only: Tuesday and Thursday football_train 08:30 to 09:30, Saturday match with null times and title "Match". These are not gym sets.

8. calendar_events: id, user_id, date, kind check (gym, football_train, match, cardio, rest), starts_at time null, ends_at time null, title, programme_session_id null, skipped boolean default false. Unique (user_id, date, kind, programme_session_id) or a close equivalent that lets two gym sessions on one day. RLS owner-only.

9. cardio_entries: id, user_id, date, activity text, minutes int, distance_km numeric null, note text null. Manual only. No Strava, no Apple Health. RLS owner-only.

10. measurements already has waist_cm. Add nullable chest_cm, hips_cm, arm_cm, thigh_cm. Do not drop waist.

11. set_entries: add note text null if it is missing. Do not remove weight_kg, reps, rir, is_warmup.

12. progress_photos: id, user_id, date, storage_path text, note text null. Private Supabase storage bucket. Policies so only the owner reads and writes that path. Signed URLs in the app. No public bucket.

13. challenges: id, user_id, title, detail text null, done boolean default false, logged_on date null. Personal only. No leaderboard table.

14. Regenerate src/types/database.ts to match, or edit it by hand if the project has no generator. npm test. Fix types the new columns break. Do not build the UI in this prompt.

Done when: the migration is in supabase/migrations, RLS is described in the reply, tests pass, and this is committed. If you cannot apply the migration from this machine, say the exact command the user runs.
```

## M3 Templates and builder

```text
MGSL hub, fitness/planner. Read the mgsl skill. UI for programmes. Read src/app/train/page.tsx before editing it so the logger still opens today's session.

1. A programme screen, linked from Train. List the active programme and the templates (push pull legs, upper/lower, 5/3/1, current block). Starting a template copies it into a new active programme. The previous active one becomes inactive. Do not delete its logged sessions.

2. Builder, on a programme you own: rename it, add or remove a day, reorder days, add an exercise from the library, set sets, rep range, rest seconds, target kg, and an optional superset group (a short letter). Remove an exercise from the day without deleting library rows or old set_entries.

3. Custom exercise: name, body part, category, rep range, increment kg, rest seconds. Saves with user_id set. Shows in the library next to shared rows. You can edit or delete only your own.

4. Empty state when there is no active programme: one line and a button to pick a template. No illustration.

5. Phone first. 375px wide, no horizontal scroll, 44px targets. One h1. Big Shoulders only on kg figures.

Done when: build, lint and tests pass, you have clicked through copy-template and add-exercise locally or described the blocker, and this is committed.
```

## M4 Week calendar and football

```text
MGSL hub, fitness/planner. Read the mgsl skill. Week view. Do not turn football into gym sets.

1. A week calendar on /today or a /week route linked from Today. Seven days. Each day shows gym sessions from the active programme (by weekday on programme_sessions) and the football rules.

2. Tuesday and Thursday show "Football" 8:30 to 9:30 from calendar_rules. Saturday shows "Match". A skip control writes calendar_events.skipped for that date. Skipping does not delete the rule. Next week still shows it.

3. Gym days open the existing train logger for that programme_session. Football and match days do not open set entry. A short note field is enough, stored on calendar_events or the existing notes table. Pick one and stick to it.

4. Rest days stay readable. The old restDayCopy in src/lib/programme.ts can remain as fallback text.

5. Generating the visible week is derived from rules plus the active programme. Do not insert 52 weeks of rows on load. Write a calendar_events row only when the user skips, adds a note, or logs.

Done when: build, lint and tests pass, a skipped Saturday does not remove the rule, and this is committed.
```

## M5 Logging, progression, deload

```text
MGSL hub, fitness/planner. Read the mgsl skill. Extend /train. The rest timer in src/lib/useRestTimer.ts already runs. Do not rewrite it. Wire it to the session you are logging.

1. Logger shows the active programme's session for today: exercises in order, sets, kg, reps, RIR, warmup flag. Those columns already exist on set_entries. Keep them. Add the optional note from M2 on a set.

2. Superset group: exercises that share a letter sit together, labelled "Superset A". One rest timer starts after the group, using the longer rest_sec. If superset_group is null, rest starts after the set, as it does now.

3. Auto progression: when every working set (not warmup) for an exercise hits rep_high, raise session_exercises.target_kg by that exercise's increment_kg for next time. Show the new target in naples. Do not change the sets already saved. If the user missed the top of the range, leave the target.

4. Deload: read deload_every_n_weeks on the active programme (default 6). Count completed weeks of that programme. On the deload week, prescribed sets drop by one, minimum one. Weight stays. A line on the session says it is a deload week. A control turns deload off by setting deload_every_n_weeks to 0. Do not invent a percentage cut on top.

5. Writes go through the existing local db helpers so they hit the outbox. If a new column is not in the Dexie types, add it in M7's spirit now only if the logger cannot save without it, and list what M7 still has to sync.

6. 5/3/1 days show the percentage next to the target kg. Other templates do not.

Done when: build, lint and tests pass, a worked example of progression is in the reply (top of range hit, target moves by increment_kg), and this is committed.
```

## M6 Progress

```text
MGSL hub, fitness/planner. Read the mgsl skill. Progress lives on /body or a /progress route linked from Body. Recharts is already a dependency. Do not add another chart library. kg only.

Compute from set_entries. Do not store a second PR table.

1. PRs: heaviest working set per exercise, and the best estimated 1RM. Epley: weight_kg * (1 + reps / 30). Ignore warmups. Show the date.

2. A chart of estimated 1RM over time for one exercise, picker defaulting to the exercise with the most logs.

3. Weekly volume per muscle: sum of sets * reps * weight_kg, grouped by exercises.body_part, for the selected week. A simple bar list is enough if a chart is cramped at 375px.

4. Streak: consecutive days with a completed gym session, football log, or cardio entry. Rest days do not break it. Say the rule in the UI in one line.

5. Bodyweight chart from the existing bodyweight table. Measurements form: waist, and the new chest, hips, arm, thigh fields. Empty fields stay null.

6. Progress photos: take or pick one, upload to the private bucket, list by date, signed URL. Delete removes the object and the row. No public URL.

7. Empty states: one sentence each, no stock illustration.

Done when: build, lint and tests pass, you have named the query for PRs, and this is committed.
```

## M7 Cardio and offline queue

```text
MGSL hub, fitness/planner. Read the mgsl skill and src/lib/db/local.ts. Manual cardio, then the offline queue. No Strava. No Apple Health.

1. Cardio form: date, activity (run, bike, row, other), minutes, optional distance km, optional note. Saves to cardio_entries. Shows on the week calendar as kind cardio. Edit and delete.

2. The outbox already wraps WRITABLE_TABLES. Add every new table the UI writes: programmes, programme_sessions, session_exercises, exercises you own, calendar_events, cardio_entries, progress photo rows, challenges, and the new measurement columns. Follow the existing upsert and delete pattern. Do not build a second queue.

3. Photo files: if the device is offline, keep the blob in IndexedDB with the outbox row and upload when the sync runs. If that is too large a change, queue the row and show "photo waiting to upload" rather than pretending it saved to Storage. Say which you did.

4. Sync: existing sync path. Failed rows keep attempts and failed, as OutboxEntry already does. A small visible state on Today: "saved on this phone" or "synced". No toast library.

5. Test with the existing vitest setup and fake-indexeddb. Add a test that an offline set_entry and a cardio_entry land in the outbox and apply once. Do not hit production Supabase from the test.

Done when: build, lint and tests pass, the new test name is in the reply, and this is committed.
```

## M8 PR card and personal challenges

```text
MGSL hub, fitness/planner. Read the mgsl skill. Personal only. No leaderboard, no mates, no share-to-Instagram API.

1. From a PR on the progress screen, "Save card" draws a PNG: deep slate ground, exercise name, the kg in Big Shoulders, reps, date, the word MGSL. Ochre is allowed as one bar. Text on ochre is #112F2C. Download the file. No remote upload.

2. Challenges: a short list on /body or /progress. Add a title (the 12-hour sessions live here as rows you type, not as a seeded stunt). Mark done with the date. Undo. Stored in challenges, through the outbox. No scores against anyone else.

3. Check 375px. The card preview fits. Buttons 44px.

Done when: build, lint and tests pass, and this is committed. Do not deploy unless the user asks.
```

---

## For you, not Cursor

- Apply the M2 migration on the Supabase project behind mgsl.online before M3, if the prompt could not.
- The password stays as it is. Do not paste it into a chat.
- Guitar, theory and the MGSL page are out of this pack on purpose.
